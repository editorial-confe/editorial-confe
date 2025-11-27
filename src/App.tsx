
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookSection from './components/BookSection';
import ColoringDemo from './components/ColoringDemo';
import ContentSection from './components/ContentSection';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import PurchaseSection from './components/PurchaseSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import AdminDashboard from './components/AdminDashboard';
import StripeCheckout from './components/StripeCheckout';
import { initAudio, playSound } from './utils/audio';

// Types for detailed flows
type AuthMode = 'login' | 'register' | 'forgot';
type CheckoutStep = 'details' | 'payment' | 'processing' | 'success';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('details');
  
  const [user, setUser] = useState<any>(null);
  const [checkoutData, setCheckoutData] = useState({ name: '', email: '' });
  
  // Simple "router" state
  const [view, setView] = useState<'home' | 'admin'>('home');

  // Check for admin mode via URL param (GOD MODE)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        setUser({ name: "Administrador", email: "admin@confe.com", role: 'admin' });
        setView('admin');
    }
  }, []);

  // Init audio context on first user click anywhere to comply with browser policies
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    
    if (authMode === 'forgot') {
        alert("Te hemos enviado un enlace de recuperación a tu correo.");
        setAuthMode('login');
        return;
    }

    // SIMULACIÓN: Si el usuario es "admin", vamos al dashboard
    const emailInput = (e.target as any)[0]?.value || (e.target as any)[1]?.value; // Quick hack to get email

    if (emailInput === 'admin@confe.com') {
        setUser({ name: "Administrador", email: "admin@confe.com", role: 'admin' });
        setView('admin');
        setShowLoginModal(false);
        return;
    }

    // Simulate normal user login
    setUser({ name: "María", email: "maria@ejemplo.com", role: 'user' });
    setShowLoginModal(false);
    setAuthMode('login'); // Reset for next time
  };

  const handleCheckoutDetails = (e: React.FormEvent) => {
      e.preventDefault();
      setCheckoutStep('payment');
  };

  const handlePaymentSuccess = () => {
      setCheckoutStep('processing');
      playSound('success');
      // Simulate final processing after Stripe confirms
      setTimeout(() => {
          setCheckoutStep('success');
      }, 1500);
  };

  const handleDownloadPDF = () => {
      playSound('success');
      // Simulate file download
      const element = document.createElement("a");
      const fileContent = "Simulación de PDF: Coloreando con Jesús y María.\nLicencia otorgada a: " + (checkoutData.email || user?.email || "cliente");
      const file = new Blob([fileContent], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `Libro_Jesus_y_Maria_Licencia_${checkoutData.email || 'usuario'}.pdf`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      document.body.removeChild(element);
  };

  const closeCheckout = () => {
      setShowCheckoutModal(false);
      setCheckoutStep('details');
  };

  // VISTA DE ADMIN
  if (view === 'admin') {
      return (
          <>
            <nav className="navbar glass-panel">
                <div className="container navbar-container">
                    <div className="navbar-logo-wrapper" onClick={() => setView('home')}>
                        <span style={{fontWeight: 900, color: 'var(--blue-dark)', fontSize: '1.2rem'}}>← Volver al Sitio</span>
                    </div>
                    <button className="btn btn-secondary small" onClick={() => { setUser(null); setView('home'); window.history.pushState({}, '', '/'); }}>Cerrar Sesión</button>
                </div>
            </nav>
            <AdminDashboard />
          </>
      );
  }

  return (
    <div className="app">
      <Navbar 
        onLoginClick={() => { setAuthMode('login'); setShowLoginModal(true); }} 
        user={user}
      />
      <Hero />
      <BookSection />
      <ColoringDemo />
      <ContentSection />
      <Benefits />
      <Testimonials />
      <FAQSection />
      <PurchaseSection onBuyClick={() => { setCheckoutStep('details'); setShowCheckoutModal(true); }} />
      <ContactSection />
      <Footer />
      <FloatingCTA />

      {/* Auth Modal with State Machine */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>×</button>
            
            <h2 className="section-title" style={{fontSize: '2rem'}}>
                {authMode === 'login' && 'Bienvenido'}
                {authMode === 'register' && 'Crear Cuenta'}
                {authMode === 'forgot' && 'Recuperar'}
            </h2>
            
            <form onSubmit={handleAuthSubmit}>
              {authMode === 'register' && (
                  <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" required placeholder="Tu nombre" />
                  </div>
              )}
              
              <div className="form-group">
                <label>Email</label>
                <input type="email" required placeholder="tu@email.com" />
              </div>
              
              {authMode !== 'forgot' && (
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" required placeholder="********" />
                  </div>
              )}
              
              <button className="btn btn-primary" style={{width: '100%'}}>
                  {authMode === 'login' && 'Entrar'}
                  {authMode === 'register' && 'Registrarme'}
                  {authMode === 'forgot' && 'Enviar Enlace'}
              </button>
            </form>

            <div className="auth-links">
                {authMode === 'login' && (
                    <>
                        <p onClick={() => setAuthMode('register')}>¿No tienes cuenta? <span className="link-text">Regístrate</span></p>
                        <p onClick={() => setAuthMode('forgot')} className="small-link">Olvidé mi contraseña</p>
                        <p onClick={() => { 
                            // Secret shortcut for demo
                            const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                            if(emailInput) emailInput.value = 'admin@confe.com';
                        }} style={{marginTop: '15px', fontSize: '0.8rem', opacity: 0.5}}>
                            (Tip: usa admin@confe.com para ver el CMS)
                        </p>
                    </>
                )}
                {authMode === 'register' && (
                    <p onClick={() => setAuthMode('login')}>¿Ya tienes cuenta? <span className="link-text">Inicia Sesión</span></p>
                )}
                {authMode === 'forgot' && (
                    <p onClick={() => setAuthMode('login')}>Volver a <span className="link-text">Iniciar Sesión</span></p>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal with Stripe Integration */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={closeCheckout}>
          <div className="modal-content glass-panel checkout-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCheckout}>×</button>
            
            {/* Step 1: Details */}
            {checkoutStep === 'details' && (
                <>
                    <h2 className="section-title" style={{fontSize: '2rem'}}>Tus Datos</h2>
                    <div className="checkout-summary">
                        <span>Libro PDF Completo</span>
                        <span className="price-tag">$200 MXN</span>
                    </div>
                    <form onSubmit={handleCheckoutDetails}>
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input 
                                type="text" 
                                required 
                                defaultValue={user?.name} 
                                placeholder="Para el certificado" 
                                onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email de Entrega</label>
                            <input 
                                type="email" 
                                required 
                                defaultValue={user?.email} 
                                placeholder="Aquí llegará el PDF" 
                                onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                            />
                            <small style={{color: '#666'}}>⚠️ Importante: Este correo se estampará en tu copia como medida de seguridad.</small>
                        </div>
                        <button className="btn btn-primary" style={{width: '100%', marginTop: '10px'}}>Continuar al Pago →</button>
                    </form>
                </>
            )}

            {/* Step 2: Payment (Real Stripe Integration) */}
            {checkoutStep === 'payment' && (
                <>
                     <h2 className="section-title" style={{fontSize: '2rem'}}>Pago Seguro</h2>
                     <div className="secure-badge-row">
                         <span>🔒 SSL Seguro</span>
                         <span>💳 Procesado por Stripe</span>
                     </div>
                     
                     {/* STRIPE COMPONENT */}
                     <StripeCheckout 
                        amount={200} 
                        onSuccess={handlePaymentSuccess} 
                        onCancel={() => setCheckoutStep('details')} 
                     />
                </>
            )}

            {/* Step 3: Processing */}
            {checkoutStep === 'processing' && (
                <div className="processing-state">
                    <div className="spinner"></div>
                    <h3>Procesando tu pedido...</h3>
                    <p>Estamos generando y estampando tu copia única.</p>
                </div>
            )}

            {/* Step 4: Success */}
            {checkoutStep === 'success' && (
                <div className="success-state">
                    <div className="success-icon">✅</div>
                    <h2>¡Pago Exitoso!</h2>
                    <p className="success-msg">Tu PDF ha sido generado y estampado correctamente.</p>
                    
                    <div className="pdf-preview-card">
                        <div className="pdf-icon">📄</div>
                        <div className="pdf-details">
                            <strong>Libro: Coloreando con Jesús y María</strong>
                            <div className="stamp-overlay">
                                🔒 Licencia otorgada a: {checkoutData.email || user?.email || 'cliente@email.com'}
                            </div>
                        </div>
                    </div>

                    <div className="security-notice">
                        <h4>🛡️ Entrega Segura (Anti-Robo)</h4>
                        <p>Hemos estampado tu correo y el ID #88392 en el pie de página. Esto garantiza que tu copia es única y original.</p>
                    </div>

                    <button className="btn btn-primary" style={{width: '100%', marginBottom: '15px'}} onClick={handleDownloadPDF}>
                        ⬇️ Descargar PDF Estampado
                    </button>
                    
                    <button className="btn btn-secondary" style={{width: '100%', padding: '10px', fontSize: '1rem'}} onClick={closeCheckout}>
                        Cerrar
                    </button>
                </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
