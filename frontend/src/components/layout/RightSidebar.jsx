import React, { useState } from 'react';
import { Plus, Trash2, Edit3, X, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const NotesPanel = () => {
  const { notes, addNote, deleteNote } = useApp();
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (newNote.trim()) {
      addNote(newNote);
      setNewNote('');
      setIsAdding(false);
    }
  };

  return (
    <div className="w-80 h-screen flex flex-col p-6 sticky top-0 border-l border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 text-upsc-navy">
          <FileText className="text-upsc-gold" size={20} />
          Quick Notes
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 bg-upsc-gold/10 text-upsc-gold rounded-lg hover:bg-upsc-gold/20 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-2xl shadow-xl transition-colors"
          >
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Jot down something important..."
              className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none h-24 text-[var(--text-main)] placeholder:text-gray-400"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setIsAdding(false)} className="px-3 py-1 text-xs text-gray-500 hover:bg-black/5 rounded-md">Cancel</button>
              <button onClick={handleAdd} className="px-3 py-1 text-xs bg-upsc-navy text-white rounded-md hover:bg-opacity-90 font-medium">Save Note</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
        {notes.length === 0 && !isAdding && (
          <div className="text-center py-10">
            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-300" />
            </div>
            <p className="text-sm text-[var(--text-muted)]">No notes yet. Start writing ideas for your UPSC prep!</p>
          </div>
        )}
        {notes.map((note) => (
          <motion.div
            layout
            key={note.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-2xl group relative transition-colors"
          >
            <button 
              onClick={() => deleteNote(note.id)}
              className="absolute top-3 right-3 p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
              title="Delete Note"
            >
              <Trash2 size={16} />
            </button>
            <p className="text-sm text-[var(--text-main)] whitespace-pre-wrap leading-relaxed">{note.text}</p>
            <div className="mt-3 text-[10px] text-gray-400 font-medium">Saved on {note.date}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotesPanel;
