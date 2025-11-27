

import React, { useState, useEffect } from 'react';
import './FloatingCTA.css';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToPurchase = () => {
    const element = document.getElementById('compra');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <button onClick={scrollToPurchase} className="floating-cta">
      Comprar ahora
    </button>
  );
};

export default FloatingCTA;