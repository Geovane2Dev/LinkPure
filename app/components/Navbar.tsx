import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBolt, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-gradient-to-b from-slate-900/95 to-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <Image
              src="/icon.png"
              alt="LinkPure Logo"
              width={36}
              height={36}
              className="rounded-lg md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="text-xl md:text-2xl font-bold text-white">
              Link<span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">Pure</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="https://github.com/GeovaneSec/LinkPure"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
              <span className="font-medium">GitHub</span>
            </a>
            <a
              href="https://geovanebr.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
              <span className="font-medium">Portfolio</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors duration-300"
            aria-label="Menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="py-3 space-y-2">
            <a
              href="https://github.com/GeovaneSec/LinkPure"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-slate-300 hover:text-blue-400 px-4 py-3 rounded-lg hover:bg-slate-800/40"
            >
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
              <span className="font-medium">GitHub</span>
            </a>
            <a
              href="https://geovanebr.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-slate-300 hover:text-blue-400 px-4 py-3 rounded-lg hover:bg-slate-800/40"
            >
              <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
              <span className="font-medium">Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}