import React, { useState, useEffect } from 'react';
import { dummyNews, dailyAnalysis } from '../../data/dummyData';
import { useApp } from '../../context/AppContext';
import { Calendar, ChevronRight, Search, BookOpen, Globe, TrendingUp, Cpu, Leaf, Shield, Landmark, ExternalLink, X, Plus, Check, Star, Zap, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { key: 'all', label: 'All Topics', icon: null },
  { key: 'Polity', label: 'Polity', icon: <Landmark size={14} />, color: 'orange' },
  { key: 'Economy', label: 'Economy', icon: <TrendingUp size={14} />, color: 'green' },
  { key: 'International', label: 'International', icon: <Globe size={14} />, color: 'blue' },
  { key: 'Science', label: 'Science & Tech', icon: <Cpu size={14} />, color: 'purple' },
  { key: 'Environment', label: 'Environment', icon: <Leaf size={14} />, color: 'emerald' },
  { key: 'Defense', label: 'Defense', icon: <Shield size={14} />, color: 'red' },
  { key: 'Schemes', label: 'Schemes', icon: <BookOpen size={14} />, color: 'indigo' },
];

const CAT_ICONS = {
  polity_governance: <Landmark size={18} className="text-orange-500" />,
  international_relations: <Globe size={18} className="text-blue-500" />,
  economy: <TrendingUp size={18} className="text-green-500" />,
  science_technology: <Cpu size={18} className="text-purple-500" />,
  environment_ecology: <Leaf size={18} className="text-emerald-500" />,
  defense_security: <Shield size={18} className="text-red-500" />,
  government_schemes: <BookOpen size={18} className="text-indigo-500" />,
};

const CAT_LABELS = {
  polity_governance: 'Polity & Governance',
  international_relations: 'International Relations',
  economy: 'Economy',
  science_technology: 'Science & Technology',
  environment_ecology: 'Environment & Ecology',
  defense_security: 'Defense & Security',
  government_schemes: 'Govt. Schemes & Policies',
};

const TAG_STYLE = {
  Polity: 'bg-orange-100 text-orange-600',
  Economy: 'bg-green-100 text-green-600',
  International: 'bg-blue-100 text-blue-600',
  IR: 'bg-blue-100 text-blue-600',
  Science: 'bg-purple-100 text-purple-600',
  Environment: 'bg-emerald-100 text-emerald-600',
  Defense: 'bg-red-100 text-red-600',
  Schemes: 'bg-indigo-100 text-indigo-600',
};

const PRIORITY_STYLE = {
  high: 'bg-red-500 text-white',
  medium: 'bg-amber-400 text-white',
  low: 'bg-gray-300 text-gray-600',
};

function getLast5Days() {
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  });
}

