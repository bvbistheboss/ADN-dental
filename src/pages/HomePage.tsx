import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { NEWS_ARTICLES } from '../data/content';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ShieldCheck, Award, Sparkles, Wrench, CheckCircle2, ChevronRight, MapPin, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onRequestQuote: (productName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onRequestQuote }) => {
  const { t } = useLanguage();

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#09090b] text-white min-h-[85vh] flex items-center overflow-hidden pt-24 pb-16 px-4 sm:px-8">
        {/* Background Image Layer */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full opacity-35 lg:opacity-75 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_30%)]" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="max-w-2xl space-y-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FF6600] text-xs font-bold uppercase tracking-widest"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('hero_tag')}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight font-['Space_Grotesk'] leading-[0.95]"
            >
              {t('hero_title')}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-base sm:text-lg leading-relaxed font-normal"
            >
              {t('hero_sub')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link
                to="/catalog"
                className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,102,0,0.3)] transition-all inline-flex items-center gap-2"
              >
                <span>{t('hero_btn')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onRequestQuote()}
                className="border border-white/30 hover:border-[#FF6600] text-white hover:text-[#FF6600] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                {t('hero_quote')}
              </button>
            </motion.div>

            {/* Quick Supplier badges */}
            <div className="pt-8 border-t border-white/10 flex items-center gap-8 text-xs font-bold uppercase text-zinc-400 font-['Space_Grotesk']">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>DGSHAPE by Roland</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6600]" />
                <span>Zubler Germany</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <div className="bg-zinc-100 py-6 overflow-hidden border-b border-zinc-200">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-16 font-['Space_Grotesk'] font-black text-xl text-zinc-400 uppercase tracking-widest">
          <span>{t('marquee_dgshape')}</span>
          <span>•</span>
          <span>{t('marquee_zubler')}</span>
          <span>•</span>
          <span>{t('marquee_precision')}</span>
          <span>•</span>
          <span>{t('marquee_innovation')}</span>
          <span>•</span>
          <span>{t('marquee_support')}</span>
          <span>•</span>
          <span>{t('marquee_dgshape')}</span>
          <span>•</span>
          <span>{t('marquee_zubler')}</span>
        </div>
      </div>

      {/* SUPPLIERS BENTO SHOWCASE */}
      <section className="py-24 px-4 sm:px-8 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs block mb-2">
            {t('cat_tag')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
            {t('cat_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* DGSHAPE Card */}
          <Link
            to="/brand/dgshape"
            className="lg:col-span-7 relative h-[480px] rounded-[40px] overflow-hidden group shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80"
              alt="DGSHAPE Roland"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 sm:p-12 flex flex-col justify-end text-white">
              <span className="text-[#FF6600] font-extrabold uppercase text-xs tracking-widest mb-2">
                Authorized Importer
              </span>
              <h3 className="text-3xl sm:text-5xl font-black uppercase font-['Space_Grotesk'] leading-none mb-3">
                DGSHAPE by Roland
              </h3>
              <p className="text-zinc-300 text-sm max-w-md mb-6">
                {t('dgshape_desc')}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF6600] transition-colors">
                <span>Discover Milling Range</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Zubler Card */}
          <Link
            to="/brand/zubler"
            className="lg:col-span-5 relative h-[480px] rounded-[40px] overflow-hidden group shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80"
              alt="Zubler Dental"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 sm:p-12 flex flex-col justify-end text-white">
              <span className="text-[#FF6600] font-extrabold uppercase text-xs tracking-widest mb-2">
                German Engineering
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase font-['Space_Grotesk'] leading-none mb-3">
                Zubler Dental
              </h3>
              <p className="text-zinc-300 text-sm mb-6">
                {t('zubler_desc')}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF6600] transition-colors">
                <span>Discover Furnaces & Suctions</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200/80 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs block mb-2">
                Flagship Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
                Featured Equipment
              </h2>
            </div>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-[#FF6600] transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRequestQuote={onRequestQuote}
              />
            ))}
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-[#050505] text-white py-24 my-12 mx-4 sm:mx-8 rounded-[48px] sm:rounded-[60px] px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          
          <span className="text-[#FF6600] font-bold uppercase tracking-[0.2em] text-xs block mb-3">
            National Presence Across Algeria
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-['Space_Grotesk'] tracking-tight mb-16 max-w-2xl mx-auto">
            Trusted by Algeria\'s Leading Dental Laboratories
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-2">
              <span className="text-5xl sm:text-7xl font-black text-[#FF6600] font-['Space_Grotesk'] block">
                14+
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                {t('stats_years')}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-5xl sm:text-7xl font-black text-[#FF6600] font-['Space_Grotesk'] block">
                69
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                {t('stats_wilayas')}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-5xl sm:text-7xl font-black text-[#FF6600] font-['Space_Grotesk'] block">
                500+
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                {t('stats_units')}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-5xl sm:text-7xl font-black text-[#FF6600] font-['Space_Grotesk'] block">
                24h
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block">
                {t('stats_support')}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* LATEST NEWS & EDUCATION */}
      <section className="py-24 px-4 sm:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs block mb-2">
              Updates & Academy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
              {t('news_title')}
            </h2>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-[#FF6600] transition-colors"
          >
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className={`grid grid-cols-1 ${NEWS_ARTICLES.length > 1 ? 'md:grid-cols-3' : 'max-w-xl mx-auto'} gap-8`}>
          {NEWS_ARTICLES.map((article) => (
            <div key={article.id} className="bg-white rounded-3xl border border-zinc-200 overflow-hidden flex flex-col group hover:border-[#FF6600] transition-colors">
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#FF6600]">
                    <span>{article.category}</span>
                    <span className="text-zinc-400">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-black uppercase font-['Space_Grotesk'] leading-tight group-hover:text-[#FF6600] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <Link
                  to="/news"
                  className="pt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-[#FF6600] transition-colors"
                >
                  <span>{t('read_more')}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH SUPPORT CTA BANNER */}
      <section className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 text-white py-16 px-6 sm:px-12 my-12 max-w-[1400px] mx-auto rounded-[36px] flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10">
        <div className="space-y-3 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-[#FF6600] text-xs font-bold uppercase tracking-widest">
            <Wrench className="w-4 h-4" />
            <span>Certified Technical Service Hub</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black uppercase font-['Space_Grotesk']">
            Need On-Site Technician Maintenance or Software Driver Downloads?
          </h3>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Our certified engineers in Algiers provide teamviewer remote calibration, spindle replacement, and urgent troubleshooting.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <Link
            to="/support"
            className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all w-full sm:w-auto text-center"
          >
            Submit Technical Ticket
          </Link>
          <a
            href="tel:+213698094000"
            className="border border-white/30 hover:border-white text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all w-full sm:w-auto text-center"
          >
            Call +213 698 09 40 00
          </a>
        </div>
      </section>

    </div>
  );
};
