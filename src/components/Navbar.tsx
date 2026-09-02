import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
  onOpenEPK?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEPK, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'DISCOGRAPHY', href: '#tracks' },
    { name: 'STAGE GALLERY', href: '#gallery' },
    { name: 'TOUR DATES', href: '#tour' },
    { name: 'CALENDAR', href: '#calendar' },
    { name: 'EPK & RIDER', href: '#epk', onClick: onOpenEPK },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center py-3 sm:py-4 ${scrolled ? 'sm:py-3' : 'sm:py-5'
          }`}
      >
        <div
          className={`w-[95%] rounded-full border border-white/10 transition-all duration-300 px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between ${scrolled
              ? 'bg-[#0E0E14]/90 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.85)] border-volt/20'
              : 'bg-[#08080A]/70 backdrop-blur-md'
            }`}
        >
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-8 sm:w-9 h-8 sm:h-9 rounded-full overflow-hidden border border-volt/50 p-0.5 bg-black">
              <img
                src="/assets/icon.png"
                alt="NOKA AXL Logo"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-kanit font-black text-base sm:text-xl tracking-wider text-white group-hover:text-volt transition-colors flex items-center gap-1.5">
                NOKA AXL
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-volt animate-ping" />
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-1 hidden sm:block">
                DJ // PRODUCER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="text-sm font-kanit font-bold uppercase tracking-wider text-slate-200 hover:text-volt transition-all duration-200 relative group py-1.5"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-volt transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-white/10 text-white hover:border-volt hover:text-volt transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-[2.5%] top-20 z-40 bg-[#0E0E14]/95 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                  }}
                  className="text-base font-kanit font-bold tracking-wider text-slate-200 hover:text-volt py-2 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-slate-500">→</span>
                </a>
              ))}
              {onOpenAdmin && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full py-2.5 rounded-xl border border-white/10 hover:border-volt/40 text-slate-400 hover:text-white font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>MANAGEMENT CMS LOGIN</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
