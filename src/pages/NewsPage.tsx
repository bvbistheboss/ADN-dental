import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/content';
import { NewsArticle } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, ArrowRight, X, Sparkles } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Company Updates & Media</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
            {t('news_title')}
          </h1>
          <p className="text-zinc-600 text-sm">
            {t('news_sub')}
          </p>
        </div>

        {/* Articles Grid */}
        <div className={`grid grid-cols-1 ${NEWS_ARTICLES.length > 1 ? 'md:grid-cols-3' : 'max-w-xl mx-auto'} gap-8`}>
          {NEWS_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-zinc-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="aspect-video bg-zinc-100 overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6600]" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase font-['Space_Grotesk'] text-zinc-900 group-hover:text-[#FF6600] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="pt-2 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-[#FF6600] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{t('read_more')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#09090b] border border-zinc-800 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-10 text-white relative shadow-2xl space-y-6">
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-bold text-[#FF6600] uppercase tracking-wider">
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black uppercase font-['Space_Grotesk'] leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-zinc-300 text-sm leading-relaxed space-y-4 font-normal">
                <p>{selectedArticle.content}</p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
