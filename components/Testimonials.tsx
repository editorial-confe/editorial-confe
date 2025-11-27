import React from 'react';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  return (
    <section id="opiniones" className="section testimonials-section">
      <div className="container">
        <h2 className="section-title">Familias Felices</h2>
        
        <div className="testimonials-grid">
          <div className="card testimonial-card">
            <div className="quote-icon">❝</div>
            <p className="testimonial-text">Es justo lo que buscaba. Mis hijos aprenden del Evangelio mientras se divierten coloreando.</p>
            <div className="testimonial-author">
              <strong>Clara M.</strong>
              <span>Mamá</span>
            </div>
          </div>

          <div className="card testimonial-card">
            <div className="quote-icon">❝</div>
            <p className="testimonial-text">Usé las láminas para mi clase de catecismo y a los niños les encantó. Muy recomendado.</p>
            <div className="testimonial-author">
              <strong>Roberto G.</strong>
              <span>Catequista</span>
            </div>
          </div>

          <div className="card testimonial-card">
            <div className="quote-icon">❝</div>
            <p className="testimonial-text">Un material hermoso y de calidad. Perfecto para sembrar la fe desde pequeños.</p>
            <div className="testimonial-author">
              <strong>Hna. Lucía</strong>
              <span>Colegio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;