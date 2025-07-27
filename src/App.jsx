import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, ThumbsUp, ThumbsDown, X, ArrowUp, Clipboard, ClipboardCheck, Moon, Sun } from 'lucide-react';
import './index.css'; // Asegúrate de que tu archivo de estilos principal esté importado

// --- 1. SE HA ELIMINADO TODA LA CONFIGURACIÓN DE LA API ---
// No más API Key, URL, ni System Prompt.

// ✨ NUEVA FUNCIÓN: Un simulador de respuestas del bot.
// Esta función reemplaza la llamada a OpenRouter.
const getSimulatedBotResponse = async (userMessage) => {
  const lowerCaseMessage = userMessage.toLowerCase();
  let botResponse = "No estoy seguro de entender. ¿Puedes contarme un poco más sobre eso?"; // Respuesta por defecto

  if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('hey')) {
    botResponse = "¡Hey! ¿Qué onda? ¿En qué andas pensando hoy?";
  } else if (lowerCaseMessage.includes('estresado') || lowerCaseMessage.includes('agobiado')) {
    botResponse = "Uf, eso suena pesado. A veces, solo respirar profundo un par de veces puede hacer una gran diferencia. ¿Qué es lo que más te agobia ahora mismo?";
  } else if (lowerCaseMessage.includes('triste') || lowerCaseMessage.includes('mal')) {
    botResponse = "Lamento escuchar eso. Está bien no sentirse bien. Si quieres hablar de ello, aquí estoy para escucharte sin juzgar.";
  } else if (lowerCaseMessage.includes('gracias') || lowerCaseMessage.includes('agradezco')) {
    botResponse = "De nada, para eso estoy. :)";
  } else if (lowerCaseMessage.includes('examen') || lowerCaseMessage.includes('estudiar')) {
    botResponse = "Los exámenes pueden ser muy estresantes. Recuerda tomar descansos y ser amable contigo mismo. ¡Tú puedes!";
  } else if (lowerCaseMessage.includes('consejo') || lowerCaseMessage.includes('qué hago')) {
    botResponse = "No tengo todas las respuestas, pero a veces hablarlo en voz alta ayuda a encontrar el camino. ¿Cuáles son las opciones que ves?";
  }

  // Simulamos un pequeño retraso para que no sea instantáneo
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(botResponse);
    }, 800); // 800 milisegundos de retraso
  });
};


