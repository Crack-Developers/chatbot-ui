import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, XCircle, RefreshCw, Trophy, BookOpen, Settings, AlertCircle, PlayCircle, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOPICS = {
  'History': ['Ancient India', 'Medieval India', 'Modern History', 'Art & Culture', 'World History'],
  'Anthropology': ['Physical Anthropology', 'Cultural Anthropology', 'Archaeological Anthropology', 'Indian Anthropology']
};

const QUESTION_COUNTS = [5, 10, 20, 50];

const generateQuestions = (subject, topics, count) => {
  const selectedTopics = topics.length > 0 ? topics : TOPICS[subject];
  const qList = [];
  for (let i = 0; i < count; i++) {
    const topic = selectedTopics[i % selectedTopics.length];
    const correctIdx = Math.floor(Math.random() * 4);
    const options = ['A', 'B', 'C', 'D'].map((letter, idx) => {
      if (idx === correctIdx) return `This is the historically and factually accurate statement regarding ${topic}.`;
      return `This is a common misconception or incorrect distracter about ${topic} (${letter}).`;
    });

    qList.push({
      id: i,
      question: `Consider the following statements concerning ${topic} in the context of UPSC ${subject}. Which one is correct?`,
      options,
      correct: correctIdx,
      explanation: `The correct answer is Option ${String.fromCharCode(65 + correctIdx)}. Understanding ${topic} is crucial for the ${subject} syllabus. The other options contain deliberate factual inaccuracies typical of UPSC trick questions.`
    });
  }
  return qList; // Shuffle might be nice but this is fine for dummy
};

