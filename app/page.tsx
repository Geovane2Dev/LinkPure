'use client';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faShoppingBag, faGlobe, faShoppingCart, faVideo } from '@fortawesome/free-solid-svg-icons';

interface ProcessedData {
  url: string;
  wasYoutubeRedirect: boolean;
  platform: 'aliexpress' | 'mercadolivre' | 'amazon';
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
  const [platform, setPlatform] = useState<'aliexpress' | 'mercadolivre' | 'amazon' | null>(null);
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Navbar />
      
      <main className="flex-grow pt-20 md:pt-28 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <span className="text-sm md:text-base bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-medium">
                Ferramenta gratuita e open source
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="text-white">Otimize seus</span>
              <span className="relative block mt-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-400 blur-2xl opacity-20"></span>
                <span className="relative bg-gradient-to-r from-emerald-500 to-blue-400 bg-clip-text text-transparent">links com segurança</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Remova <span className="text-emerald-400 font-medium">parâmetros de rastreamento</span> e 
              <span className="text-blue-400 font-medium"> links de afiliados</span> com nossa ferramenta profissional.
              Suporte para Amazon, AliExpress, Mercado Livre e YouTube.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-24">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative">
                      <input
                        type="url"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="Cole aqui o link que deseja otimizar..."
                        className="w-full p-5 bg-slate-900/90 border border-slate-800/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <span className="text-sm text-slate-500">URL</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Exemplo: https://www.amazon.com/produto?ref=tracking
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-transform duration-300 group-hover:scale-105"></div>
                    <div className="relative px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span className="relative">Processando...</span>
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
                  <div className="mt-8 space-y-4">
                    <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-400">Link otimizado</span>
                        </div>
                        <button
                          onClick={handleCopy}
                          className="p-2 text-slate-400 hover:text-blue-400 transition-colors duration-300"
                          title={copied ? "Copiado!" : "Copiar link"}
                        >
                          <FontAwesomeIcon 
                            icon={copied ? faCheck : faCopy} 
                            className="h-4 w-4"
                          />
                        </button>
                      </div>
                      <div className="font-mono text-sm break-all text-white bg-slate-900/90 p-3 rounded-lg border border-slate-800/50">
                        {cleanUrl}
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800/30">
                      <div className="text-sm text-slate-500 mb-2">Link original</div>
                      <div className="font-mono text-sm break-all text-slate-400 bg-slate-900/60 p-3 rounded-lg">
                        {inputUrl}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {supportedPlatforms.map((platform) => (
              <div key={platform.name} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-all duration-500">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
                      <FontAwesomeIcon 
                        icon={platform.icon} 
                        className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
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
