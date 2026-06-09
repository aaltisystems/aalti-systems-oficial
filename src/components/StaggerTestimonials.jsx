import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../i18n';

const getInitials = (name) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const getAvatarGradient = (index) => {
  const gradients = [
    'from-indigo-500 to-purple-600',
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-cyan-500 to-blue-600'
  ];
  return gradients[index % gradients.length];
};

const TestimonialCard = ({ position, testimonial, handleMove, cardSize, index }) => {
  const isCenter = position === 0;
  const initials = getInitials(testimonial.name);
  const gradientClass = getAvatarGradient(index);

  return (
    <div
      onClick={() => handleMove(position)}
      className={`absolute left-1/2 top-1/2 cursor-pointer border p-8 transition-all duration-500 ease-in-out ${
        isCenter
          ? "z-10 bg-slate-800 text-white border-indigo-500/50"
          : "z-0 bg-slate-800/60 text-slate-300 border-slate-700 hover:border-indigo-500/30"
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        borderRadius: '12px',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 20px 25px -5px rgba(0, 0, 0, 0.3), 0px 0px 0px 1px rgba(99, 102, 241, 0.3)" : "0px 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="text-5xl text-indigo-400 mb-4 leading-none">"</div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80 mb-6">
            {testimonial.testimonial}
          </p>
        </div>

        <div className="pt-6 border-t border-slate-700/50">
          <div className="flex items-center gap-3 mt-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
              <span className="text-white font-bold text-sm">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{testimonial.name}</p>
              <p className="text-xs text-slate-400 truncate">{testimonial.role} · {testimonial.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const { language } = useLanguage();
  const t = translations[language].testimonials;
  const [cardSize, setCardSize] = useState(365);
  
  // Storing only the order of indices [0, 1, 2, 3]
  const [order, setOrder] = useState(() => Array.from({ length: 4 }, (_, i) => i));

  const handleMove = (steps) => {
    const newOrder = [...order];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newOrder.shift();
        if (item !== undefined) newOrder.push(item);
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newOrder.pop();
        if (item !== undefined) newOrder.unshift(item);
      }
    }
    setOrder(newOrder);
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
      {order.map((originalIndex, currentIndex) => {
        const position = order.length % 2
          ? currentIndex - Math.floor(order.length / 2)
          : currentIndex - order.length / 2;
        
        const item = t.items[originalIndex];
        const testimonial = {
          testimonial: item.testimonial,
          name: item.name,
          role: item.role,
          company: item.company
        };

        return (
          <TestimonialCard
            key={originalIndex}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            index={originalIndex}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 border-2 border-indigo-500 hover:bg-indigo-700 text-white transition-all hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label={language === 'es' ? 'Anterior testimonio' : (language === 'pl' ? 'Poprzednia opinia' : 'Previous testimonial')}
          title={language === 'es' ? 'Anterior' : (language === 'pl' ? 'Poprzedni' : 'Previous')}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 border-2 border-indigo-500 hover:bg-indigo-700 text-white transition-all hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label={language === 'es' ? 'Siguiente testimonio' : (language === 'pl' ? 'Następna opinia' : 'Next testimonial')}
          title={language === 'es' ? 'Siguiente' : (language === 'pl' ? 'Następny' : 'Next')}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StaggerTestimonials;
