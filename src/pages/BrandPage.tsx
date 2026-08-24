import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { ProductCard } from '../components/ProductCard';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface BrandPageProps {
  onRequestQuote: (productName: string) => void;
}

export const BrandPage: React.FC<BrandPageProps> = ({ onRequestQuote }) => {
  const { brandId } = useParams<{ brandId: string }>();
  const { products } = useCatalog();
  const idLower = brandId?.toLowerCase() || '';

  let brandName = 'DGSHAPE by Roland';
  let brandKey = 'DGSHAPE';
  let brandDescription = 'DGSHAPE by Roland is the worldwide market leader in dental CAD/CAM 5-axis dry and wet milling machines. Engineered in Japan for absolute reliability, continuous 24-hour production, and sub-micron accuracy.';
  let brandImage = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80';
  let supportText = 'ADN Dental is the official warranty provider in Algeria. We hold original Roland spindles, burs, Zubler muffles, and HEPA filters in central Algiers stock.';

  if (idLower === 'zubler') {
    brandName = 'Zubler Dental Equipment';
    brandKey = 'Zubler';
    brandDescription = 'Zubler Dental Equipment is Germany\'s premier manufacturer of ceramic pressing furnaces, porcelain firing chambers, and quiet dust extraction systems. Renowned worldwide since 1978 for patented ADVANCED PRESS muffle technology.';
    brandImage = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80';
    supportText = 'ADN Dental maintains genuine Zubler spiral quartz heating muffles, thermal sensors, and suction turbine components for rapid on-site repair.';
  } else if (idLower === 'castellini') {
    brandName = 'Castellini Dental Units';
    brandKey = 'Castellini';
    brandDescription = 'Founded in Italy in 1935, Castellini represents the pinnacle of Italian dental unit manufacturing, clinical ergonomics, and automated hygiene engineering. Combining luxury Soft Motion patient chairs with Full Touch multimedia consoles.';
    brandImage = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80';
    supportText = 'ADN Dental provides certified installation, waterline calibration, and genuine Italian replacement valves, circuit boards, and upholstery across all 69 wilayas.';
  }

  const brandProducts = products.filter((p) => p.brand.toLowerCase() === brandKey.toLowerCase());

  return (
    <div className="min-h-screen bg-white pt-24">
      
      {/* Brand Hero */}
      <section className="bg-[#09090b] text-white py-20 px-4 sm:px-8 border-b border-zinc-800 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FF6600] text-xs font-bold uppercase tracking-widest border border-white/10">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Importer & Certified Hub in Algeria</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-['Space_Grotesk'] leading-[0.95]">
              {brandName}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              {brandDescription}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-bold uppercase text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>2-Year Official Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>Original Genuine Spare Parts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>Certified On-Site Technicians</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>Installation & Training Included</span>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onRequestQuote(`${brandName} Catalog Request`)}
                className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                Request Brand Price List
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-square rounded-[40px] overflow-hidden border border-zinc-800 shadow-2xl relative">
            <img
              src={brandImage}
              alt={brandName}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* Showcase Grid */}
      <section className="py-20 px-4 sm:px-8 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs block mb-2">
            Complete Product Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
            {brandName} Equipment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandProducts.map((p) => (
            <ProductCard key={p.id} product={p} onRequestQuote={onRequestQuote} />
          ))}
        </div>
      </section>

      {/* Tech Support Note */}
      <section className="bg-zinc-100 border-t border-zinc-200 py-16 px-4 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-zinc-900">
            Need Installation or Maintenance for {brandKey}?
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm">
            {supportText}
          </p>
          <div className="pt-2">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FF6600] transition-colors"
            >
              <span>Contact Technical Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
