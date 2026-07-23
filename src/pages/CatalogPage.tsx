import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Search, Filter, Grid, List, Sparkles, X } from 'lucide-react';

interface CatalogPageProps {
  onRequestQuote: (productName: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onRequestQuote }) => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const brandQuery = searchParams.get('brand') || 'all';
  const categoryQuery = searchParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search filter
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(search.toLowerCase());

      // Brand filter
      const matchBrand =
        brandQuery === 'all' || p.brand.toLowerCase() === brandQuery.toLowerCase();

      // Category filter
      const matchCategory =
        categoryQuery === 'all' || p.category.toLowerCase() === categoryQuery.toLowerCase();

      return matchSearch && matchBrand && matchCategory;
    });
  }, [search, brandQuery, categoryQuery]);

  const setCategoryFilter = (cat: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') newParams.delete('category');
    else newParams.set('category', cat);
    setSearchParams(newParams);
  };

  const setBrandFilter = (brand: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (brand === 'all') newParams.delete('brand');
    else newParams.set('brand', brand);
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Header */}
        <div className="bg-[#09090b] text-white rounded-[36px] p-8 sm:p-12 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>DGSHAPE & Zubler Official Catalog</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
              {t('catalog_title')}
            </h1>
            <p className="text-zinc-400 text-sm">
              {t('catalog_sub')}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div>
              <span className="block text-zinc-500 uppercase">Available Models</span>
              <span className="text-lg font-bold text-white">{filteredProducts.length} Equipment</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm space-y-6">
          
          {/* Top row: Search & View Mode */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-100 border border-zinc-200 rounded-full pl-11 pr-10 py-3 text-xs text-zinc-900 focus:outline-none focus:border-[#FF6600] transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  viewMode === 'list'
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Bottom row: Brand & Category Filters */}
          <div className="pt-4 border-t border-zinc-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Category:
              </span>
              {[
                { id: 'all', label: t('filter_all') },
                { id: 'milling', label: t('filter_milling') },
                { id: 'furnaces', label: t('filter_furnaces') },
                { id: 'suction', label: t('filter_suction') },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategoryFilter(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    categoryQuery === c.id
                      ? 'bg-[#FF6600] text-white shadow-md'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Brand Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2">
                Brand:
              </span>
              {[
                { id: 'all', label: t('brand_all') },
                { id: 'dgshape', label: 'DGSHAPE' },
                { id: 'zubler', label: 'Zubler' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBrandFilter(b.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    brandQuery === b.id
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Product List */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-zinc-200 space-y-4">
            <h3 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-zinc-800">
              No Equipment Matches Your Search
            </h3>
            <p className="text-zinc-500 text-xs">
              Try adjusting your keyword filter or switching category tabs.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategoryFilter('all');
                setBrandFilter('all');
              }}
              className="bg-[#FF6600] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onRequestQuote={onRequestQuote}
              />
            ))}
          </div>
        ) : (
          /* List Mode */
          <div className="space-y-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-full md:w-48 aspect-square rounded-2xl bg-zinc-100 overflow-hidden shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-black text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full">
                      {p.brand}
                    </span>
                    <span className="text-xs font-bold text-[#FF6600] uppercase">
                      {p.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-zinc-900">
                    {p.name}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed max-w-2xl">
                    {p.fullOverview}
                  </p>
                </div>

                <div className="flex md:flex-col items-center gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => onRequestQuote(p.name)}
                    className="bg-[#FF6600] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#ff771c] w-full md:w-36 text-center"
                  >
                    Request Quote
                  </button>
                  <a
                    href={`#/product/${p.id}`}
                    className="border border-zinc-300 text-zinc-800 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:border-black w-full md:w-36 text-center"
                  >
                    View Specs
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
