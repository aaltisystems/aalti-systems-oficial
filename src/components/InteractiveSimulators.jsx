import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Send, User, ChevronRight, Play, Square, RotateCcw, Volume2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../i18n';

export default function InteractiveSimulators() {
  const { language } = useLanguage();
  const t = translations[language].simulators;

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'voice'

  // --- WHATSAPP SIMULATOR STATE ---
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const chatEndRef = useRef(null);

  // Chat conversation script keys from i18n
  const chatScript = [
    { sender: 'user', textKey: 'msg1' },
    { sender: 'bot', textKey: 'msg2' },
    { sender: 'user', textKey: 'msg3' },
    { sender: 'bot', textKey: 'msg4' },
    { sender: 'user', textKey: 'msg5' },
    { sender: 'bot', textKey: 'msg6' },
    { sender: 'user', textKey: 'msg7' },
    { sender: 'bot', textKey: 'msg8' }
  ];

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Handle Chat autoplay
  useEffect(() => {
    if (activeTab !== 'chat') return;

    if (chatStep === 0 && chatMessages.length === 0) {
      // Start conversation
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setChatMessages([{ sender: 'user', text: t.whatsapp[chatScript[0].textKey] }]);
        setChatStep(1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (chatStep < chatScript.length) {
      const currentMsg = chatScript[chatStep];
      const delay = currentMsg.sender === 'bot' ? 2000 : 1500;

      setIsTyping(true);

      const timer = setTimeout(() => {
        setIsTyping(false);
        setChatMessages(prev => [
          ...prev,
          { sender: currentMsg.sender, text: t.whatsapp[currentMsg.textKey] }
        ]);
        setChatStep(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [chatStep, activeTab, language]);

  const restartChat = () => {
    setChatMessages([]);
    setChatStep(0);
    setIsTyping(false);
  };


  // --- VOICE SIMULATOR STATE ---
  const [voiceMessages, setVoiceMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVoiceIndex, setActiveVoiceIndex] = useState(-1);
  const [callDuration, setCallDuration] = useState(0);
  const voiceEndRef = useRef(null);
  const timerRef = useRef(null);

  // Auto scroll voice transcript
  useEffect(() => {
    voiceEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [voiceMessages]);

  // Handle Call Timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  // Voice AI call progression logic
  useEffect(() => {
    if (!isPlaying || activeTab !== 'voice') return;

    const voiceScript = t.voice;

    if (activeVoiceIndex === -1) {
      setActiveVoiceIndex(0);
      setVoiceMessages([{ sender: 'bot', text: voiceScript[0].text }]);
      return;
    }

    if (activeVoiceIndex < voiceScript.length - 1) {
      const nextIndex = activeVoiceIndex + 1;
      const currentMsg = voiceScript[nextIndex];
      const duration = voiceScript[activeVoiceIndex].text.length * 40 + 1000; // simulated speaking duration

      const timer = setTimeout(() => {
        setActiveVoiceIndex(nextIndex);
        setVoiceMessages(prev => [
          ...prev,
          { sender: currentMsg.sender, text: currentMsg.text }
        ]);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Finished speaking
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, activeVoiceIndex, activeTab, language]);

  const toggleVoicePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (activeVoiceIndex === t.voice.length - 1) {
        // restart
        setVoiceMessages([]);
        setActiveVoiceIndex(-1);
        setCallDuration(0);
      }
      setIsPlaying(true);
    }
  };

  const restartVoice = () => {
    setIsPlaying(false);
    setVoiceMessages([]);
    setActiveVoiceIndex(-1);
    setCallDuration(0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Switch tabs and reset
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    restartChat();
    restartVoice();
  };

  return (
    <section id="demo" className="relative py-24 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 overflow-hidden">
      {/* Background visual decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            className="text-indigo-400 text-sm md:text-base font-space-grotesk font-bold uppercase tracking-widest mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-space-grotesk font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.subtitle}
          </motion.h2>
        </div>

        {/* Simulator Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/80 border border-indigo-500/20 rounded-full p-1.5 flex gap-2 backdrop-blur-xl">
            <button
              onClick={() => handleTabChange('chat')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-space-grotesk font-bold text-sm transition-all duration-300 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {t.selectChat}
            </button>
            <button
              onClick={() => handleTabChange('voice')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-space-grotesk font-bold text-sm transition-all duration-300 ${
                activeTab === 'voice'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              {t.selectVoice}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Simulator Content Panel */}
          <div className="md:col-span-7 flex justify-center order-2 md:order-1">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' ? (
                // --- WHATSAPP SIMULATOR UI ---
                <motion.div
                  key="chat-sim"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full max-w-[340px] h-[580px] bg-slate-950 border-8 border-slate-800 rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
                  style={{ boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.25), inset 0 0 0 1px rgba(99, 102, 241, 0.1)' }}
                >
                  {/* Phone Notch/Header info */}
                  <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center font-bold text-white shadow-md">
                          A
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-space-grotesk font-bold text-sm text-white leading-tight">AALTI Bot</h4>
                        <span className="text-[10px] text-green-400 font-dm-sans">{language === 'es' ? 'En línea' : (language === 'pl' ? 'Aktywny' : 'Online')}</span>
                      </div>
                    </div>
                    <button
                      onClick={restartChat}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition text-slate-400 hover:text-white"
                      title={language === 'es' ? 'Reiniciar' : (language === 'pl' ? 'Restartuj' : 'Restart')}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Chat Body */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5">
                    {chatMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-dm-sans leading-relaxed shadow-sm ${
                            msg.sender === 'user'
                              ? 'bg-indigo-600 text-white rounded-tr-none'
                              : 'bg-slate-800 border border-indigo-500/10 text-slate-200 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-slate-800 border border-indigo-500/10 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
                          <span className="text-xs font-semibold font-space-grotesk">{t.statusWriting}</span>
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                          />
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                          />
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Simulated Keyboard Footer */}
                  <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2 items-center">
                    <div className="flex-1 bg-slate-800 border border-slate-700/50 rounded-full px-4 py-2 text-xs text-slate-500 font-dm-sans">
                      {language === 'es' ? 'Mensaje...' : (language === 'pl' ? 'Wiadomość...' : 'Message...')}
                    </div>
                    <button className="p-2.5 bg-indigo-600 rounded-full text-white cursor-default">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                // --- VOICE AI SIMULATOR UI ---
                <motion.div
                  key="voice-sim"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full max-w-[340px] h-[580px] bg-slate-950 border-8 border-slate-800 rounded-[40px] shadow-2xl overflow-hidden flex flex-col justify-between"
                  style={{ boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.2), inset 0 0 0 1px rgba(168, 85, 247, 0.1)' }}
                >
                  {/* Call Header */}
                  <div className="bg-slate-900/50 px-6 py-4 pt-6 text-center border-b border-slate-800">
                    <p className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-1">{t.statusCalling}</p>
                    <h4 className="font-space-grotesk font-bold text-lg text-white">Alex (AALTI Voice)</h4>
                    <p className="text-xs text-slate-400 font-mono mt-1">{formatTime(callDuration)}</p>
                  </div>

                  {/* Call Avatar & Waves */}
                  <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                    <div className="relative mb-8">
                      {/* Pulsing glow behind avatar */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-purple-500/20"
                        animate={isPlaying ? { scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-2 border-purple-400 shadow-xl z-10">
                        <Volume2 className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Animated sound wave bars */}
                    <div className="flex gap-1 h-12 items-center justify-center w-full" aria-label={t.audioWaves}>
                      {[...Array(15)].map((_, i) => {
                        const randomHeight = isPlaying ? [12, 48, 12] : [8, 8];
                        const randomDuration = isPlaying ? 0.8 + Math.random() * 0.6 : 0;
                        return (
                          <motion.div
                            key={i}
                            className="w-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full"
                            style={{ height: 12 }}
                            animate={isPlaying ? { height: randomHeight } : {}}
                            transition={{ duration: randomDuration, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Transcript panel */}
                  <div className="h-40 bg-slate-900 border-t border-slate-800 p-4 overflow-y-auto space-y-3 flex flex-col justify-end">
                    <div className="overflow-y-auto max-h-full space-y-3">
                      {voiceMessages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-2 text-xs"
                        >
                          <span className={`font-bold font-space-grotesk shrink-0 ${msg.sender === 'bot' ? 'text-purple-400' : 'text-indigo-400'}`}>
                            {msg.sender === 'bot' ? 'Alex (AI):' : 'Cliente:'}
                          </span>
                          <span className="text-slate-300 font-dm-sans leading-relaxed">{msg.text}</span>
                        </motion.div>
                      ))}
                      <div ref={voiceEndRef} />
                    </div>
                  </div>

                  {/* Call Controls Footer */}
                  <div className="p-6 bg-slate-900/80 border-t border-slate-800 flex justify-center gap-6 items-center">
                    <button
                      onClick={restartVoice}
                      className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition text-slate-400 hover:text-white"
                      title={language === 'es' ? 'Reiniciar' : (language === 'pl' ? 'Restartuj' : 'Restart')}
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={toggleVoicePlay}
                      className={`p-4 rounded-full text-white shadow-lg transition-all duration-300 ${
                        isPlaying
                          ? 'bg-red-600 hover:bg-red-700 shadow-red-600/30'
                          : 'bg-green-600 hover:bg-green-700 shadow-green-600/30'
                      }`}
                    >
                      {isPlaying ? <Square className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simulator Info Card Panel */}
          <div className="md:col-span-5 order-1 md:order-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl border border-indigo-500/20 bg-slate-900/50 backdrop-blur-xl space-y-4"
            >
              <h3 className="font-space-grotesk text-2xl font-bold text-white flex items-center gap-2">
                {activeTab === 'chat' ? (
                  <>
                    <MessageSquare className="w-6 h-6 text-indigo-400" />
                    {t.chatTitle}
                  </>
                ) : (
                  <>
                    <Phone className="w-6 h-6 text-purple-400" />
                    {t.voiceTitle}
                  </>
                )}
              </h3>

              <p className="text-slate-300 font-dm-sans leading-relaxed text-sm">
                {activeTab === 'chat'
                  ? (language === 'es'
                      ? 'Nuestros chatbots se integran en tus canales de mensajería favoritos para responder dudas comunes al instante, cualificar prospectos y agendar directamente llamadas con leads de alta intención de compra sin requerir personal humano.'
                      : (language === 'pl'
                          ? 'Nasze chatboty integrują się z Twoimi ulubionymi komunikatorami, aby natychmiast odpowiadać na typowe pytania, kwalifikować leady i bezpośrednio umawiać spotkania z klientami o wysokiej intencji zakupowej — bez konieczności angażowania personelu.'
                          : 'Our chatbots integrate with your favorite messaging channels to instantly answer FAQs, qualify prospects, and book sales meetings with high-intent leads automatically without human staff.'))
                  : (language === 'es'
                      ? 'Los agentes de voz por Inteligencia Artificial de AALTI simulan una llamada telefónica fluida con un tono realista y latencia ultra baja (1.8 segundos). Atienden llamadas simultáneas, envían información al WhatsApp de los clientes y agendan reuniones sin esperas.'
                      : (language === 'pl'
                          ? 'Agenci głosowi AI od AALTI symulują płynne rozmowy telefoniczne z realistycznym tonem i niezwykle niskim opóźnieniem (1.8 sekundy). Obsługują wiele połączeń jednocześnie, wysyłają informacje na WhatsApp klienta i umawiają spotkania bez czekania.'
                          : 'AALTI\'s Voice AI agents simulate natural phone calls with a realistic tone and ultra-low latency (1.8 seconds). They handle simultaneous calls, trigger follow-up info directly to customer WhatsApps, and schedule meetings without delays.')
                    )}
              </p>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="font-space-grotesk font-bold text-indigo-400 text-xs uppercase tracking-wider mb-2">
                  {language === 'es' ? 'Beneficios Clave' : (language === 'pl' ? 'Kluczowe Korzyści' : 'Key Benefits')}
                </h4>
                <ul className="space-y-2.5">
                  {activeTab === 'chat' ? (
                    <>
                      <li className="flex gap-2 text-xs text-slate-400 font-dm-sans items-center">
                        <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0" />
                        {language === 'es' ? 'Disponible 24/7/365 en WhatsApp e Instagram' : (language === 'pl' ? 'Dostępny 24/7/365 na WhatsAppie i Instagramie' : 'Available 24/7/365 on WhatsApp & Instagram')}
                      </li>
                      <li className="flex gap-2 text-xs text-slate-400 font-dm-sans items-center">
                        <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0" />
                        {language === 'es' ? 'Guardado directo en CRM (HubSpot, Salesforce, etc.)' : (language === 'pl' ? 'Bezpośredni zapis w CRM (HubSpot, Salesforce itp.)' : 'Direct sync to CRM (HubSpot, Salesforce, etc.)')}
                      </li>
                      <li className="flex gap-2 text-xs text-slate-400 font-dm-sans items-center">
                        <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0" />
                        {language === 'es' ? 'Calificación inteligente y filtrado automático de spam' : (language === 'pl' ? 'Inteligentna kwalifikacja i automatyczne filtrowanie spamu' : 'Smart qualification & automatic spam filtering')}
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex gap-2 text-xs text-slate-400 font-dm-sans items-center">
                        <ChevronRight className="w-4 h-4 text-purple-500 shrink-0" />
                        {language === 'es' ? 'Latencia de voz de 1.8s (sensación humana fluida)' : (language === 'pl' ? 'Opóźnienie głosu 1.8s (naturalne wrażenie ludzkiej rozmowy)' : 'Voice latency of 1.8s (natural human-like conversation)')}
                      </li>
                      <li className="flex gap-2 text-xs text-slate-400 font-dm-sans items-center">
                        <ChevronRight className="w-4 h-4 text-purple-500 shrink-0" />
                        {language === 'es' ? 'Cero llamadas en cola (100+ llamadas a la vez)' : (language === 'pl' ? 'Brak kolejkowania (ponad 100 połączeń jednocześnie)' : 'Zero queued calls (100+ concurrent calls)')}
                      </li>
                      <li className="flex gap-2 text-xs text-slate-400 font-dm-sans items-center">
                        <ChevronRight className="w-4 h-4 text-purple-500 shrink-0" />
                        {language === 'es' ? 'Envío automático de mensajes y enlaces post-llamada' : (language === 'pl' ? 'Automatyczne wysyłanie wiadomości i linków po rozmowie' : 'Automatic sending of messages & links post-call')}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
