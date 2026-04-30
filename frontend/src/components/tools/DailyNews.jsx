import React, { useState, useRef } from 'react';
import { dummyNews } from '../../data/dummyData';
import { Calendar, Tag, ChevronRight, Share2, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DailyNews = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isChangingDate, setIsChangingDate] = useState(false);
  const dateInputRef = useRef(null);

  // Helper to format date for display
  const formatDateForDisplay = (dateStr) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-GB', options);
  };

  // Filter news based on selected date (for demo, we'll show all if the date matches or a subset)
  // In real app, this would be an API call
  const filteredNews = dummyNews.filter(news => {
    // For demo purposes, we'll allow all news to show if it's within April 2026 
    // or just show a "No news" for other dates to demonstrate the feature
    const newsDate = new Date(news.date).toISOString().split('T')[0];
    return newsDate === selectedDate;
  });

  const handleCalendarClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleDateChange = (e) => {
    setIsChangingDate(true);
    setSelectedDate(e.target.value);
    setTimeout(() => setIsChangingDate(false), 600);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-upsc-navy">Daily UPSC Bits</h2>
          <p className="text-[var(--text-muted)] mt-1">Crucial news simplified for your examination.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-[var(--border-color)] shadow-sm">
          <div className="flex items-center gap-2 px-3 border-r border-[var(--border-color)]">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Showing:</span>
            <span className="text-sm font-bold text-upsc-navy">{formatDateForDisplay(selectedDate)}</span>
          </div>
          
          <div className="relative">
            <input 
              ref={dateInputRef}
              type="date" 
              className="absolute opacity-0 pointer-events-none" 
              value={selectedDate}
              onChange={handleDateChange}
            />
            <button 
              onClick={handleCalendarClick}
              className="p-2.5 bg-upsc-gold/10 text-upsc-gold rounded-xl hover:bg-upsc-gold/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <Calendar size={18} />
              <span className="text-xs font-bold">CHANGE DATE</span>
            </button>
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
            <div className="w-12 h-12 border-4 border-upsc-navy/10 border-t-upsc-navy rounded-full animate-spin mb-4" />
            <p className="text-[var(--text-muted)] font-medium">Fetching news for {formatDateForDisplay(selectedDate)}...</p>
          </motion.div>
        ) : filteredNews.length > 0 ? (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8"
          >
            {filteredNews.map((news, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={news.id}
                className="bg-white border border-[var(--border-color)] rounded-3xl overflow-hidden flex flex-col md:flex-row group cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-full md:w-48 bg-upsc-navy/5 flex items-center justify-center p-8 group-hover:bg-upsc-navy/10 transition-colors">
                  <Tag size={40} className="text-upsc-navy opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all" />
                </div>
                <div className="p-8 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                      ${news.tag === 'Polity' ? 'bg-orange-100 text-orange-600' : 
                        news.tag === 'Economy' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}
                    >
                      {news.tag}
                    </span>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase flex items-center gap-1">
                      <Calendar size={12} /> {news.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-upsc-navy mb-3 group-hover:text-upsc-gold transition-colors">{news.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">{news.summary}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
                    <button className="text-sm font-bold text-upsc-gold flex items-center gap-1 hover:gap-2 transition-all">
                      Read Full Analysis <ChevronRight size={16} />
                    </button>
                    <div className="flex gap-4 text-[var(--text-muted)]">
                      <Share2 size={18} className="hover:text-upsc-navy transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                setSelectedDate("2026-04-21");
                setIsChangingDate(true);
                setTimeout(() => setIsChangingDate(false), 600);
              }}
              className="px-8 py-3 bg-upsc-navy text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-upsc-navy/10"
            >
              Show Recent Updates
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyNews;
