import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Pasamos de 5 leads/día manuales a 200+ automáticos. AALTI redujo nuestro costo de adquisición 70% en 3 meses.",
    by: "Carlos M., CEO - LogistiTech Solutions",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    tempId: 1,
    testimonial: "La IA de AALTI califica leads con 98% de precisión. Nuestro equipo de ventas ahora solo llama a prospects calificados.",
    by: "María García, VP Ventas - FinanceHub Spain",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    tempId: 2,
    testimonial: "Antes gastábamos 40 horas/semana en seguimiento manual. Ahora es 100% automático 24/7. Recuperamos 200 horas mensuales.",
    by: "Juan López, Operations Director - ManufacturePro",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    tempId: 3,
    testimonial: "AALTI integró sin problemas con nuestro CRM existente. El ROI llegó en 6 semanas. Imprescindible para cualquier empresa con ventas.",
    by: "Sofia Rodríguez, CTO - CloudBusiness Inc",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    tempId: 4,
    testimonial: "No es solo IA, es un cambio de paradigma en ventas. AALTI nos permitió crecer sin contratar más personal de ventas.",
    by: "David Chen, Founder - StartupAccel Ventures",
    imgSrc: "https://images.unsplash.com/photo-1507537557991-488dacf2b1d5?w=400&h=400&fit=crop"
  },
  {
    tempId: 5,
    testimonial: "Cierre de deals 35% más rápido. La IA agenda automáticamente llamadas en horarios óptimos. Es magia empresarial pura.",
    by: "Laura Martínez, Sales Director - RealEstate Digital",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
  },
  {
    tempId: 6,
    testimonial: "Perdíamos 30% de leads por falta de seguimiento. Con AALTI, convertimos 12% más. Eso son miles de euros extra al mes.",
    by: "Miguel Torres, Business Analyst - ConsultoriaX",
    imgSrc: "https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=400&h=400&fit=crop"
  },
  {
    tempId: 7,
    testimonial: "Implementación en 2 días. Sin cambios en infraestructura. AALTI funcionó desde el primer minuto. Increíble.",
    by: "Elena Sánchez, IT Manager - ServicesGroup Europe",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    tempId: 8,
    testimonial: "Nuestros clientes reciben respuestas en 30 segundos, 24/7. El NPS subió 40 puntos en 6 meses. AALTI cambió nuestra marca.",
    by: "Andrés Ruiz, Customer Experience - OmniChannel Retail",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    tempId: 9,
    testimonial: "Benchmarked contra 5 competidores. AALTI fue el único con precisión >95% en clasificación de leads. Decisión obvvia.",
    by: "Patricia Gómez, Head of Analytics - DataDrivenCorp",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    tempId: 10,
    testimonial: "Escalamos ventas de €500k a €1.8M anuales sin contratar. AALTI hizo la diferencia entre fracasar y triunfar.",
    by: "Roberto Martín, CEO - AgriTech Solutions",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={`absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out ${
        isCenter
          ? "z-10 bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-400"
          : "z-0 bg-slate-800 text-slate-300 border-slate-700 hover:border-indigo-500/50"
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(99, 102, 241, 0.5)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-slate-600"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-slate-700 object-cover object-top rounded-sm"
        style={{
          boxShadow: "3px 3px 0px rgba(15, 23, 42, 0.8)"
        }}
      />
      <h3 className={`text-base sm:text-lg font-medium leading-relaxed ${
        isCenter ? "text-white" : "text-slate-200"
      }`}>
        "{testimonial.testimonial}"
      </h3>
      <p className={`absolute bottom-8 left-8 right-8 mt-2 text-sm italic ${
        isCenter ? "text-indigo-100" : "text-slate-400"
      }`}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-900/50 border-t border-b border-indigo-500/20"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 border-2 border-indigo-500 hover:bg-indigo-700 text-white transition-all hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Anterior testimonio"
          title="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 border-2 border-indigo-500 hover:bg-indigo-700 text-white transition-all hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Siguiente testimonio"
          title="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StaggerTestimonials;
