export default function Footer() {
    return (
      <footer className="bg-[#0a192f] border-t border-[#233554]">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-[#64ffda] font-semibold mb-4">LinkPure</h3>
              <p className="text-[#8892b0] text-sm">
                Ferramenta para limpar links de rastreamento e afiliados de forma simples e rápida.
              </p>
            </div>
            <div>
              <h3 className="text-[#64ffda] font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/GeovaneSec/linkpure" className="text-[#8892b0] hover:text-[#64ffda] text-sm transition-colors">
                    Código Fonte
                  </a>
                </li>
                <li>
                  <a href="https://geovanebr.me" className="text-[#8892b0] hover:text-[#64ffda] text-sm transition-colors">
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#64ffda] font-semibold mb-4">Desenvolvido por</h3>
              <p className="text-[#8892b0] text-sm">
                © {new Date().getFullYear()} Geovane
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://github.com/GeovaneSec" className="text-[#8892b0] hover:text-[#64ffda] transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }