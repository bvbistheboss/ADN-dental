import React, { useState } from 'react';
import { MessageSquare, Phone, X, Wrench, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WhatsAppFab: React.FC = () => {
  const [open, setOpen] = useState(false);

  const SALES_NUM = '213698094000';
  const TECH_NUM = '213698094000';

  const handleOpen = (num: string, text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${num}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-3 w-72 bg-[#09090b] border border-zinc-800 rounded-2xl p-4 shadow-2xl text-white space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  ADN Instant WhatsApp
                </span>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Connect directly with our team in Algiers for price quotes, equipment demonstrations, or technical assistance.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleOpen(SALES_NUM, 'Hello ADN Dental, I would like to inquire about equipment and quotations.')}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Sales & Quotations</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">+213 698</span>
              </button>

              <button
                onClick={() => handleOpen(TECH_NUM, 'Hello ADN Dental Support, I need technical assistance with my equipment.')}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-between border border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#FF6600]" />
                  <span>24/7 Tech Assistance</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">+213 698</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-black shadow-[0_10px_25px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
        aria-label="Open WhatsApp Chat"
      >
        {open ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageSquare className="w-6 h-6 text-black fill-black" />
        )}
      </button>
    </div>
  );
};
