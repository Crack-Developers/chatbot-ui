import React from 'react';
import { MessageSquare, CheckSquare, Newspaper, FileText, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const BottomNavigation = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs = [
    { name: 'Ask UPSC AI', icon: MessageSquare, label: 'Chat' },
    { name: 'MCQ Practice AI', icon: CheckSquare, label: 'MCQ' },
    { name: 'Daily News', icon: Newspaper, label: 'News' },
    { name: 'Quick Notes', icon: FileText, label: 'Notes' },
    { name: 'Profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-6 py-3 flex justify-between items-center z-[100] md:hidden rounded-t-[32px] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              isActive ? 'scale-110' : 'opacity-60 grayscale'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-br from-upsc-navy to-upsc-maroon text-white shadow-lg shadow-upsc-navy/20' 
                : 'text-slate-600'
            }`}>
              <tab.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              isActive ? 'text-upsc-navy' : 'text-slate-500'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
