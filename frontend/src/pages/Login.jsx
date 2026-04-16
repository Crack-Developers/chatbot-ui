import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Phone, Mail, User } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    otp: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.phone) {
      // Simulate sending OTP
      setStep(2);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (formData.otp.length === 4) {
      // Direct to onboarding
      navigate('/onboarding');
    }
  };

  return (
    <div className="page-container login-page">
      <div className="login-box glass-panel">
        <div className="login-header">
          <BookOpen className="logo-icon" size={40} />
          <h1>UPSC AI Notebook</h1>
          <p>{step === 1 ? 'Create an account to start your preparation' : 'Verify your phone number'}</p>
        </div>

        {step === 1 ? (
          <form className="login-form" onSubmit={handleSignup}>
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input type="text" name="firstName" placeholder="First Name" className="input-field" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input type="text" name="lastName" placeholder="Last Name" className="input-field" value={formData.lastName} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input type="email" name="email" placeholder="Email Address" className="input-field" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <Phone size={18} className="input-icon" />
              <input type="tel" name="phone" placeholder="Phone Number (e.g. +91 99999...)" className="input-field" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn-primary full-width mt-4">Send OTP</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleVerifyOTP}>
            <div className="otp-display">
               <p>Enter the 4-digit OTP sent to {formData.phone}</p>
               <input type="text" name="otp" maxLength={4} className="input-field otp-input" value={formData.otp} onChange={handleInputChange} placeholder="• • • •" autoFocus required />
            </div>
            <button type="submit" className="btn-primary full-width mt-4">Verify & Continue</button>
            <button type="button" className="btn-text mt-2" onClick={() => setStep(1)}>Back</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
