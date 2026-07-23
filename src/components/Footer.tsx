import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, ShieldCheck, Award, Wrench } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#09090b] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white uppercase font-['Space_Grotesk'] inline-block">
              ADN<span className="text-[#FF6600]">DENTAL</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t('footer_desc')}
            </p>

            <div className="flex items-center gap-3 text-xs font-bold uppercase text-[#FF6600] tracking-widest pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Distributor • Algeria</span>
            </div>
          </div>

          {/* Suppliers */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6600]">
              Official Partners
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/brand/dgshape" className="text-zinc-300 hover:text-[#FF6600] transition-colors flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#FF6600]" />
                  DGSHAPE by Roland
                </Link>
              </li>
              <li>
                <Link to="/brand/zubler" className="text-zinc-300 hover:text-[#FF6600] transition-colors flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#FF6600]" />
                  Zubler Dental Germany
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=milling" className="text-zinc-300 hover:text-[#FF6600] transition-colors">
                  5-Axis Milling Solutions
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=furnaces" className="text-zinc-300 hover:text-[#FF6600] transition-colors">
                  Ceramic Firing & Pressing
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=suction" className="text-zinc-300 hover:text-[#FF6600] transition-colors">
                  Lab Dust Extraction Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6600]">
              {t('quick_links')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/catalog" className="text-zinc-300 hover:text-[#FF6600] transition-colors">
                  {t('nav_catalog')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-zinc-300 hover:text-[#FF6600] transition-colors">
                  {t('courses_title')}
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-zinc-300 hover:text-[#FF6600] transition-colors flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-[#FF6600]" />
                  {t('tech_title')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-zinc-300 hover:text-[#FF6600] transition-colors">
                  {t('nav_news')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-300 hover:text-[#FF6600] transition-colors">
                  {t('about_title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6600]">
              {t('nav_contact')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/place/ADN+dental/@36.7386848,3.2706592,17z/data=!3m1!4b1!4m6!3m5!1s0x128e4500012e44f1:0xe9b6cfc2cf87b765!8m2!3d36.7386805!4d3.2732341!16s%2Fg%2F11z01rfjns" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#FF6600] transition-colors"
                >
                  {t('address_val')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF6600] shrink-0" />
                <div className="text-zinc-300">
                  <span className="text-xs text-zinc-500 block uppercase font-mono">Sales & Support</span>
                  <a href="tel:+213698094000" className="hover:text-[#FF6600] font-bold">+213 698 09 40 00</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF6600] shrink-0" />
                <a href="mailto:contact@adn-dental.dz" className="text-zinc-300 hover:text-[#FF6600] font-bold">
                  contact@adn-dental.dz
                </a>
              </li>
              <li className="pt-2">
                <a 
                  href="https://www.facebook.com/profile.php?id=61588218131999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 text-xs font-bold transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Follow on Facebook</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} ADN DENTAL. {t('all_rights')}</p>
          <div className="flex items-center gap-6">
            <span>DGSHAPE by Roland Authorized</span>
            <span>•</span>
            <span>Zubler Germany Authorized</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
