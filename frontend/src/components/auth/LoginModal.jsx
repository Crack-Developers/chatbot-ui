import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';

const LoginModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [subject, setSubject] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (name.trim() && phone.trim()) {
      setStep(2);
      // Simulate OTP generation for demonstration purposes
      setTimeout(() => {
        alert("Your mock OTP for verification is: 1234");
      }, 500);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length === 4) {
      setStep(3);
    }
  };

  const handleComplete = () => {
    if (subject) {
      // Typically save user data here
      onClose();
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-[440px] bg-[#0A0D14] rounded-[32px] p-8 border border-white/10 shadow-2xl relative mx-4 overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-[32px]">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] bg-blue-500/10 blur-[80px] rounded-full" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[50%] bg-purple-500/10 blur-[80px] rounded-full" />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Logo showText={false} className="h-10 w-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-white">SELVA'S</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#FBBF24] font-bold">IAS ACADEMY</span>
                  </div>
                </div>
                {step === 3 && (
                  <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                      initial={{ width: '0%' }}
                      animate={{ width: step >= i ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Details */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome</h2>
                    <p className="text-gray-400 mb-6 text-sm">Enter your details to start your journey</p>

                    <div className="space-y-5 mb-8">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 ml-1">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="E.g. Vikram Sharma" 
                          className="w-full bg-[#131825] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 ml-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9999999999" 
                          className="w-full bg-[#131825] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 shadow-inner tracking-wide"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleSendOtp}
                      disabled={!name.trim() || !phone.trim()}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-white/5 disabled:to-white/5 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: OTP */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">Verify Number</h2>
                    <p className="text-gray-400 mb-8 text-sm">We've sent an OTP to <span className="text-white font-medium">{phone}</span></p>

                    <div className="flex justify-between gap-3 mb-8">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-16 h-16 bg-[#131825] border border-white/10 rounded-2xl text-center text-2xl text-white font-bold focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                        />
                      ))}
                    </div>

                    <button 
                      onClick={handleVerifyOtp}
                      disabled={otp.join('').length < 4}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-white/5 disabled:to-white/5 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                    >
                      Verify OTP <CheckCircle2 size={18} />
                    </button>
                    
                    <button 
                      onClick={() => setStep(1)}
                      className="w-full mt-4 text-gray-400 hover:text-white text-sm transition-colors py-2"
                    >
                      Change phone number
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Subject Selection */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">Choose Optional</h2>
                    <p className="text-gray-400 mb-8 text-sm">Select your optional subject to personalize your experience</p>

                    <div className="space-y-4 mb-8">
                      <button
                        onClick={() => setSubject('history')}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                          subject === 'history' 
                            ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                            : 'bg-[#131825] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${subject === 'history' ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                          </div>
                          <div className="text-left">
                            <h3 className={`font-semibold ${subject === 'history' ? 'text-white' : 'text-gray-300'}`}>History</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Ancient, Medieval, Modern & World</p>
                          </div>
                        </div>
                        {subject === 'history' && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 className="text-blue-500" size={20} />
                          </motion.div>
                        )}
                      </button>

                      <button
                        onClick={() => setSubject('anthropology')}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                          subject === 'anthropology' 
                            ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                            : 'bg-[#131825] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${subject === 'anthropology' ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                          </div>
                          <div className="text-left">
                            <h3 className={`font-semibold ${subject === 'anthropology' ? 'text-white' : 'text-gray-300'}`}>Anthropology</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Physical, Social & Indian Anthropology</p>
                          </div>
                        </div>
                        {subject === 'anthropology' && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 className="text-purple-500" size={20} />
                          </motion.div>
                        )}
                      </button>
                    </div>

                    <button 
                      onClick={handleComplete}
                      disabled={!subject}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-white/5 disabled:to-white/5 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20"
                    >
                      Enter Platform
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
