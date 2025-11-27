import React from 'react';
import './ContentSection.css';

const chapters = [
  "La Anunciación del Ángel",
  "Nacimiento en Belén",
  "La Sagrada Familia",
  "Jesús y los Niños",
  "El Niño Jesús en el Templo",
  "María Reina del Cielo",
  "Jesús el Buen Pastor",
  "La Resurrección de Jesús"
];

const ContentSection: React.FC = () => {
  return (
    <section id="contenido" className="section content-section">
      <div className="container">
        <h2 className="section-title">¿Qué aventuras incluye?</h2>
        <p className="section-subtitle">Un viaje de colores por el Evangelio</p>
        
        <div className="content-grid">
          {chapters.map((title, index) => (
            <div key={index} className="content-card">
              <div className="content-bullet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <p>{title}</p>
            </div>
          ))}
        </div>

        <div className="content-summary-box">
          <p>🎁 Bono Extra: Guía de oración para niños incluida</p>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;