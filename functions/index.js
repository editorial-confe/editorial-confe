const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// ==================================================================
// ⚠️  IMPORTANTE: PEGA TU CLAVE SECRETA DE STRIPE AQUÍ ABAJO
// Debe empezar con 'sk_live_...' para cobrar de verdad.
// ==================================================================
const stripe = require("stripe")("sk_live_AQUI_VA_TU_CLAVE_SECRETA_DE_STRIPE");

admin.initializeApp();

exports.createPayment = functions.https.onRequest((req, res) => {
  // Habilitar CORS para permitir llamadas desde tu web
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { amount, paymentMethodId, email, name } = req.body;

      // 1. Crear el PaymentIntent confirmándolo inmediatamente
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe usa centavos (200 MXN = 20000)
        currency: "mxn",
        payment_method: paymentMethodId,
        confirm: true, // Cobrar al instante
        receipt_email: email,
        description: `Compra de Libro - ${name}`,
        return_url: "https://editorial-confe.web.app", // URL de retorno por si se requiere 3D Secure
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        }
      });

      // 2. (Opcional) Guardar orden en base de datos
      // await admin.firestore().collection("orders").add({ ... });

      // 3. Responder ÉXITO al frontend
      res.json({ success: true, id: paymentIntent.id });

    } catch (error) {
      console.error("Error en pago:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });
});