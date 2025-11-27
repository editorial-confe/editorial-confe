
import React from 'react';
import './BookSection.css';

const BookSection: React.FC = () => {
  const BACK_COVER_URL = "https://wsrv.nl/?url=https://i.imgur.com/MLAEWic.png";
  const SAMPLE_BAUTISMO = "https://wsrv.nl/?url=https://i.imgur.com/n5YrcqN.png";
  const SAMPLE_HUIDA = "https://wsrv.nl/?url=https://i.imgur.com/kx6J467.png";

  return (
    <section id="libro" className="section book-section">
      <div className="container">
        <div className="book-grid">
          <div className="book-info">
            <h2 className="section-title text-left">Mira lo que hay dentro</h2>
            <p className="book-description">
              Cada página es una nueva aventura. Acompaña a Jesús y María en sus momentos más especiales. ¡Dibujos grandes y fáciles de pintar!
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon icon-star">
                    <svg viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div>
                  <h4>+30 Páginas Mágicas</h4>
                  <p>Escenas hermosas de la Biblia.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon icon-print">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                </div>
                <div>
                  <h4>Imprime Infinitamente</h4>
                  <p>Descarga el PDF y úsalo siempre.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon icon-heart">
                    <svg viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <div>
                  <h4>100% Católico</h4>
                  <p>Hecho con amor y fidelidad.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="book-gallery">
            <div className="gallery-main card-frame">
              <img 
                src={BACK_COVER_URL} 
                alt="Contraportada" 
                className="gallery-img main-img" 
                loading="lazy"
              />
              <div className="gallery-label">Contraportada</div>
            </div>
            <div className="gallery-grid-small">
              <div className="gallery-item card-frame">
                <img 
                    src={SAMPLE_BAUTISMO} 
                    alt="Bautismo" 
                    loading="lazy"
                />
                <div className="gallery-label-small">Bautismo</div>
              </div>
              <div className="gallery-item card-frame">
                <img 
                    src={SAMPLE_HUIDA} 
                    alt="Huida a Egipto" 
                    loading="lazy"
                />
                <div className="gallery-label-small">Huida a Egipto</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
