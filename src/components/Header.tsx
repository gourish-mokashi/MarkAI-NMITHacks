import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, Fingerprint } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="w-[90%] sticky top-5 z-50 shadow-sm px-4 my-4 rounded-xl bg-[#101010]/30 backdrop-blur-lg">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between p-2 md:h-20 h-14">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex gap-2 items-center">
              <Fingerprint className="h-10 w-10 text-blue-500" />
                <div>
                  <span className="text-blue-500 font-bold md:text-3xl text-2xl">Mark</span>
                  <span className="text-white font-bold md:text-3xl text-2xl">AI</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8 gap-4">
            <Link to="/" className="text-xl text-white font-medium hover:text-white relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link to="/generator" className="text-xl text-white font-medium hover:text-white relative group">
              Generator
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link to="/detector" className="text-xl text-white font-medium hover:text-white relative group">
              Detector
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <Link to="/about" className="text-xl text-white font-medium hover:text-white relative group">
              About
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-600 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              {isMenuOpen ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-2 pb-3 space-y-1 shadow-lg">
          <Link to="/" className="block px-4 py-2 text-base font-medium text-white hover:text-blue-600 hover:bg-white" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/generator" className="block px-4 py-2 text-base font-medium text-white hover:text-blue-600 hover:bg-white" onClick={() => setIsMenuOpen(false)}>
            Generator
          </Link>
          <Link to="/detector" className="block px-4 py-2 text-base font-medium text-white hover:text-blue-600 hover:bg-white" onClick={() => setIsMenuOpen(false)}>
            Detector
          </Link>
          <Link to="/about" className="block px-4 py-2 text-base font-medium text-white hover:text-blue-600 hover:bg-white" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
        </div>
      )}
    </header>
  );
}