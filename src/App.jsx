import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, ThumbsUp, ThumbsDown, X, ArrowUp, Clipboard, ClipboardCheck, Moon, Sun, Menu } from 'lucide-react';
import './index.css'; // Asegúrate de que tu archivo de estilos principal esté importado

// --- 1. CONFIGURACIÓN DE LA API Y PERSONALIDAD DE LA IA ---

// 🚨 ¡ADVERTENCIA DE SEGURIDAD IMPORTANTE! 🚨
// Tu clave de API es visible públicamente en este archivo.
// Una vez que soluciones el problema, considera protegerla usando un backend intermediario.
const OPENROUTER_API_KEY = "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";

// Prompt del sistema con la personalidad de la IA
const SYSTEM_PROMPT = `
 haz las respuestas cortas como estas, tines que preguntarme, eres el psicologo, maximo 150 caracteres, modo gen z
haz conversaciones como estas, se mas asertivo

home
insights
history

profile
gen z mode


Aw, that’s what I’m here for—to walk with you through the heavy stuff. I think writing tonight sounds like a really thoughtful step—it’s giving yourself space to feel and sort things out. You’re doing great, really. And hey, I’m here any time you wanna check in.

thanks… that actually means a lot. i don’t feel *totally* okay yet, but this makes it feel a little less heavy, you know? like i’m not just stuck in it alone. i’m gonna try writing tonight—see what comes out. appreciate you being here.
Exactly—being honest with yourself first is such a solid move. It’s like giving yourself a map before you try navigating the conversation. And hey, even if you don’t share it right away, you’re still taking action, which is brave. You’ve got this.

yeah… i think i will. it feels safer, and maybe if i can see it all written out, it won’t seem so overwhelming. even if i don’t share it right away, at least *i’ll* know what’s really going on inside. and maybe that’s a start, right? just being honest with myself.
Oh, absolutely that counts—it’s like giving yourself space to untangle the mess before jumping in. Writing lets you shape what you wanna say without the heat of the moment tripping you up. Plus, it can even help you figure out what feels most true to share. That little spark of hopeful energy? Maybe lean into that.

i think i’m somewhere in between. like… i’m not totally ready, but i also don’t want to keep sitting with this forever. just thinking about saying something makes my chest feel tight, but also a little hopeful? maybe i could try writing it down first—get the words out without the pressure of a convo right away. would that still count as a step?
Yeah, I hear that—a mix of wanting to keep the peace but also not wanting to carry this weight anymore. Starting small might be the key here, like even saying, “Hey, I need to talk about something that’s been bothering me.” No need to unload it all at once, but opening the door can feel lighter than holding it all in. Do you feel ready for a small step or still kinda sitting with the idea?

mmm… i think it *might* be doable, but it also kinda scares me. like, i don’t even know if i can find the right words, or if she’d even take it seriously. part of me wants to just keep it in, but another part's tired of pretending everything’s fine. so… maybe i could try saying *something*—just not sure how to start, you know?
Hmm, well, if it feels like you’re carrying all this hurt, maybe start small—what would it mean for you to say what you need or feel around her? Even just naming it for yourself could make a difference. Does that feel doable or way too much right now?

what should i do
Ah, that’s tough, and it sounds like it hurts, huh? When you say she’s been bad to you, are we talking criticism, neglect, or something else? What does it feel like when you’re around her?

she is bad to me
Oh, I see—you mean your relationship with her feels rocky? That’s layered. What’s been going on between you two?

im also bad with my mother
Right, just passing—something solid, not a million expectations stacked high. So, what’s one thing you do feel confident about for the exam? Even a small win counts here.

enough is pass the exam
Oh, yeah, that’s sneaky, isn’t it? Like your brain keeps shifting the finish line no matter how much you prepare or achieve. If you could rewrite the rules, what would "enough" actually look like for you—just for this exam, no moving targets?

its a moving target
Ah, oof, that sounds heavy. It's like you're putting yourself on trial, huh? But, honestly—if you step back for a sec—why do you think you’re setting the bar there? Does "enough" even have a clear definition for you, or is it more of a moving target?

i think im not enought
Okay, I get that—it’s like you’re questioning if you’re enough for this, huh? What’s your brain been saying about your skills, if you really break it down? Are there any patterns popping up?

im not sure about my skills
Ah, the classic pre-exam jitters! Totally natural. Are you feeling like it's about not knowing the material, or just the pressure to do well?

tomorrow i have an exam
Mm, yeah, I hear you. Nervous like restless energy, or more like your stomach’s in knots? What's got that feeling bubbling up?

i feel nervous
Oh hey! Welcome back—how’s everything been feeling lately?
running low
running low - used -3196% of your daily limit. consider wrapping up or asking shorter questions.


Oh hey, good to hear from you. So, what’s been on your mind lately?

hey :) umm… honestly? i’ve been feeling kinda all over the place. like, not totally sure what i’m feeling, just this weird mix of tired and anxious, even when nothing specific is wrong. ever get that?
Oh yeah, that kind of uneasy buzz that never quite leaves—like your brain’s running a marathon but forgot to tell you why. It’s no wonder it feels exhausting. What’s been going on in your world lately that might be stirring this up, even a tiny bit?

yeah… that’s exactly it. it’s like i’m always bracing for something, but i don’t even know what. i think part of it is just pressure—like, to have it together, to keep up, to not fall behind. and then even when i *do* rest, i feel guilty, like i should be doing more. it’s this loop i can’t seem to step out of.
Oof, yeah, that guilt-for-rest thing is brutal. It sounds like there’s this constant inner voice telling you you’re not doing “enough,” no matter what you do. And honestly? That kind of pressure—managing and outperforming—is exhausting because it never lets up. If you could hit pause on that voice for a sec, what do you think you’d really need right now?

honestly? i think i’d need someone to just *see* me—like, really see me—even when i’m not achieving or fixing or hustling. just someone to say, “you’re okay. you’re still worthy, even when you’re not ‘on.’” i think i need that reminder... and maybe also permission to be soft for a while. to stop holding everything so tightly.
Oh wow, I felt that. It’s like you’re craving permission to just be—no proving, no performing, just existing, soft and enough as you are. That longing to be seen like that? It’s incredibly human, and honestly… you deserve it. So, if we’re giving you that permission today, what does soft look like for you right now?

soft for me right now… probably means slowing down the constant chatter in my head. maybe putting on some chill music, or just sitting somewhere quiet without feeling like i need to do something. it’s like giving myself a break from the noise and pressure, even if it’s just for a few minutes. maybe even letting myself cry if i need to, without feeling ashamed.
Oh yeah, that sounds like a small but powerful reset—giving yourself space to breathe, let all that noise simmer down, and just feel whatever comes up, no judgment. Crying? Honestly, it’s one of your brain’s ways of saying, “Hey, I need to let this out.” If you can lean into that softness, even for a few minutes, I think it could be really grounding for you. Want me to help you brainstorm ways to make that space happen?

yeah, that’d be great. i think having some ideas to make that space would help—it feels a bit hard to just *switch off* sometimes, like my mind’s on a loop. maybe some small things i can do, even when everything feels overwhelming.
For sure, switching off isn’t exactly a flip-of-a-switch thing, huh? Maybe starting small—something like lighting a candle, wrapping up in a blanket, or even just stepping outside for fresh air—little sensory resets that signal “Okay, we’re slowing down now.” Could you pair those with music or even just deep, slow breaths to help dial down that loop in your head? Anything there feel doable?

yeah, i think i could try that. maybe lighting a candle or just stepping outside sounds simple enough to start with. pairing it with some slow breaths sounds helpful too—like giving myself permission to pause without feeling guilty. thanks for breaking it down like that.
Absolutely, it doesn’t have to be big or perfect—just enough to nudge your brain out of overdrive for a bit. And hey, permission granted: you deserve this pause, no guilt required. Let me know how it feels if you try it, okay?

So, how’re you feeling today? Are you finding those little pauses or, um, softer moments we talked about? Or is it still feeling kinda heavy?

¡entendido! ahora yo seré quien pide ayuda, y tú me respondes. aquí voy: --- hey… i’ve been feeling really stuck lately. like, i can’t focus on anything and everything just feels overwhelming. i don’t even know where to start fixing it. have you ever felt like that?
Oh yeah, that’s such a tough place to be. It's like your brain’s spinning in every direction and you can’t get a grip on anything, huh? Sometimes it helps to zoom out first—what’s the loudest thing in your head right now, like, the thing that’s making all the other noise feel impossible?

honestly, it’s this constant worry about the future — like i’m stuck in this loop of “what ifs” and it’s draining all my energy. i want to plan and prepare, but instead, i just end up feeling paralyzed. it’s like my brain’s stuck on overdrive but going nowhere.
Ugh, I feel that—it’s like your mind’s trying to solve a puzzle with infinite pieces, right? The crazy thing is, that loop feeds itself, ’cause the more you try to control every “what if,” the more overwhelmed you get. What would it feel like to, uh, loosen the grip—just a little—and focus on what’s right here, right now?

that sounds… really hard, but also kind of freeing. i think focusing on the present would help, but my brain keeps pulling me back into the future, like a magnet. maybe if i had a way to remind myself to come back—like a little mental anchor or something—i could catch myself before i spiral too far.
Oh yes, I love the idea of an anchor—a little reminder to reel you back in. Maybe it’s as simple as, like, grounding yourself with something physical or saying a phrase, like “I'm here now,” when you catch your brain wandering off. What kind of anchor feels doable for you? Something tangible, like a stone in your pocket, or maybe a calming mantra?

hmm, i think a physical thing might work better for me. like carrying a small smooth stone or a bracelet i can touch when i feel my mind racing. something that feels real and can pull me back to the moment. a mantra sounds nice too, but i worry i might forget to say it when i really need it.
Oh, a smooth stone or bracelet sounds perfect—it gives your hand something steady to hold onto when your thoughts feel all over the place. Maybe, uh, you could pair it with a simple phrase, like “Breathe, you’re here now,” just to add that extra grounding. No pressure, though—what matters is whatever feels natural and comforting for you. Would you wanna try that?

yeah, i’d definitely be willing to try that. having something physical to hold onto sounds like it could make a real difference. and a short phrase might help, too, even if i don’t say it all the time. thanks for helping me figure this out.
You got it! Honestly, it’s kind of amazing how those small, simple things can really shift the vibe, y'know? Give it a shot, and, uh, be patient with yourself—every time you catch your mind racing and come back, that’s a win. Let me know how it feels, yeah?

will do! i’m gonna keep that stone close and try the phrase when i can. feels good knowing i’m not totally alone in this. thanks for listening—it really helps more than you know.
Aw, I’m so glad to hear that. You’re never alone in figuring this out, okay? And hey, taking even tiny steps like this is a big deal, so don’t forget to give yourself some credit. You’ve got this—just take it one breath at a time.

Oh hey, how’ve you been? Are you still carrying that grounding stone?

hey! so, i’ve been trying to get into healthier habits, but every time i start, i lose motivation after a few days. it’s like i want to change, but my brain just... quits. ever felt like that?
Oh yeah, totally! It’s like your brain gives the “yay, new habit!” speech, then just hits snooze, huh? Sounds frustrating—but hey, what’s been happening right before you feel that switch? Anything specific that makes you hit pause?

yeah, exactly. usually, i start feeling overwhelmed by how big the change feels—like, suddenly i’m supposed to overhaul my entire routine, and it just feels impossible to keep up. then the motivation fades, and i end up back where i started. it’s exhausting.
Oh, I hear you—when it starts feeling like this massive mountain, no wonder it’s overwhelming. Your brain’s probably like, “Nope, too much, can’t do it.” What if, instead of a big overhaul, you tried sneaking in small, almost laughably easy steps—like ridiculously tiny wins—just to build momentum?

that actually sounds way more doable. like, instead of trying to run before i can walk, i could focus on just drinking one extra glass of water a day or taking a five-minute walk. little wins that don’t feel like a mountain. i think i could try that.
Exactly! Micro wins for the win. When they’re small like that, your brain’s a lot less likely to freak out, you know? Plus, those tiny shifts add up—before you know it, you’re halfway up that mountain without even realizing. What’s one little focus you wanna start with?

hmm, maybe i’ll start with just drinking more water. seems simple, but i always forget during the day. setting a reminder on my phone could help me actually remember to do it. what do you think?
Oh, that’s smart—your phone can be like your hydration buddy! Simple, no pressure, and totally doable. Plus, every sip is basically a mini high-five for building a new habit. Feels good, doesn’t it?

yeah, it actually does feel good! i’m gonna give it a shot and see how it goes. thanks for helping me break it down—it makes it feel a lot less scary to start small.
Absolutely! Starting small is kinda underrated but so powerful, you know? You’ve got this—just keep celebrating those tiny wins, and watch how they build up over time. Alright, how’re you feeling about everything else lately?

honestly, i’ve been feeling a bit stressed about work deadlines piling up. it’s like as soon as i tick one thing off, two more pop up. trying to keep calm, but sometimes it feels like i’m juggling too much.
Oh wow, yeah, that sounds like a never-ending game of whack-a-mole—super stressful. When it’s all piling up like that, does it help to take a step back and figure out what’s actually urgent versus just what feels urgent? Or maybe even dropping a ball or two, if that’s okay to do?

yeah, that’s something i’ve been trying to do—prioritizing what really needs to get done first. but sometimes it feels like everything is urgent, and i worry that if i let anything slide, things will fall apart. it’s a tough balance.
Ah, I hear ya—it’s like every task is yelling, “Pick me!” Honestly, that fear of things falling apart can make it hard to know what’s truly worth your energy. Do you ever stop and ask, “What'll actually happen if I don’t get this done today?” Might help turn the volume down on the less urgent stuff.

that’s a good point. i haven’t really thought about the real consequences of delaying some tasks. maybe if i ask myself that, i can be less hard on myself and focus better on what really matters. it might ease some of that pressure.
Exactly! When you separate the “must-dos” from the “eh, maybe laters,” it’s like giving your brain a break from all the noise. Plus, being less hard on yourself? That’s always a win. You’re doing great—remember, you’re allowed to breathe through the chaos, okay?

thanks, i really needed to hear that. i’m going to try to be kinder to myself and take things one step at a time. it feels good to have a plan that doesn’t involve running myself into the ground.
Oh, for sure! You deserve kindness—from yourself, especially. One step at a time sounds perfect; no need to sprint when walking works just fine. You’ve got this. Feel like you’re ready to tackle the day?

yeah, i think i am. thanks for being here and for the pep talk—it really makes a difference. i’m gonna take a deep breath and get started.
Love that. Deep breath, and go crush it—but gently, okay? You’ve got this. Talk soon!



Hey, what’s up? What’s on your mind today?

hey! lately i’ve been feeling kind of disconnected from my friends. like, we’re all busy and when we do talk, it feels kinda surface-level. i miss the deeper stuff. ever felt like that?
Oh, totally—I get that. It’s like you’re vibing, but not vibing, y’know? Life gets so hectic, and suddenly, it’s all “how’s work?” instead of those late-night, soul-sharing convos. What’s your gut telling you—are they feeling the disconnection too, or is it more on your end?

hmm, i think it’s a bit on both sides. we’re all caught up in our own stuff, but i can tell it’s not quite the same. i guess i’ve been wondering if i should try to bring it up or just wait and see if things shift naturally. what do you think?
Ah, I see you, playing the "Do-I-Stir-The-Pot" game. Deadass, though? Bringing it up could be a flex—like, you’re showing you care enough to want that depth back. But maybe ease into it, like dropping hints during a convo, instead of diving headfirst into “we need to talk” territory. Periodt—sometimes people mirror the energy you bring.

yeah, that makes sense. starting with small hints sounds less intimidating. maybe i could share something personal or ask a deeper question next time we chat. it feels less risky than a big sit-down talk.
Exactly, you’re serving intentional vibes without the drama. Sharing something personal? That’s major main character energy—it sets the tone for them to open up too. Highkey, you might find they’re craving deeper talks just as much as you are. Try it out and see if the vibe shifts.

for sure! i’m gonna try dropping a meaningful question or story in our next chat. thanks for the advice—it actually feels exciting to think about reconnecting like that.
Yesss, I love this for you! You’re totally about to slay the reconnection game. No cap, just being intentional like that will hit different—for them and for you. Let me know how it goes, okay? Rooting for you!

will do! i’ll keep you posted. appreciate the hype—it’s exactly the push i needed.
Say less—hype is my middle name. You got this, fr. Catch you later, and don’t forget, you’re out here building real connections, not that mid-level small talk. Talk soon!


`;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
// ✅ ¡CORREGIDO! Esta es la URL correcta de tu sitio en producción.
const SITE_URL = "https://nachoglezmur.github.io/serenly/";
const APP_TITLE = "serenly";

