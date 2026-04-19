import React, { useState, useEffect, useRef } from 'react';
import {
  Bot, Zap, Calendar, MessageSquare, Instagram,
  CheckCircle, ArrowRight, Shield, Star, Menu,
  X, Play, Target, Rocket, Award, Clock, XCircle, Check
} from 'lucide-react';
import logoAalti from './assets/simbolo-aalti.png';

/* ─── Animated counter ─────────────────────────────────────────── */
const AnimatedNumber = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    let raf;
    const endNum = parseFloat(end);
    const isFloat = endNum % 1 !== 0;
    const step = (now) => {
      if (!startTime) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      setCount(isFloat ? (p * endNum).toFixed(1) : Math.floor(p * endNum));
      if (p < 1) { raf = requestAnimationFrame(step); } else { setCount(end); }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

/* ─── Main component ────────────────────────────────────────────── */
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const WA_LINK = 'https://wa.me/34647119040';
  const IG_LINK = 'https://instagram.com/aaltisystems';

  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── CUSTOM STYLES ─────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');

        * { -webkit-font-smoothing: antialiased; }

        @keyframes float {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-20px) scale(1.02); }
        }
        @keyframes float-delayed {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(20px) scale(0.98); }
        }
        @keyframes pulse-glow {
          0%   { box-shadow: 0 0 0 0   rgba(79,70,229,.45); }
          70%  { box-shadow: 0 0 0 22px rgba(79,70,229,0);  }
          100% { box-shadow: 0 0 0 0   rgba(79,70,229,0);   }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(250%)  skewX(-15deg); }
        }
        @keyframes logo-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes logo-pulse-glow {
          0%,100% { filter: drop-shadow(0 0 6px rgba(99,102,241,.5)); }
          50%     { filter: drop-shadow(0 0 18px rgba(168,85,247,.8)); }
        }
        @keyframes border-glow {
          0%,100% { border-color: rgba(99,102,241,.3); }
          50%     { border-color: rgba(168,85,247,.7); }
        }

        .animate-float         { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-pulse-glow    { animation: pulse-glow 2s infinite; }
        .logo-glow             { animation: logo-pulse-glow 3s ease-in-out infinite; }
        .border-animated       { animation: border-glow 3s ease-in-out infinite; }

        .shimmer-effect               { position:relative; overflow:hidden; }
        .shimmer-effect::after        { content:''; position:absolute; top:0; left:0; width:40%; height:100%;
                                        background:linear-gradient(to right,transparent,rgba(255,255,255,.15),transparent);
                                        animation:shimmer 3s infinite; }

        .glass-panel { background:rgba(15,23,42,.6); backdrop-filter:blur(16px);
                       -webkit-backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,.05); }

        /* ── mobile-first tweaks ─── */
        @media (max-width:640px) {
          .hero-h1        { font-size: clamp(2.4rem, 9vw, 4rem) !important; line-height:1.1 !important; }
          .hero-sub       { font-size: 1rem !important; }
          .section-h2     { font-size: clamp(1.8rem, 8vw, 3rem) !important; }
          .stat-number    { font-size: 2.6rem !important; }
          .testimonial-q  { font-size: 1rem !important; }
        }
      ` }} />

      {/* ── TOP URGENCY BANNER ────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 text-white py-2 text-center overflow-hidden relative">
        <div className="absolute inset-0 shimmer-effect pointer-events-none" />
        <div className="relative z-10 flex items-center justify-center gap-2 px-4 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse shrink-0" />
          Solo aceptamos 3 nuevos proyectos este mes &mdash; <span className="text-yellow-300 ml-1">2 Plazas Disponibles</span>
        </div>
      </div>

      {/* ── NAVIGATION ───────────────────────────────────────────── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'top-0 bg-[#030712]/85 backdrop-blur-2xl border-b border-white/5 py-3' : 'top-8 bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

          {/* Logo + Wordmark */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-[2px] shadow-[0_0_20px_rgba(79,70,229,.35)] group-hover:shadow-[0_0_35px_rgba(79,70,229,.65)] transition-all duration-500 border-animated">
              <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img src={logoAalti} alt="Aalti Systems" className="w-6 h-6 sm:w-7 sm:h-7 object-contain logo-glow" />
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none">
              AALTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">SYSTEMS</span>
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-wide text-slate-300">
            <a href="#soluciones" className="hover:text-white transition-colors">Soluciones</a>
            <a href="#metodo"     className="hover:text-white transition-colors">El Método</a>
            <a href="#resultados" className="hover:text-white transition-colors">Resultados</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href={IG_LINK} target="_blank" rel="noreferrer"
               className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer"
               className="shimmer-effect bg-white text-slate-950 px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,.2)] text-sm">
              Auditoría Gratuita <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ──────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030712]/97 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 md:hidden">
          {/* Logo centrado en menú móvil */}
          <div className="flex items-center gap-3 mb-4">
            <img src={logoAalti} alt="Aalti" className="w-12 h-12 object-contain logo-glow opacity-80" />
            <span className="text-2xl font-black tracking-tighter">AALTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">SYSTEMS</span></span>
          </div>
          <a href="#soluciones" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-white hover:text-indigo-400 transition-colors">Soluciones</a>
          <a href="#metodo"     onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-white hover:text-indigo-400 transition-colors">El Método</a>
          <a href="#resultados" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-white hover:text-indigo-400 transition-colors">Resultados</a>
          <div className="flex gap-4 mt-4">
            <a href={IG_LINK} target="_blank" rel="noreferrer"
               className="w-12 h-12 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Instagram className="w-6 h-6" />
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer"
               className="animate-pulse-glow bg-indigo-600 text-white px-8 py-3 rounded-full font-bold text-base shadow-[0_0_25px_rgba(79,70,229,.4)] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 fill-current" /> WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        {/* BG blobs */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-[600px] h-72 sm:h-[600px] bg-indigo-600/20 rounded-full blur-[100px] sm:blur-[150px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-60 sm:w-[500px] h-60 sm:h-[500px] bg-purple-600/20 rounded-full blur-[100px] sm:blur-[150px] animate-float-delayed pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/60 to-[#030712]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">

          {/* Hero logo badge */}
          <div className="relative mb-8">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 border border-indigo-500/30 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm shadow-[0_0_40px_rgba(99,102,241,.2)]">
              <img src={logoAalti} alt="Aalti Systems" className="w-full h-full object-contain logo-glow" />
            </div>
            {/* Ping ring */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-indigo-500" />
            </span>
          </div>

          {/* AI badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full glass-panel border border-indigo-500/30 text-xs sm:text-sm font-semibold text-indigo-300 mb-8 hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-500" />
            </span>
            Arquitectura de Inteligencia Artificial Avanzada
          </div>

          {/* Headline */}
          <h1 className="hero-h1 text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1] max-w-5xl">
            Tu competencia ya usa IA.{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
              Tú sigues perdiendo&nbsp;ventas.
            </span>
          </h1>

          {/* Sub */}
          <p className="hero-sub text-base sm:text-xl md:text-2xl text-slate-400 max-w-2xl sm:max-w-3xl mx-auto mb-10 leading-relaxed font-light px-2">
            Instalamos <strong className="text-white font-semibold">Sistemas Autónomos</strong> en tu negocio que captan, filtran y cierran clientes <em>24/7</em> sin que tengas que mover un dedo.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
            <a href={WA_LINK} target="_blank" rel="noreferrer"
               className="animate-pulse-glow shimmer-effect bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" />
              Escalar mi Negocio Ahora
            </a>
            <a href={IG_LINK} target="_blank" rel="noreferrer"
               className="glass-panel hover:bg-white/10 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto border border-white/10">
              <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
              Síguenos en Instagram
            </a>
          </div>

          {/* Trust logos */}
          <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/5 w-full flex flex-col items-center">
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-5">Empresas que ya operan en piloto automático</p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-16 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-700">
              <div className="text-base sm:text-xl font-black font-serif tracking-tighter">TECH<span className="text-indigo-500">CORP</span></div>
              <div className="text-base sm:text-xl font-black tracking-widest border-2 border-current px-2">VITALITY</div>
              <div className="text-base sm:text-xl font-bold flex items-center gap-1"><Zap className="w-4 h-4 sm:w-5 sm:h-5" /> NOVA</div>
              <div className="text-base sm:text-xl font-black italic">Scale<span className="text-purple-500">B2B</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMA vs SOLUCIÓN ───────────────────────────────── */}
      <section id="metodo" className="py-16 sm:py-24 relative bg-[#050b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-h2 text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">¿Por qué estás estancado?</h2>
            <p className="text-base sm:text-xl text-slate-400 max-w-xl mx-auto">El 68% de las ventas B2B se pierden por no responder en los primeros 5 minutos.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Old way */}
            <div className="glass-panel p-7 sm:p-10 rounded-3xl border border-red-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px]" />
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-11 h-11 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-300">La Forma Tradicional</h3>
              </div>
              <ul className="space-y-4 sm:space-y-5">
                {["Pierdes horas respondiendo FAQs repetitivas.","Leads fríos que te dejan en visto.","Agendamiento manual que genera fricción.","Dependencia total de personal humano (8h al día)."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 font-medium text-sm sm:text-base">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Aalti way */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-7 sm:p-10 rounded-3xl border border-indigo-500/30 relative overflow-hidden shadow-[0_0_40px_rgba(79,70,229,.15)] hover:shadow-[0_0_60px_rgba(79,70,229,.3)] transition-all duration-500 group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] group-hover:bg-indigo-400/30 transition-colors" />
              <div className="flex items-center gap-4 mb-6 sm:mb-8 relative z-10">
                {/* Logo mini en el método Aalti */}
                <div className="w-11 h-11 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0 p-2">
                  <img src={logoAalti} alt="" className="w-full h-full object-contain logo-glow" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">El Método Aalti</h3>
              </div>
              <ul className="space-y-4 sm:space-y-5 relative z-10">
                {["Asistentes de IA que responden en 2 segundos.","Cualificación automática: Solo hablas con leads calientes.","Agendado automático directamente en tu calendario.","Operación ininterrumpida: 24 horas, 7 días a la semana."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white font-semibold text-sm sm:text-base">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUCIONES ────────────────────────────────────────────── */}
      <section id="soluciones" className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-20">
            <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">Ingeniería de Sistemas</span>
            <h2 className="section-h2 text-3xl sm:text-4xl md:text-6xl font-black mb-5 sm:mb-6">Tu Ecosistema Digital.<br />Altamente Optimizado.</h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              { icon: <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />, title: "IA Cognitiva B2B/B2C", desc: "Desplegamos cerebros digitales entrenados con tu base de conocimientos. Atienden, persuaden y resuelven objeciones como tu mejor vendedor.", feature: "Integración nativa con WhatsApp & IG." },
              { icon: <Target className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />, title: "Embudos Autónomos", desc: "Sistemas de captación que filtran prospectos basura. Si el lead no tiene presupuesto o no es tu target, el sistema lo descarta sin quitarte tiempo.", feature: "Conectado a tu tabla 'leads' en tiempo real." },
              { icon: <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />, title: "Smart Booking Engine", desc: "Eliminamos el 'ping-pong' de mensajes para agendar. El sistema cruza disponibilidad, agenda en Google Calendar y envía recordatorios automáticos.", feature: "Reducción del 80% en 'No-Shows'." },
            ].map((s, i) => (
              <div key={i} className="glass-panel p-7 sm:p-10 rounded-[2rem] hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(99,102,241,.15)] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0a0f1c] border border-white/5 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:border-indigo-500/40 transition-all duration-500">
                  {s.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-indigo-300 transition-colors">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{s.desc}</p>
                <div className="pt-5 sm:pt-6 border-t border-white/5 flex items-center gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-300">{s.feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÉTRICAS ──────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 relative border-y border-white/5 bg-[#050b14] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
            {[
              { end: 450, prefix: "+", suffix: "h", label: "Ahorradas al mes",    sub: "Por cliente promedio"      },
              { end: 3.8, prefix: "",  suffix: "x", label: "Retorno de Inversión", sub: "En los primeros 60 días"  },
              { end: 24,  prefix: "",  suffix: "/7",label: "Disponibilidad",       sub: "Operación sin descanso"   },
              { end: 100, prefix: "",  suffix: "%", label: "Fricción Operativa",   sub: "Procesos 100% limpios"    },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center py-4">
                <div className="stat-number text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-1 sm:mb-2 flex items-center justify-center">
                  <AnimatedNumber end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm sm:text-lg font-bold text-indigo-400 mb-0.5 sm:mb-1">{stat.label}</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ───────────────────────────────────────────── */}
      <section id="resultados" className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-4">
            <div className="max-w-2xl">
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4 block">Casos de Éxito</span>
              <h2 className="section-h2 text-3xl sm:text-4xl md:text-5xl font-black">Resultados que hablan<br />por sí solos.</h2>
            </div>
            <div className="flex gap-2 text-slate-400 items-center font-semibold text-sm sm:text-base">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" /> Auditado y Verificado
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
            {[
              { quote: "Antes de Aalti, mi equipo pasaba 4 horas al día persiguiendo leads por WhatsApp. Ahora, me levanto por la mañana y tengo 3 llamadas cualificadas en mi calendario automáticamente. Es como magia negra empresarial.", name: "Marcos Romero",    role: "CEO, Romero & Partners",     initials: "MR", gradient: "from-indigo-500 to-purple-500",  roleColor: "text-indigo-400"  },
              { quote: "La inversión parecía alta al principio. A los 12 días, el bot había recuperado a 8 pacientes antiguos de nuestra base de datos inactiva, pagando el sistema por todo el año. Brutal.",                              name: "Dra. Laura Gómez",  role: "Directora, VitalClínic",     initials: "LG", gradient: "from-purple-500 to-pink-500",   roleColor: "text-purple-400"  },
              { quote: "Gestionamos más de 300 propiedades. El sistema filtra curiosos de verdaderos compradores automáticamente y los agenda según la zona. Las ventas crecieron un 40% este trimestre.",                                  name: "Javier Portillo",   role: "Fundador, Nexus Real Estate", initials: "JP", gradient: "from-blue-500 to-cyan-500",    roleColor: "text-blue-400"    },
              { quote: "Teníamos un cuello de botella terrible dando soporte a nuestros clientes VIP. El asistente cognitivo que montó Aalti resuelve el 85% de las dudas al instante 24/7. Una locura tecnológica.",                     name: "Sofía Valderrama",  role: "COO, Scale E-commerce",      initials: "SV", gradient: "from-emerald-500 to-teal-500", roleColor: "text-emerald-400" },
            ].map((t, i) => (
              <div key={i} className="glass-panel p-7 sm:p-10 rounded-3xl hover:shadow-[0_0_30px_rgba(99,102,241,.1)] transition-shadow duration-500">
                <div className="flex text-yellow-400 mb-4 sm:mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />)}
                </div>
                <p className="testimonial-q text-base sm:text-xl md:text-2xl text-slate-200 font-medium leading-relaxed mb-7 sm:mb-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${t.gradient} p-0.5 shrink-0`}>
                    <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center font-bold text-base sm:text-xl text-white">
                      {t.initials}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base sm:text-lg">{t.name}</h4>
                    <p className={`text-xs sm:text-sm font-semibold ${t.roleColor}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0f1c]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] sm:h-[500px] bg-indigo-600/20 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="glass-panel border border-indigo-500/30 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-14 md:p-20 text-center relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,.1)]">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/20 rounded-full blur-[80px]" />

            {/* Logo en CTA */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6 sm:mb-8 p-3 sm:p-4">
              <img src={logoAalti} alt="Aalti Systems" className="w-full h-full object-contain logo-glow" />
            </div>

            <h2 className="section-h2 text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight">Delega el trabajo duro<br className="hidden sm:block" /> a las máquinas.</h2>
            <p className="text-base sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Reserva una <strong>Auditoría Estratégica Gratuita (Valorada en €297)</strong>. Analizaremos tu flujo de ventas actual y te mostraremos el mapa exacto para automatizarlo.
            </p>

            <form className="max-w-md mx-auto text-left relative z-20">
              <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Nombre del Fundador / CEO</label>
                  <input type="text" required className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium" placeholder="Ej. Carlos Mendoza" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Email Corporativo</label>
                  <input type="email" required className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium" placeholder="ceo@tuempresa.com" />
                </div>
              </div>
              <a href={WA_LINK} target="_blank" rel="noreferrer"
                 className="animate-pulse-glow shimmer-effect w-full bg-white text-indigo-950 font-black text-base sm:text-lg py-4 sm:py-5 px-6 rounded-xl hover:scale-[1.02] transition-transform flex justify-center items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,.3)]">
                Agendar Mi Auditoría <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0" />
                Solo toma 30 segundos. Plazas estrictamente limitadas.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#030712] pt-14 sm:pt-20 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12 sm:mb-16">

            {/* Brand block */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center p-2 shrink-0">
                  <img src={logoAalti} alt="Aalti Systems" className="w-full h-full object-contain logo-glow" />
                </div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">AALTI<span className="text-indigo-400">SYSTEMS</span></span>
              </div>
              <p className="text-slate-400 max-w-sm text-base sm:text-lg font-medium mb-6">
                Arquitectura tecnológica y automatización avanzada para empresas que buscan escalar sin fricción operativa.
              </p>
              {/* Redes sociales en footer */}
              <div className="flex gap-3">
                <a href={IG_LINK} target="_blank" rel="noreferrer"
                   className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={WA_LINK} target="_blank" rel="noreferrer"
                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md shadow-green-500/20">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </a>
              </div>
            </div>

            {/* Compañía */}
            <div>
              <h4 className="font-bold text-white mb-5 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm">Compañía</h4>
              <ul className="space-y-3 sm:space-y-4 text-slate-400 font-medium text-sm sm:text-base">
                <li><a href="#soluciones" className="hover:text-indigo-400 transition-colors">Tecnología</a></li>
                <li><a href="#resultados" className="hover:text-indigo-400 transition-colors">Casos de Uso</a></li>
                <li><a href={WA_LINK} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Contacto Privado</a></li>
              </ul>
            </div>

            {/* Operaciones */}
            <div>
              <h4 className="font-bold text-white mb-5 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm">Operaciones</h4>
              <ul className="space-y-3 sm:space-y-4 text-slate-400 font-medium text-sm sm:text-base">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full shrink-0" /> Sistemas Operativos</li>
                <li>Soporte Técnico 24/7</li>
                <li>Madrid, España</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-medium text-xs sm:text-sm">
            <p className="text-slate-600">© {new Date().getFullYear()} Aalti Systems. High-Ticket Architecture.</p>
            <div className="flex gap-5 sm:gap-6">
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Políticas de Privacidad</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Términos Legales</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ──────────────────────────────────────── */}
      <div className="fixed bottom-5 sm:bottom-8 right-4 sm:right-8 flex flex-col gap-3 sm:gap-4 z-50">
        {/* Instagram */}
        <a href={IG_LINK} target="_blank" rel="noreferrer"
           className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(236,72,153,.35)] transition-all duration-300 border border-white/20">
          <Instagram className="w-5 h-5 sm:w-7 sm:h-7" />
        </a>
        {/* WhatsApp */}
        <a href={WA_LINK} target="_blank" rel="noreferrer"
           className="w-13 h-13 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,197,94,.45)] transition-all duration-300 relative group border border-green-300/30"
           style={{ width: '52px', height: '52px' }}>
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-slate-900 text-white font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none shadow-xl">
            Soporte Prioritario
          </span>
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 border-2 border-[#030712] rounded-full" />
        </a>
      </div>

    </div>
  );
}