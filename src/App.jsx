import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, ThumbsUp, ThumbsDown, User, X, ArrowUp, Clipboard, ClipboardCheck, ChevronLeft, ChevronRight, Moon, Sun, LogOut, Settings } from 'lucide-react';

// Utility functions for cookies
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Mock Google Sign-In
const mockGoogleSignIn = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: 'Usuario Demo',
        email: 'usuario@ejemplo.com',
        picture: `https://ui-avatars.com/api/?name=Usuario+Demo&background=6366f1&color=fff&size=128`,
        given_name: 'Usuario',
        family_name: 'Demo'
      };
      resolve(mockUser);
    }, 1500);
  });
};

// Simulamos axios para el ejemplo
const simulateApiCall = (content, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          content: `Entiendo que dijiste: "${content}". ¿Hay algo más en lo que pueda ayudarte?`
        }
      });
    }, 1000);
  });
};

// Cookie Consent Banner Component
const CookieConsent = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6 shadow-2xl z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <h3 className="text-slate-700 font-medium">Consentimiento de Cookies</h3>
            </div>
            <p className="text-slate-600 text-sm font-light leading-relaxed">
              Utilizamos cookies esenciales para mantener tu sesión activa, recordar tus preferencias de tema y guardar tu historial de conversaciones para una experiencia personalizada y continua. Al continuar, aceptas nuestros{' '}
              <button className="text-blue-500 hover:text-blue-700 underline font-medium">
                Términos y Condiciones
              </button>{' '}
              y nuestra{' '}
              <button className="text-blue-500 hover:text-blue-700 underline font-medium">
                Política de Privacidad
              </button>.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onDecline}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 font-light transition-colors duration-200"
            >
              Rechazar
            </button>
            <button
              onClick={onAccept}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Aceptar y Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Terms and Conditions Modal
const TermsModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-slate-700">Términos y Condiciones</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6 text-slate-600 font-light leading-relaxed">
          <section>
            <h3 className="text-lg font-medium text-slate-700 mb-3">1. Uso del Servicio</h3>
            <p>
              Espacio Zen es un chatbot diseñado para proporcionar un entorno tranquilo de conversación. 
              Al usar este servicio, aceptas utilizarlo de manera responsable y respetuosa.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-slate-700 mb-3">2. Privacidad y Datos</h3>
            <p>
              Recopilamos únicamente la información básica de tu perfil de Google (nombre, email, foto) 
              y guardamos tus conversaciones localmente en tu navegador para mejorar tu experiencia.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-slate-700 mb-3">3. Cookies</h3>
            <p>
              Utilizamos cookies esenciales para:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Mantener tu sesión activa de forma segura</li>
              <li>Recordar tus preferencias de tema (claro/oscuro)</li>
              <li>Guardar tu historial de conversaciones</li>
              <li>Personalizar tu experiencia con tu nombre</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium text-slate-700 mb-3">4. Responsabilidades</h3>
            <p>
              Este es un servicio de demostración. No compartas información sensible o personal. 
              Las conversaciones se almacenan localmente y pueden eliminarse al limpiar los datos del navegador.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-slate-700 mb-3">5. Modificaciones</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              El uso continuado del servicio constituye la aceptación de los términos modificados.
            </p>
          </section>
        </div>

        <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-slate-600 hover:text-slate-800 font-light transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onAccept}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-sm"
          >
            Acepto los Términos
          </button>
        </div>
      </div>
    </div>
  );
};

