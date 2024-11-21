import { NextResponse } from 'next/server';

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

async function followAliExpressRedirect(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    // AliExpress geralmente usa múltiplos redirecionamentos
    let location = response.headers.get('location');
    if (location && location.includes('aliexpress.com')) {
      return cleanAliExpressUrl(location);
    }
    
    return location;
  } catch {
    return null;
  }
}

function cleanUrl(url: string, type: 'aliexpress' | 'mercadolivre'): string {
  const cleanUrl = new URL(url);
  
  if (type === 'aliexpress') {
    // Remove parâmetros de tracking do AliExpress
    cleanUrl.searchParams.delete('spm');
    cleanUrl.searchParams.delete('srcSns');
    cleanUrl.searchParams.delete('businessType');
    cleanUrl.searchParams.delete('templateId');
    cleanUrl.searchParams.delete('currency');
    cleanUrl.searchParams.delete('language');
    cleanUrl.searchParams.delete('src');
    cleanUrl.searchParams.delete('pdp_npi');
    cleanUrl.searchParams.delete('algo_pvid');
    cleanUrl.searchParams.delete('algo_exp_id');
    cleanUrl.searchParams.delete('sku_id');
    // Mantém apenas o ID do item
    const pathParts = cleanUrl.pathname.split('.');
    if (pathParts.length > 1) {
      cleanUrl.pathname = pathParts[0] + '.html';
    }
  } else {
    // Parâmetros do Mercado Livre
    cleanUrl.searchParams.delete('ref');
    cleanUrl.searchParams.delete('matt_tool');
    cleanUrl.searchParams.delete('forceInApp');
  }

  return cleanUrl.toString();
}

function cleanAliExpressUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('aliexpress.com')) {
      // Mantém apenas o caminho básico do produto
      const pathParts = urlObj.pathname.split('?')[0];
      return `${urlObj.protocol}//${urlObj.host}${pathParts}`;
    }
    return url;
  } catch {
    return url;
  }
}

async function followAmazonRedirect(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    const location = response.headers.get('location');
    return location || url;
  } catch {
    return null;
  }
}

function cleanAmazonUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('amazon.')) {
      // Mantém apenas o ID do produto da Amazon
      const dpIndex = urlObj.pathname.indexOf('/dp/');
      if (dpIndex !== -1) {
        const productId = urlObj.pathname.substring(dpIndex + 4).split('/')[0];
        urlObj.pathname = `/dp/${productId}`;
      }
      // Remove todos os parâmetros de rastreamento
      urlObj.search = '';
      return urlObj.toString();
    }
    return url;
  } catch {
    return url;
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    // Verifica se é uma URL do YouTube e extrai se for
    const youtubeRedirect = extractYoutubeRedirect(url);
    const targetUrl = youtubeRedirect || url;
    
    // Determina se é um link da Amazon
    const isAmazon = targetUrl.includes('amazon.') || targetUrl.includes('amzn.');
    
    if (isAmazon) {
      const finalUrl = await followAmazonRedirect(targetUrl);
      if (!finalUrl) {
        return NextResponse.json({ error: 'Could not resolve Amazon URL' }, { status: 400 });
      }
      return NextResponse.json({ 
        url: cleanAmazonUrl(finalUrl),
        wasYoutubeRedirect: !!youtubeRedirect,
        platform: 'amazon'
      });
    }
    
    // Determina se é um link do AliExpress
    const isAliExpress = targetUrl.includes('aliexpress.com') || targetUrl.includes('click.aliexpress.com');
    
    if (isAliExpress) {
      const finalUrl = await followAliExpressRedirect(targetUrl);
      if (!finalUrl) {
        return NextResponse.json({ error: 'Could not resolve AliExpress URL' }, { status: 400 });
      }
      return NextResponse.json({ 
        url: cleanUrl(finalUrl, 'aliexpress'),
        wasYoutubeRedirect: !!youtubeRedirect,
        platform: 'aliexpress'
      });
    }
    
    // Processo original para Mercado Livre
    const response = await fetch(targetUrl, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    const location = response.headers.get('location');
    
    if (!location) {
      return NextResponse.json({ error: 'No redirect found' }, { status: 400 });
    }

    return NextResponse.json({ 
      url: cleanUrl(location, 'mercadolivre'),
      wasYoutubeRedirect: !!youtubeRedirect,
      platform: 'mercadolivre'
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process URL' }, { status: 500 });
  }
} 