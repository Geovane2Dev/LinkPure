import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="relative bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <Image
                    src="/icon.png"
                    alt="LinkPure Logo"
                    width={48}
                    height={48}
                    className="relative rounded-lg transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold text-white">
                  Link<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Pure</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Ferramenta profissional para otimização e limpeza de links,
                removendo parâmetros de rastreamento e garantindo sua privacidade online.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="https://github.com/GeovaneSec/LinkPure" 
                   className="text-slate-400 hover:text-white transition-colors duration-300"
                   target="_blank"
                   rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://geovanebr.me"
                   className="text-slate-400 hover:text-white transition-colors duration-300"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <span className="sr-only">Portfolio</span>
                </a>
              </div>
            </div>

            <div className="md:ml-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://github.com/GeovaneSec/LinkPure/issues"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                    Reportar Bug
                  </a>
                </li>
                <li>
                  <a href="https://github.com/GeovaneSec/LinkPure"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                    Código Fonte
                  </a>
                </li>
                <li>
                  <a href="https://github.com/GeovaneSec/LinkPure/blob/main/LICENSE"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                    Licença MIT
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Conecte-se</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/GeovaneSec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://geovanebr.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Portfolio</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/50">
            <p className="text-center text-slate-400">
              © {new Date().getFullYear()} LinkPure. Desenvolvido por{' '}
              <a
                href="https://github.com/GeovaneSec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                GeovaneSec
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}