function fmtDate(dateStr) {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// ── Article Detail Modal ─────────────────────────────────────────────────────
function ArticleModal({ article, onClose }) {
  const { addNote } = useApp();
  const [noted, setNoted] = useState(false);

  const handleNote = () => {
    addNote(`[${article.tag}] ${article.title}\n\nSummary: ${article.summary}`);
    setNoted(true);
    setTimeout(() => setNoted(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.93, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93, y: 30 }}
        className="relative z-10 bg-white w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0f2242] to-[#1a3a6b] p-6 md:p-8 text-white flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
            <X size={16} />
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${TAG_STYLE[article.tag] || 'bg-gray-100 text-gray-600'}`}>
              {article.tag}
            </span>
            {article.isImportant && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-400 text-white rounded-full text-[10px] font-bold uppercase">
                <Star size={10} /> Important
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${PRIORITY_STYLE[article.priority]}`}>
              {article.priority} priority
            </span>
            <span className="text-white/60 text-[10px] flex items-center gap-1">
              <Calendar size={10} /> {article.date}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black leading-tight">{article.title}</h2>
          <div className="mt-2 text-white/60 text-xs">Source: {article.source}</div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-6">

          {/* Summary */}
          <div className="border-l-4 border-amber-400 pl-4 bg-amber-50 py-3 rounded-r-xl">
            <div className="text-[10px] font-bold uppercase text-amber-600 mb-1 tracking-widest">Summary</div>
            <p className="text-sm text-gray-700 leading-relaxed">{article.summary}</p>
          </div>

          {/* Key Points */}
          {article.keyPoints?.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase text-[#0f2242] tracking-widest mb-2">Key Points</div>
              <ul className="space-y-2">
                {article.keyPoints.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Why Important */}
          {article.whyImportant && (
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-[11px] font-bold uppercase text-blue-600 tracking-widest mb-1.5">
                <Zap size={12} className="inline mr-1" />Why This Matters for UPSC
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{article.whyImportant}</p>
            </div>
          )}

          {/* Syllabus Links */}
          {article.syllabusLinks?.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase text-[#0f2242] tracking-widest mb-2">Syllabus Linkage</div>
              <div className="flex flex-wrap gap-2">
                {article.syllabusLinks.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-[#0f2242]/5 text-[#0f2242] rounded-full text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Prelims Qs */}
          {article.prelimsQuestions?.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase text-orange-600 tracking-widest mb-2">Possible Prelims Questions</div>
              <ul className="space-y-2">
                {article.prelimsQuestions.map((q, i) => (
                  <li key={i} className="flex gap-2 text-sm bg-orange-50 rounded-xl px-4 py-2.5 text-gray-700">
                    <span className="font-bold text-orange-500 shrink-0">Q{i + 1}.</span> {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mains Answer */}
          {article.mainsAnswer && (
            <div>
              <div className="text-[11px] font-bold uppercase text-green-700 tracking-widest mb-2">Mains Answer Framework</div>
              <div className="bg-green-50 rounded-2xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line border border-green-100">
                {article.mainsAnswer}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 md:p-6 border-t border-gray-100 flex gap-3">
          <button onClick={handleNote}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${noted ? 'bg-green-500 text-white' : 'bg-[#0f2242] text-white hover:opacity-90'}`}>
            {noted ? <><Check size={16} /> Added!</> : <><Plus size={16} /> Add to Notes</>}
          </button>
          {article.url && (
            <a href={article.url} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border border-gray-200 hover:bg-gray-50 text-gray-600 transition-all">
              <ExternalLink size={14} /> Read Original
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const DailyNews = () => {
  const last5 = getLast5Days();
  const [selectedDate, setSelectedDate] = useState(last5[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const handleDateChange = (date) => {
    setLoading(true);
    setSelectedDate(date);
    setActiveCategory('all');
    setSearchQuery('');
    setTimeout(() => setLoading(false), 500);
  };

  const allForDate = dummyNews.filter(n => n.date === selectedDate);
  const analysis = dailyAnalysis[selectedDate];

  const important = allForDate.filter(n => n.isImportant);

  const filtered = allForDate.filter(n => {
    const matchCat = activeCategory === 'all' || n.tag === activeCategory;
    const matchSearch = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto pb-24">
      <AnimatePresence>{selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}</AnimatePresence>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2242]">Daily News Intelligence</h2>
          <p className="text-xs text-gray-400 mt-0.5">AI-powered current affairs for UPSC preparation</p>
        </div>
        {/* Date Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-2xl text-sm font-bold text-[#0f2242] transition-colors"
          >
            <Calendar size={16} className="text-gray-500" />
            {fmtDate(selectedDate)}
            <ChevronRight size={14} className={`text-gray-500 transition-transform ${isDateDropdownOpen ? 'rotate-[-90deg]' : 'rotate-90'}`} />
          </button>
          
          <AnimatePresence>
            {isDateDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden"
              >
                {last5.map(d => (
                  <button 
                    key={d} 
                    onClick={() => { handleDateChange(d); setIsDateDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-gray-50 transition-colors flex justify-between items-center ${selectedDate === d ? 'text-[#0f2242] bg-gray-50/50' : 'text-gray-500'}`}
                  >
                    {fmtDate(d)}
                    {selectedDate === d && <Check size={14} className="text-amber-500" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text" placeholder="Search news, topics, keywords..."
          value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#0f2242] transition-all shadow-sm"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
            <X size={14} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* ── Category Chips ── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat.key
                ? 'bg-[#0f2242] text-white border-[#0f2242] shadow-md'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}>
            {cat.icon}{cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-[#0f2242]/10 border-t-[#0f2242] rounded-full animate-spin mb-4" />
            <p className="text-sm text-gray-400">Fetching intelligence...</p>
          </motion.div>
        ) : (
          <motion.div key={selectedDate} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* ── Today's Analysis Overview ── */}
            {analysis && !searchQuery && activeCategory === 'all' && (
              <div>
                <motion.div className="bg-gradient-to-br from-[#0f2242] to-[#1e3f7a] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-0.5 bg-amber-400 rounded-full" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Daily Overview — {fmtDate(selectedDate)}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 leading-snug">{analysis.title}</h3>
                    <p className="text-white/75 text-sm leading-relaxed">{analysis.overview}</p>
                    <button onClick={() => setShowAnalysis(v => !v)}
                      className="mt-4 flex items-center gap-1.5 text-amber-400 text-xs font-bold hover:underline">
                      {showAnalysis ? 'Hide' : 'Show'} Category Breakdown <ChevronRight size={12} className={`transition-transform ${showAnalysis ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </motion.div>

                {/* Category Breakdown Grid */}
                {showAnalysis && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {Object.entries(analysis.categories).map(([key, points]) =>
                      points.length > 0 && (
                        <motion.div key={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-gray-50">
                            <div className="p-1.5 bg-gray-50 rounded-lg">{CAT_ICONS[key]}</div>
                            <span className="text-sm font-bold text-[#0f2242]">{CAT_LABELS[key]}</span>
                          </div>
                          <ul className="space-y-2">
                            {points.map((pt, i) => (
                              <li key={i} className="flex gap-2 text-xs text-gray-500 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />{pt}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Most Important Banner ── */}
            {important.length > 0 && !searchQuery && activeCategory === 'all' && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Star size={16} className="text-amber-500" />
                  <h3 className="text-base font-bold text-[#0f2242]">Must-Read Today</h3>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <div className="grid gap-3">
                  {important.map((art, i) => (
                    <motion.div key={art.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedArticle(art)}
                      className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group">
                      <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Star size={18} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${TAG_STYLE[art.tag] || 'bg-gray-100 text-gray-600'}`}>{art.tag}</span>
                          <span className="text-[9px] font-bold text-red-500 uppercase">High Priority</span>
                        </div>
                        <p className="text-sm font-bold text-[#0f2242] leading-tight truncate">{art.title}</p>
                      </div>
                      <ChevronRight size={16} className="text-amber-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── All Articles ── */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Filter size={15} className="text-gray-400" />
                <h3 className="text-base font-bold text-[#0f2242]">
                  {searchQuery ? `Search: "${searchQuery}"` : activeCategory === 'all' ? 'All Articles' : activeCategory}
                </h3>
                <span className="text-xs text-gray-400 font-medium">{filtered.length} items</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <Search size={36} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No articles found</p>
                  <p className="text-gray-400 text-sm mt-1">Try a different date or category</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filtered.map((art, i) => (
                    <motion.div key={art.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      onClick={() => setSelectedArticle(art)}
                      className="bg-white border border-gray-100 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg hover:border-[#0f2242]/20 transition-all">
                      <div className="p-5 md:p-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${TAG_STYLE[art.tag] || 'bg-gray-100 text-gray-600'}`}>
                              {art.tag}
                            </span>
                            {art.isImportant && (
                              <span className="flex items-center gap-0.5 px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full text-[9px] font-bold uppercase">
                                <Star size={8} /> Important
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${PRIORITY_STYLE[art.priority]}`}>
                              {art.priority}
                            </span>
                          </div>
                          <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap shrink-0 flex items-center gap-1">
                            <Calendar size={9} />{art.date}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#0f2242] mb-2 leading-snug group-hover:text-amber-600 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">{art.summary}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-gray-400">{art.source}</span>
                            <button className="text-xs font-bold text-amber-500 flex items-center gap-1 hover:gap-2 transition-all">
                              Full Analysis <ChevronRight size={11} />
                            </button>
                          </div>
                          {art.url && (
                            <button onClick={e => { e.stopPropagation(); window.open(art.url, '_blank'); }}
                              className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-[#0f2242] px-2 py-1 bg-gray-50 rounded-lg transition-all">
                              <ExternalLink size={11} /> Source
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Key points preview */}
                      {art.keyPoints?.length > 0 && (
                        <div className="px-5 md:px-6 pb-4 border-t border-gray-50 pt-3 grid grid-cols-1 gap-1">
                          {art.keyPoints.slice(0, 2).map((kp, ki) => (
                            <div key={ki} className="flex gap-2 text-[11px] text-gray-400">
                              <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />{kp}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyNews;
