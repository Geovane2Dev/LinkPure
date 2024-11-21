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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a192f] to-[#112240]">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#64ffda] to-[#48c7b0] bg-clip-text text-transparent mb-4 md:mb-6">
              LinkPure
            </h1>
            <p className="text-lg md:text-xl text-[#8892b0] max-w-2xl mx-auto px-4">
              Uma ferramenta simples e eficiente para remover parâmetros de rastreamento e afiliados dos seus links favoritos
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-[#112240]/30 backdrop-blur-lg border border-[#233554]/50 rounded-xl p-8 shadow-xl mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Cole o link aqui"
                    className="w-full p-4 bg-[#0a192f]/50 border border-[#233554] rounded-lg text-white placeholder-[#8892b0] focus:ring-2 focus:ring-[#64ffda] focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-[#64ffda] to-[#48c7b0] text-[#0a192f] rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#64ffda] focus:ring-offset-2 focus:ring-offset-[#0a192f] disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? 'Processando...' : 'Limpar Link'}
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg">
                  {error}
                </div>
              )}

              {cleanUrl && (
                <div className="mt-6 p-6 bg-[#1a2f4d]/30 backdrop-blur-sm border border-[#64ffda]/30 rounded-lg">
                  {wasYoutubeRedirect && (
                    <div className="flex items-center gap-2 text-sm text-[#64ffda] mb-4">
                      <FontAwesomeIcon 
                        icon={faCheck} 
                        className="h-4 w-4" 
                        width={16} 
                        height={16}
                      />
                      <span>Link extraído do redirecionamento do YouTube</span>
                    </div>
                  )}
                  <p className="font-medium text-[#64ffda] mb-3">Link limpo:</p>
                  <div className="relative">
                    <a
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 pr-12 bg-[#0a192f]/50 rounded-lg border border-[#233554] text-[#64ffda] hover:text-[#64ffda]/80 break-all transition-colors"
                    >
                      {cleanUrl}
                    </a>
                    <button
                      onClick={handleCopy}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-[#233554] rounded-lg text-[#8892b0] hover:text-[#64ffda] transition-all duration-200"
                      title="Copiar link"
                    >
                      <FontAwesomeIcon 
                        icon={copied ? faCheck : faCopy} 
                        className="h-5 w-5"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {supportedPlatforms.map((platform) => (
              <div
                key={platform.name}
                className="group bg-[#112240]/30 backdrop-blur-lg p-6 rounded-xl border border-[#233554]/50 hover:border-[#64ffda]/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon 
                    icon={platform.icon} 
                    className="h-8 w-8 text-[#64ffda]"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-lg font-medium text-[#ccd6f6] mb-2">
                  {platform.name}
                </h3>
                <p className="text-sm md:text-base text-[#8892b0]">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
