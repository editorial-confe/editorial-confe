
import React from 'react';
import { playSound } from '../utils/audio';
import './Hero.css';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    playSound('click');
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const COVER_URL = "https://wsrv.nl/?url=https://i.imgur.com/mcqNeOF.png";

  return (
    <section id="hero" className="hero-section">
      <div className="cloud cloud-1">☁️</div>
      <div className="cloud cloud-2">☁️</div>

      <div className="container hero-container animate-up">
        <div className="hero-content">
          <div className="hero-badge">✨ ¡Nuevo Lanzamiento! ✨</div>
          <h1>Coloreando con <span className="highlight-text">Jesús y María</span></h1>
          <p className="hero-subtitle">Mi primer libro católico para colorear (PDF Descargable)</p>
          <p className="hero-desc">
            ¡Acerca a los niños a la fe de forma divertida! Más de 30 escenas tiernas para aprender y colorear en familia.
          </p>
          <div className="hero-buttons">
            <button onClick={() => scrollTo('compra')} className="btn btn-primary">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Comprar PDF
            </button>
            <button onClick={() => scrollTo('demo')} className="btn btn-secondary">
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              Jugar Demo
            </button>
          </div>
          <div className="hero-trust glass-panel">
            <div className="trust-avatars">
               <div className="avatar">😇</div>
               <div className="avatar">👦</div>
               <div className="avatar">👧</div>
            </div>
            <span>¡Amado por +500 familias católicas!</span>
          </div>
        </div>
        <div className="hero-image">
          <div className="book-showcase">
            <img 
              src={COVER_URL} 
              alt="Portada del libro Coloreando con Jesús y María" 
              className="real-book-cover" 
              loading="eager"
              // @ts-ignore
              fetchPriority="high"
            />
            
            <div className="sticker sticker-new">NUEVO</div>
          </div>
        </div>
      </div>
      
      <div className="wave-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