// Funciones de utilidad para cookies (para guardar el tema)
const setCookie = (name, value, days = 365) => {
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


// Componente principal de la aplicación
function App() {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTheme = getCookie('zen_theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    setChatMessages([
        { id: 'welcome-1', type: 'bot', content: `Hey, ¿cómo te sientes hoy?`, feedback: null }
    ]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setCookie('zen_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // 👇 LÓGICA DE ENVÍO MODIFICADA
  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    const userMessage = { id: Date.now().toString(), type: 'user', content: message };
    setChatMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    const typingMessageId = (Date.now() + 1).toString();
    setChatMessages(prev => [...prev, { id: typingMessageId, type: 'bot', content: '...', isTyping: true, feedback: null }]);
    
    try {
      // Ahora llamamos a nuestro simulador local en lugar de la API externa
      const botResponseContent = await getSimulatedBotResponse(userMessage.content);
      
      setChatMessages(prev => prev.map(msg => 
        msg.id === typingMessageId ? { ...msg, content: botResponseContent, isTyping: false } : msg
      ));
    } catch (error) {
      // Este error es ahora muy improbable, pero lo mantenemos por si acaso.
      const errorMessage = "Vaya, algo salió mal en mi código interno.";
      setChatMessages(prev => prev.map(msg => 
        msg.id === typingMessageId ? { ...msg, content: errorMessage, isTyping: false, isError: true } : msg
      ));
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleResetChat = () => {
    setChatMessages([
        { id: Date.now().toString(), type: 'bot', content: `Empecemos de nuevo. ¿Qué está en tu mente?`, feedback: null }
    ]);
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

  const themeClasses = isDarkMode 
    ? "bg-slate-900 text-slate-100" 
    : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50";

  // El resto del JSX (la parte visual) no necesita cambios.
  return (
    <div className={`min-h-screen font-light ${themeClasses} transition-all duration-500`}>
      <div className="flex h-screen">
        <div className={`w-20 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/60 backdrop-blur-sm border-white/40'} border-r flex flex-col items-center py-8 space-y-8`}>
          <div className="relative">
            <div className={`w-10 h-10 ${isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} rounded-full flex items-center justify-center shadow-sm`}>
              <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
            </div>
          </div>
          <div className="flex flex-col space-y-6 flex-1 justify-center">
            <button title="Reiniciar conversación" onClick={handleResetChat} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'} transition-all duration-300 hover:scale-110`}>
              <RotateCcw className="w-5 h-5" />
            </button>
            <button title="Alternar tema" onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'} transition-all duration-300 hover:scale-110`}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className={`h-16 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/40 backdrop-blur-sm border-white/40'} border-b flex items-center justify-between px-8`}>
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'} rounded-full`}></div>
              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} font-light tracking-wide`}>Serenly</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 bg-emerald-400 rounded-full animate-pulse`}></div>
                <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm font-light`}>online</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex group ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'bot' && (
                      <div className="flex items-start space-x-4 max-w-2xl">
                        <div className={`w-10 h-10 ${isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm`}>
                          <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
                        </div>
                        <div className={`relative rounded-3xl px-6 py-4 shadow-sm ${msg.isError ? (isDarkMode ? 'bg-red-900/50 border-red-800' : 'bg-red-50 border-red-200') : (isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/70 backdrop-blur-sm border-white/50')} border`}>
                          <p className={`font-light leading-relaxed whitespace-pre-wrap ${msg.isError ? (isDarkMode ? 'text-red-300' : 'text-red-700') : (isDarkMode ? 'text-slate-200' : 'text-slate-700')} ${msg.isTyping ? 'animate-pulse' : ''}`}>
                            {msg.content}
                          </p>
                          {!msg.isTyping && !msg.isError && (
                            <div className="absolute -bottom-5 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button onClick={() => handleCopyMessage(msg.id, msg.content)} title="Copiar" className={`p-1.5 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:bg-white/50 rounded-full transition-all duration-200`}>
                                {copiedId === msg.id ? <ClipboardCheck className="w-3 h-3 text-emerald-500"/> : <Clipboard className="w-3 h-3"/>}
                              </button>
                              <button onClick={() => handleFeedback(msg.id, 'like')} title="Me gusta" className={`p-1.5 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:bg-white/50 rounded-full transition-all duration-200`}>
                                <ThumbsUp className={`w-3 h-3 ${msg.feedback === 'like' ? 'text-blue-500 fill-current' : ''}`}/>
                              </button>
                              <button onClick={() => handleFeedback(msg.id, 'dislike')} title="No me gusta" className={`p-1.5 ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} hover:bg-white/50 rounded-full transition-all duration-200`}>
                                <ThumbsDown className={`w-3 h-3 ${msg.feedback === 'dislike' ? 'text-red-500 fill-current' : ''}`}/>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {msg.type === 'user' && (
                      <div className={`${isDarkMode ? 'bg-indigo-900/40 border-indigo-700' : 'bg-gradient-to-r from-slate-100 to-blue-100 border-slate-200'} rounded-3xl px-6 py-4 max-w-lg shadow-sm border backdrop-blur-sm`}>
                        <p className={`${isDarkMode ? 'text-slate-200' : 'text-slate-700'} font-light leading-relaxed whitespace-pre-wrap`}>{msg.content}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
          </div>
          <div className={`${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white/30 backdrop-blur-sm border-white/40'} border-t p-8`}>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Comparte tus pensamientos..."
                  rows="2"
                  className={`w-full px-6 py-4 pr-16 ${isDarkMode ? 'bg-slate-700/50 border-slate-600 text-slate-200 placeholder-slate-400' : 'bg-white/60 backdrop-blur-sm border-white/50 text-slate-700 placeholder-slate-400'} border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none font-light leading-relaxed disabled:opacity-50 transition-all duration-300`}
                  disabled={isSending}
                  onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                />
                <div className="absolute bottom-3 right-3 flex items-center">
                  <button 
                    onClick={handleSendMessage} 
                    disabled={!message.trim() || isSending} 
                    className={`p-3 ${isDarkMode ? 'bg-slate-600 hover:bg-slate-500 text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-600'} rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200`}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;