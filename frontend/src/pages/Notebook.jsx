import React, { useState } from 'react';
import { Settings, Bookmark, Search, Send, Plus, MoreVertical, List, CheckCircle2, XCircle } from 'lucide-react';
import './Notebook.css';

const Notebook = () => {
  const [activeTab, setActiveTab] = useState('Current Page');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Welcome to your UPSC prep notebook. How can I help you today? I can generate interactive Prelims mock questions or explain complex topics.', type: 'text' }
  ]);
  const [inputVal, setInputVal] = useState('');
  
  // State for Mock interactive question
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Notes state
  const [notes, setNotes] = useState([
    { id: 1, text: "The Government of India Act 1919 introduced Dyarchy." },
    { id: 2, text: "Current Affairs: SC ruling on fundamental rights vs directive principles." }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    // Add user message
    const newMsgs = [...messages, { role: 'user', content: inputVal, type: 'text' }];
    setMessages(newMsgs);
    
    // Simulate AI response based on keyword triggering interactive prelimes UI
    setTimeout(() => {
      if (inputVal.toLowerCase().includes('generate') || inputVal.toLowerCase().includes('prelims')) {
        setMessages([...newMsgs, { 
          role: 'ai', 
          type: 'mcq',
          question: 'Consider the following statements regarding the Government of India Act, 1935:\n1. It provided for the establishment of an All-India Federation.\n2. It abolished dyarchy in the provinces and introduced provincial autonomy.\n\nWhich of the statements given above is/are correct?',
          options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
          correct: 'Both 1 and 2',
          explanation: 'The GOI Act 1935 proposed an All India federation, and abolished dyarchy in provinces bringing provincial autonomy.'
        }]);
      } else {
         setMessages([...newMsgs, { role: 'ai', content: `Here is some information about ${inputVal}. Use the notes panel to save important points!`, type: 'text' }]);
      }
    }, 1000);
    
    setInputVal('');
  };

  const handleMCQSubmit = (msgIndex) => {
    setIsSubmitted(true);
  };

  return (
    <div className="notebook-container">
      {/* LEFT SIDEBAR */}
      <div className="sidebar glass-panel">
        <div className="sidebar-header">
           <h2>UPSC AI</h2>
        </div>
        
        <button className="new-chat-btn">
          <Plus size={18} /> New Session
        </button>

        <div className="sidebar-nav">
          <p className="nav-label">VIEWS</p>
          <div 
            className={`nav-item ${activeTab === 'Current Page' ? 'active' : ''}`}
            onClick={() => setActiveTab('Current Page')}
          >
            <List size={18} /> Current Page
          </div>
          <div 
            className={`nav-item ${activeTab === 'Current Affairs' ? 'active' : ''}`}
            onClick={() => setActiveTab('Current Affairs')}
          >
            <Bookmark size={18} /> Current Affairs
          </div>
        </div>

        <div className="sidebar-bottom">
           <div className="nav-item">
             <Settings size={18} /> Settings
           </div>
        </div>
      </div>

      {/* CENTER PANE - CHAT / CONTENT */}
      <div className="center-pane">
        <div className="pane-header">
           <h3>{activeTab}</h3>
           <button className="btn-icon"><MoreVertical size={20}/></button>
        </div>

        <div className="chat-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-bubble ${msg.role}`}>
              {msg.type === 'text' ? (
                <div className="msg-content">{msg.content}</div>
              ) : (
                <div className="interactive-question">
                  <div className="question-text">{msg.question}</div>
                  <div className="options-container">
                    {msg.options.map((opt, oIdx) => {
                      let optionClass = 'mcq-option';
                      if (isSubmitted) {
                         if (opt === msg.correct) optionClass += ' correct';
                         else if (selectedOption === opt) optionClass += ' incorrect';
                      } else if (selectedOption === opt) {
                         optionClass += ' selected';
                      }
                      
                      return (
                        <div 
                          key={oIdx} 
                          className={optionClass}
                          onClick={() => !isSubmitted && setSelectedOption(opt)}
                        >
                          <div className="radio-circle">
                            {(isSubmitted && opt === msg.correct) ? <CheckCircle2 size={16} /> : 
                             (isSubmitted && selectedOption === opt && opt !== msg.correct) ? <XCircle size={16} /> : 
                             (selectedOption === opt ? <div className="radio-dot"/> : null)}
                          </div>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {!isSubmitted ? (
                    <button 
                      className="btn-primary mt-4" 
                      disabled={!selectedOption}
                      onClick={() => handleMCQSubmit(idx)}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="explanation-box fade-in">
                       <h4>Explanation</h4>
                       <p>{msg.explanation}</p>
                       <button className="btn-secondary add-note-btn mt-2" onClick={() => setNotes([...notes, { id: Date.now(), text: msg.explanation }])}>
                          Add to Notes
                       </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <form className="chat-input-container" onSubmit={handleSend}>
           <div className="input-wrapper inner-glass">
             <Search size={20} className="search-icon" />
             <input 
               type="text" 
               placeholder="Ask for notes, past papers, or generate prelims questions..." 
               value={inputVal}
               onChange={(e) => setInputVal(e.target.value)}
             />
             <button type="submit" className="send-btn" disabled={!inputVal.trim()}>
               <Send size={18} />
             </button>
           </div>
        </form>
      </div>

      {/* RIGHT PANE - NOTES */}
      <div className="right-pane glass-panel">
         <div className="pane-header">
           <h3>My Notes</h3>
         </div>
         <div className="notes-list">
            {notes.map(note => (
               <div key={note.id} className="note-card">
                 <p>{note.text}</p>
                 <div className="note-actions">
                    <button className="btn-text" style={{fontSize: '0.8rem'}}>Edit</button>
                 </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Notebook;
