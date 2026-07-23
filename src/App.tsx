import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { QuoteModal } from './components/QuoteModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { BrandPage } from './pages/BrandPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NewsPage } from './pages/NewsPage';
import { CoursesPage } from './pages/CoursesPage';
import { SupportPage } from './pages/SupportPage';
import { ContactPage } from './pages/ContactPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppContent: React.FC = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<string | undefined>(undefined);

  const handleRequestQuote = (productName?: string) => {
    setQuoteProduct(productName);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans selection:bg-[#FF6600] selection:text-white">
      <ScrollToTop />
      
      <Navbar onRequestQuote={handleRequestQuote} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onRequestQuote={handleRequestQuote} />} />
          <Route path="/catalog" element={<CatalogPage onRequestQuote={handleRequestQuote} />} />
          <Route path="/brand/:brandId" element={<BrandPage onRequestQuote={handleRequestQuote} />} />
          <Route path="/product/:productId" element={<ProductDetailPage onRequestQuote={handleRequestQuote} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage onRequestQuote={handleRequestQuote} />} />
        </Routes>
      </main>

      <Footer />

      <WhatsAppFab />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={quoteProduct}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;
