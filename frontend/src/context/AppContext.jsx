import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Ask UPSC AI');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('History');
  const [chatInput, setChatInput] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('upsc_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('upsc_notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('upsc_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('upsc_user');
  };

  useEffect(() => {
    localStorage.setItem('upsc_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (content) => {
    const newNote = {
      id: Date.now(),
      text: content,
      date: new Date().toLocaleDateString()
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const addChatMessage = (message) => {
    setChatHistory(prev => [...prev, message]);
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      chatHistory, setChatHistory, addChatMessage,
      selectedSubject, setSelectedSubject,
      chatInput, setChatInput,
      notes, addNote, deleteNote,
      isLoginModalOpen, setIsLoginModalOpen,
      isSidebarCollapsed, setIsSidebarCollapsed,
      user, setUser, isLoggedIn, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