const MCQPractice = () => {
  const [phase, setPhase] = useState('setup'); // 'setup', 'quiz', 'result'
  
  // Setup State
  const [subject, setSubject] = useState('History');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  
  // Quiz State
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { qIndex: selectedOptionIdx }
  const [currentIdx, setCurrentIdx] = useState(0);

  // Result State
  const [expandedExplanations, setExpandedExplanations] = useState({});

  // Reset topics when subject changes
  useEffect(() => {
    setSelectedTopics([]);
  }, [subject]);

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleStart = () => {
    const generated = generateQuestions(subject, selectedTopics, numQuestions);
    setQuestions(generated);
    setAnswers({});
    setCurrentIdx(0);
    setPhase('quiz');
    setExpandedExplanations({});
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    return correct;
  };

  const toggleExplanation = (idx) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  if (phase === 'setup') {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto pb-32 md:pb-20">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-[var(--text-main)] flex items-center gap-3 mb-2">
            <Settings className="text-upsc-gold" /> Practice Setup
          </h2>
          <p className="text-[var(--text-muted)]">Configure your AI-generated MCQ session based on the latest UPSC pattern.</p>
        </div>

        <div className="space-y-8 bg-[var(--bg-card)] p-8 rounded-3xl border border-[var(--border-color)] shadow-xl">
          {/* Subject Selection */}
          <div>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-500" /> Select Subject
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(TOPICS).map(sub => (
                <button
                  key={sub}
                  onClick={() => setSubject(sub)}
                  className={`p-4 rounded-2xl border-2 font-bold text-lg transition-all ${
                    subject === sub 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
                      : 'border-gray-100 bg-gray-50 text-[var(--text-muted)] hover:border-gray-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
              <Filter size={18} className="text-green-600" /> Filter Topics
              <span className="text-xs font-normal text-[var(--text-muted)] bg-gray-100 px-2 py-1 rounded-md ml-2">Optional</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {TOPICS[subject].map(topic => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-4 py-2 rounded-xl border font-medium text-sm transition-all ${
                      isSelected
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-100 bg-gray-50 text-[var(--text-muted)] hover:border-gray-200'
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number of Questions */}
          <div>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-upsc-gold" /> Number of Questions
            </h3>
            <div className="flex gap-4">
              {QUESTION_COUNTS.map(num => (
                <button
                  key={num}
                  onClick={() => setNumQuestions(num)}
                  className={`w-16 h-16 rounded-2xl border-2 font-bold text-xl transition-all flex items-center justify-center ${
                    numQuestions === num
                      ? 'border-upsc-gold bg-upsc-gold/5 text-upsc-gold shadow-md'
                      : 'border-gray-100 bg-gray-50 text-[var(--text-muted)] hover:border-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-6 border-t border-gray-100 mt-8">
            <button 
              onClick={handleStart}
              className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-5 rounded-2xl transition-colors text-lg shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3"
            >
              <PlayCircle size={24} /> Start Practice Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'quiz') {
    const currentQuestion = questions[currentIdx];
    const isAnswered = answers[currentIdx] !== undefined;

    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto pb-32 md:pb-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-black text-[var(--text-main)]">MCQ Practice</h2>
            <p className="text-sm text-[var(--text-muted)]">{subject} • {selectedTopics.length > 0 ? selectedTopics.join(', ') : 'All Topics'}</p>
          </div>
          <div className="px-6 py-2 bg-upsc-gold/10 text-upsc-gold rounded-full font-bold text-sm border border-upsc-gold/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-upsc-gold animate-pulse" />
            Question {currentIdx + 1} of {questions.length}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-10 rounded-3xl shadow-xl transition-colors">
          <h3 className="text-xl font-bold text-[var(--text-main)] mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4 mb-10">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentIdx] === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [currentIdx]: idx })}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center group
                    ${isSelected 
                      ? 'border-upsc-gold bg-upsc-gold/5' 
                      : 'border-gray-100 bg-gray-50 hover:border-upsc-gold/30'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors
                      ${isSelected ? 'bg-upsc-gold text-white' : 'bg-gray-200 text-gray-500 group-hover:text-upsc-gold'}`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`font-semibold ${isSelected ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>{option}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-white/5">
            <button 
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-6 py-3 rounded-xl border border-gray-100 text-[var(--text-muted)] font-bold hover:bg-gray-50 disabled:opacity-30 flex items-center gap-2 transition-colors"
            >
              <ChevronLeft size={18} /> Previous
            </button>

            {currentIdx === questions.length - 1 ? (
              <button 
                onClick={() => setPhase('result')}
                disabled={Object.keys(answers).length < questions.length}
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                Submit Attempt <CheckCircle2 size={18} />
              </button>
            ) : (
              <button 
                onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                className="bg-[#2563EB] hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                Next <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="p-8 max-w-4xl mx-auto pb-20">
        {/* Score Summary */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-10 rounded-3xl shadow-xl mb-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-upsc-gold/10 rounded-full flex items-center justify-center text-upsc-gold mb-6 relative">
            <Trophy size={48} />
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="transparent" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
              <circle cx="50" cy="50" r="46" fill="transparent" stroke="#D4AF37" strokeWidth="8" strokeDasharray="289" strokeDashoffset={289 - (289 * percentage) / 100} className="transition-all duration-1000" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-[var(--text-main)] mb-2">Evaluation Complete</h2>
          <p className="text-[var(--text-muted)] mb-8 font-medium">Here is your performance breakdown for {subject}</p>
          
          <div className="flex gap-12 w-full justify-center px-10">
            <div className="text-center">
              <p className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Score</p>
              <p className="text-4xl font-black text-[var(--text-main)]">{percentage}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Correct</p>
              <p className="text-4xl font-black text-green-500">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Incorrect</p>
              <p className="text-4xl font-black text-red-500">{questions.length - score}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => setPhase('setup')}
            className="px-8 py-4 bg-white border border-gray-100 hover:border-gray-200 text-[var(--text-main)] rounded-2xl font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Settings size={18} /> New Configuration
          </button>
          <button 
            onClick={() => {
              setAnswers({});
              setCurrentIdx(0);
              setPhase('quiz');
              setExpandedExplanations({});
            }}
            className="px-8 py-4 bg-[#2563EB] hover:bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
          >
            <RefreshCw size={18} /> Retry Incorrect
          </button>
        </div>

        {/* Answer Review */}
        <h3 className="text-2xl font-black text-[var(--text-main)] mb-6 border-b border-gray-100 pb-4">Detailed Review</h3>
        <div className="space-y-6">
          {questions.map((q, qIdx) => {
            const userAnswer = answers[qIdx];
            const isCorrect = userAnswer === q.correct;
            const isExpanded = expandedExplanations[qIdx];

            return (
              <div key={q.id} className={`bg-[var(--bg-card)] border rounded-3xl p-8 shadow-sm transition-colors ${isCorrect ? 'border-green-500/20' : 'border-red-500/20'}`}>
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-lg font-bold text-[var(--text-main)] leading-relaxed flex-1 pr-4">
                    <span className="text-[var(--text-muted)] mr-2">Q{qIdx + 1}.</span>{q.question}
                  </h4>
                  {isCorrect ? (
                    <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1"><CheckCircle2 size={14}/> Correct</div>
                  ) : (
                    <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1"><XCircle size={14}/> Incorrect</div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {q.options.map((opt, optIdx) => {
                    let optStyle = 'border-gray-100 bg-gray-50 text-[var(--text-muted)]';
                    let icon = null;

                    if (optIdx === q.correct) {
                      optStyle = 'border-green-500 bg-green-50 text-green-700 font-semibold';
                      icon = <CheckCircle2 className="text-green-500" size={18} />;
                    } else if (optIdx === userAnswer && !isCorrect) {
                      optStyle = 'border-red-500 bg-red-50 text-red-700 font-semibold';
                      icon = <XCircle className="text-red-500" size={18} />;
                    }

                    return (
                      <div key={optIdx} className={`p-4 rounded-xl border flex justify-between items-center ${optStyle}`}>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs bg-gray-200">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {icon}
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={() => toggleExplanation(qIdx)}
                  className="text-sm font-bold text-[#3B82F6] hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  {isExpanded ? 'Hide Explanation' : 'View Explanation'} 
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-50 p-5 rounded-2xl border-l-4 border-blue-500 text-[var(--text-muted)] text-sm leading-relaxed">
                        {q.explanation}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default MCQPractice;
