import React, { useState, useRef } from 'react';
import { dummyNews, dailyAnalysis } from '../../data/dummyData';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, Tag, ChevronRight, Share2, Search, Filter, 
  BookOpen, Globe, TrendingUp, Cpu, Leaf, Shield, Landmark, ExternalLink, X, Plus, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DailyNews = () => {
  const { addNote } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isChangingDate, setIsChangingDate] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [noteAdded, setNoteAdded] = useState(false);

  // Generate last 5 days for the dropdown
  const last5Days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  });

  const handleAddNote = () => {
    if (selectedArticle) {
      const noteContent = `UPSC Update (${selectedArticle.tag}): ${selectedArticle.title}\n\nSummary: ${selectedArticle.summary}`;
      addNote(noteContent);
      setNoteAdded(true);
      setTimeout(() => setNoteAdded(false), 2000);
    }
  };

  // Helper to format date for display
  const formatDateForDisplay = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (dateStr === today) return "Today";
    if (dateStr === yesterday) return "Yesterday";
    
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-GB', options);
  };

  const filteredNews = dummyNews.filter(news => news.date === selectedDate);
  const currentAnalysis = dailyAnalysis[selectedDate];

  const handleDateChange = (e) => {
    setIsChangingDate(true);
    setSelectedDate(e.target.value);
    setTimeout(() => setIsChangingDate(false), 600);
  };

  const categoryIcons = {
    polity_governance: <Landmark size={20} className="text-orange-500" />,
    international_relations: <Globe size={20} className="text-blue-500" />,
    economy: <TrendingUp size={20} className="text-green-500" />,
    science_technology: <Cpu size={20} className="text-purple-500" />,
    environment_ecology: <Leaf size={20} className="text-emerald-500" />,
    defense_security: <Shield size={20} className="text-red-500" />,
    government_schemes: <BookOpen size={20} className="text-indigo-500" />
  };

  const categoryLabels = {
    polity_governance: "Polity & Governance",
    international_relations: "International Relations",
    economy: "Economy",
    science_technology: "Science & Technology",
    environment_ecology: "Environment & Ecology",
    defense_security: "Defense & Security",
    government_schemes: "Govt. Schemes & Policies"
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-20">
      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-upsc-navy/60 backdrop-blur-md" 
              onClick={() => setSelectedArticle(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="bg-white w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative z-10 border border-white/20"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all z-20 active:scale-90"
              >
                <X size={18} className="text-gray-600" />
              </button>
              
              <div className="overflow-y-auto custom-scrollbar p-6 md:p-14">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <span className={`px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest
                    ${selectedArticle.tag === 'Polity' ? 'bg-orange-100 text-orange-600' : 
                      selectedArticle.tag === 'Economy' ? 'bg-green-100 text-green-600' : 
                      selectedArticle.tag === 'International' || selectedArticle.tag === 'IR' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {selectedArticle.tag}
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold text-[var(--text-muted)] uppercase flex items-center gap-1">
                    <Calendar size={10} /> {selectedArticle.date}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-4xl font-black text-upsc-navy mb-6 md:mb-8 leading-tight">
                  {selectedArticle.title}
                </h2>
                
                <div className="prose prose-slate max-w-none">
                  <div className="text-base md:text-lg text-upsc-navy font-semibold mb-6 md:mb-8 leading-relaxed border-l-4 border-upsc-gold pl-4 md:pl-6 py-2 md:py-3 bg-upsc-gold/5 rounded-r-2xl">
                    {selectedArticle.summary}
                  </div>
                  
                  <div className="text-[var(--text-main)] text-sm md:text-lg leading-relaxed space-y-4 md:space-y-6 opacity-90">
                    {selectedArticle.content ? (
                      selectedArticle.content.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))
                    ) : (
                      <>
                        <p>Detailed analysis for this topic is being compiled by our experts. This section will cover the historical background, constitutional provisions, current implications, and potential questions for Prelims and Mains.</p>
                        <p>The significance of this development lies in its long-term impact on the Indian socio-political landscape. Aspirants should focus on linking this news with static portions of the GS Syllabus.</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleAddNote}
                    className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg
                      ${noteAdded ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-upsc-navy text-white shadow-upsc-navy/20 hover:opacity-90'}`}
                  >
                    {noteAdded ? (
                      <><Check size={18} /> Added to Notes</>
                    ) : (
                      <><Plus size={18} /> Add to Notes</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-upsc-navy">Daily UPSC Bits</h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] mt-1">Crucial news simplified for your examination.</p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 bg-white p-1.5 md:p-2 rounded-xl md:rounded-2xl border border-[var(--border-color)] shadow-sm self-start sm:self-auto">
          <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 border-r border-[var(--border-color)]">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Edition:</span>
            <span className="text-xs md:text-sm font-bold text-upsc-navy">{formatDateForDisplay(selectedDate)}</span>
          </div>
          
          <div className="relative flex items-center px-1 md:px-2">
            <select 
              value={selectedDate}
              onChange={handleDateChange}
              className="appearance-none bg-transparent text-[10px] md:text-xs font-bold text-upsc-gold outline-none cursor-pointer pr-5 md:pr-6 py-1"
            >
              {last5Days.map(date => (
                <option key={date} value={date} className="text-upsc-navy bg-white">
                  {formatDateForDisplay(date)} ({new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })})
                </option>
              ))}
            </select>
            <ChevronRight size={12} className="text-upsc-gold absolute right-0 pointer-events-none rotate-90" />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isChangingDate ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-upsc-navy/10 border-t-upsc-navy rounded-full animate-spin mb-4" />
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium">Fetching news...</p>
          </motion.div>
        ) : (currentAnalysis || filteredNews.length > 0) ? (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 md:gap-12"
          >
            {/* Structured Daily Analysis */}
            {currentAnalysis && (
              <div className="flex flex-col gap-6 md:gap-8">
                {/* Overview Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-upsc-navy to-[#1a2b4b] text-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full -mr-10 -mt-10 md:-mr-20 md:-mt-20 blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <div className="w-6 h-1 bg-upsc-gold rounded-full" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-upsc-gold/80">Daily Overview</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{currentAnalysis.title}</h3>
                    <p className="text-white/80 leading-relaxed text-xs md:text-base opacity-90">
                      {currentAnalysis.overview}
                    </p>
                    <div className="mt-4 md:mt-6 flex items-center gap-4">
                       <a href={currentAnalysis.source} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[10px] font-bold text-upsc-gold hover:underline">
                         Source: The Hindu <ExternalLink size={10} />
                       </a>
                    </div>
                  </div>
                </motion.div>

                {/* Categorized Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {Object.entries(currentAnalysis.categories).map(([key, points], idx) => (
                    points.length > 0 && (
                      <motion.div 
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white border border-[var(--border-color)] rounded-2xl md:rounded-3xl p-5 md:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-50">
                          <div className="p-1.5 md:p-2 bg-gray-50 rounded-lg">
                            {categoryIcons[key]}
                          </div>
                          <h4 className="text-sm md:text-base font-bold text-upsc-navy">{categoryLabels[key]}</h4>
                        </div>
                        <ul className="space-y-2 md:space-y-3">
                          {points.map((point, pIdx) => (
                            <li key={pIdx} className="flex gap-2 text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                              <span className="w-1.5 h-1.5 bg-upsc-gold rounded-full mt-1.5 shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Individual News Cards */}
            {filteredNews.length > 0 && (
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex items-center gap-4 mb-1 md:mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-upsc-navy">In-Depth Analysis</h3>
                  <div className="h-px flex-1 bg-[var(--border-color)]" />
                </div>
                <div className="grid gap-4 md:gap-6">
                  {filteredNews.map((news, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={news.id}
                      onClick={() => setSelectedArticle(news)}
                      className="bg-white border border-[var(--border-color)] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row group cursor-pointer shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="w-full md:w-40 bg-upsc-navy/5 flex items-center justify-center p-4 md:p-6 group-hover:bg-upsc-navy/10 transition-colors">
                        <Tag size={24} className="text-upsc-navy opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all" />
                      </div>
                      <div className="p-5 md:p-6 flex-1">
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest
                            ${news.tag === 'Polity' ? 'bg-orange-100 text-orange-600' : 
                              news.tag === 'Economy' ? 'bg-green-100 text-green-600' : 
                              news.tag === 'International' || news.tag === 'IR' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                          >
                            {news.tag}
                          </span>
                          <span className="text-[8px] md:text-[9px] font-bold text-[var(--text-muted)] uppercase flex items-center gap-1">
                            <Calendar size={10} /> {news.date}
                          </span>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-upsc-navy mb-2 group-hover:text-upsc-gold transition-colors leading-tight">{news.title}</h3>
                        <p className="text-[var(--text-muted)] text-[10px] md:text-xs leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">{news.summary}</p>
                        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-[var(--border-color)]">
                          <div className="flex items-center gap-3">
                            <button className="text-[10px] md:text-xs font-bold text-upsc-gold flex items-center gap-1 hover:gap-2 transition-all">
                              Full Analysis <ChevronRight size={12} />
                            </button>
                            {news.url && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(news.url, '_blank');
                                }}
                                className="p-1 md:p-1.5 bg-gray-50 text-[var(--text-muted)] hover:text-upsc-navy hover:bg-gray-100 rounded-lg transition-all flex items-center gap-1"
                                title="View Original Source"
                              >
                                <ExternalLink size={12} />
                                <span className="text-[8px] md:text-[10px] font-bold">Source</span>
                              </button>
                            )}
                          </div>
                          <div className="flex gap-3 text-[var(--text-muted)]">
                            <Share2 size={14} className="hover:text-upsc-navy transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--bg-card)] rounded-[40px] p-16 text-center border-2 border-dashed border-[var(--border-color)]"
          >
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search size={40} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-2xl font-bold text-upsc-navy mb-2">No updates for this date</h3>
            <p className="text-[var(--text-muted)] max-w-md mx-auto mb-8">
              We haven't archived any UPSC-specific bits for {formatDateForDisplay(selectedDate)} yet. Try checking a different date or the current highlights.
            </p>
            <button 
              onClick={() => {
                setSelectedDate("2026-05-05");
                setIsChangingDate(true);
                setTimeout(() => setIsChangingDate(false), 600);
              }}
              className="px-8 py-3 bg-upsc-navy text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-upsc-navy/10"
            >
              Show Latest Updates
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyNews;
