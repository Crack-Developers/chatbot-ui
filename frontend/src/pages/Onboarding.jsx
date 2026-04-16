import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, BookOpen, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
import './Onboarding.css';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    language: '',
    exam: '',
    subject: ''
  });
  
  const navigate = useNavigate();

  const handleSelection = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/notebook');
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="page-container onboarding-page">
      <div className="onboarding-box glass-panel">
        
        {/* Progress header */}
        <div className="onboarding-progress">
          <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}></div>
          <div className="progress-line"></div>
          <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}></div>
          <div className="progress-line"></div>
          <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}></div>
        </div>

        {step === 1 && (
          <div className="step-content fade-in">
            <Languages size={40} className="step-icon" />
            <h2>Choose your Language</h2>
            <p className="step-desc">Select the language for your UI and materials.</p>
            
            <div className="card-grid">
              <div 
                className={`choice-card ${preferences.language === 'English' ? 'selected' : ''}`}
                onClick={() => handleSelection('language', 'English')}
              >
                <h3>English</h3>
              </div>
              <div 
                className={`choice-card ${preferences.language === 'Tamil' ? 'selected' : ''}`}
                onClick={() => handleSelection('language', 'Tamil')}
              >
                <h3>தமிழ் (Tamil)</h3>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content fade-in">
            <GraduationCap size={40} className="step-icon" />
            <h2>Select Exam Phase</h2>
            <p className="step-desc">Are you preparing for Prelims or Mains?</p>
            
            <div className="card-grid">
              <div 
                className={`choice-card ${preferences.exam === 'Prelims' ? 'selected' : ''}`}
                onClick={() => handleSelection('exam', 'Prelims')}
              >
                <h3>Prelims</h3>
                <p>Objective Multi-choice</p>
              </div>
              <div 
                className={`choice-card ${preferences.exam === 'Mains' ? 'selected' : ''}`}
                onClick={() => handleSelection('exam', 'Mains')}
              >
                <h3>Mains</h3>
                <p>Subjective Descriptive</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content fade-in">
            <BookOpen size={40} className="step-icon" />
            <h2>Pick a Subject</h2>
            <p className="step-desc">What are you studying today?</p>
            
            <div className="card-grid subjects-grid">
              {['History', 'Geography', 'Sci & Tech', 'Economy'].map((subj) => (
                <div 
                  key={subj}
                  className={`choice-card ${preferences.subject === subj ? 'selected' : ''}`}
                  onClick={() => handleSelection('subject', subj)}
                >
                  <h3>{subj}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="onboarding-footer">
          {step > 1 ? (
            <button className="btn-secondary flex-center" onClick={prevStep}>
              <ArrowLeft size={18} style={{marginRight: '8px'}} /> Back
            </button>
          ) : <div></div>}
          
          <button 
            className="btn-primary flex-center" 
            onClick={nextStep}
            disabled={
              (step === 1 && !preferences.language) || 
              (step === 2 && !preferences.exam) || 
              (step === 3 && !preferences.subject)
            }
          >
            {step === 3 ? 'Go to Notebook' : 'Next'} <ArrowRight size={18} style={{marginLeft: '8px'}} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
