import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onRequestQuote: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onRequestQuote }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group">
      
      {/* Image Container */}
      <div className="relative aspect-square bg-zinc-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />

        {/* Brand Badge */}
        <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 font-['Space_Grotesk']">
          {product.brand}
        </div>

        {/* Featured Tag */}
        {product.isFeatured && (
          <div className="absolute top-4 right-4 bg-[#FF6600] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6600] block mb-1">
            {product.categoryLabel}
          </span>
          <h3 className="text-2xl font-black uppercase text-zinc-900 tracking-tight font-['Space_Grotesk'] leading-tight group-hover:text-[#FF6600] transition-colors">
            {product.name}
          </h3>
          <p className="text-zinc-500 text-xs mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Key Specs Preview */}
        {product.specs.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-100">
            {product.specs.slice(0, 2).map((spec, idx) => (
              <div key={idx} className="bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                <span className="text-[9px] font-extrabold uppercase text-zinc-400 block tracking-wider">
                  {spec.label}
                </span>
                <span className="text-xs font-bold text-zinc-800 block truncate">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-zinc-900 hover:bg-[#FF6600] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onRequestQuote(product.name)}
            className="px-4 py-3 border border-zinc-200 hover:border-[#FF6600] text-zinc-800 hover:text-[#FF6600] rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            title="Request Quote"
          >
            Quote
          </button>
        </div>

      </div>
    </div>
  );
};
