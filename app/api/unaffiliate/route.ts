import { NextResponse } from 'next/server';

// Types
type Platform = 'aliexpress' | 'mercadolivre' | 'amazon';
type CleanUrlType = 'aliexpress' | 'mercadolivre';

// Interfaces
interface UnaffiliateResponse {
  url: string;
  wasYoutubeRedirect: boolean;
  platform: Platform;
}

// Constants
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const MAX_REQUEST_SIZE = 2000;

// Utility Functions
function extractYoutubeRedirect(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname === '/redirect') {
      const redirectUrl = urlObj.searchParams.get('q');
      return redirectUrl ? decodeURIComponent(redirectUrl) : null;
    }
    return null;
  } catch {
    return null;
  }
}

// Platform-specific Functions
async function followAliExpressRedirect(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT },
    });

    const location = response.headers.get('location');
    if (location && location.includes('aliexpress.com')) {
      return cleanAliExpressUrl(location);
    }
    
    return location;
  } catch {
    return null;
  }
}

async function followAmazonRedirect(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT },
    });

    const location = response.headers.get('location');
    return location || url;
  } catch {
    return null;
  }
}

// URL Cleaning Functions
function cleanUrl(url: string, type: CleanUrlType): string {
  const cleanUrl = new URL(url);
  
  if (type === 'aliexpress') {
    const aliExpressParams = [
      'spm', 'srcSns', 'businessType', 'templateId', 'currency',
      'language', 'src', 'pdp_npi', 'algo_pvid', 'algo_exp_id', 'sku_id'
    ];
    aliExpressParams.forEach(param => cleanUrl.searchParams.delete(param));

    const pathParts = cleanUrl.pathname.split('.');
    if (pathParts.length > 1) {
      cleanUrl.pathname = pathParts[0] + '.html';
    }
  } else {
    const mercadoLivreParams = ['ref', 'matt_tool', 'forceInApp'];
    mercadoLivreParams.forEach(param => cleanUrl.searchParams.delete(param));
  }

  return cleanUrl.toString();
}

function cleanAliExpressUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('aliexpress.com')) {
      const pathParts = urlObj.pathname.split('?')[0];
      return `${urlObj.protocol}//${urlObj.host}${pathParts}`;
    }
    return url;
  } catch {
    return url;
  }
}

function cleanAmazonUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('amazon.')) {
      const dpIndex = urlObj.pathname.indexOf('/dp/');
      if (dpIndex !== -1) {
        const productId = urlObj.pathname.substring(dpIndex + 4).split('/')[0];
        urlObj.pathname = `/dp/${productId}`;
      }
      urlObj.search = '';
      return urlObj.toString();
    }
    return url;
  } catch {
    return url;
  }
}

// Main Handler
export async function POST(request: Request) {
  try {
    const text = await request.text();
    if (text.length > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
    }

    const { url } = JSON.parse(text);
    const youtubeRedirect = extractYoutubeRedirect(url);
    const targetUrl = youtubeRedirect || url;
    
    // Handle Amazon URLs
    if (targetUrl.includes('amazon.') || targetUrl.includes('amzn.')) {
      const finalUrl = await followAmazonRedirect(targetUrl);
      if (!finalUrl) {
        return NextResponse.json(
          { error: 'Could not resolve Amazon URL' },
          { status: 400 }
        );
      }
      
      const response: UnaffiliateResponse = {
        url: cleanAmazonUrl(finalUrl),
        wasYoutubeRedirect: !!youtubeRedirect,
        platform: 'amazon'
      };
      return NextResponse.json(response);
    }
    
    // Handle AliExpress URLs
    if (targetUrl.includes('aliexpress.com') || targetUrl.includes('click.aliexpress.com')) {
      const finalUrl = await followAliExpressRedirect(targetUrl);
      if (!finalUrl) {
        return NextResponse.json(
          { error: 'Could not resolve AliExpress URL' },
          { status: 400 }
        );
      }
      
      const response: UnaffiliateResponse = {
        url: cleanUrl(finalUrl, 'aliexpress'),
        wasYoutubeRedirect: !!youtubeRedirect,
        platform: 'aliexpress'
      };
      return NextResponse.json(response);
    }
    
    // Handle MercadoLivre URLs
    const response = await fetch(targetUrl, {
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT },
    });

    const location = response.headers.get('location');
    if (!location) {
      return NextResponse.json(
        { error: 'No redirect found' },
        { status: 400 }
      );
    }

    const mercadoLivreResponse: UnaffiliateResponse = {
      url: cleanUrl(location, 'mercadolivre'),
      wasYoutubeRedirect: !!youtubeRedirect,
      platform: 'mercadolivre'
    };
    return NextResponse.json(mercadoLivreResponse);
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process URL' },
      { status: 500 }
    );
  }
}