import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBolt, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface NavLinkProps {
  href: string;
  icon: IconDefinition;
  text: string;
}

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

interface MobileMenuProps {
  isOpen: boolean;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-transparent backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <Image
                src="/icon.png"
                alt="LinkPure Logo"
                width={36}
                height={36}
                className="relative rounded-lg md:w-10 md:h-10 transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">
              Link<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Pure</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="https://github.com/Geovane2Dev/LinkPure" icon={faGithub} text="GitHub" />
            <NavLink href="https://g2dev.me" icon={faGlobe} text="Portfolio" />
          </div>

          <MobileMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>

        <MobileMenu isOpen={isMenuOpen} />
      </div>
    </nav>
  );
}

const NavLink = ({ href, icon, text }: NavLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:scale-[1.02]"
  >
    <FontAwesomeIcon icon={icon} className="h-5 w-5" />
    <span className="font-medium">{text}</span>
  </a>
);

const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => (
  <button
    onClick={onClick}
    className="md:hidden p-2 text-slate-400 hover:text-white transition-colors duration-300"
    aria-label="Menu"
  >
    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="h-6 w-6" />
  </button>
);

const MobileMenu = ({ isOpen }: MobileMenuProps) => (
  <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
    <div className="py-3 space-y-2">
      <NavLink href="https://github.com/Geovane2Dev/LinkPure" icon={faGithub} text="GitHub" />
      <NavLink href="https://g2dev.me" icon={faGlobe} text="Portfolio" />
    </div>
  </div>
);
