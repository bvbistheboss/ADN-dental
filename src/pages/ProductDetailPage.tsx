import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Sparkles, CheckCircle2, PhoneCall, ShieldCheck, FileText, Send } from 'lucide-react';

interface ProductDetailPageProps {
  onRequestQuote: (productName: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onRequestQuote }) => {
  const { productId } = useParams<{ productId: string }>();
  const { t } = useLanguage();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [selectedImg, setSelectedImg] = useState(product.image);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category)
  ).slice(0, 3);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* Back link */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[#FF6600] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        {/* Product Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Gallery Left Column */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
            <div className="aspect-square bg-zinc-100 rounded-3xl overflow-hidden border border-zinc-200 shadow-sm relative">
              <img
                src={selectedImg}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full font-['Space_Grotesk']">
                {product.brandLabel}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === img ? 'border-[#FF6600]' : 'border-zinc-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Official Importer Guarantee */}
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/80 flex items-center gap-4 text-xs">
              <ShieldCheck className="w-8 h-8 text-[#FF6600] shrink-0" />
              <div>
                <span className="font-bold uppercase text-zinc-900 block">
                  ADN Dental Official Importer Warranty
                </span>
                <span className="text-zinc-500">
                  Includes 2-Year Warranty, local setup in Algeria, and direct VPanel/TeamViewer remote support.
                </span>
              </div>
            </div>
          </div>

          {/* Details Right Column */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600] block">
                {product.categoryLabel}
              </span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase font-['Space_Grotesk'] tracking-tight text-zinc-900 leading-none">
                {product.name}
              </h1>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onRequestQuote(product.name)}
                className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-8 py-4 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('btn_quote')}</span>
              </button>

              <button
                onClick={() => {
                  const SALES_NUM = '213555123456';
                  const msg = encodeURIComponent(`Hello, I would like to request a live demonstration of ${product.name}`);
                  window.open(`https://wa.me/${SALES_NUM}?text=${msg}`, '_blank');
                }}
                className="border border-zinc-300 hover:border-black text-zinc-900 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                {t('btn_demo')}
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-3 pt-6 border-t border-zinc-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-['Space_Grotesk']">
                {t('product_overview')}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                {product.fullOverview}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="space-y-4 pt-6 border-t border-zinc-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-['Space_Grotesk']">
                {t('spec_title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specs.map((s, idx) => (
                  <div key={idx} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80">
                    <span className="text-[10px] font-extrabold uppercase text-[#FF6600] block tracking-wider mb-1">
                      {s.label}
                    </span>
                    <span className="text-sm font-bold text-zinc-900 font-['Space_Grotesk']">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-['Space_Grotesk']">
                  {t('features_title')}
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-zinc-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-zinc-200 space-y-8">
            <h2 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-zinc-900">
              {t('related_products')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onRequestQuote={onRequestQuote} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