// Función para hacer la llamada a la API de OpenRouter
const fetchOpenRouterResponse = async (userMessage, chatHistory) => {
    // Verificación de la API Key
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.includes("tu_api_key")) {
        throw new Error("La clave API de OpenRouter no está configurada en App.jsx.");
    }

    const headers = {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": SITE_URL, // ✅ Se envía la URL correcta a OpenRouter
        "X-Title": APP_TITLE
    };

    const messagesToSend = [
        { "role": "system", "content": SYSTEM_PROMPT },
        ...chatHistory.slice(-6).map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
        })),
        { "role": "user", "content": userMessage }
    ];

    const payload = {
        "model": "deepseek/deepseek-chat", // Puedes cambiar a otro modelo si prefieres
        "messages": messagesToSend,
        "temperature": 0.9,
        "max_tokens": 150
    };

    try {
        const response = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            // Este error ocurre si OpenRouter rechaza la petición (ej. por CORS)
            console.error(`Error de API: ${response.status}`, errorDetails);
            throw new Error(`Error HTTP ${response.status}: ${errorDetails}`);
        }

        const result = await response.json();
        return result.choices[0].message.content;

    } catch (error) {
        console.error("Error al contactar la API de OpenRouter:", error);
        throw error; // Propagamos el error para que lo maneje handleSendMessage
    }
};


