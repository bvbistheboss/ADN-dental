import React, { useState } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { QuoteInquiry, InquiryStatus } from '../../types';
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  FileSpreadsheet,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Filter,
  Check
} from 'lucide-react';

const STATUS_COLORS: Record<InquiryStatus, { bg: string; text: string; label: string }> = {
  new: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Nouveau Lead' },
  contacted: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Contacté' },
  quoted: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Devis Envoyé' },
  won: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Vente Conclue' },
  archived: { bg: 'bg-zinc-800', text: 'text-zinc-500', label: 'Archivé' },
};

export const AdminInquiriesTab: React.FC = () => {
  const { inquiries, updateInquiryStatus, updateInquiryNotes, deleteInquiry, clearAllInquiries, exportInquiriesCSV } = useCatalog();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'quote' | 'support_ticket' | 'course_enroll' | 'contact'>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = inquiries.filter((inq) => {
    const q = search.toLowerCase();
    const matchSearch =
      inq.name.toLowerCase().includes(q) ||
      inq.phone.toLowerCase().includes(q) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.wilaya && inq.wilaya.toLowerCase().includes(q)) ||
      (inq.productOrTopic && inq.productOrTopic.toLowerCase().includes(q)) ||
      (inq.notes && inq.notes.toLowerCase().includes(q));

    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchType = typeFilter === 'all' || inq.type === typeFilter;

    return matchSearch && matchStatus && matchType;
  });

  const handleDownloadCSV = () => {
    const csvContent = exportInquiriesCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `adn_dental_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exportation CSV des prospects terminée !');
  };

  const openWhatsAppCustomer = (inq: QuoteInquiry) => {
    let cleanPhone = inq.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '213' + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith('213')) {
      cleanPhone = '213' + cleanPhone;
    }
    const message = `Bonjour Dr / M. ${inq.name},\nADN Dental Alger vous contacte suite à votre demande concernant ${inq.productOrTopic}. Comment pouvons-nous vous assister ?`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[130] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold uppercase flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Total Demandes</span>
          <div className="text-2xl font-black text-white font-['Space_Grotesk']">{inquiries.length}</div>
        </div>
        <div className="bg-zinc-900 border border-emerald-900/50 rounded-3xl p-5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-emerald-400 block mb-1">Nouveaux Prospects</span>
          <div className="text-2xl font-black text-emerald-400 font-['Space_Grotesk']">
            {inquiries.filter((i) => i.status === 'new').length}
          </div>
        </div>
        <div className="bg-zinc-900 border border-purple-900/50 rounded-3xl p-5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-purple-400 block mb-1">Devis en Cours</span>
          <div className="text-2xl font-black text-purple-400 font-['Space_Grotesk']">
            {inquiries.filter((i) => i.status === 'quoted' || i.status === 'contacted').length}
          </div>
        </div>
        <div className="bg-zinc-900 border border-amber-900/50 rounded-3xl p-5 shadow-lg">
          <span className="text-[10px] font-black uppercase text-amber-400 block mb-1">Affaires Conclues</span>
          <div className="text-2xl font-black text-amber-400 font-['Space_Grotesk']">
            {inquiries.filter((i) => i.status === 'won').length}
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher client, téléphone, wilaya, produit..."
              className="w-full bg-black/60 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF6600]"
            />
          </div>

          {/* Export CSV */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCSV}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Exporter Tableur CSV</span>
            </button>

            {inquiries.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Voulez-vous réinitialiser toutes les demandes ?')) {
                    clearAllInquiries();
                    showToast('Toutes les demandes ont été effacées.');
                  }
                }}
                className="text-zinc-500 hover:text-red-400 text-xs px-2"
                title="Vider l'historique"
              >
                Vider
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
          {/* Status filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 mr-1">Statut:</span>
            {[
              { id: 'all', label: 'Tous' },
              { id: 'new', label: 'Nouveau' },
              { id: 'contacted', label: 'Contacté' },
              { id: 'quoted', label: 'Devis Envoyé' },
              { id: 'won', label: 'Conclu' },
              { id: 'archived', label: 'Archivé' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  statusFilter === st.id ? 'bg-[#FF6600] text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-400 font-bold">
            <span className="text-white">{filtered.length}</span> résultat(s)
          </div>
        </div>
      </div>

      {/* Inquiries Cards List */}
      {filtered.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500">
          Aucun prospect ou demande ne correspond à ces critères.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => {
            const statusConfig = STATUS_COLORS[inq.status] || STATUS_COLORS.new;
            const isEditingNote = editingNotesId === inq.id;

            return (
              <div
                key={inq.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl hover:border-zinc-700 transition-all"
              >
                {/* Top Row: Type, Status, Date */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-black text-zinc-300 text-[10px] font-mono px-2.5 py-1 rounded-md border border-zinc-800">
                      {inq.id}
                    </span>
                    <span className="bg-[#FF6600]/15 text-[#FF6600] text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                      {inq.type === 'quote'
                        ? 'Demande de Devis'
                        : inq.type === 'support_ticket'
                        ? 'Support Technique SAV'
                        : inq.type === 'course_enroll'
                        ? 'Formation Academy'
                        : 'Contact Général'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-zinc-400 text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{inq.date || new Date(inq.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>

                    {/* Status Dropdown */}
                    <select
                      value={inq.status}
                      onChange={(e) => {
                        updateInquiryStatus(inq.id, e.target.value as InquiryStatus);
                        showToast(`Statut mis à jour : ${e.target.value}`);
                      }}
                      className={`${statusConfig.bg} ${statusConfig.text} font-bold text-xs px-3 py-1 rounded-xl border border-white/10 focus:outline-none cursor-pointer`}
                    >
                      <option value="new">Nouveau Lead</option>
                      <option value="contacted">Contacté</option>
                      <option value="quoted">Devis Envoyé</option>
                      <option value="won">Affaire Conclue</option>
                      <option value="archived">Archivé</option>
                    </select>

                    <button
                      onClick={() => {
                        deleteInquiry(inq.id);
                        showToast('Demande supprimée');
                      }}
                      className="text-zinc-500 hover:text-red-400 p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Client Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="text-xs text-zinc-500 uppercase font-black">Praticien / Laboratoire</div>
                    <div className="text-base font-bold text-white">{inq.name}</div>
                    {inq.wilaya && (
                      <div className="text-xs text-zinc-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF6600]" />
                        <span>{inq.wilaya}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-zinc-500 uppercase font-black">Coordonnées</div>
                    <div className="text-sm font-mono text-zinc-200">{inq.phone}</div>
                    {inq.email && <div className="text-xs text-zinc-400">{inq.email}</div>}
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-zinc-500 uppercase font-black">Équipement / Objet</div>
                    <div className="text-sm font-bold text-[#FF6600]">{inq.productOrTopic}</div>
                  </div>
                </div>

                {/* Customer Message / Notes */}
                {inq.notes && (
                  <div className="bg-black/50 border border-zinc-800/80 rounded-2xl p-3.5 text-xs text-zinc-300">
                    <span className="text-[10px] uppercase font-black text-zinc-500 block mb-1">Message Client :</span>
                    <p className="whitespace-pre-line leading-relaxed">{inq.notes}</p>
                  </div>
                )}

                {/* Staff Internal Note / Follow-up */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-amber-400/90 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>Note Interne ADN (Visible uniquement par l'équipe) :</span>
                    </span>
                    {!isEditingNote && (
                      <button
                        onClick={() => {
                          setEditingNotesId(inq.id);
                          setNoteText(inq.adminNotes || '');
                        }}
                        className="text-[11px] text-[#FF6600] font-bold hover:underline"
                      >
                        {inq.adminNotes ? 'Modifier Note' : '+ Ajouter Note'}
                      </button>
                    )}
                  </div>

                  {isEditingNote ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="ex. Devis envoyé par WhatsApp, rappel convenu pour samedi matin..."
                        className="w-full bg-black border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6600]"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={() => {
                            updateInquiryNotes(inq.id, noteText);
                            setEditingNotesId(null);
                            showToast('Note interne enregistrée.');
                          }}
                          className="bg-[#FF6600] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Enregistrer Note
                        </button>
                      </div>
                    </div>
                  ) : inq.adminNotes ? (
                    <p className="text-xs text-zinc-300 italic">{inq.adminNotes}</p>
                  ) : (
                    <p className="text-xs text-zinc-600">Aucune note interne enregistrée pour le moment.</p>
                  )}
                </div>

                {/* Quick Action Contacts Bar */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <a
                    href={`tel:${inq.phone.replace(/[^0-9+]/g, '')}`}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Appeler</span>
                  </a>

                  <button
                    onClick={() => openWhatsAppCustomer(inq)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-900/20 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
