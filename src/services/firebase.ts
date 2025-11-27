// src/services/firebase.ts
import { initializeApp } from "firebase/app";

// Configuración pública de tu proyecto Firebase
// Firebase Hosting inyecta esto automáticamente si usas los SDKs, 
// pero por ahora solo usamos la función via HTTP fetch.
const firebaseConfig = {
  // No es necesario llenar esto para la integración de Stripe vía HTTP Functions
};

export const app = initializeApp(firebaseConfig);
