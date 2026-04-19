import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Zap, Calendar, MessageSquare, Instagram, 
  CheckCircle, ArrowRight, Shield, Star, Menu, 
  X, Play, Target, Rocket, Award, Clock, XCircle, Check
} from 'lucide-react';

// Componente para animar números progresivamente con limpieza segura de hooks
const AnimatedNumber = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime = null;
    let animationFrameId;
    const endNum = parseFloat(end);
    const isFloat = endNum % 1 !== 0;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentVal = progress * endNum;

      setCount(isFloat ? currentVal.toFixed(1) : Math.floor(currentVal));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* ESTILOS DE ANIMACIÓN PERSONALIZADOS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(0.98); }
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
          70% { box-shadow: 0 0 0 25px rgba(79, 70, 229, 0); }
          100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
        .shimmer-effect { position: relative; overflow: hidden; }
        .shimmer-effect::after {
          content: ''; position: absolute; top: 0; left: 0; width: 40%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer 3s infinite;
        }
        .glass-panel { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }
      `}} />

      {/* TOP BANNER URGENCIA */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white text-xs font-bold tracking-widest uppercase py-2 text-center relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
          Solo aceptamos 3 nuevos proyectos este mes (2 Plazas Disponibles)
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'top-0 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'top-8 bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-500">
              <div className="absolute inset-0.5 bg-[#030712] rounded-[10px] z-0"></div>
              <Zap className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 fill-indigo-400/20 w-6 h-6 z-10" />
            </div>
            <span className="text-2xl font-black tracking-tighter">AALTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">SYSTEMS</span></span>
          </div>
          
          <div className="hidden md:flex space-x-10 text-sm font-semibold tracking-wide text-slate-300">
            <a href="#soluciones" className="hover:text-white transition-colors">Soluciones</a>
            <a href="#metodo" className="hover:text-white transition-colors">El Método</a>
            <a href="#resultados" className="hover:text-white transition-colors">Resultados</a>
          </div>

          <div className="hidden md:flex">
            <button className="shimmer-effect bg-white text-slate-950 px-7 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Auditoría Gratuita <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030712]/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 md:hidden">
          <a href="#soluciones" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black text-white hover:text-indigo-400 transition-colors">Soluciones</a>
          <a href="#metodo" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black text-white hover:text-indigo-400 transition-colors">El Método</a>
          <a href="#resultados" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black text-white hover:text-indigo-400 transition-colors">Resultados</a>
          <button className="animate-pulse-glow mt-8 bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(79,70,229,0.4)]">
            Auditoría Gratuita
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] animate-float pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] animate-float-delayed pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/80 to-[#030712]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel border border-indigo-500/30 text-sm font-semibold text-indigo-300 mb-10 transform transition-all hover:scale-105 cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            Arquitectura de Inteligencia Artificial Avanzada
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] max-w-5xl">
            Tu competencia ya usa IA. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
              Tú sigues perdiendo ventas.
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Instalamos <strong className="text-white font-semibold">Sistemas Autónomos</strong> en tu negocio que captan, filtran y cierran clientes <span className="italic">24/7</span> sin que tengas que mover un dedo.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto">
            <button className="animate-pulse-glow shimmer-effect bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto">
              <Rocket className="w-6 h-6 group-hover:-translate-y-1 transition-transform" /> 
              Escalar mi Negocio Ahora
            </button>
            <button className="glass-panel hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto border border-white/10">
              <Play className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform fill-current" /> 
              Ver Cómo Funciona
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 pt-10 border-t border-white/5 w-full flex flex-col items-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Empresas que ya operan en piloto automático</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-xl font-black font-serif tracking-tighter">TECH<span className="text-indigo-500">CORP</span></div>
              <div className="text-xl font-black tracking-widest border-2 border-current px-2">VITALITY</div>
              <div className="text-xl font-bold flex items-center gap-1"><Zap className="w-5 h-5"/> NOVA</div>
              <div className="text-xl font-black italic">Scale<span className="text-purple-500">B2B</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* EL PROBLEMA VS LA SOLUCIÓN */}
      <section id="metodo" className="py-24 relative bg-[#050b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">¿Por qué estás estancado?</h2>
            <p className="text-xl text-slate-400">El 68% de las ventas B2B se pierden por no responder en los primeros 5 minutos.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* The Old Way */}
            <div className="glass-panel p-10 rounded-3xl border border-red-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px]"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-300">La Forma Tradicional</h3>
              </div>
              <ul className="space-y-5">
                {[
                  "Pierdes horas respondiendo FAQs repetitivas.",
                  "Leads fríos que te dejan en visto.",
                  "Agendamiento manual que genera fricción.",
                  "Dependencia total de personal humano (8h al día)."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 font-medium">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The Aalti Way */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-10 rounded-3xl border border-indigo-500/30 relative overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.15)] group hover:shadow-[0_0_60px_rgba(79,70,229,0.25)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] group-hover:bg-indigo-400/30 transition-colors"></div>
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
                  <Zap className="w-6 h-6 text-indigo-400 fill-indigo-400/20" />
                </div>
                <h3 className="text-2xl font-bold text-white">El Método Aalti</h3>
              </div>
              <ul className="space-y-5 relative z-10">
                {[
                  "Asistentes de IA que responden en 2 segundos.",
                  "Cualificación automática: Solo hablas con leads calientes.",
                  "Agendado automático directamente en tu calendario.",
                  "Operación ininterrumpida: 24 horas, 7 días a la semana."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white font-semibold">
                    <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ARQUITECTURA DE SOLUCIONES */}
      <section id="soluciones" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4">Ingeniería de Sistemas</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">Tu Ecosistema Digital. <br/>Altamente Optimizado.</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="w-10 h-10 text-indigo-400" />,
                title: "IA Cognitiva B2B/B2C",
                desc: "Desplegamos cerebros digitales entrenados con tu base de conocimientos. Atienden, persuaden y resuelven objeciones como tu mejor vendedor.",
                feature: "Integración nativa con WhatsApp & IG."
              },
              {
                icon: <Target className="w-10 h-10 text-purple-400" />,
                title: "Embudos Autónomos",
                desc: "Sistemas de captación que filtran prospectos basura. Si el lead no tiene presupuesto o no es tu target, el sistema lo descarta sin quitarte tiempo.",
                feature: "Conectado a tu tabla 'leads' en tiempo real."
              },
              {
                icon: <Calendar className="w-10 h-10 text-blue-400" />,
                title: "Smart Booking Engine",
                desc: "Eliminamos el 'ping-pong' de mensajes para agendar. El sistema cruza disponibilidad, agenda en Google Calendar y envía recordatorios para asegurar la asistencia.",
                feature: "Reducción del 80% en 'No-Shows'."
              }
            ].map((service, idx) => (
              <div key={idx} className="glass-panel p-10 rounded-[2rem] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="w-20 h-20 rounded-2xl bg-[#0a0f1c] border border-white/5 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:border-indigo-500/30 transition-all duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-8">{service.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-semibold text-slate-300">{service.feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTRICAS DE ALTO IMPACTO */}
      <section className="py-20 relative border-y border-white/5 bg-[#050b14] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-white/5">
            {[
              { end: 450, prefix: "+", suffix: "h", label: "Ahorradas al mes", sub: "Por cliente promedio" },
              { end: 3.8, prefix: "", suffix: "x", label: "Retorno de Inversión", sub: "En los primeros 60 días" },
              { end: 24, prefix: "", suffix: "/7", label: "Disponibilidad", sub: "Operación sin descanso" },
              { end: 100, prefix: "", suffix: "%", label: "Fricción Operativa", sub: "Procesos 100% limpios" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center pl-6 first:pl-0 border-none">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2 drop-shadow-lg flex items-center justify-center">
                  <AnimatedNumber end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-bold text-indigo-400 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="resultados" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">Casos de Éxito</span>
              <h2 className="text-4xl md:text-5xl font-black">Resultados que hablan<br/>por sí solos.</h2>
            </div>
            <div className="mt-6 md:mt-0 flex gap-2 text-slate-400 items-center font-semibold">
              <Award className="w-6 h-6 text-yellow-500" /> Auditado y Verificado
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Antes de Aalti, mi equipo pasaba 4 horas al día persiguiendo leads por WhatsApp. Ahora, me levanto por la mañana y tengo 3 llamadas cualificadas en mi calendario automáticamente. Es como magia negra empresarial.",
                name: "Marcos Romero",
                role: "CEO, Romero & Partners",
                initials: "MR",
                gradient: "from-indigo-500 to-purple-500",
                roleColor: "text-indigo-400"
              },
              {
                quote: "La inversión parecía alta al principio. A los 12 días, el bot había recuperado a 8 pacientes antiguos de nuestra base de datos inactiva, pagando el sistema por todo el año. Brutal.",
                name: "Dra. Laura Gómez",
                role: "Directora, VitalClínic",
                initials: "LG",
                gradient: "from-purple-500 to-pink-500",
                roleColor: "text-purple-400"
              },
              {
                quote: "Gestionamos más de 300 propiedades. El sistema ahora filtra curiosos de verdaderos compradores automáticamente por WhatsApp y los agenda según la zona. Las ventas crecieron un 40% este trimestre.",
                name: "Javier Portillo",
                role: "Fundador, Nexus Real Estate",
                initials: "JP",
                gradient: "from-blue-500 to-cyan-500",
                roleColor: "text-blue-400"
              },
              {
                quote: "Teníamos un cuello de botella terrible dando soporte a nuestros clientes VIP. El asistente cognitivo que montó Aalti resuelve el 85% de las dudas al instante 24/7. Una locura tecnológica.",
                name: "Sofía Valderrama",
                role: "COO, Scale E-commerce",
                initials: "SV",
                gradient: "from-emerald-500 to-teal-500",
                roleColor: "text-emerald-400"
              }
            ].map((t, i) => (
              <div key={i} className="glass-panel p-10 rounded-3xl relative">
                <div className="flex text-yellow-400 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-6 h-6 fill-current" />)}
                </div>
                <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed mb-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.gradient} p-0.5`}>
                    <div className="w-full h-full bg-[#030712] rounded-full flex items-center justify-center font-bold text-xl text-white">
                      {t.initials}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{t.name}</h4>
                    <p className={`text-sm font-semibold ${t.roleColor}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0f1c]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="glass-panel border-indigo-500/30 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>
            
            <Shield className="w-16 h-16 text-indigo-400 mx-auto mb-8" />
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Delega el trabajo duro a las máquinas.</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Reserva una <strong>Auditoría Estratégica Gratuita (Valorada en €297)</strong>. Analizaremos tu flujo de ventas actual y te mostraremos el mapa exacto para automatizarlo.
            </p>
            
            <form className="max-w-md mx-auto text-left relative z-20">
              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Nombre del Fundador/CEO</label>
                  <input type="text" required className="w-full bg-[#030712] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium" placeholder="Ej. Carlos Mendoza" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Email Corporativo</label>
                  <input type="email" required className="w-full bg-[#030712] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium" placeholder="ceo@tuempresa.com" />
                </div>
              </div>
              <button type="button" className="animate-pulse-glow shimmer-effect w-full bg-white text-indigo-950 font-black text-lg py-5 px-6 rounded-xl hover:scale-[1.02] transition-transform flex justify-center items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Agendar Mi Auditoría <ArrowRight className="w-6 h-6" />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                <Clock className="w-4 h-4 text-indigo-400" />
                Solo toma 30 segundos agendar. Plazas estrictamente limitadas.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER PREMIUM */}
      <footer className="border-t border-white/10 bg-[#030712] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="text-indigo-500 w-6 h-6" />
                <span className="text-2xl font-black tracking-tight text-white">AALTI<span className="text-indigo-400">SYSTEMS</span></span>
              </div>
              <p className="text-slate-400 max-w-sm text-lg font-medium">
                Arquitectura tecnológica y automatización avanzada para empresas que buscan escalar sin fricción operativa.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Compañía</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Tecnología</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Casos de Uso</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contacto Privado</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Operaciones</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Sistemas Operativos</li>
                <li>Soporte Técnico 24/7</li>
                <li>Madrid, España</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-medium">
            <p className="text-slate-600">© {new Date().getFullYear()} Aalti Systems. High-Ticket Architecture.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Políticas de Privacidad</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Términos Legales</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTONES FLOTANTES */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <a href="https://instagram.com/aaltisystems" target="_blank" rel="noreferrer" 
           className="w-14 h-14 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(236,72,153,0.3)] transition-all duration-300 cursor-pointer border border-white/20">
          <Instagram className="w-7 h-7" />
        </a>
        <a href="https://wa.me/123456789" target="_blank" rel="noreferrer"
           className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,197,94,0.4)] transition-all duration-300 cursor-pointer relative group border border-green-300/30">
          <MessageSquare className="w-8 h-8 fill-current" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white font-bold text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none shadow-xl">
            Soporte Prioritario
          </span>
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-[#030712] rounded-full"></span>
        </a>
      </div>

    </div>
  );
}