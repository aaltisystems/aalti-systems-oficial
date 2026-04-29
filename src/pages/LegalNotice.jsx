import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LegalNotice({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          whileHover={{ x: -5 }}
        >
          <ChevronLeft className="w-5 h-5" />
          Volver
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-5xl font-space-grotesk font-bold mb-4 text-gradient">
              Aviso Legal
            </h1>
            <p className="text-slate-300">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">1. Identificación del Titular</h2>
            <p className="text-slate-300 leading-relaxed">
              Titular: <strong>AALTI SYSTEMS</strong><br />
              Email: <strong>aaltistudio@gmail.com</strong><br />
              Naturaleza: Servicio de automatización e inteligencia artificial
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">2. Carácter del Sitio Web</h2>
            <p className="text-slate-300 leading-relaxed">
              Este sitio web tiene carácter informativo y ofrece servicios de consultoría, auditoría y soluciones de automatización basadas en Inteligencia Artificial. El contenido presentado es de naturaleza educativa y promocional.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">3. Vías de Contacto Legales</h2>
            <p className="text-slate-300 leading-relaxed">
              Para cualquier notificación legal, requerimiento, o comunicación oficial, la única vía válida es:
            </p>
            <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-6">
              <p className="text-white font-semibold">Email: aaltistudio@gmail.com</p>
              <p className="text-slate-400 text-sm mt-2">Todas las comunicaciones legales deben dirigirse a esta dirección de correo electrónico.</p>
            </div>
          </section>

          <section className="space-y-4 bg-red-950/20 border border-red-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-400">4. EXENCIÓN DE RESPONSABILIDAD POR IA Y AUTOMATIZACIÓN</h2>
            <p className="text-slate-300 leading-relaxed">
              AALTI SYSTEMS ofrece soluciones basadas en Inteligencia Artificial y automatización de procesos. El usuario acepta que:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span>Los resultados generados por modelos de lenguaje (LLMs) pueden contener imprecisiones, errores factuales, o "alucinaciones" (generación de información sin base real).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span>AALTI SYSTEMS no se hace responsable de errores técnicos, pérdida de datos o decisiones de negocio basadas en el output de herramientas de terceros como OpenAI, Anthropic o similares.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span>El servicio se proporciona "tal cual" (AS-IS) sin garantías de infalibilidad, precisión absoluta o resultados específicos.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span>El usuario es responsable de validar, revisar y verificar cualquier información o automatización proporcionada antes de implementarla en sus procesos críticos.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">5. Limitación de Responsabilidad</h2>
            <p className="text-slate-300 leading-relaxed">
              AALTI SYSTEMS no será responsable por:
            </p>
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• Daños directos, indirectos, incidentales o consecuentes derivados del uso del sitio</li>
              <li>• Pérdida de datos, ingresos o beneficios</li>
              <li>• Fallos en la disponibilidad del servicio</li>
              <li>• Decisiones comerciales tomadas basándose en recomendaciones de sistemas de IA</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">6. Uso de APIs y Servicios de Terceros</h2>
            <p className="text-slate-300 leading-relaxed">
              Este sitio utiliza APIs y servicios de terceros (incluyendo pero no limitado a OpenAI, Anthropic, y similares). El usuario acepta que:
            </p>
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• El acceso y funcionamiento dependen de la disponibilidad de estos servicios</li>
              <li>• AALTI SYSTEMS no controla directamente la calidad o precisión de sus outputs</li>
              <li>• Se aplican también los términos de servicio de estos proveedores</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">7. Modificaciones</h2>
            <p className="text-slate-300 leading-relaxed">
              AALTI SYSTEMS se reserva el derecho de modificar este aviso legal en cualquier momento. Las modificaciones entran en vigor inmediatamente tras su publicación en el sitio web.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">8. Jurisdicción</h2>
            <p className="text-slate-300 leading-relaxed">
              Este aviso legal se rige por la legislación española. Cualquier disputa será resuelta en los juzgados competentes de España.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
