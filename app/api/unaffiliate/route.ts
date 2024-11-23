import { NextResponse } from 'next/server';

type Platform = 'aliexpress' | 'mercadolivre' | 'amazon' | 'shopee' | 'youtube' | 'other';
type CleanUrlType = 'aliexpress' | 'mercadolivre' | 'shopee';

interface UnaffiliateResponse {
  url: string;
  wasYoutubeRedirect: boolean;
  platform: Platform;
}

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const MAX_REQUEST_SIZE = 2000;

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

function isSupportedPlatform(url: string): boolean {
  return url.includes('amazon.') || 
         url.includes('amzn.') ||
         url.includes('aliexpress.com') ||
         url.includes('click.aliexpress.com') ||
         url.includes('star.aliexpress.com') ||
         url.includes('mercadolivre.com.br') ||
         url.includes('mercadolibre.com') ||
         url.includes('mercadolivre.com') ||
         url.includes('mercadolivre.com.br/social/') ||
         url.includes('shopee.com.br') ||
         url.includes('s.shopee.com.br') ||
         url.includes('banggood.com');
}

async function followAliExpressRedirect(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT },
    });

    const location = response.headers.get('location');
    if (location) {
      if (location.includes('star.aliexpress.com/share/share.htm')) {
        const urlObj = new URL(location);
        const redirectUrl = urlObj.searchParams.get('redirectUrl');
        if (redirectUrl) {
          const decodedUrl = decodeURIComponent(redirectUrl);
          return cleanAliExpressUrl(decodedUrl);
        }
      }
      
      if (location.includes('aliexpress.com')) {
        return cleanAliExpressUrl(location);
      }
      
      return location;
    }
    
    if (url.includes('star.aliexpress.com/share/share.htm')) {
      const urlObj = new URL(url);
      const redirectUrl = urlObj.searchParams.get('redirectUrl');
      if (redirectUrl) {
        const decodedUrl = decodeURIComponent(redirectUrl);
        return cleanAliExpressUrl(decodedUrl);
      }
    }
    
    return url;
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

async function followShopeeRedirect(url: string): Promise<string | null> {
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

async function followMercadoLivreRedirect(url: string): Promise<string | null> {
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

function cleanUrl(url: string, type: CleanUrlType): string {
  const cleanUrl = new URL(url);
  
  if (type === 'aliexpress') {
    const aliExpressParams = [
      'spm', 'srcSns', 'businessType', 'templateId', 'currency',
      'language', 'src', 'pdp_npi', 'algo_pvid', 'algo_exp_id', 'sku_id',
      'sourceType', 'spreadType', 'bizType', 'social_params'
    ];
    aliExpressParams.forEach(param => cleanUrl.searchParams.delete(param));

    const pathParts = cleanUrl.pathname.split('.');
    if (pathParts.length > 1) {
      cleanUrl.pathname = pathParts[0] + '.html';
    }
  } else if (type === 'shopee') {
    const shopeeParams = [
      'uls_trackid', 'utm_campaign', 'utm_content', 
      'utm_medium', 'utm_source', 'utm_term'
    ];
    shopeeParams.forEach(param => cleanUrl.searchParams.delete(param));
  } else {
    const mercadoLivreParams = ['ref', 'matt_tool', 'forceInApp', 'from'];
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

async function handleMercadoLivreSocialUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: { 
        'User-Agent': USER_AGENT,
        'Accept': 'text/html',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      }
    });
    
    const html = await response.text();
    const productMatch = html.match(/<a class="poly-component__title" href="([^"]+)"/);
    
    if (productMatch && productMatch[1]) {
      return productMatch[1].split('#')[0];
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

async function followBanggoodRedirect(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': USER_AGENT }
    });

    const location = response.headers.get('location');
    return location || url;
  } catch {
    return null;
  }
}

function cleanBanggoodUrl(url: string): string {
  try {
    const cleanUrl = new URL(url);
    const paramsToRemove = ['cur_warehouse', 'ID', 'rmmds', 'p', 'custlinkid'];
    paramsToRemove.forEach(param => cleanUrl.searchParams.delete(param));
    return cleanUrl.toString();
  } catch {
    return url;
  }
}

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

    if (!isSupportedPlatform(targetUrl)) {
      return NextResponse.json({
        url: targetUrl,
        wasYoutubeRedirect: !!youtubeRedirect,
        platform: 'other' as Platform
      });
    }

    if (targetUrl.includes('shopee.com.br') || targetUrl.includes('s.shopee.com.br')) {
      const finalUrl = await followShopeeRedirect(targetUrl);
      if (!finalUrl) {
        return NextResponse.json(
          { error: 'Could not resolve Shopee URL' },
          { status: 400 }
        );
      }
      
      const response: UnaffiliateResponse = {
        url: cleanUrl(finalUrl, 'shopee'),
        wasYoutubeRedirect: !!youtubeRedirect,
        platform: 'shopee'
      };
      return NextResponse.json(response);
    }
    
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
    
    if (targetUrl.includes('aliexpress.com') || targetUrl.includes('click.aliexpress.com') || targetUrl.includes('star.aliexpress.com')) {
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
    
    if (targetUrl.includes('mercado')) {
      const finalUrl = await followMercadoLivreRedirect(targetUrl);
      
      if (!finalUrl) {
        return NextResponse.json(
          { error: 'Could not resolve MercadoLivre URL' },
          { status: 400 }
        );
      }

      if (finalUrl.includes('/social/')) {
        const productUrl = await handleMercadoLivreSocialUrl(finalUrl);
        
        if (productUrl) {
          return NextResponse.json({
            url: cleanUrl(productUrl, 'mercadolivre'),
            wasYoutubeRedirect: !!youtubeRedirect,
            platform: 'mercadolivre'
          });
        }
      }
      
      return NextResponse.json({
        url: cleanUrl(finalUrl, 'mercadolivre'),
        wasYoutubeRedirect: !!youtubeRedirect,
        platform: 'mercadolivre'
      });
    }
    
    if (targetUrl.includes('banggood.com')) {
      const finalUrl = await followBanggoodRedirect(targetUrl);
      
      if (!finalUrl) {
        return NextResponse.json(
          { error: 'Could not resolve Banggood URL' },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        url: cleanBanggoodUrl(finalUrl),
        wasYoutubeRedirect: !!youtubeRedirect,
        platform: 'other'
      });
    }
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process URL' },
      { status: 500 }
    );
  }
}