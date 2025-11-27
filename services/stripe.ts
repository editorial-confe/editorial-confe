import { loadStripe } from '@stripe/stripe-js';

// Clave pública de prueba de Stripe estándar para desarrollo.
// En producción, esto debería venir de una variable de entorno.
const CLAVE_PUBLICA = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

export const stripePromise = loadStripe(CLAVE_PUBLICA);