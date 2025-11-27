import React from 'react';
import './ContentSection.css';

const chapters = [
  "Ángel de la Guarda",
  "El Comienzo – La Anunciación",
  "La Visitación",
  "El Nacimiento",
  "Los Reyes Magos",
  "Presentación en el Templo",
  "Huida a Egipto",
  "María con Niño Jesús",
  "Regreso a Nazaret",
  "Jesús Niño con San José",
  "Jesús Niño en el Templo",
  "Bautismo",
  "Buen Pastor",
  "Jesús con los niños",
  "Jesús sana al ciego",
  "Multiplicación de los panes",
  "Jesús calma la tormenta",
  "Domingo de Ramos",
  "Última Cena",
  "Oración en el Huerto",
  "La Crucifixión",
  "La Resurrección",
  "Jesús aparece a María Magdalena",
  "Jesús aparece a los discípulos",
  "Ascensión",
  "Pentecostés",
  "Cristo Rey",
  "Asunción de María",
  "Coronación de María",
  "Dios Padre, Jesús y María Nos Protegen"
];

const ContentSection: React.FC = () => {
  return (
    <section id="contenido" className="section content-section">
      <div className="container">
        <h2 className="section-title">¿Qué aventuras incluye?</h2>
        <p className="section-subtitle">Un viaje de colores por el Evangelio (+30 Láminas)</p>
        
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
          <p>🎁 Bono Extra: Oraciones y reflexiones para niños incluidas en cada página</p>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;