import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { stripePromise } from '../services/stripe';
import './StripeCheckout.css';

interface CheckoutFormProps {
  onSuccess: () => void;
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    // 1. Crear método de pago (Tokenización en el navegador)
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message || 'Error al procesar la tarjeta');
      setProcessing(false);
      return;
    }

    // 2. Enviar el token al BACKEND REAL para hacer el cobro
    try {
        const response = await fetch('/api/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                paymentMethodId: paymentMethod.id,
                email: 'cliente@ejemplo.com', // Deberías pasar el email real del form anterior
                name: 'Cliente Web'
            }),
        });

        const result = await response.json();

        if (result.success) {
            onSuccess();
        } else {
            setError(result.error || 'El pago fue rechazado por el banco.');
        }
    } catch (err) {
        setError('Error de conexión con el servidor. Intenta de nuevo.');
        console.error(err);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form-container">
      <div className="stripe-badges">
         {/* Iconos visuales de tarjetas */}
         <div className="card-icon visa">Visa</div>
         <div className="card-icon master">Master</div>
         <div className="card-icon amex">Amex</div>
      </div>

      <div className="stripe-element-wrapper">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
                fontFamily: 'Nunito, sans-serif',
                fontWeight: '600',
                iconColor: '#3A86FF'
              },
              invalid: {
                color: '#ea251b',
                iconColor: '#ea251b'
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>

      {error && (
        <div className="card-error animate-shake">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || processing} 
        className="btn btn-primary" 
        style={{width: '100%', opacity: processing ? 0.7 : 1, marginTop: '10px'}}
      >
        {processing ? (
           <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
             <span className="mini-spinner"></span> Procesando...
           </span>
        ) : `Pagar $${amount} MXN`}
      </button>
      
      <div className="security-footer">
        🔒 Tus datos viajan encriptados vía SSL
      </div>
    </form>
  );
};

interface StripeCheckoutProps {
    onSuccess: () => void;
    onCancel: () => void;
    amount: number;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ onSuccess, onCancel, amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-summary">
          <span>Total a Pagar</span>
          <span className="price-tag">${amount} MXN</span>
      </div>
      <CheckoutForm onSuccess={onSuccess} amount={amount} />
      <div 
        className="back-btn" 
        onClick={onCancel} 
        style={{textAlign: 'center', marginTop: '15px', display: 'block'}}
      >
        Cancelar y volver
      </div>
    </Elements>
  );
};

export default StripeCheckout;