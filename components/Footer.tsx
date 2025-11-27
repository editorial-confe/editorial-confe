
import React, { useState } from 'react';
import LegalModals from './LegalModals';
import './Footer.css';

const Footer: React.FC = () => {
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>© {currentYear} Editorial CONFE. Todos los derechos reservados.</p>
            <div className="footer-links">
               <button onClick={() => setLegalType('privacy')} className="privacy-link">Aviso de Privacidad</button>
               <span style={{margin: '0 10px'}}>|</span>
               <button onClick={() => setLegalType('terms')} className="privacy-link">Términos y Condiciones</button>
            </div>
          </div>
        </div>
      </footer>
      <LegalModals type={legalType} onClose={() => setLegalType(null)} />
    </>
  );
};

export default Footer;