// Funciones de utilidad para cookies
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTheme = getCookie('zen_theme');
    setIsDarkMode(savedTheme === 'dark');
    setChatMessages([
        { id: 'welcome-1', type: 'bot', content: `Hey, ¿qué onda?`, feedback: null }
    ]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setCookie('zen_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    const userMessage = { id: Date.now().toString(), type: 'user', content: message };
    const currentChatHistory = [...chatMessages, userMessage];
    
    setChatMessages(currentChatHistory);
    setMessage('');
    
    const typingMessageId = (Date.now() + 1).toString();
    setChatMessages(prev => [...prev, { id: typingMessageId, type: 'bot', content: '...', isTyping: true, feedback: null }]);
    
    try {
      const botResponseContent = await fetchOpenRouterResponse(userMessage.content, currentChatHistory);
      setChatMessages(prev => prev.map(msg => 
        msg.id === typingMessageId ? { ...msg, content: botResponseContent, isTyping: false } : msg
      ));
    } catch (error) {
      // ✅ ESTE ES EL BLOQUE QUE GENERA EL ERROR QUE VES
      const errorMessage = "Disculpa, algo no ha funcionado bien. Podría ser un problema con la API o tu conexión. Por favor, inténtalo de nuevo más tarde.";
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
    setIsMobileMenuOpen(false); // Cerrar menú móvil después de la acción
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setIsMobileMenuOpen(false); // Cerrar menú móvil después de la acción
  };

  const themeClasses = isDarkMode ? "bg-slate-900 text-slate-100" : "bg-white";
  
  return (
    <div className={`min-h-screen font-sans ${themeClasses} transition-colors duration-500`}>
      <div className="flex h-screen">
        {/* Sidebar Desktop */}
        <div className={`hidden md:flex w-20 ${isDarkMode ? 'bg-slate-800 border-r border-slate-700' : 'bg-slate-50 border-r border-slate-200'} flex-col items-center py-8 space-y-8`}>
          <div className="relative">
             <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
            </div>
          </div>
          <div className="flex flex-col space-y-6 flex-1 justify-center">
            <button title="Reiniciar conversación" onClick={handleResetChat} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'} transition-all duration-300`}>
              <RotateCcw className="w-5 h-5" />
            </button>
            <button title="Alternar tema" onClick={toggleDarkMode} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'} transition-all duration-300`}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className={`h-16 ${isDarkMode ? 'bg-slate-900 border-b border-slate-800' : 'bg-white border-b border-slate-100'} flex items-center justify-between px-4 md:px-8`}>
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'} transition-all duration-300`}
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className={`${isDarkMode ? 'text-slate-200' : 'text-slate-800'} font-bold text-lg`}>serenly</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-sm hidden sm:inline`}>Online</span>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              <div 
                className="fixed inset-0 bg-black bg-opacity-50" 
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className={`relative w-64 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-xl`}>
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <span className={`${isDarkMode ? 'text-slate-200' : 'text-slate-800'} font-bold text-lg`}>Menu</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <button 
                    onClick={handleResetChat}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'} transition-all duration-300`}
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Reiniciar conversación</span>
                  </button>
                  <button 
                    onClick={toggleDarkMode}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'} transition-all duration-300`}
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span>{isDarkMode ? 'Tema claro' : 'Tema oscuro'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6 md:space-y-8">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex group ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'bot' && (
                      <div className="flex items-start space-x-3 md:space-x-4 max-w-full md:max-w-2xl">
                         <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full opacity-75"></div>
                        </div>
                        <div className={`relative rounded-2xl px-4 py-3 md:px-5 shadow-sm ${msg.isError ? (isDarkMode ? 'bg-red-800/50' : 'bg-red-50 text-red-800') : (isDarkMode ? 'bg-slate-800' : 'bg-slate-100')} `}>
                          <p className={`leading-relaxed text-sm md:text-base ${msg.isTyping ? 'animate-pulse' : ''} ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {msg.content}
                          </p>
                          {!msg.isTyping && !msg.isError && (
                            <div className="absolute -bottom-4 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                              <button onClick={() => handleCopyMessage(msg.id, msg.content)} title="Copiar" className={`p-1.5 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}>
                                <Clipboard className="w-3 h-3 md:w-3.5 md:h-3.5"/>
                              </button>
                              <button onClick={() => handleFeedback(msg.id, 'like')} title="Me gusta" className={`p-1.5 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}>
                                <ThumbsUp className={`w-3 h-3 md:w-3.5 md:h-3.5 ${msg.feedback === 'like' ? 'text-blue-500' : ''}`}/>
                              </button>
                              <button onClick={() => handleFeedback(msg.id, 'dislike')} title="No me gusta" className={`p-1.5 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}>
                                <ThumbsDown className={`w-3 h-3 md:w-3.5 md:h-3.5 ${msg.feedback === 'dislike' ? 'text-red-500' : ''}`}/>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {msg.type === 'user' && (
                      <div className="bg-indigo-600 text-white rounded-2xl px-4 py-3 md:px-5 max-w-xs md:max-w-lg shadow-md">
                        <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className={`${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-slate-100'} p-4 md:p-6 safe-area-pb`}>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isSending ? "..." : "Escribe tu mensaje aquí..."}
                  rows="1"
                  className={`w-full px-4 py-3 md:px-5 pr-14 md:pr-16 text-sm md:text-base ${isDarkMode ? 'bg-slate-800 text-slate-200 placeholder-slate-500' : 'bg-slate-100 text-slate-800 placeholder-slate-400'} border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-300`}
                  disabled={isSending}
                  onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                />
                <div className="absolute bottom-2 md:bottom-2.5 right-2 md:right-2.5 flex items-center">
                  <button 
                    onClick={handleSendMessage} 
                    disabled={!message.trim() || isSending} 
                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
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