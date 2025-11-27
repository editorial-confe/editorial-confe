

import React, { useState } from 'react';
import './FAQSection.css';

const faqs = [
    {
        q: "¿El libro es físico o digital?",
        a: "Es 100% digital (PDF). Lo recibes en tu correo inmediatamente después de la compra para que lo imprimas las veces que quieras."
    },
    {
        q: "¿Para qué edades es recomendado?",
        a: "Ideal para niños de 3 a 10 años. Los dibujos tienen trazos claros perfectos para preescolar y primaria."
    },
    {
        q: "¿Puedo compartirlo con mi grupo de catequesis?",
        a: "¡Sí! Tu compra incluye una Licencia Familiar y Educativa, así que puedes imprimir copias para tu clase o parroquia."
    },
    {
        q: "¿Cómo pago si no tengo tarjeta?",
        a: "Aceptamos todas las tarjetas, pero si prefieres otro método, contáctanos en la sección de abajo para darte opciones."
    }
];

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section id="faq" className="section faq-section">
            <div className="container">
                <h2 className="section-title">Preguntas Frecuentes</h2>
                <div className="faq-grid">
                    {faqs.map((item, i) => (
                        <div key={i} className={`faq-item card ${openIndex === i ? 'open' : ''}`} onClick={() => toggle(i)}>
                            <div className="faq-question">
                                <h3>{item.q}</h3>
                                <span className="toggle-icon">{openIndex === i ? '−' : '+'}</span>
                            </div>
                            <div className="faq-answer">
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;