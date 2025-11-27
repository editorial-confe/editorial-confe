import { loadStripe } from '@stripe/stripe-js';

// Clave pública de prueba de Stripe.
// Esta clave permite simular pagos exitosos usando la tarjeta 4242 4242 4242 4242
const CLAVE_PUBLICA = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

export const stripePromise = loadStripe(CLAVE_PUBLICA);