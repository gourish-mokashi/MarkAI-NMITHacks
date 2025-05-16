import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-white shadow-sm w-full font-pp-mori-regular">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-2xl">MarkAI</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8 gap-4">
            <Link to="/" className="text-xl text-gray-700 hover:text-zinc-900 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link to="/generator" className="text-xl text-gray-700 font-medium hover:text-zinc-900 relative group">
              Generator
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link to="/detector" className="text-xl text-gray-700 h font-medium hover:text-zinc-900 relative group">
              Detector
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link to="/about" className="text-xl text-gray-700 font-medium hover:text-zinc-900 relative group">
              About
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              {isMenuOpen ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-white pt-2 pb-3 space-y-1 shadow-lg">
          <Link to="/generator" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
            Generator
          </Link>
          <Link to="/detector" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
            Detector
          </Link>
          <Link to="/about" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
        </div>}
    </header>;
}