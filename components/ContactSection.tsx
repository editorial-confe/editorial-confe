import React, { FormEvent } from 'react';
import './ContactSection.css';

const ContactSection: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const emailInput = form.querySelector('#email') as HTMLInputElement;
    const phoneInput = form.querySelector('#phone') as HTMLInputElement;
    
    // Validación estricta de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput && !emailRegex.test(emailInput.value)) {
        alert("El correo no es válido. Por favor usa un formato como: nombre@correo.com");
        emailInput.focus();
        return;
    }

    // Validación de teléfono
    if (phoneInput && phoneInput.value) {
        // Permite formatos como: 55 1234 5678, (55) 1234-5678, +52 55...
        const phoneRegex = /^[+]?[\d\s().-]{10,20}$/;
        // Cuenta solo los dígitos reales
        const digitCount = phoneInput.value.replace(/\D/g, '').length;

        if (!phoneRegex.test(phoneInput.value) || digitCount < 10) {
            alert("El teléfono está incompleto. Asegúrate de escribir al menos 10 dígitos.");
            phoneInput.focus();
            return;
        }
    }

    // Confirmación antes de enviar
    const confirmSend = window.confirm("¿Estás seguro de enviar tus datos de contacto?");
    if (!confirmSend) return;

    alert("¡Mensaje enviado! Gracias por contactarnos, te responderemos pronto.");
    form.reset();
  };

  return (
    <section id="contacto" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Contacto Editorial CONFE</h2>
        <p className="section-subtitle">¿Compras por volumen para colegios o parroquias? Escríbenos.</p>
        
        <form className="contact-form glass-panel" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required placeholder="Tu nombre" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="tu@correo.com" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input type="tel" id="phone" name="phone" placeholder="55 1234 5678" />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows={4} required placeholder="¿En qué podemos ayudarte?"></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary">Enviar mensaje</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;