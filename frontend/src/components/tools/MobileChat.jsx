import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, Paperclip, ChevronDown, Bot, GraduationCap, Globe2, BookOpen, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';
import { dummyQuestions } from '../../data/dummyData';

const MobileChat = () => {
  const { 
    chatHistory, addChatMessage, 
    selectedSubject, setSelectedSubject, 
    chatInput, setChatInput,
    addNote
  } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isTyping]);

  const handleSend = async (text = input) => {
    const messageText = typeof text === 'string' ? text : input;
    if (!messageText.trim()) return;

    const userMessage = { role: 'user', content: messageText };
    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: `Regarding "${messageText}", in the context of ${selectedSubject}, it's important to understand the core concepts. We analyze this by looking at both historical precedence and current administrative frameworks... (Simulated Response)` 
      };
      addChatMessage(aiResponse);
      setIsTyping(false);
    }, 1500);
  };

  const stats = [
    { label: 'Exam', value: 'UPSC 2026', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Lang', value: 'English', icon: Globe2, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Progress', value: '42%', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* Mobile Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <Logo showText={false} className="h-8 w-auto" />
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-upsc-navy leading-none">UPSC AI</h1>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">AI Mentor Online</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-upsc-navy"
          >
            {selectedSubject}
            <ChevronDown size={14} className={`text-upsc-gold transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-[60]" onClick={() => setIsDropdownOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[70] overflow-hidden"
                >
                  {['History', 'Anthropology'].map(sub => (
                    <button 
                      key={sub}
                      onClick={() => { setSelectedSubject(sub); setIsDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-xs font-bold ${selectedSubject === sub ? 'text-upsc-gold bg-slate-50' : 'text-slate-600'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-40 scroll-smooth">
        {chatHistory.length === 0 ? (
          <div className="px-6 py-8">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-upsc-navy mb-2">Hello Aspirant!</h2>
              <p className="text-slate-500 text-sm leading-relaxed">Your AI-powered mentor is ready. What would you like to learn today?</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className={`${stat.bg} rounded-2xl p-3 flex flex-col items-center text-center`}>
                  <stat.icon size={18} className={stat.color} />
                  <p className="text-[9px] font-bold text-slate-400 uppercase mt-2 mb-0.5">{stat.label}</p>
                  <p className="text-[11px] font-black text-upsc-navy">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Suggested Topics</h3>
            <div className="grid gap-3">
              {dummyQuestions.slice(0, 4).map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSend(q.title)}
                  className="bg-white border border-slate-100 p-4 rounded-[20px] text-left flex items-center justify-between group active:scale-[0.98] transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-10 rounded-full ${
                      q.color === 'orange' ? 'bg-upsc-gold' : q.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{q.category}</p>
                      <p className="text-sm font-bold text-upsc-navy leading-tight">{q.title}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {chatHistory.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-upsc-navy text-white' : 'bg-white border border-slate-100 text-upsc-gold shadow-sm'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-upsc-navy text-white shadow-lg shadow-upsc-navy/10' : 'bg-white border border-slate-100 text-slate-700 font-medium shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-white border border-slate-100 text-upsc-gold rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="animate-pulse" />
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-upsc-gold/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-upsc-gold/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-upsc-gold/40 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[88px] left-0 right-0 px-6 pb-4 bg-transparent z-50">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-2 rounded-[28px] shadow-2xl flex items-center gap-2">
          <button className="p-3 text-slate-400 hover:text-upsc-navy transition-colors">
            <Paperclip size={20} />
          </button>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your doubt..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-upsc-navy placeholder:text-slate-400"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-upsc-navy to-upsc-maroon text-white p-3 rounded-[20px] shadow-lg shadow-upsc-navy/20 active:scale-90 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileChat;