// Login Component
const LoginScreen = ({ onLogin, isLoading }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);

  // Check if user has already accepted cookies
  useEffect(() => {
    const cookieConsent = getCookie('zen_cookie_consent');
    if (cookieConsent === 'accepted') {
      setHasAcceptedCookies(true);
    } else {
      setShowCookieConsent(true);
    }
  }, []);

  const handleCookieAccept = () => {
    setCookie('zen_cookie_consent', 'accepted', 365);
    setHasAcceptedCookies(true);
    setShowCookieConsent(false);
  };

  const handleCookieDecline = () => {
    setShowCookieConsent(false);
    // You could redirect to a different page or show a message
    alert('Para usar Espacio Zen necesitamos tu consentimiento para usar cookies esenciales.');
  };

  const handleTermsAccept = () => {
    setShowTerms(false);
  };

  const handleGoogleLogin = async () => {
    if (!hasAcceptedCookies) {
      setShowCookieConsent(true);
      return;
    }

    setIsSigningIn(true);
    try {
      const user = await mockGoogleSignIn();
      onLogin(user);
    } catch (error) {
      console.error('Error en el login:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 max-w-md w-full shadow-xl">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-white rounded-full opacity-90"></div>
          </div>
          <h1 className="text-3xl font-extralight text-slate-700 mb-2 tracking-wide">espacio zen</h1>
          <p className="text-slate-500 font-light">tu lugar de calma y reflexión</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-slate-600 font-light mb-6">Inicia sesión para continuar tu viaje de tranquilidad</p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isSigningIn || !hasAcceptedCookies}
            className="w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-2xl px-6 py-4 flex items-center justify-center space-x-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {isSigningIn ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span className="text-gray-700 font-medium">
              {isSigningIn ? 'Iniciando sesión...' : 'Continuar con Google'}
            </span>
          </button>

          {!hasAcceptedCookies && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <p className="text-amber-800 text-sm font-medium">Consentimiento requerido</p>
              </div>
              <p className="text-amber-700 text-xs font-light">
                Debes aceptar nuestras cookies y términos antes de continuar.
              </p>
            </div>
          )}

          {/* Legal Links */}
          <div className="text-center space-y-2">
            <button
              onClick={() => setShowTerms(true)}
              className="text-blue-500 hover:text-blue-700 text-sm font-light underline transition-colors"
            >
              Ver Términos y Condiciones
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-xs text-slate-500 font-light">Insights semanales</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-emerald-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Moon className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs text-slate-500 font-light">Modo tranquilo</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-violet-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Settings className="w-4 h-4 text-violet-500" />
              </div>
              <p className="text-xs text-slate-500 font-light">Personalización</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <CookieConsent
          onAccept={handleCookieAccept}
          onDecline={handleCookieDecline}
        />
      )}

      {/* Terms Modal */}
      <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={handleTermsAccept}
      />
    </div>
  );
};

