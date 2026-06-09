import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

export default function PrivacyPolicy({ onBack }) {
  const { language } = useLanguage();

  const content = {
    es: {
      back: "Volver",
      title: "Política de Privacidad",
      lastUpdate: "Última actualización: ",
      sections: [
        {
          title: "1. Responsable del Tratamiento de Datos",
          body: (
            <>
              <strong>AALTI SYSTEMS</strong><br />
              Email: <strong>aaltistudio@gmail.com</strong><br />
              <br />
              AALTI SYSTEMS es responsable del tratamiento de tus datos personales de conformidad con el RGPD (Reglamento General de Protección de Datos).
            </>
          )
        },
        {
          title: "2. Datos que Recogemos",
          body: (
            <>
              Recogemos exclusivamente:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• <strong>Nombre:</strong> Para dirigirnos a ti personalmente</li>
                <li>• <strong>Email:</strong> Para contactarte y enviar propuestas de servicios</li>
                <li>• <strong>Empresa (opcional):</strong> Para personalizar nuestras propuestas</li>
                <li>• <strong>Teléfono (opcional):</strong> Forma alternativa de contacto</li>
              </ul>
            </>
          )
        },
        {
          title: "3. Finalidad del Tratamiento",
          body: (
            <>
              Tus datos se utilizan EXCLUSIVAMENTE para:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2 mb-4">
                <li>✓ Prospección comercial y envío de propuestas de servicios</li>
                <li>✓ Contacto directo para consultoría y auditoría</li>
                <li>✓ Responder a tus consultas</li>
                <li>✓ Cumplimiento legal de obligaciones</li>
              </ul>
              <p className="text-red-400 font-semibold">
                ❌ NUNCA vendemos, cedemos o compartimos tus datos con terceros con fines comerciales
              </p>
            </>
          )
        },
        {
          title: "4. Servicios de Terceros y APIs",
          body: (
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
          )
        },
        {
          title: "5. Base Legal para el Tratamiento",
          body: (
            <>
              El tratamiento de tus datos se basa en:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Tu consentimiento explícito (mediante aceptación en el formulario)</li>
                <li>• Interés legítimo de AALTI SYSTEMS en realizar prospección comercial</li>
                <li>• Cumplimiento de obligaciones legales</li>
              </ul>
            </>
          )
        },
        {
          title: "6. Derechos ARCO",
          body: (
            <>
              Tienes derecho a:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2 mb-4">
                <li>• <strong>Acceso:</strong> Solicitar qué datos tenemos sobre ti</li>
                <li>• <strong>Rectificación:</strong> Corregir datos incorrectos</li>
                <li>• <strong>Cancelación (Olvido):</strong> Solicitar la eliminación de tus datos</li>
                <li>• <strong>Oposición:</strong> Rechazar prospección comercial</li>
              </ul>
              <p className="text-slate-300">
                Para ejercer estos derechos, envía un email a <strong>aaltistudio@gmail.com</strong> con el asunto "Solicitud de Derechos ARCO".
              </p>
            </>
          )
        },
        {
          title: "7. Almacenamiento y Seguridad",
          body: (
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• Los datos se almacenan de forma segura y se accede a ellos únicamente por personal autorizado</li>
              <li>• Los datos se mantienen mientras sea necesario para la finalidad indicada</li>
              <li>• Implementamos medidas técnicas y organizativas para proteger tus datos</li>
              <li>• Los datos no se transfieren a países fuera de la UE sin salvaguardas adecuadas</li>
            </ul>
          )
        },
        {
          title: "8. Cookies Analíticas",
          body: (
            <>
              Este sitio utiliza cookies analíticas para entender cómo los visitantes interactúan con la web. Estas cookies:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Se cargan ÚNICAMENTE tras tu aceptación en el banner de cookies</li>
                <li>• No identifican tu identidad personal</li>
                <li>• Se utilizan exclusivamente para mejorar la experiencia del usuario</li>
              </ul>
            </>
          )
        },
        {
          title: "9. Contacto con Autoridad Supervisora",
          body: (
            <p className="text-slate-300 leading-relaxed">
              Si consideras que tus derechos de privacidad han sido vulnerados, puedes presentar una reclamación ante la Autoridad de Control competente: en España, la Agencia Española de Protección de Datos (AEPD); en Polonia, el Urząd Ochrony Danych Osobowych (UODO).
            </p>
          )
        },
        {
          title: "10. Cambios en esta Política",
          body: (
            <p className="text-slate-300 leading-relaxed">
              AALTI SYSTEMS puede actualizar esta política de privacidad en cualquier momento. Los cambios entran en vigor inmediatamente tras su publicación en el sitio.
            </p>
          )
        }
      ],
      footerText: "¿Preguntas sobre privacidad?",
      footerContact: "Contacta con nosotros en"
    },
    en: {
      back: "Back",
      title: "Privacy Policy",
      lastUpdate: "Last updated: ",
      sections: [
        {
          title: "1. Data Controller",
          body: (
            <>
              <strong>AALTI SYSTEMS</strong><br />
              Email: <strong>aaltistudio@gmail.com</strong><br />
              <br />
              AALTI SYSTEMS is responsible for processing your personal data in accordance with the GDPR (General Data Protection Regulation).
            </>
          )
        },
        {
          title: "2. Data We Collect",
          body: (
            <>
              We collect exclusively:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• <strong>Name:</strong> To address you personally</li>
                <li>• <strong>Email:</strong> To contact you and send service proposals</li>
                <li>• <strong>Company (optional):</strong> To personalize our proposals</li>
                <li>• <strong>Phone (optional):</strong> Alternative contact method</li>
              </ul>
            </>
          )
        },
        {
          title: "3. Purpose of Processing",
          body: (
            <>
              Your data is used EXCLUSIVELY to:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2 mb-4">
                <li>✓ Commercial prospecting and sending service proposals</li>
                <li>✓ Direct contact for consulting and auditing</li>
                <li>✓ Respond to your inquiries</li>
                <li>✓ Legal compliance of obligations</li>
              </ul>
              <p className="text-red-400 font-semibold">
                ❌ We NEVER sell, lease, or share your data with third parties for commercial purposes
              </p>
            </>
          )
        },
        {
          title: "4. Third-Party Services and APIs",
          body: (
            <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-6 space-y-3">
              <p className="text-white font-semibold">AI Providers used:</p>
              <ul className="space-y-2 text-slate-300 ml-4">
                <li>• <strong>OpenAI:</strong> GPT models for language processing</li>
                <li>• <strong>Anthropic:</strong> Claude models for analysis and automation</li>
              </ul>
              <p className="text-slate-400 text-sm mt-4">
                These services may process data according to their own privacy policies. We recommend reviewing the terms of service of these providers.
              </p>
            </div>
          )
        },
        {
          title: "5. Legal Basis for Processing",
          body: (
            <>
              The processing of your data is based on:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Your explicit consent (by accepting in the form)</li>
                <li>• Legitimate interest of AALTI SYSTEMS in conducting commercial prospecting</li>
                <li>• Compliance with legal obligations</li>
              </ul>
            </>
          )
        },
        {
          title: "6. Your Rights (Access, Rectification, Erasure, Objection)",
          body: (
            <>
              You have the right to:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2 mb-4">
                <li>• <strong>Access:</strong> Request what data we hold about you</li>
                <li>• <strong>Rectification:</strong> Correct incorrect data</li>
                <li>• <strong>Erasure (Oblivion):</strong> Request the deletion of your data</li>
                <li>• <strong>Objection:</strong> Refuse commercial prospecting</li>
              </ul>
              <p className="text-slate-300">
                To exercise these rights, send an email to <strong>aaltistudio@gmail.com</strong> with the subject "Data Rights Request".
              </p>
            </>
          )
        },
        {
          title: "7. Storage and Security",
          body: (
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• Data is stored securely and accessed only by authorized personnel</li>
              <li>• Data is kept for as long as necessary for the indicated purpose</li>
              <li>• We implement technical and organizational measures to protect your data</li>
              <li>• Data is not transferred to countries outside the EU without adequate safeguards</li>
            </ul>
          )
        },
        {
          title: "8. Analytical Cookies",
          body: (
            <>
              This site uses analytical cookies to understand how visitors interact with the web. These cookies:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Load ONLY after your acceptance on the cookie banner</li>
                <li>• Do not identify your personal identity</li>
                <li>• Are used exclusively to improve the user experience</li>
              </ul>
            </>
          )
        },
        {
          title: "9. Contact with Supervisory Authority",
          body: (
            <p className="text-slate-300 leading-relaxed">
              If you believe your privacy rights have been violated, you can file a complaint with the competent Supervisory Authority: in Spain, the Agencia Española de Protección de Datos (AEPD); in Poland, the Urząd Ochrony Danych Osobowych (UODO).
            </p>
          )
        },
        {
          title: "10. Changes to this Policy",
          body: (
            <p className="text-slate-300 leading-relaxed">
              AALTI SYSTEMS may update this privacy policy at any time. Changes take effect immediately upon their publication on the site.
            </p>
          )
        }
      ],
      footerText: "Questions about privacy?",
      footerContact: "Contact us at"
    },
    pl: {
      back: "Wróć",
      title: "Polityka Prywatności",
      lastUpdate: "Ostatnia aktualizacja: ",
      sections: [
        {
          title: "1. Administrator Danych",
          body: (
            <>
              <strong>AALTI SYSTEMS</strong><br />
              Email: <strong>aaltistudio@gmail.com</strong><br />
              <br />
              AALTI SYSTEMS jest administratorem Twoich danych osobowych zgodnie z RODO (Ogólne Rozporządzenie o Ochronie Danych).
            </>
          )
        },
        {
          title: "2. Dane, Które Zbieramy",
          body: (
            <>
              Zbieramy wyłącznie:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• <strong>Imię:</strong> Aby zwracać się do Ciebie osobiście</li>
                <li>• <strong>Email:</strong> Aby skontaktować się z Tobą i wysyłać propozycje usług</li>
                <li>• <strong>Firma (opcjonalnie):</strong> W celu spersonalizowania naszych ofert</li>
                <li>• <strong>Telefon (opcjonalnie):</strong> Alternatywna metoda kontaktu</li>
              </ul>
            </>
          )
        },
        {
          title: "3. Cel Przetwarzania",
          body: (
            <>
              Twoje dane są wykorzystywane WYŁĄCZNIE do:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2 mb-4">
                <li>✓ Poszukiwania partnerów handlowych i przesyłania propozycji usług</li>
                <li>✓ Bezpośredniego kontaktu w celach doradczych i audytowych</li>
                <li>✓ Odpowiadania na Twoje zapytania</li>
                <li>✓ Zgodności z prawnymi zobowiązaniami</li>
              </ul>
              <p className="text-red-400 font-semibold">
                ❌ NIGDY nie sprzedajemy, nie dzierżawimy ani nie udostępniamy Twoich danych stronom trzecim w celach komercyjnych
              </p>
            </>
          )
        },
        {
          title: "4. Usługi Stron Trzecich i API",
          body: (
            <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-6 space-y-3">
              <p className="text-white font-semibold">Wykorzystywani dostawcy AI:</p>
              <ul className="space-y-2 text-slate-300 ml-4">
                <li>• <strong>OpenAI:</strong> Modele GPT do przetwarzania języka</li>
                <li>• <strong>Anthropic:</strong> Modele Claude do analizy i automatyzacji</li>
              </ul>
              <p className="text-slate-400 text-sm mt-4">
                Usługi te mogą przetwarzać dane zgodnie z ich własną polityką prywatności. Zalecamy zapoznanie się z warunkami korzystania z usług tych dostawców.
              </p>
            </div>
          )
        },
        {
          title: "5. Podstawa Prawna Przetwarzania",
          body: (
            <>
              Przetwarzanie Twoich danych opiera się na:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Twojej wyraźnej zgodzie (poprzez akceptację w formularzu)</li>
                <li>• Prawnie uzasadnionym interesie AALTI SYSTEMS polegającym na prowadzeniu działań handlowych</li>
                <li>• Zgodności z obowiązkami prawnymi</li>
              </ul>
            </>
          )
        },
        {
          title: "6. Twoje Prawa (Dostęp, Sprostowanie, Usunięcie, Sprzeciw)",
          body: (
            <>
              Masz prawo do:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2 mb-4">
                <li>• <strong>Dostępu:</strong> Żądania informacji o tym, jakie dane przechowujemy na Twój temat</li>
                <li>• <strong>Sprostowania:</strong> Poprawiania nieprawidłowych danych</li>
                <li>• <strong>Usunięcia (Zapomnienia):</strong> Żądania usunięcia Twoich danych</li>
                <li>• <strong>Sprzeciwu:</strong> Odrzucenia kontaktu handlowego</li>
              </ul>
              <p className="text-slate-300">
                Aby skorzystać z tych praw, wyślij e-mail na adres <strong>aaltistudio@gmail.com</strong> z tematem „Wniosek o Prawa do Danych”.
              </p>
            </>
          )
        },
        {
          title: "7. Przechowywanie i Bezpieczeństwo",
          body: (
            <ul className="space-y-2 text-slate-300 ml-4">
              <li>• Dane są przechowywane w bezpieczny sposób i mają do nich dostęp wyłącznie upoważnieni pracownicy</li>
              <li>• Dane są przechowywane tak długo, jak jest to konieczne do wskazanego celu</li>
              <li>• Wdrażamy środki techniczne i organizacyjne w celu ochrony Twoich danych</li>
              <li>• Dane nie są przekazywane do krajów spoza UE bez odpowiednich zabezpieczeń</li>
            </ul>
          )
        },
        {
          title: "8. Analityczne Pliki Cookie",
          body: (
            <>
              Ta strona używa analitycznych plików cookie, aby zrozumieć, jak użytkownicy wchodzą w interakcję ze stroną. Te pliki cookie:
              <ul className="space-y-2 text-slate-300 ml-4 mt-2">
                <li>• Ładują się WYŁĄCZNIE po Twojej akceptacji na banerze plików cookie</li>
                <li>• Nie identyfikują Twojej tożsamości osobistej</li>
                <li>• Są używane wyłącznie w celu ulepszenia doświadczenia użytkownika</li>
              </ul>
            </>
          )
        },
        {
          title: "9. Kontakt z Organem Nadzorczym",
          body: (
            <p className="text-slate-300 leading-relaxed">
              Jeśli uważasz, że Twoje prawa do prywatności zostały naruszone, możesz złożyć skargę do właściwego organu nadzorczego: w Polsce — Urząd Ochrony Danych Osobowych (UODO); w Hiszpanii — Agencia Española de Protección de Datos (AEPD).
            </p>
          )
        },
        {
          title: "10. Zmiany w Polityce Prywatności",
          body: (
            <p className="text-slate-300 leading-relaxed">
              AALTI SYSTEMS może w każdej chwili zaktualizować politykę prywatności. Zmiany wchodzą w życie natychmiast po ich opublikowaniu na stronie.
            </p>
          )
        }
      ],
      footerText: "Pytania dotyczące prywatności?",
      footerContact: "Skontaktuj się z nami pod adresem"
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
            <section className="space-y-4" key={idx}>
              <h2 className="text-2xl font-bold text-indigo-400">{sect.title}</h2>
              <div className="text-slate-300 leading-relaxed">{sect.body}</div>
            </section>
          ))}

          <div className="bg-indigo-950/50 border border-indigo-500/30 rounded-lg p-6 mt-8">
            <p className="text-slate-300">
              <strong className="text-indigo-400">{t.footerText}</strong><br />
              {t.footerContact} <strong>aaltistudio@gmail.com</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
