import { 
  MessageSquare, Upload, CheckSquare, Newspaper, 
  History, Library, Moon, Sun, Star, LogIn, LayoutDashboard,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Logo from '../Logo';

const Sidebar = () => {
  const { activeTab, setActiveTab, setIsLoginModalOpen, isSidebarCollapsed, setIsSidebarCollapsed, user, logout } = useApp();

  const menuItems = [
    { name: 'Ask UPSC AI', icon: MessageSquare },
    { name: 'MCQ Practice AI', icon: CheckSquare },
    { name: 'Daily News', icon: Newspaper },
  ];

  return (
    <div className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} h-screen flex flex-col bg-[var(--bg-card)] rounded-none border-r border-[var(--border-color)] p-4 sticky top-0 transition-all duration-300 ease-in-out z-50`}>
      {/* Logo Toggle */}
      <div 
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className={`flex items-center gap-3 mb-10 px-2 cursor-pointer hover:opacity-80 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'justify-center'}`}
        title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <Logo showText={false} className={`${isSidebarCollapsed ? 'h-8' : 'h-12'} w-auto transition-all duration-300`} />
        {!isSidebarCollapsed && (
          <div className="flex flex-col fade-in">
            <span className="text-xl font-bold tracking-tight text-upsc-navy">SELVA'S</span>
            <span className="text-xs uppercase tracking-widest text-upsc-gold font-bold">IAS ACADEMY</span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2 mt-4">
        <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4 ${isSidebarCollapsed ? 'text-center' : ''}`}>
          {isSidebarCollapsed ? 'AI' : 'AI Tools'}
        </p>
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`sidebar-item ${activeTab === item.name ? 'active' : ''} ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'}`}
            title={isSidebarCollapsed ? item.name : ''}
          >
            <item.icon size={20} />
            {!isSidebarCollapsed && <span className="font-medium fade-in">{item.name}</span>}
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className={`mt-auto pt-6 border-t border-[var(--border-color)] ${isSidebarCollapsed ? 'px-0' : 'px-2'}`}>
        {user ? (
          <div className="flex flex-col gap-4">
            <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-upsc-gold/20 flex items-center justify-center text-upsc-gold font-bold border border-upsc-gold/30">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-[var(--text-main)] truncate">{user.name}</span>
                  <span className="text-[10px] uppercase tracking-tighter text-upsc-gold font-bold">{user.plan || 'Free'} Plan</span>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg text-[var(--text-muted)] hover:text-upsc-navy hover:bg-black/5 transition-all group ${isSidebarCollapsed ? 'justify-center' : ''}`}
              title={isSidebarCollapsed ? 'Logout' : ''}
            >
              <LogIn size={18} className="group-hover:text-red-600 transition-colors" />
              {!isSidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className={`flex items-center gap-2 py-2 px-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogIn size={18} />
            {!isSidebarCollapsed && <span className="text-sm font-medium">Login</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
