import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBolt, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-[#0a192f]/80 backdrop-blur-md border-b border-[#233554] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FontAwesomeIcon 
                icon={faBolt} 
                className="h-5 w-5 text-[#64ffda]" 
                width={20}
                height={20}
              />
              <span className="text-xl font-bold text-[#64ffda]">LinkPure</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="https://github.com/GeovaneSec" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center space-x-2 text-[#8892b0] hover:text-[#64ffda] transition-colors">
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" width={20} height={20} />
              <span>GitHub</span>
            </a>
            <a href="https://geovanebr.me" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center space-x-2 text-[#8892b0] hover:text-[#64ffda] transition-colors">
              <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" width={16} height={16} />
              <span>Portfolio</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#8892b0] hover:text-[#64ffda] transition-colors p-2"
            >
              <FontAwesomeIcon 
                icon={isMenuOpen ? faXmark : faBars} 
                className="h-6 w-6"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a192f] border-b border-[#233554]">
          <div className="px-4 pt-2 pb-3 space-y-3">
            <a href="https://github.com/GeovaneSec"
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center space-x-2 text-[#8892b0] hover:text-[#64ffda] transition-colors py-2"
               onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" width={20} height={20} />
              <span>GitHub</span>
            </a>
            <a href="https://geovanebr.me"
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center space-x-2 text-[#8892b0] hover:text-[#64ffda] transition-colors py-2"
               onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" width={16} height={16} />
              <span>Portfolio</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}