import React from 'react';
import './Benefits.css';

const Benefits: React.FC = () => {
  return (
    <section id="beneficios" className="section benefits-section">
      <div className="container">
        <h2 className="section-title">¡Aprender es divertido!</h2>
        <p className="section-subtitle">Beneficios de colorear para los pequeños</p>
        
        <div className="benefits-grid">
          <div className="card benefit-card">
            <div className="benefit-circle color-purple">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            </div>
            <h3>Fe y Valores</h3>
            <p>Conocen a Jesús y María mientras juegan y desarrollan su corazoncito.</p>
          </div>
          
          <div className="card benefit-card">
            <div className="benefit-circle color-orange">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </div>
            <h3>Creatividad</h3>
            <p>¡Colores por todos lados! Mejora su atención y saca al artista que llevan dentro.</p>
          </div>
          
          <div className="card benefit-card">
            <div className="benefit-circle color-green">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3>Unión Familiar</h3>
            <p>Papás, abuelos y niños compartiendo un momento de paz sin pantallas.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;