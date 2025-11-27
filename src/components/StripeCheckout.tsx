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

    // 1. Crear método de pago (Tokenización)
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message || 'Error al procesar la tarjeta');
      setProcessing(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // AQUÍ INTEGRARÍAS TU BACKEND REAL
      // Normalmente enviarías paymentMethod.id a tu servidor para hacer el cargo
      // Por ahora simulamos éxito si el token se creó bien
      setTimeout(() => {
          onSuccess();
          setProcessing(false);
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form-container">
      <div className="stripe-badges">
         {/* Iconos de tarjetas simples */}
         <span style={{fontSize: '24px'}}>💳</span>
         <span style={{fontSize: '24px'}}>Visa</span>
         <span style={{fontSize: '24px'}}>Mastercard</span>
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
                fontWeight: '600'
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {error && <div className="card-error">⚠️ {error}</div>}

      <button 
        type="submit" 
        disabled={!stripe || processing} 
        className="btn btn-primary" 
        style={{width: '100%', opacity: processing ? 0.7 : 1}}
      >
        {processing ? 'Procesando...' : `Pagar $${amount} MXN`}
      </button>
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
        Cancelar
      </div>
    </Elements>
  );
};

export default StripeCheckout;