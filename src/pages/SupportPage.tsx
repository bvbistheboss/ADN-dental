import React, { useState } from 'react';
import { DOWNLOADS, FAQS } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { Wrench, Download, ChevronDown, CheckCircle2, PhoneCall, Sparkles, Send } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [serial, setSerial] = useState('');
  const [problem, setProblem] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const TECH_NUM = '213666123456';
    const msg = `TECHNICAL SUPPORT TICKET:\n- Name: ${name}\n- Phone: ${phone}\n- Wilaya: ${wilaya}\n- Machine S/N: ${serial || 'N/A'}\n- Description: ${problem}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${TECH_NUM}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
            <Wrench className="w-4 h-4" />
            <span>24/7 Technical Service & Calibration</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
            {t('tech_title')}
          </h1>
          <p className="text-zinc-600 text-sm">
            {t('tech_sub')}
          </p>
        </div>

        {/* Support Ticket Submission Form */}
        <div className="bg-[#09090b] text-white rounded-[36px] p-8 sm:p-12 border border-zinc-800 shadow-xl max-w-3xl mx-auto space-y-8">
          
          <div className="space-y-2 border-b border-zinc-800 pb-6">
            <h2 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-white">
              Submit Technical Ticket
            </h2>
            <p className="text-zinc-400 text-xs">
              Direct connection with our certified engineers in Algiers for hardware troubleshooting, spindle inspection, or software setup.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold uppercase font-['Space_Grotesk']">
                Ticket Sent to Technical Desk
              </h3>
              <p className="text-zinc-300 text-xs max-w-md mx-auto">
                WhatsApp opened with your pre-formatted ticket details. An ADN Dental engineer will join your session shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    {t('form_name')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Karim Amrani"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    {t('form_phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0666 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    {t('form_wilaya')}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Algiers, Oran, Sétif..."
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    {t('form_serial')}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DWX-53DC #10482"
                    value={serial}
                    onChange={(e) => setSerial(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  {t('form_problem')} *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Please describe error codes, spindle sounds, calibration issues, or maintenance requests..."
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6600] hover:bg-[#ff771c] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t('btn_submit')}</span>
              </button>
            </form>
          )}

        </div>

        {/* Software & Drivers Downloads */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs">
              Official Repositories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Space_Grotesk'] text-zinc-900">
              {t('downloads_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOWNLOADS.map((dl) => (
              <div
                key={dl.id}
                className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#FF6600] tracking-wider">
                    <span>{dl.brand}</span>
                    <span>•</span>
                    <span>{dl.category}</span>
                    <span>•</span>
                    <span className="text-zinc-400">{dl.fileSize}</span>
                  </div>
                  <h3 className="text-base font-bold uppercase font-['Space_Grotesk'] text-zinc-900">
                    {dl.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    {dl.description}
                  </p>
                </div>

                <button
                  onClick={() => alert(`Downloading ${dl.title} (${dl.version})...`)}
                  className="p-3 bg-zinc-100 hover:bg-[#FF6600] text-zinc-700 hover:text-white rounded-xl transition-all shrink-0 cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs">
              Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Space_Grotesk'] text-zinc-900">
              {t('faq_title')}
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              const qText = faq.question[language] || faq.question.en;
              const aText = faq.answer[language] || faq.answer.en;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base uppercase font-['Space_Grotesk'] text-zinc-900 hover:text-[#FF6600] transition-colors"
                  >
                    <span>{qText}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#FF6600]' : 'text-zinc-400'}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4">
                      {aText}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
