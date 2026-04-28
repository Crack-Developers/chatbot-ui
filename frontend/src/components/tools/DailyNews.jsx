import React from 'react';
import { dummyNews } from '../../data/dummyData';
import { Calendar, Tag, ChevronRight, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DailyNews = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black text-upsc-navy dark:text-white">Daily UPSC Bits</h2>
          <p className="text-gray-500 dark:text-gray-400">Crucial news simplified for your examination.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-upsc-card p-2 rounded-xl border border-[var(--border-color)] shadow-sm cursor-pointer hover:bg-upsc-navy/10"><Calendar size={20} className="text-upsc-gold" /></div>
        </div>
      </div>

      <div className="grid gap-8">
        {dummyNews.map((news, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={news.id}
            className="bg-upsc-card border border-[var(--border-color)] rounded-3xl overflow-hidden flex flex-col md:flex-row group cursor-pointer shadow-lg transition-colors"
          >
            <div className="w-full md:w-48 bg-upsc-navy/20 flex items-center justify-center p-8 group-hover:bg-upsc-navy/30 transition-colors">
              <Tag size={40} className="text-upsc-gold opacity-50 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-8 flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                  ${news.tag === 'Polity' ? 'bg-upsc-gold/10 text-upsc-gold' : 
                    news.tag === 'Economy' ? 'bg-green-500/10 text-green-500' : 'bg-upsc-navy/30 text-white'}`}
                >
                  {news.tag}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase">{news.date}</span>
              </div>
              <h3 className="text-xl font-bold text-upsc-navy dark:text-white mb-3 group-hover:text-upsc-gold transition-colors">{news.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{news.summary}</p>
              <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)] transition-colors">
                <button className="text-sm font-bold text-upsc-gold flex items-center gap-1 hover:underline">
                  Read Full Analysis <ChevronRight size={16} />
                </button>
                <div className="flex gap-4 text-gray-600">
                  <Share2 size={18} className="hover:text-upsc-gold transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyNews;
