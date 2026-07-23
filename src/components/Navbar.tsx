import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, PhoneCall, Globe, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onRequestQuote: (productName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestQuote }) => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav_home') },
    { path: '/catalog', label: t('nav_catalog') },
    { path: '/brand/dgshape', label: 'DGSHAPE' },
    { path: '/brand/zubler', label: 'Zubler' },
    { path: '/courses', label: t('nav_courses') },
    { path: '/news', label: t('nav_news') },
    { path: '/support', label: t('nav_tech') },
    { path: '/about', label: t('nav_about') },
    { path: '/contact', label: t('nav_contact') },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 h-[80px]">
      <div className="max-w-[1400px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-black tracking-tighter text-white uppercase font-['Space_Grotesk'] flex items-center gap-1 group"
        >
          <span>ADN</span>
          <span className="text-[#FF6600] group-hover:brightness-125 transition-all">DENTAL</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 py-2 relative ${
                isActive(link.path)
                  ? 'text-[#FF6600]'
                  : 'text-zinc-300 hover:text-[#FF6600]'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6600]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 text-white text-xs font-bold hover:border-[#FF6600] hover:text-[#FF6600] transition-all bg-white/5"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF6600]" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-36 bg-[#09090b] border border-zinc-800 rounded-xl shadow-2xl p-1 z-50"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code as any);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        language === l.code
                          ? 'bg-[#FF6600] text-white font-bold'
                          : 'text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{l.name}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Quote CTA */}
          <button
            onClick={() => onRequestQuote()}
            className="flex items-center gap-2 bg-[#FF6600] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#ff771c] hover:shadow-[0_10px_25px_rgba(255,102,0,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('hero_quote')}</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : language === 'fr' ? 'ar' : 'en')}
            className="px-2.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold uppercase text-[#FF6600]"
          >
            {language}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#FF6600] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#09090b] border-b border-zinc-800 overflow-hidden px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider py-2 border-b border-zinc-900 ${
                    isActive(link.path) ? 'text-[#FF6600]' : 'text-zinc-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRequestQuote();
                  }}
                  className="w-full bg-[#FF6600] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {t('hero_quote')}
                </button>

                <a
                  href="tel:+213555123456"
                  className="w-full border border-zinc-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#FF6600]" />
                  +213 555 12 34 56
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
