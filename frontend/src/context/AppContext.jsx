import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Ask UPSC AI');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedExam, setSelectedExam] = useState('UPSC Prelims');
  const [chatInput, setChatInput] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(!isLoggedIn);
  
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('upsc_notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

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

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      chatHistory, setChatHistory, addChatMessage,
      selectedExam, setSelectedExam,
      chatInput, setChatInput,
      notes, addNote, deleteNote,
      isLoginModalOpen, setIsLoginModalOpen,
      isLoggedIn, setIsLoggedIn
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
