import React, { useState } from 'react';
import { playSound, toggleMute, getMuteState } from '../utils/audio';
import './Navbar.css';

interface NavbarProps {
  onLoginClick: () => void;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(getMuteState());

  const toggleMenu = () => {
    playSound('click');
    setIsOpen(!isOpen);
  };

  const handleMuteToggle = () => {
    const muted = toggleMute();
    setIsMuted(muted);
    if (!muted) playSound('click');
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // USAR WESERV.NL PARA EVITAR BLOQUEOS Y PROBLEMAS DE CORS
  const LOGO_URL = "https://images.weserv.nl/?url=https://i.imgur.com/fFxf5Fe.png";

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-container">
        <div 
          className="navbar-logo-wrapper" 
          onClick={() => scrollToSection('hero')}
        >
          <img 
            src={LOGO_URL} 
            alt="Coloreando con Jesús y María" 
            className="logo-img"
            loading="eager"
            // @ts-ignore
            fetchPriority="high"
          />
        </div>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <button onClick={() => scrollToSection('libro')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            El libro
          </button>
          
          <button onClick={() => scrollToSection('demo')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.551-2.5 5.551-5.551C21.988 6.45 17.5 2 12 2z"></path>
            </svg>
            Demo
          </button>
          
          <button onClick={() => scrollToSection('contenido')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Galería
          </button>
          
          <button className="sound-toggle" onClick={handleMuteToggle} title="Activar/Desactivar Sonido">
             {isMuted ? '🔇' : '🔊'}
          </button>
          
          <div className="nav-actions">
            <button className="nav-btn-highlight" onClick={() => scrollToSection('compra')}>
              Comprar PDF
            </button>
            <button className="nav-btn-login" onClick={onLoginClick}>
              <svg className="nav-icon" style={{marginRight: user ? '8px' : '6px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {user ? user.name : 'Ingresar'}
            </button>
          </div>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;