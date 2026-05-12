import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, User, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import './Login.css';

const Login = () => {
  const { login } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: ''
  });
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) {
        setFormData({ ...formData, [name]: cleaned });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next box
    if (value !== '' && index < 3) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.phone.length === 10) {
      setStep(2);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.every(val => val !== '')) {
      // Check in our "mock database" of registered users
      const registeredUsers = JSON.parse(localStorage.getItem('upsc_registered_users') || '[]');
      const existingUser = registeredUsers.find(u => u.phone === formData.phone);
      
      if (existingUser && existingUser.name) {
        // Returning user - log them in and go home
        login(existingUser);
        navigate('/home');
      } else {
        // New user - go to onboarding
        localStorage.setItem('upsc_temp_phone', formData.phone);
        navigate('/onboarding');
      }
    }
  };

  return (
    <div className="login-page">
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="login-box"
        >
          <div className="login-header">
            <div className="flex justify-center mb-2 transform scale-90 md:scale-100">
              <Logo showText={true} />
            </div>
            <p className="font-medium text-slate-500">{step === 1 ? 'Verify your identity to continue' : 'Secure Verification'}</p>
          </div>

          {step === 1 ? (
            <form className="login-form" onSubmit={handleSignup}>
              <div className="input-group">
                <Phone size={18} className="input-icon" />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Enter Phone Number" 
                  className="input-field" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                  autoFocus
                  maxLength={10}
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary full-width mt-4 group"
                disabled={formData.phone.length !== 10}
              >
                Generate OTP <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-6">
                Protected by UPSC AI Secure Gateway
              </p>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleVerifyOTP}>
              <div className="text-center mb-6">
                 <div className="w-16 h-16 bg-upsc-gold/10 rounded-full flex items-center justify-center text-upsc-gold mx-auto mb-4">
                    <ShieldCheck size={32} />
                 </div>
                 <p className="text-sm text-gray-300">Enter the 4-digit code sent to<br/><span className="text-upsc-gold font-bold">{formData.phone}</span></p>
              </div>
              
              <div className="otp-container">
                {otp.map((val, i) => (
                  <input
                    key={i}
                    ref={el => otpRefs.current[i] = el}
                    type="text"
                    maxLength={1}
                    className="otp-box"
                    value={val}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    autoFocus={i === 0}
                  />
                ))}
              </div>
              
              <button type="submit" className="btn-primary full-width mt-4">
                Verify & Login
              </button>
              
              <div className="flex justify-between items-center mt-6">
                <button type="button" className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors" onClick={() => setStep(1)}>
                  <ChevronLeft size={14} /> Change Number
                </button>
                <button type="button" className="btn-text">Resend OTP</button>
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Login;
