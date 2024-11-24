'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-16 sm:pt-20 md:pt-28 pb-8 sm:pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 mb-6 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <span className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-medium">
                Erro 404
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="text-white">Oops!</span>
              <span className="relative block mt-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-400 blur-2xl opacity-20"></span>
                <span className="relative bg-gradient-to-r from-emerald-500 to-blue-400 bg-clip-text text-transparent">
                  Página não encontrada
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12">
              A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02]"
              >
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                Voltar para Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 