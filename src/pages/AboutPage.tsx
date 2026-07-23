import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, MapPin, Users, Building2, PhoneCall, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[#FF6600] font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Pioneering CAD/CAM Importer in Algeria</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
            {t('about_title')}
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-normal">
            {t('about_text')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 text-center space-y-2">
            <span className="text-5xl font-black font-['Space_Grotesk'] text-[#FF6600] block">
              14+
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 block">
              {t('about_years_label')}
            </span>
            <p className="text-zinc-500 text-xs">
              Established in Algiers in 2010, introducing CAD/CAM milling to national labs.
            </p>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 text-center space-y-2">
            <span className="text-5xl font-black font-['Space_Grotesk'] text-[#FF6600] block">
              500+
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 block">
              {t('about_clinics_label')}
            </span>
            <p className="text-zinc-500 text-xs">
              Milling machines, ceramic furnaces, and suction systems deployed nationwide.
            </p>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 text-center space-y-2">
            <span className="text-5xl font-black font-['Space_Grotesk'] text-[#FF6600] block">
              24/7
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 block">
              {t('about_support_label')}
            </span>
            <p className="text-zinc-500 text-xs">
              Dedicated maintenance engineers, TeamViewer remote support, and original spare parts.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-[#09090b] text-white rounded-[40px] p-8 sm:p-14 border border-zinc-800 space-y-10">
          <div className="space-y-3 max-w-xl">
            <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs">
              Uncompromising Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Space_Grotesk']">
              Why Algerian Dental Technicians Choose ADN Dental
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 bg-zinc-900/80 p-6 rounded-2xl border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-[#FF6600]/10 text-[#FF6600] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold uppercase font-['Space_Grotesk']">
                Direct Factory Authorization
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We work directly with Roland DGSHAPE (Japan) and Zubler (Germany) without third-party brokers, ensuring authentic pricing and official manufacturer warranties.
              </p>
            </div>

            <div className="space-y-3 bg-zinc-900/80 p-6 rounded-2xl border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-[#FF6600]/10 text-[#FF6600] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold uppercase font-['Space_Grotesk']">
                Central Algiers Spare Parts Stock
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Zero waiting time for critical spares. Spindles, drive belts, quartz muffles, HEPA filters, and diamond burs are stored locally for immediate delivery across Algeria.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
