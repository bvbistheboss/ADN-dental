import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaultProduct }) => {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [product, setProduct] = useState(defaultProduct || 'DWX-53DC');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const SALES_NUM = '213555123456';
    const msg = `Quotation Request:\n- Product: ${product}\n- Name: ${name}\n- Phone: ${phone}\n- Wilaya: ${wilaya}\n- Notes: ${notes || 'N/A'}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${SALES_NUM}?text=${encoded}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#09090b] border border-zinc-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-white">
              Request Sent!
            </h3>
            <p className="text-zinc-400 text-sm max-w-xs mx-auto">
              WhatsApp opened with your pre-filled inquiry. Our sales representative in Algiers will reply immediately.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#FF6600] text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>ADN Dental Algeria</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase font-['Space_Grotesk'] tracking-tight mb-2">
              {t('quote_modal_title')}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mb-6">
              {t('quote_modal_sub')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Selected Equipment
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.brand} - {p.name} ({p.categoryLabel})
                    </option>
                  ))}
                  <option value="Multiple Items / Full Laboratory Setup">
                    Full Lab Setup / Multiple Machines
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    {t('form_name')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ahmed Al-Abed"
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
                    placeholder="0550 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  {t('form_wilaya')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Algiers, Oran, Constantine..."
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Additional Details / Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="Inquire about pricing, delivery timeline, financing options..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold uppercase tracking-wider py-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{t('btn_send_whatsapp')}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
