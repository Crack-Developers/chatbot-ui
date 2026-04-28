import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, ChevronDown, RefreshCcw, Copy, Check, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = () => {
  const { 
    chatHistory, addChatMessage, 
    selectedExam, setSelectedExam, 
    chatInput, setChatInput,
    addNote
  } = useApp();
  const [input, setInput] = useState(chatInput || '');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (chatInput) setInput(chatInput);
  }, [chatInput]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    addChatMessage(userMessage);
    setInput('');
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: `Regarding "${userMessage.content}", for the ${selectedExam} exam, it's important to understand the core concepts. We analyze this by looking at both historical precedence and current administrative frameworks... (Simulated Response)` 
      };
      addChatMessage(aiResponse);
      setIsTyping(false);
    }, 1500);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddNote = (text) => {
    addNote(text);
    // Could add a toast here
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] m-4 shadow-2xl bg-upsc-card h-full relative overflow-hidden rounded-3xl border border-[var(--border-color)] transition-colors duration-300">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-upsc-card/80 backdrop-blur-md sticky top-0 z-10 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-upsc-gold/10 rounded-xl flex items-center justify-center text-upsc-gold">
            <Sparkles size={20} className="fill-current" />
          </div>
          <div>
            <h2 className="font-bold text-upsc-navy dark:text-white">Ask UPSC AI</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> AI Mentor Online
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-upsc-dark border border-[var(--border-color)] px-4 py-2 rounded-xl text-sm font-medium text-text-main">
            <span className="text-gray-400 text-xs font-bold">Exam:</span>
            <select 
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="bg-transparent border-none focus:ring-0 cursor-pointer text-upsc-navy dark:text-white appearance-none font-bold"
            >
              <option className="bg-upsc-card text-text-main">UPSC Prelims</option>
              <option className="bg-upsc-card text-text-main">UPSC Mains</option>
              <option className="bg-upsc-card text-text-main">TNPSC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-upsc-dark/20 transition-colors duration-300">
        {chatHistory.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-upsc-gold/10 rounded-3xl flex items-center justify-center text-upsc-gold mb-6">
              <Bot size={40} />
            </div>
            <h3 className="text-xl font-bold text-upsc-navy dark:text-white mb-2">How can I help you today?</h3>
            <p className="text-gray-400 text-sm">
              I can help you with Prelims MCQs, Mains Answer Writing, or understanding complex Polity and History topics.
            </p>
          </div>
        )}
        
        {chatHistory.map((msg, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-colors
              ${msg.role === 'user' ? 'bg-upsc-navy text-white' : 'bg-upsc-card border border-[var(--border-color)] text-upsc-gold'}`}
            >
              {msg.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
            </div>
            <div className={`max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed shadow-lg transition-colors relative group
              ${msg.role === 'user' ? 'bg-upsc-navy text-white shadow-upsc-navy/10' : 'bg-upsc-card border border-[var(--border-color)] text-text-main font-medium shadow-sm'}`}
            >
              {msg.content}
              
              {msg.role === 'assistant' && (
                <div className="absolute -bottom-10 right-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleCopy(msg.content, i)}
                    className="p-1.5 bg-upsc-card border border-[var(--border-color)] rounded-lg text-gray-500 hover:text-upsc-gold transition-colors flex items-center gap-1 text-[10px] font-bold"
                  >
                    {copiedId === i ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === i ? 'COPIED' : 'COPY'}
                  </button>
                  <button 
                    onClick={() => handleAddNote(msg.content)}
                    className="p-1.5 bg-upsc-card border border-[var(--border-color)] rounded-lg text-gray-500 hover:text-upsc-gold transition-colors flex items-center gap-1 text-[10px] font-bold"
                  >
                    <Plus size={12} /> ADD NOTE
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-upsc-card border border-[var(--border-color)] text-upsc-gold rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div className="bg-upsc-card border border-[var(--border-color)] p-5 rounded-2xl flex gap-1">
              <span className="w-1.5 h-1.5 bg-upsc-gold/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-upsc-gold/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-upsc-gold/40 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 pt-4 bg-upsc-card/80 backdrop-blur-md border-t border-[var(--border-color)] transition-colors duration-300">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your UPSC doubt..."
            className="w-full pl-6 pr-32 py-5 bg-upsc-dark border border-[var(--border-color)] rounded-2xl shadow-2xl focus:ring-2 focus:ring-upsc-gold/50 focus:border-transparent transition-all text-text-main outline-none placeholder:text-gray-500 font-bold"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-3 top-3 bottom-3 px-6 bg-gradient-to-r from-upsc-navy to-upsc-maroon text-white rounded-xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            Ask Mentor <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
          Empowered by UPSC AI Advanced Models
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
