import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function LegalNotice({ onBack }) {
  const { language } = useLanguage();

  const content = {
    es: {
      back: "Volver",
      title: "Aviso Legal",
      lastUpdate: "Última actualización: ",
      sections: [
        {
          title: "1. Identificación del Titular",
          body: (
            <>
              Titular: <strong>AALTI SYSTEMS</strong><br />
              Email: <strong>aaltistudio@gmail.com</strong><br />
              Naturaleza: Servicio de automatización e inteligencia artificial
            </>
          )
        },
        {
          title: "2. Carácter del Sitio Web",
          body: (
            <>
              Este sitio web tiene carácter informativo y ofrece servicios de consultoría, auditoría y soluciones de automatización basadas en Inteligencia Artificial. El contenido presentado es de naturaleza educativa y promocional.
            </>
          )
        },
        {
          title: "3. Vías de Contacto Legales",
          body: (
            <>
              Para cualquier notificación legal, requerimiento, o comunicación oficial, la única vía válida es:
              <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-6 mt-3">
                <p className="text-white font-semibold">Email: aaltistudio@gmail.com</p>
                <p className="text-slate-400 text-sm mt-2">Todas las comunicaciones legales deben dirigirse a esta dirección de correo electrónico.</p>
              </div>
            </>
          )
        },
        {
          title: "4. EXENCIÓN DE RESPONSABILIDAD POR IA Y AUTOMATIZACIÓN",
          isDisclaimer: true,
          body: (
            <>
              AALTI SYSTEMS ofrece soluciones basadas en Inteligencia Artificial y automatización de procesos. El usuario acepta que:
              <ul className="space-y-2 text-slate-300 mt-3">
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
            </>
          )
        },
        {
          title: "5. Limitación de Responsabilidad",
          body: (
            <>
              AALTI SYSTEMS no será responsable por:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Daños directos, indirectos, incidentales o consecuentes derivados del uso del sitio</li>
                <li>• Pérdida de datos, ingresos o beneficios</li>
                <li>• Fallos en la disponibilidad del servicio</li>
                <li>• Decisiones comerciales tomadas basándose en recomendaciones de sistemas de IA</li>
              </ul>
            </>
          )
        },
        {
          title: "6. Uso de APIs y Servicios de Terceros",
          body: (
            <>
              Este sitio utiliza APIs y servicios de terceros (incluyendo pero no limitado a OpenAI, Anthropic, y similares). El usuario acepta que:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• El acceso y funcionamiento dependen de la disponibilidad de estos servicios</li>
                <li>• AALTI SYSTEMS no controla directamente la calidad o precisión de sus outputs</li>
                <li>• Se aplican también los términos de servicio de estos proveedores</li>
              </ul>
            </>
          )
        },
        {
          title: "7. Modificaciones",
          body: (
            <>
              AALTI SYSTEMS se reserva el derecho de modificar este aviso legal en cualquier momento. Las modificaciones entran en vigor inmediatamente tras su publicación en el sitio web.
            </>
          )
        },
        {
          title: "8. Jurisdicción",
          body: (
            <>
              Este aviso legal se rige por la legislación española. Cualquier disputa será resuelta en los juzgados competentes de España.
            </>
          )
        }
      ]
    },
    en: {
      back: "Back",
      title: "Legal Notice",
      lastUpdate: "Last updated: ",
      sections: [
        {
          title: "1. Owner Identification",
          body: (
            <>
              Owner: <strong>AALTI SYSTEMS</strong><br />
              Email: <strong>aaltistudio@gmail.com</strong><br />
              Nature: Automation and artificial intelligence service
            </>
          )
        },
        {
          title: "2. Character of the Website",
          body: (
            <>
              This website is for information purposes and offers consulting services, auditing and automation solutions based on Artificial Intelligence. The content presented is educational and promotional in nature.
            </>
          )
        },
        {
          title: "3. Legal Contact Methods",
          body: (
            <>
              For any legal notification, request, or official communication, the only valid method is:
              <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-6 mt-3">
                <p className="text-white font-semibold">Email: aaltistudio@gmail.com</p>
                <p className="text-slate-400 text-sm mt-2">All legal communications must be addressed to this email address.</p>
              </div>
            </>
          )
        },
        {
          title: "4. DISCLAIMER FOR AI AND AUTOMATION SERVICES",
          isDisclaimer: true,
          body: (
            <>
              AALTI SYSTEMS offers solutions based on Artificial Intelligence and process automation. The user accepts that:
              <ul className="space-y-2 text-slate-300 mt-3">
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Results generated by language models (LLMs) may contain inaccuracies, factual errors, or "hallucinations" (generation of information with no real basis).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>AALTI SYSTEMS is not responsible for technical errors, data loss, or business decisions based on the output of third-party tools such as OpenAI, Anthropic, or similar.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>The service is provided "as is" (AS-IS) without guarantees of infallibility, absolute precision, or specific results.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>The user is responsible for validating, reviewing, and verifying any information or automation provided before implementing it in critical processes.</span>
                </li>
              </ul>
            </>
          )
        },
        {
          title: "5. Limitation of Liability",
          body: (
            <>
              AALTI SYSTEMS will not be liable for:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Direct, indirect, incidental, or consequential damages resulting from the use of the site</li>
                <li>• Loss of data, revenue, or profits</li>
                <li>• Failures in service availability</li>
                <li>• Business decisions made based on recommendations of AI systems</li>
              </ul>
            </>
          )
        },
        {
          title: "6. Use of Third-Party APIs and Services",
          body: (
            <>
              This site uses third-party APIs and services (including but not limited to OpenAI, Anthropic, and similar). The user accepts that:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Access and operation depend on the availability of these services</li>
                <li>• AALTI SYSTEMS does not directly control the quality or accuracy of their outputs</li>
                <li>• Terms of service of these providers also apply</li>
              </ul>
            </>
          )
        },
        {
          title: "7. Modifications",
          body: (
            <>
              AALTI SYSTEMS reserves the right to modify this legal notice at any time. Modifications take effect immediately upon their publication on the website.
            </>
          )
        },
        {
          title: "8. Jurisdiction",
          body: (
            <>
              This legal notice is governed by Spanish law. Any dispute will be resolved in the competent courts of Spain.
            </>
          )
        }
      ]
    },
    pl: {
      back: "Wróć",
      title: "Nota Prawna",
      lastUpdate: "Ostatnia aktualizacja: ",
      sections: [
        {
          title: "1. Identyfikacja Właściciela",
          body: (
            <>
              Właściciel: <strong>AALTI SYSTEMS</strong><br />
              Email: <strong>aaltistudio@gmail.com</strong><br />
              Charakter: Usługi automatyzacji i sztucznej inteligencji
            </>
          )
        },
        {
          title: "2. Charakter Strony Internetowej",
          body: (
            <>
              Ta strona internetowa ma charakter informacyjny i oferuje usługi doradcze, audytowe oraz rozwiązania automatyzacji oparte na Sztucznej Inteligencji. Prezentowana treść ma charakter edukacyjny i promocyjny.
            </>
          )
        },
        {
          title: "3. Legalne Kanały Kontaktu",
          body: (
            <>
              W przypadku wszelkich powiadomień prawnych, żądań lub oficjalnej komunikacji, jedyną ważną drogą jest:
              <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-6 mt-3">
                <p className="text-white font-semibold">Email: aaltistudio@gmail.com</p>
                <p className="text-slate-400 text-sm mt-2">Wszelka korespondencja prawna musi być kierowana na ten adres e-mail.</p>
              </div>
            </>
          )
        },
        {
          title: "4. WYŁĄCZENIE ODPOWIEDZIALNOŚCI ZA USŁUGI AI I AUTOMATYZACJĘ",
          isDisclaimer: true,
          body: (
            <>
              AALTI SYSTEMS oferuje rozwiązania oparte na Sztucznej Inteligencji i automatyzacji procesów. Użytkownik akceptuje, że:
              <ul className="space-y-2 text-slate-300 mt-3">
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Wyniki generowane przez modele językowe (LLM) mogą zawierać nieścisłości, błędy rzeczowe lub „halucynacje” (generowanie informacji bez rzeczywistych podstaw).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>AALTI SYSTEMS nie ponosi odpowiedzialności za błędy techniczne, utratę danych ani decyzje biznesowe podjęte na podstawie wyników narzędzi firm trzecich, takich jak OpenAI, Anthropic itp.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Usługa jest świadczona w stanie, w jakim się znajduje („as is”), bez gwarancji bezbłędności, bezwzględnej dokładności lub konkretnych wyników.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Użytkownik jest odpowiedzialny za walidację, weryfikację i sprawdzenie wszelkich dostarczonych informacji lub automatyzacji przed wdrożeniem ich w krytycznych procesach.</span>
                </li>
              </ul>
            </>
          )
        },
        {
          title: "5. Ograniczenie Odpowiedzialności",
          body: (
            <>
              AALTI SYSTEMS nie ponosi odpowiedzialności za:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Bezpośrednie, pośrednie, przypadkowe lub wtórne szkody wynikające z korzystania ze strony</li>
                <li>• Utratę danych, przychodów lub zysków</li>
                <li>• Przerwy w dostępności usług</li>
                <li>• Decyzje biznesowe podejmowane na podstawie rekomendacji systemów AI</li>
              </ul>
            </>
          )
        },
        {
          title: "6. Korzystanie z Zewnętrznych API i Usług",
          body: (
            <>
              Ta strona korzysta z zewnętrznych API i usług (w tym m.in. OpenAI, Anthropic itp.). Użytkownik akceptuje, że:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Dostęp i działanie zależą od dostępności tych usług</li>
                <li>• AALTI SYSTEMS nie kontroluje bezpośrednio jakości ani dokładności ich wyników</li>
                <li>• Obowiązują również warunki korzystania z usług tych dostawców</li>
              </ul>
            </>
          )
        },
        {
          title: "7. Modyfikacje",
          body: (
            <>
              AALTI SYSTEMS zastrzega sobie prawo do modyfikacji niniejszej noty prawnej w dowolnym momencie. Zmiany wchodzą w życie natychmiast po ich opublikowaniu na stronie internetowej.
            </>
          )
        },
        {
          title: "8. Jurysdykcja",
          body: (
            <>
              Niniejsza nota prawna podlega prawu hiszpańskiemu. Wszelkie spory będą rozstrzygane przez właściwe sądy w Hiszpanii.
            </>
          )
        }
      ]
    }
  };

  const t = content[language] || content.es;
  const dateLocale = language === 'es' ? 'es-ES' : (language === 'pl' ? 'pl-PL' : 'en-US');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          whileHover={{ x: -5 }}
        >
          <ChevronLeft className="w-5 h-5" />
          {t.back}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-5xl font-space-grotesk font-bold mb-4 text-gradient">
              {t.title}
            </h1>
            <p className="text-slate-300">{t.lastUpdate}{new Date().toLocaleDateString(dateLocale)}</p>
          </div>

          {t.sections.map((sect, idx) => (
            <section
              className={`space-y-4 ${sect.isDisclaimer ? 'bg-red-950/20 border border-red-500/30 rounded-lg p-6' : ''}`}
              key={idx}
            >
              <h2 className={`text-2xl font-bold ${sect.isDisclaimer ? 'text-red-400' : 'text-indigo-400'}`}>
                {sect.title}
              </h2>
              <div className="text-slate-300 leading-relaxed">{sect.body}</div>
            </section>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
