

import React from 'react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto'}}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {type === 'privacy' && (
          <>
            <h2 className="section-title" style={{fontSize: '1.8rem'}}>Aviso de Privacidad</h2>
            <div style={{textAlign: 'left', lineHeight: '1.6', color: '#555'}}>
              <p><strong>Última actualización: Octubre 2023</strong></p>
              <p>En Editorial CONFE, nos tomamos muy en serio la privacidad de las familias.</p>
              <h4 style={{marginTop: '15px', color: 'var(--blue-dark)'}}>1. Datos que recolectamos</h4>
              <p>Solo solicitamos nombre y correo electrónico para el proceso de compra y envío del PDF digital. No almacenamos datos bancarios; estos son procesados por la pasarela de pago (Stripe/PayPal).</p>
              <h4 style={{marginTop: '15px', color: 'var(--blue-dark)'}}>2. Uso de la información</h4>
              <p>Tu correo se utiliza para:</p>
              <ul style={{marginLeft: '20px', listStyle: 'disc'}}>
                <li>Enviar el enlace de descarga del libro.</li>
                <li>Estampar la licencia digital (protección anti-robo).</li>
                <li>Enviar actualizaciones del libro si las hubiera.</li>
              </ul>
              <h4 style={{marginTop: '15px', color: 'var(--blue-dark)'}}>3. Seguridad</h4>
              <p>Tus datos viajan encriptados (SSL) y nunca vendemos tu información a terceros.</p>
            </div>
          </>
        )}

        {type === 'terms' && (
          <>
            <h2 className="section-title" style={{fontSize: '1.8rem'}}>Términos y Condiciones</h2>
            <div style={{textAlign: 'left', lineHeight: '1.6', color: '#555'}}>
              <h4 style={{marginTop: '15px', color: 'var(--blue-dark)'}}>1. Licencia de Uso</h4>
              <p>Al comprar "Coloreando con Jesús y María", adquieres una <strong>Licencia Familiar y Educativa</strong>. Tienes derecho a imprimir el libro tantas veces como necesites para tu hogar o tu clase de catequesis.</p>
              <h4 style={{marginTop: '15px', color: 'var(--blue-dark)'}}>2. Prohibiciones</h4>
              <p style={{color: 'var(--red)', fontWeight: 'bold'}}>Queda estrictamente prohibido:</p>
              <ul style={{marginLeft: '20px', listStyle: 'disc'}}>
                <li>Revender el archivo PDF.</li>
                <li>Compartir el archivo PDF públicamente en internet o grupos de WhatsApp.</li>
                <li>Modificar las ilustraciones.</li>
              </ul>
              <h4 style={{marginTop: '15px', color: 'var(--blue-dark)'}}>3. Protección Anti-Piratería</h4>
              <p>Cada página del PDF descargado incluye una marca de agua digital invisible y visible con el ID de transacción y correo del comprador para rastrear su origen en caso de distribución ilegal.</p>
            </div>
          </>
        )}
        
        <button className="btn btn-primary" style={{marginTop: '20px', width: '100%'}} onClick={onClose}>Entendido</button>
      </div>
    </div>
  );
};

export default LegalModals;