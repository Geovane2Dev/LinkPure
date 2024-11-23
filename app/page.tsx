'use client';
import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faShoppingBag, faGlobe, faShoppingCart, faVideo, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface ProcessedData {
  url: string;
  wasYoutubeRedirect: boolean;
  platform: 'aliexpress' | 'mercadolivre' | 'amazon' | 'shopee' | 'youtube' | 'banggood' | 'other';
  error?: string;
}

const supportedPlatforms = [
  {
    name: 'Amazon',
    description: 'Remove parâmetros de rastreamento e afiliados de links da Amazon',
    icon: faShoppingBag,
  },
  {
    name: 'AliExpress',
    description: 'Limpa links do AliExpress, removendo parâmetros de rastreamento',
    icon: faGlobe,
  },
  {
    name: 'Mercado Livre',
    description: 'Remove parâmetros de afiliados de links do Mercado Livre',
    icon: faShoppingCart,
  },
  {
    name: 'Shopee',
    description: 'Remove parâmetros de afiliados e rastreamento de links da Shopee',
    icon: faShoppingBag,
  },
  {
    name: 'Banggood',
    description: 'Remove parâmetros de rastreamento de links da Banggood',
    icon: faShoppingBag,
  },
  {
    name: 'YouTube Redirects',
    description: 'Extrai links originais de redirecionamentos do YouTube',
    icon: faVideo,
  },
];

export default function Home() {
  const [inputUrl, setInputUrl] = useState('');
  const [cleanUrl, setCleanUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [wasYoutubeRedirect, setWasYoutubeRedirect] = useState(false);
  const [platform, setPlatform] = useState<'aliexpress' | 'mercadolivre' | 'amazon' | 'shopee' | 'youtube' | 'banggood' | 'other' | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setCleanUrl('');
    setWasYoutubeRedirect(false);
    setPlatform(null);

    try {
      const response = await fetch('/api/unaffiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data: ProcessedData = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process URL');
      }

      setCleanUrl(data.url);
      setWasYoutubeRedirect(data.wasYoutubeRedirect);
      setPlatform(data.platform);

      // Scroll to result after a small delay to ensure the content is rendered
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleOpenUrl = () => {
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950">
      <Navbar />
      
      <main className="flex-grow pt-16 sm:pt-20 md:pt-28 pb-8 sm:pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 mb-4 sm:mb-6 md:mb-8 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <span className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-medium">
                Ferramenta gratuita e open source
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight px-2 sm:px-0">
              <span className="text-white">Otimize seus</span>
              <span className="relative block mt-1 sm:mt-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-400 blur-2xl opacity-20"></span>
                <span className="relative bg-gradient-to-r from-emerald-500 to-blue-400 bg-clip-text text-transparent">links com segurança</span>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4 sm:px-6">
              Remova <span className="text-emerald-400 font-medium">parâmetros de rastreamento</span> e 
              <span className="text-blue-400 font-medium"> links de afiliados</span> com nossa ferramenta.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-24 px-2 sm:px-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-emerald-500/30 rounded-lg sm:rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative">
                      <input
                        type="url"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="Cole aqui o link que deseja otimizar..."
                        className="w-full p-4 sm:p-5 bg-slate-900/90 border border-slate-800/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group overflow-hidden rounded-lg sm:rounded-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-500 transition-transform duration-300 group-hover:scale-105"></div>
                    <div className="relative px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/25">
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Processando...</span>
                        </span>
                      ) : (
                        <span className="relative group-hover:scale-105 transition-transform duration-300">
                          Otimizar Link
                        </span>
                      )}
                    </div>
                  </button>
                </form>

                {cleanUrl && (
                  <div ref={resultRef} className="mt-6 sm:mt-8 space-y-4">
                    <div className="relative p-4 sm:p-6 bg-slate-900/90 border border-slate-800/50 rounded-lg sm:rounded-xl">
                      {wasYoutubeRedirect && (
                        <div className="mb-4 p-2.5 sm:p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <div className="flex items-center space-x-2 text-emerald-400">
                            <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm font-medium">Link do YouTube processado com sucesso</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-medium text-emerald-400">Link otimizado</span>
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <button
                            onClick={handleOpenUrl}
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:scale-110"
                            title="Abrir em nova aba"
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                          <button
                            onClick={handleCopy}
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                            title={copied ? "Copiado!" : "Copiar link"}
                          >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="font-mono text-xs sm:text-sm break-all text-white bg-slate-900 p-3 sm:p-4 rounded-lg border border-slate-800/50">
                        {cleanUrl}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-16">
            {supportedPlatforms.map((platform) => (
              <div key={platform.name} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg sm:rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 hover:border-emerald-500/30">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-emerald-500/10 to-blue-500/10 mb-3 sm:mb-4">
                    <FontAwesomeIcon 
                      icon={platform.icon} 
                      className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400 group-hover:text-blue-400 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {platform.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
