import React from 'react';

const Logo = ({ className = "h-12 w-auto", showText = true }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex flex-col items-center">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tree Trunk & Roots */}
          <path d="M50 80C50 80 40 78 35 78C30 78 20 80 20 80M80 80C80 80 70 78 65 78C60 78 50 80 50 80M50 80V90M50 90H35M50 90H65" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round"/>
          {/* Tree Branches and Leaves */}
          <path d="M50 80V30" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round"/>
          <path d="M50 65L30 50M50 55L25 40M50 45L35 30M50 40L50 20M50 45L65 30M50 55L75 40M50 65L70 50" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round"/>
          {/* Golden Leaves (Circles) */}
          <circle cx="20" cy="40" r="3" fill="#D4AF37"/>
          <circle cx="30" cy="50" r="3" fill="#D4AF37"/>
          <circle cx="25" cy="35" r="3" fill="#D4AF37"/>
          <circle cx="35" cy="25" r="3" fill="#D4AF37"/>
          <circle cx="50" cy="15" r="3" fill="#D4AF37"/>
          <circle cx="65" cy="25" r="3" fill="#D4AF37"/>
          <circle cx="75" cy="35" r="3" fill="#D4AF37"/>
          <circle cx="70" cy="50" r="3" fill="#D4AF37"/>
          <circle cx="80" cy="40" r="3" fill="#D4AF37"/>
          <circle cx="50" cy="35" r="3" fill="#D4AF37"/>
          <circle cx="40" cy="45" r="3" fill="#D4AF37"/>
          <circle cx="60" cy="45" r="3" fill="#D4AF37"/>
        </svg>
        <div style={{ color: '#8b0000', fontSize: '10px', fontWeight: '900', marginTop: '-5px', fontFamily: 'serif' }}>SELVA'S</div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span style={{ color: '#2b3990', fontSize: '24px', fontWeight: '800', lineHeight: '1', fontFamily: 'Outfit' }}>SELVA'S</span>
            <span style={{ color: '#8b0000', fontSize: '24px', fontWeight: '800', lineHeight: '1', fontFamily: 'Outfit' }}>IAS</span>
            <span style={{ color: '#2b3990', fontSize: '24px', fontWeight: '800', lineHeight: '1', fontFamily: 'Outfit' }}>ACADEMY</span>
          </div>
          <div style={{ color: '#8b0000', fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px', marginTop: '2px', fontFamily: 'Outfit' }}>
            DISCOVER PATH TO UPSC
          </div>
          <div style={{ color: '#8b0000', fontSize: '10px', fontWeight: '600', alignSelf: 'flex-end', opacity: 0.8, fontFamily: 'Outfit' }}>
            IAS, IPS, IFS...
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