// User Menu Component
const UserMenu = ({ user, onLogout, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.user-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative user-menu">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-slate-600' : 'border-white'} hover:scale-105 transition-transform duration-200`}
      >
        <img
          src={user.picture}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </button>

      {isOpen && (
        <div className={`absolute bottom-14 left-0 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-4 w-64 z-50`}>
          <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200 dark:border-slate-700">
            <img
              src={user.picture}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>{user.name}</p>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{user.email}</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors duration-200`}
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Componente para mostrar insights semanales con nuevo diseño
const WeeklyInsights = ({ onClose, user }) => {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 max-w-lg w-full mx-4 shadow-xl border border-slate-200" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-slate-500 text-sm font-light tracking-wide">jul 21 - jul 27</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Personalized Greeting */}
        <div className="mb-6">
          <h2 className="text-2xl font-extralight text-slate-700 mb-2 tracking-wide">
            Hola, {user?.given_name || 'usuario'}
          </h2>
          <p className="text-slate-500 font-light text-sm">Tus reflexiones semanales están listas</p>
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/40">
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-200 rounded-full opacity-40"></div>
              
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <p className="text-slate-600 text-sm mb-6 font-light">tus patrones de bienestar están listos</p>
                <button className="text-slate-700 font-light flex items-center space-x-2 mx-auto hover:text-slate-900 transition-colors group">
                  <span>explorar ahora</span>
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <p className="text-slate-500 text-xs font-light tracking-wide uppercase">conversaciones</p>
            </div>
            <p className="text-2xl font-extralight text-slate-700">7</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
              <p className="text-slate-500 text-xs font-light tracking-wide uppercase">mensajes</p>
            </div>
            <p className="text-2xl font-extralight text-slate-700">77</p>
          </div>
        </div>

        {/* Mood Visualization */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <h3 className="text-slate-600 font-light tracking-wide">estado emocional</h3>
          </div>
          
          <div className="relative h-24 flex items-center justify-center">
            <div className="w-20 h-20 border border-slate-200 rounded-full relative">
              <div className="absolute inset-2 border border-slate-100 rounded-full"></div>
              {/* Mood indicators */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 font-light">serenidad</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 font-light">inquietud</div>
              <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 text-xs text-slate-400 font-light">reflexión</div>
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 text-xs text-slate-400 font-light">energía</div>
              
              {/* Current state */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ZenChatbot = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showWeeklyInsights, setShowWeeklyInsights] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load user session and preferences from cookies on component mount
  useEffect(() => {
    const loadUserSession = () => {
      try {
        const savedUser = getCookie('zen_user');
        const savedTheme = getCookie('zen_theme');
        const savedMessages = getCookie('zen_messages');

        if (savedUser) {
          const userData = JSON.parse(decodeURIComponent(savedUser));
          setUser(userData);
          
          // Load welcome message with user's name
          const welcomeMessage = {
            id: '1',
            type: 'bot',
            content: `¡Hola de nuevo, ${userData.given_name}! Me alegra verte. ¿Cómo te sientes hoy?`,
            feedback: null
          };
          setChatMessages([welcomeMessage]);
        }

        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }

        if (savedMessages && savedUser) {
          try {
            const messages = JSON.parse(decodeURIComponent(savedMessages));
            setChatMessages(messages);
          } catch (e) {
            console.log('Error parsing saved messages');
          }
        }
      } catch (error) {
        console.error('Error loading session:', error);
        // Clear corrupted data
        deleteCookie('zen_user');
        deleteCookie('zen_messages');
        deleteCookie('zen_theme');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserSession();
  }, []);

  // Save messages to cookies whenever they change
  useEffect(() => {
    if (user && chatMessages.length > 0) {
      setCookie('zen_messages', encodeURIComponent(JSON.stringify(chatMessages)), 30);
    }
  }, [chatMessages, user]);

  // Save theme preference
  useEffect(() => {
    setCookie('zen_theme', isDarkMode ? 'dark' : 'light', 365);
  }, [isDarkMode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCookie('zen_user', encodeURIComponent(JSON.stringify(userData)), 30);
    
    // Set welcome message
    const welcomeMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: `¡Hola ${userData.given_name}! Bienvenido a tu espacio zen. Estoy aquí para escucharte. ¿Qué te gustaría compartir hoy?`,
      feedback: null
    };
    setChatMessages([welcomeMessage]);
  };

  const handleLogout = () => {
    setUser(null);
    setChatMessages([]);
    deleteCookie('zen_user');
    deleteCookie('zen_messages');
    // Keep theme preference
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    const userMessage = { id: Date.now().toString(), type: 'user', content: message };
    const typingMessage = { id: (Date.now() + 1).toString(), type: 'bot', content: '...', isTyping: true, feedback: null };
    
    setChatMessages(prev => [...prev, userMessage, typingMessage]);
    setMessage('');
    
    try {
      const response = await simulateApiCall(userMessage.content, user.id);
      const botResponseContent = response.data.content;
      simulateStreaming(typingMessage.id, botResponseContent);
    } catch (error) {
      setChatMessages(prev => prev.map(msg => 
        msg.id === typingMessage.id ? { ...msg, content: "Disculpa, algo no funcionó bien. Intentémoslo de nuevo.", isTyping: false, isError: true } : msg
      ));
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const simulateStreaming = (messageId, fullText) => {
    const words = fullText.split(' ');
    let currentText = '';
    
    setChatMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: '', isTyping: false } : msg
    ));

    words.forEach((word, index) => {
      setTimeout(() => {
        currentText += (index > 0 ? ' ' : '') + word;
        setChatMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, content: currentText + (index === words.length - 1 ? '' : '...') } : msg
        ));
      }, index * 100);
    });
  };

  const handleResetChat = () => {
    const resetMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Empecemos de nuevo con calma, ${user.given_name}. ¿Qué está en tu mente?`,
      feedback: null
    };
    setChatMessages([resetMessage]);
  };
  
  const handleCopyMessage = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (messageId, feedbackType) => {
    setChatMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback: msg.feedback === feedbackType ? null : feedbackType } : msg
    ));
  };

  // Show loading spinner while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full opacity-90"></div>
          </div>
          <p className="text-slate-500 font-light">Cargando tu espacio zen...</p>
        </div>
      </div>
    );
  }

  // Show login screen if user is not authenticated
  if (!user) {
    return <LoginScreen onLogin={handleLogin} isLoading={isLoading} />;
  }

  const themeClasses = isDarkMode 
    ? "bg-slate-900 text-slate-100" 
    : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50";

  return (
    <div className={`min-h-screen font-light ${themeClasses} transition-all duration-500`}>
      <div className="flex h-screen">
        {/* Minimalist Navigation */}
        <div className={`w-20 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/60 backdrop-blur-sm border-white/40'} border-r flex flex-col items-center py-8 space-y-8`}>
          {/* Logo/Brand */}
          <div className="relative">
            <div className={`w-10 h-10 ${isDarkMode ? 'bg-slate-600' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} rounded-full flex items-center justify-center shadow-sm`}>
              <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          
          {/* Navigation Icons */}
          <div className="flex flex-col space-y-6">
            <button 
              title="Reiniciar conversación" 
              onClick={handleResetChat} 
              className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'} transition-all duration-300 hover:scale-105`}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              title="Insights semanales" 
              onClick={() => setShowWeeklyInsights(true)} 
              className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'} transition-all duration-300 hover:scale-105`}
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button 
              title="Alternar tema" 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'} transition-all duration-300 hover:scale-105`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="flex-1"></div>
          
          {/* User Menu */}
          <UserMenu user={user} onLogout={handleLogout} isDarkMode={isDarkMode} />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className={`h-16 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/40 backdrop-blur-sm border-white/40'} border-b flex items-center justify-between px-8`}>
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'} rounded-full`}></div>
              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} font-light tracking-wide`}>espacio tranquilo</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 bg-emerald-400 rounded-full`}></div>
                <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm font-light`}>modo zen</span>
              </div>
              <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm font-light`}>
                {user.given_name}
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex group ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'bot' && (
                      <div className="flex items-start space-x-4 max-w-2xl">
                        <div className={`w-10 h-10 ${isDarkMode ? 'bg-slate-600' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm`}>
                          <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
                        </div>
                        <div className={`relative rounded-3xl px-6 py-4 shadow-sm ${msg.isError ? (isDarkMode ? 'bg-red-900/50 border-red-800' : 'bg-red-50 border-red-200') : (isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/70 backdrop-blur-sm border-white/50')} border`}>
                          <p className={`font-light leading-relaxed whitespace-pre-wrap ${msg.isError ? (isDarkMode ? 'text-red-300' : 'text-red-700') : (isDarkMode ? 'text-slate-200' : 'text-slate-700')} ${msg.isTyping ? 'animate-pulse' : ''}`}>
                            {msg.content}
                          </p>
                          {!msg.isTyping && !msg.isError && (
                            <div className="absolute -bottom-5 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button onClick={() => handleCopyMessage(msg.id, msg.content)} className={`p-1.5 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:bg-white/50 rounded-full transition-all duration-200`}>
                                {copiedId === msg.id ? <ClipboardCheck className="w-3 h-3 text-emerald-500"/> : <Clipboard className="w-3 h-3"/>}
                              </button>
                              <button onClick={() => handleFeedback(msg.id, 'like')} className={`p-1.5 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:bg-white/50 rounded-full transition-all duration-200`}>
                                <ThumbsUp className={`w-3 h-3 ${msg.feedback === 'like' ? 'text-blue-500 fill-current' : ''}`}/>
                              </button>
                              <button onClick={() => handleFeedback(msg.id, 'dislike')} className={`p-1.5 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:bg-white/50 rounded-full transition-all duration-200`}>
                                <ThumbsDown className={`w-3 h-3 ${msg.feedback === 'dislike' ? 'text-red-500 fill-current' : ''}`}/>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {msg.type === 'user' && (
                      <div className={`${isDarkMode ? 'bg-slate-600/50 border-slate-500' : 'bg-gradient-to-r from-slate-100 to-blue-100 border-slate-200'} rounded-3xl px-6 py-4 max-w-lg shadow-sm border backdrop-blur-sm`}>
                        <p className={`${isDarkMode ? 'text-slate-200' : 'text-slate-700'} font-light leading-relaxed whitespace-pre-wrap`}>{msg.content}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className={`${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white/30 backdrop-blur-sm border-white/40'} border-t p-8`}>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isSending ? "Escuchando con atención..." : "Comparte tus pensamientos..."}
                  rows="3"
                  className={`w-full px-6 py-4 pr-24 ${isDarkMode ? 'bg-slate-700/50 border-slate-600 text-slate-200 placeholder-slate-400' : 'bg-white/60 backdrop-blur-sm border-white/50 text-slate-700 placeholder-slate-400'} border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none font-light leading-relaxed disabled:opacity-50 transition-all duration-300`}
                  disabled={isSending}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  {message && !isSending && (
                    <button onClick={() => setMessage('')} className={`p-2 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:bg-white/50 rounded-full transition-all duration-200`}>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={handleSendMessage} 
                    disabled={!message.trim() || isSending} 
                    className={`p-2 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:bg-white/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105`}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Insights Modal */}
      {showWeeklyInsights && (
        <WeeklyInsights onClose={() => setShowWeeklyInsights(false)} user={user} />
      )}
    </div>
  );
};

export default ZenChatbot;