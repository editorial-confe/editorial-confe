
import React from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';
import './PurchaseSection.css';

interface PurchaseSectionProps {
  onBuyClick: () => void;
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({ onBuyClick }) => {
  const handleBuy = () => {
    playSound('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onBuyClick();
  };

  return (
    <section id="compra" className="section purchase-section">
      <div className="container text-center">
        <h2 className="section-title text-white">¡Empieza a colorear hoy!</h2>
        
        <div className="pricing-container animate-up">
          <div className="product-card card">
            <div className="product-badge">OFERTA</div>
            <div className="product-header">
              <h3>Libro Digital PDF</h3>
              <p>Descarga Instantánea</p>
            </div>
            
            <div className="product-price">
              <span className="currency">$</span>
              <span className="amount">200</span>
              <span className="code">MXN</span>
            </div>
            
            <ul className="product-features">
              <li>
                  <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  +30 Láminas para colorear
              </li>
              <li>
                  <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Para imprimir en casa
              </li>
              <li>
                  <svg className="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Licencia Familiar
              </li>
            </ul>
            
            <button onClick={handleBuy} className="btn btn-primary btn-large btn-pulse">
              ¡Lo Quiero! 🛒
            </button>
            
            <div className="guarantee">
              <p>🔒 Pago 100% Seguro</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseSection;
