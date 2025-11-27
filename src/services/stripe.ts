import { loadStripe } from '@stripe/stripe-js';

// =======================================================================
// 👇👇👇 PEGA TU CLAVE AQUÍ ABAJO (BORRA LO QUE HAY ENTRE COMILLAS) 👇👇👇
// =======================================================================

const CLAVE_PUBLICA = 'pk_test_TU_CLAVE_LARGA_VA_AQUI';

// =======================================================================

if (CLAVE_PUBLICA.includes('TU_CLAVE')) {
  console.error("⚠️ ALERTA: Aún no has pegado tu clave de Stripe en src/services/stripe.ts");
}

export const stripePromise = loadStripe(CLAVE_PUBLICA);