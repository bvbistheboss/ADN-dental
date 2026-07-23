import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const SALES_NUM = '213698094000';
    const msg = `Inquiry from ${name} (${phone}, ${email}):\n${message}`;
    window.open(`https://wa.me/${SALES_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Showroom & Headquarters • Algiers</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
            {t('contact_title')}
          </h1>
          <p className="text-zinc-600 text-sm">
            {t('contact_sub')}
          </p>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Card Left */}
          <div className="lg:col-span-5 bg-[#09090b] text-white rounded-[36px] p-8 sm:p-10 border border-zinc-800 shadow-xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-white">
                Contact Details
              </h2>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#FF6600] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6600] block">
                      Sales & Support (WhatsApp)
                    </span>
                    <a href="tel:+213698094000" className="text-xl font-bold font-['Space_Grotesk'] hover:text-[#FF6600]">
                      +213 698 09 40 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#FF6600] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6600] block">
                      {t('email_label')}
                    </span>
                    <a href="mailto:contact@adn-dental.dz" className="text-base font-bold hover:text-[#FF6600]">
                      contact@adn-dental.dz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#FF6600] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6600] block">
                      {t('address_label')}
                    </span>
                    <a 
                      href="https://www.google.com/maps/place/ADN+dental/@36.7386848,3.2706592,17z/data=!3m1!4b1!4m6!3m5!1s0x128e4500012e44f1:0xe9b6cfc2cf87b765!8m2!3d36.7386805!4d3.2732341!16s%2Fg%2F11z01rfjns" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-300 font-bold block hover:text-[#FF6600] transition-colors"
                    >
                      {t('address_val')}
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61588218131999" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Visit Facebook Page</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-400 space-y-1">
              <span className="font-bold text-white uppercase block font-['Space_Grotesk']">
                Operating Hours
              </span>
              <span>Saturday – Thursday: 08:30 – 17:30</span>
            </div>
          </div>

          {/* Form / Map Right */}
          <div className="lg:col-span-7 bg-zinc-50 rounded-[36px] p-8 sm:p-10 border border-zinc-200/80 shadow-sm flex flex-col justify-between space-y-8">
            <div>
              <h2 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-zinc-900 mb-6">
                Send Us a Message
              </h2>

              {sent ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <h3 className="text-lg font-bold text-emerald-800 uppercase font-['Space_Grotesk']">
                    Message Dispatched!
                  </h3>
                  <p className="text-xs text-emerald-700">
                    WhatsApp opened with your inquiry details. Our sales representative will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                        {t('form_name')} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Yacine Khelifi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                        {t('form_phone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0555 12 34 56"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                      {t('email_label')}
                    </label>
                    <input
                      type="email"
                      placeholder="lab@example.dz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-[#FF6600]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                      Message / Equipment Inquiry
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we assist your dental laboratory?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-[#FF6600]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF6600] hover:bg-[#ff771c] text-white font-bold uppercase tracking-widest py-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map Frame */}
            <div className="rounded-2xl overflow-hidden border border-zinc-200 h-48 bg-zinc-200">
              <iframe
                title="ADN Dental Location Rouiba Algiers"
                src="https://maps.google.com/maps?q=36.7386805,3.2732341&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
