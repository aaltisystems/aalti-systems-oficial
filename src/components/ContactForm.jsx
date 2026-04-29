import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: { email: '' }
  });
  const email = watch('email');

  const onSubmit = (data) => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <div className="mt-8 p-6 glass rounded-2xl text-center max-w-md mx-auto">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-green-400 font-space-grotesk font-bold mb-2">¡Email confirmado!</p>
        <p className="text-slate-400 font-dm-sans text-sm mb-6">Selecciona tu canal de contacto preferido</p>

        {/* WhatsApp Link */}
        <a
          href={`https://wa.me/56946647119040?text=Hola%20AALTI%20SYSTEMS%2C%20quiero%20una%20audi...`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg mb-3 transition font-dm-sans font-bold flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} /> WhatsApp
        </a>

        {/* Email Link */}
        <a
          href="mailto:info@aaltisystems.com?subject=Auditoría%20Gratuita%20Solicitada"
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition font-dm-sans font-bold flex items-center justify-center gap-2"
        >
          <Mail size={20} /> Email
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      <div>
        <label className="block text-sm font-space-grotesk font-bold text-white mb-2">
          Tu email para la auditoría
        </label>
        <input
          type="email"
          placeholder="tu@empresa.com"
          {...register('email', {
            required: 'Email requerido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email inválido'
            }
          })}
          className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition font-dm-sans"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1 font-dm-sans">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!email}
        className="w-full cta-button py-3 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Recibir auditoría gratuita
      </button>

      <p className="text-xs text-slate-400 font-dm-sans text-center">
        🔒 No compartimos tu email. Privacidad garantizada.
      </p>
    </form>
  );
}
