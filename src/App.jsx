import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Database, 
  Calendar, 
  ArrowRight 
} from 'lucide-react';
// IMPORTACIÓN DE TU LOGO GEOMÉTRICO
import simboloAalti from './assets/simbolo-aalti.png';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#BC13FE] selection:text-white">
      
      {/* NAVEGACIÓN */}
      <nav className="fixed w-full z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={simboloAalti} className="h-8 w-auto" alt="Aalti Systems Logo" />
              <span className="font-bold text-xl tracking-tighter">AALTI<span className="text-[#BC13FE]">SYSTEMS</span></span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#sistema" className="text-gray-300 hover:text-[#BC13FE] transition-colors text-sm font-medium">El Sistema</a>
              <a href="#panel" className="text-gray-300 hover:text-[#BC13FE] transition-colors text-sm font-medium">Panel de Control</a>
            </div>
            <div>
              <button className="bg-transparent border border-[#BC13FE] text-[#BC13FE] hover:bg-[#BC13FE] hover:text-white px-5 py-2 rounded-md text-sm font-bold transition-all duration-300 shadow-[0_0_15px_rgba(188,19,254,0.2)]">
                Acceso Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Efecto de luz violeta de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BC13FE] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BC13FE] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BC13FE]"></span>
              </span>
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Infraestructura IA Operativa 24/7</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Escala tu facturación, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC13FE] to-blue-500">
                recupera tu tiempo.
              </span>
            </h1>
            
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              Implementamos arquitecturas de IA propietarias que <span className="text-white font-medium">cualifican, agendan y automatizan</span> tu flujo de leads sin intervención humana. Deja de ser esclavo de tu negocio.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#BC13FE] hover:bg-[#a010d8] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(188,19,254,0.4)] hover:scale-105">
                <span>Activar mi Sistema IA</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN SISTEMA */}
      <section id="sistema" className="py-24 bg-[#181818] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-16 text-white">Ingeniería de <span className="text-[#BC13FE]">Captación Autónoma</span></h2>
           <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-[#121212] p-8 rounded-2xl border border-white/10 hover:border-[#BC13FE]/50 transition-colors">
                <Bot className="w-10 h-10 text-[#BC13FE] mb-4" />
                <h3 className="text-xl font-bold mb-2">1. Recepción IA</h3>
                <p className="text-gray-400 text-sm">El agente procesa el lenguaje natural y genera registros automáticos en tu base de datos Supabase.</p>
              </div>
              <div className="bg-[#121212] p-8 rounded-2xl border border-white/10 hover:border-[#BC13FE]/50 transition-colors">
                <Database className="w-10 h-10 text-[#BC13FE] mb-4" />
                <h3 className="text-xl font-bold mb-2">2. Cualificación</h3>
                <p className="text-gray-400 text-sm">Lógica de negocios avanzada para filtrar prospectos de alto valor según tus criterios de éxito.</p>
              </div>
              <div className="bg-[#121212] p-8 rounded-2xl border border-white/10 hover:border-[#BC13FE]/50 transition-colors">
                <Calendar className="w-10 h-10 text-[#BC13FE] mb-4" />
                <h3 className="text-xl font-bold mb-2">3. Agendamiento</h3>
                <p className="text-gray-400 text-sm">Cierre de cita automático en tu calendario. Tú solo te preocupas de atender al cliente.</p>
              </div>
           </div>
        </div>
      </section>

      {/* SECCIÓN PANEL (DASHBOARD) */}
      <section id="panel" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-12">Control Total en <span className="text-[#BC13FE]">Tiempo Real</span></h2>
           
           <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-w-5xl mx-auto shadow-[#BC13FE]/5">
              {/* Cabecera del Panel */}
              <div className="bg-[#222] px-6 py-4 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#BC13FE] animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Panel de Operaciones AALTI</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
              </div>

              {/* Contenido del Panel */}
              <div className="p-8 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase border-b border-white/5">
                      <th className="pb-4 font-medium">Lead ID</th>
                      <th className="pb-4 font-medium">Nombre / Contacto</th>
                      <th className="pb-4 font-medium">Estado Sistema</th>
                      <th className="pb-4 font-medium">Acción IA</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 font-mono text-xs text-gray-600">aa_7829</td>
                      <td className="py-4">
                        <div className="font-bold text-white">Carlos Mendoza</div>
                        <div className="text-xs text-gray-500">carlos.m@empresa.com</div>
                      </td>
                      <td className="py-4">
                        <span className="bg-[#BC13FE]/10 text-[#BC13FE] px-3 py-1 rounded-full text-xs font-bold border border-[#BC13FE]/20">
                          Agendado
                        </span>
                      </td>
                      <td className="py-4 text-xs text-gray-400 italic">Cita confirmada en Calendly</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-4 font-mono text-xs text-gray-600">aa_9102</td>
                      <td className="py-4">
                        <div className="font-bold text-white">Elena Rojas</div>
                        <div className="text-xs text-gray-500">e.rojas@agencia.net</div>
                      </td>
                      <td className="py-4">
                        <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                          Cualificando
                        </span>
                      </td>
                      <td className="py-4 text-xs text-gray-400 italic">Analizando perfil LinkedIn...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-white/10 text-center">
        <div className="flex justify-center items-center space-x-3 mb-6">
           <img src={simboloAalti} className="h-6 w-auto" alt="Logo" />
           <span className="font-bold text-white tracking-tighter">AALTI<span className="text-[#BC13FE]">SYSTEMS</span></span>
        </div>
        <p className="text-gray-500 text-xs mb-4">© {new Date().getFullYear()} AALTI SYSTEMS. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-6 text-xs text-gray-600">
          <a href="#" className="hover:text-[#BC13FE] transition-colors">Privacidad</a>
          <a href="#" className="hover:text-[#BC13FE] transition-colors">Soporte Técnico</a>
        </div>
      </footer>

    </div>
  );
}