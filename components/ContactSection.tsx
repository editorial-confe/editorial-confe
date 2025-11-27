import React, { FormEvent } from 'react';
import './ContactSection.css';

const ContactSection: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Gracias por escribirnos, pronto nos pondremos en contacto contigo.");
  };

  return (
    <section id="contacto" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Contacto Editorial CONFE</h2>
        <p className="section-subtitle">¿Compras por volumen para colegios o parroquias? Escríbenos.</p>
        
        <form className="contact-form card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" required placeholder="Tu nombre" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required placeholder="tu@correo.com" />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" rows={4} required placeholder="¿En qué podemos ayudarte?"></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary">Enviar mensaje</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;