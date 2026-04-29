import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy({ onBack }) {
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
              Política de Privacidad
            </h1>
            <p className="text-slate-300">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">1. Responsable del Tratamiento de Datos</h2>
            <p className="text-slate-300 leading-relaxed">
              <strong>AALTI SYSTEMS</strong><br />
              Email: <strong>aaltistudio@gmail.com</strong><br />
              <br />
              AALTI SYSTEMS es responsable del tratamiento de tus datos personales de conformidad con el RGPD (Reglamento General de Protección de Datos).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">2. Datos que Recogemos</h2>
            <p className="text-slate-300 leading-relaxed">
              Recogemos exclusivamente:
            </p>
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• <strong>Nombre:</strong> Para dirigirnos a ti personalmente</li>
              <li>• <strong>Email:</strong> Para contactarte y enviar propuestas de servicios</li>
              <li>• <strong>Empresa (opcional):</strong> Para personalizar nuestras propuestas</li>
              <li>• <strong>Teléfono (opcional):</strong> Forma alternativa de contacto</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">3. Finalidad del Tratamiento</h2>
            <p className="text-slate-300 leading-relaxed">
              Tus datos se utilizan EXCLUSIVAMENTE para:
            </p>
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>✓ Prospección comercial y envío de propuestas de servicios</li>
              <li>✓ Contacto directo para consultoría y auditoría</li>
              <li>✓ Responder a tus consultas</li>
              <li>✓ Cumplimiento legal de obligaciones</li>
            </ul>
            <p className="text-slate-300 mt-4 font-semibold text-red-400">
              ❌ NUNCA vendemos, cedemos o compartimos tus datos con terceros con fines comerciales
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">4. Servicios de Terceros y APIs</h2>
            <p className="text-slate-300 leading-relaxed">
              Para proporcionar nuestros servicios, utilizamos plataformas de inteligencia artificial de terceros:
            </p>
            <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-6 space-y-3">
              <p className="text-white font-semibold">Proveedores de IA utilizados:</p>
              <ul className="space-y-2 text-slate-300 ml-4">
                <li>• <strong>OpenAI:</strong> Modelos GPT para procesamiento de lenguaje</li>
                <li>• <strong>Anthropic:</strong> Modelos Claude para análisis y automatización</li>
              </ul>
              <p className="text-slate-400 text-sm mt-4">
                Estos servicios pueden procesar datos conforme a sus propias políticas de privacidad. Te recomendamos revisar los términos de servicio de estos proveedores.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">5. Base Legal para el Tratamiento</h2>
            <p className="text-slate-300 leading-relaxed">
              El tratamiento de tus datos se basa en:
            </p>
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• Tu consentimiento explícito (mediante aceptación en el formulario)</li>
              <li>• Interés legítimo de AALTI SYSTEMS en realizar prospección comercial</li>
              <li>• Cumplimiento de obligaciones legales</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">6. Derechos ARCO</h2>
            <p className="text-slate-300 leading-relaxed">
              Tienes derecho a:
            </p>
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• <strong>Acceso:</strong> Solicitar qué datos tenemos sobre ti</li>
              <li>• <strong>Rectificación:</strong> Corregir datos incorrectos</li>
              <li>• <strong>Cancelación (Olvido):</strong> Solicitar la eliminación de tus datos</li>
              <li>• <strong>Oposición:</strong> Rechazar prospección comercial</li>
            </ul>
            <p className="text-slate-300 mt-4">
              Para ejercer estos derechos, envía un email a <strong>aaltistudio@gmail.com</strong> con el asunto "Solicitud de Derechos ARCO".
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">7. Almacenamiento y Seguridad</h2>
            <p className="text-slate-300 leading-relaxed">
              • Los datos se almacenan de forma segura y se accede a ellos únicamente por personal autorizado<br />
              • Los datos se mantienen mientras sea necesario para la finalidad indicada<br />
              • Implementamos medidas técnicas y organizativas para proteger tus datos<br />
              • Los datos no se transfieren a países fuera de la UE sin salvaguardas adecuadas
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">8. Cookies Analíticas</h2>
            <p className="text-slate-300 leading-relaxed">
              Este sitio utiliza cookies analíticas para entender cómo los visitantes interactúan con la web. Estas cookies:
            </p>
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• Se cargan ÚNICAMENTE tras tu aceptación en el banner de cookies</li>
              <li>• No identifican tu identidad personal</li>
              <li>• Se utilizan exclusivamente para mejorar la experiencia del usuario</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">9. Contacto con Autoridad Supervisora</h2>
            <p className="text-slate-300 leading-relaxed">
              Si consideras que tus derechos de privacidad han sido vulnerados, puedes presentar una reclamación ante la Autoridad de Control competente (en España: Agencia Española de Protección de Datos - AEPD).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-400">10. Cambios en esta Política</h2>
            <p className="text-slate-300 leading-relaxed">
              AALTI SYSTEMS puede actualizar esta política de privacidad en cualquier momento. Los cambios entran en vigor inmediatamente tras su publicación en el sitio.
            </p>
          </section>

          <div className="bg-indigo-950/50 border border-indigo-500/30 rounded-lg p-6 mt-8">
            <p className="text-slate-300">
              <strong className="text-indigo-400">¿Preguntas sobre privacidad?</strong><br />
              Contacta con nosotros en <strong>aaltistudio@gmail.com</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
