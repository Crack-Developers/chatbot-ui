import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import Dashboard from '../components/dashboard/Dashboard';
import ChatInterface from '../components/tools/ChatInterface';
import MCQPractice from '../components/tools/MCQPractice';
import DailyNews from '../components/tools/DailyNews';
import LoginModal from '../components/auth/LoginModal';
import { useApp } from '../context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

const Home = () => {
  const { activeTab, isLoginModalOpen, setIsLoginModalOpen, setIsLoggedIn } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'Ask UPSC AI':
        return <ChatInterface />;
      case 'MCQ Practice AI':
        return <MCQPractice />;
      case 'Daily News':
        return <DailyNews />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-upsc-dark">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed Right Sidebar (Notes) */}
      <RightSidebar />

      {/* Global Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => {
          setIsLoggedIn(true);
          setIsLoginModalOpen(false);
        }} 
      />
    </div>
  );
};

export default Home;
