import React, { useState } from 'react';
import { 
  MessageSquare, Upload, CheckSquare, Newspaper, 
  History, Library, Moon, Sun, LayoutDashboard,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../Logo';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Ask UPSC AI', icon: MessageSquare },
    { name: 'MCQ Practice AI', icon: CheckSquare },
    { name: 'Daily News', icon: Newspaper },
  ];

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-72'} h-screen flex flex-col bg-upsc-card rounded-none border-r border-[var(--border-color)] p-4 sticky top-0 transition-all duration-300 relative`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 bg-upsc-card border border-[var(--border-color)] rounded-full p-1.5 text-gray-400 hover:text-white transition-colors z-10 shadow-md"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo */}
      <div className={`flex items-center gap-3 mb-10 px-2 ${isCollapsed ? 'justify-center' : 'justify-center mt-2'}`}>
        <Logo showText={false} className={`${isCollapsed ? 'h-8' : 'h-12'} w-auto transition-all duration-300`} />
        {!isCollapsed && (
          <div className="flex flex-col whitespace-nowrap overflow-hidden transition-all duration-300">
            <span className="text-xl font-bold tracking-tight text-upsc-navy dark:text-white">SELVA'S</span>
            <span className="text-xs uppercase tracking-widest text-upsc-gold font-bold">IAS ACADEMY</span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2 mt-4">
        {!isCollapsed && (
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4 whitespace-nowrap">AI Tools</p>
        )}
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            title={isCollapsed ? item.name : undefined}
            className={`sidebar-item ${activeTab === item.name ? 'active' : ''} ${isCollapsed ? 'justify-center px-0' : ''}`}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap overflow-hidden">{item.name}</span>}
          </div>
        ))}
      </div>


    </div>
  );
};

export default Sidebar;
