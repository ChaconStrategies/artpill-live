'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Mail, MapPin, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';

const WebGLScene = dynamic(() => import('@/components/webgl-scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#ececec]"></div>
});

export default function ContactPage() {
  const [showWebGL, setShowWebGL] = useState(true);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Mock form submission
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });

      // Reset sent status after 3 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      {showWebGL && <WebGLScene />}

      <Header />

      <div className="container mx-auto pt-32 pb-20 px-4 md:px-8">
        <h1 className="text-5xl md:text-7xl text-center mb-4">
          Contactez-nous
        </h1>
        <p className="text-center text-lg mb-16 max-w-2xl mx-auto">
          Nous serions ravis de discuter de votre prochain projet et d'explorer
          comment nous pouvons créer ensemble quelque chose d'extraordinaire.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="contact-info space-y-8">
            <div className="contact-item flex items-start space-x-4">
              <div className="icon-wrapper mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Notre Studio</h3>
                <p className="text-black/70">
                  42 Rue du Faubourg Saint-Antoine
                  <br />
                  75012 Paris, France
                </p>
              </div>
            </div>

            <div className="contact-item flex items-start space-x-4">
              <div className="icon-wrapper mt-1">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Email</h3>
                <p className="text-black/70">
                  <a
                    href="mailto:info@artpill.studio"
                    className="hover:text-black transition-colors"
                  >
                    info@artpill.studio
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-item flex items-start space-x-4">
              <div className="icon-wrapper mt-1">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Téléphone</h3>
                <p className="text-black/70">
                  <a
                    href="tel:+33145559988"
                    className="hover:text-black transition-colors"
                  >
                    +33 1 45 55 99 88
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-12 bg-[#dcfb44]/20 p-6 rounded-sm">
              <h3 className="text-xl font-medium mb-4">Heures d'ouverture</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>9:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samedi</span>
                  <span>Sur rendez-vous</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-black/10 focus:border-black/50 focus:outline-none transition-colors bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-black/10 focus:border-black/50 focus:outline-none transition-colors bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border border-black/10 focus:border-black/50 focus:outline-none transition-colors bg-white/50 backdrop-blur-sm"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSending || isSent}
                  className={`px-8 py-3 bg-black text-white hover:bg-[#dcfb44] hover:text-black transition-colors ${
                    (isSending || isSent) && 'opacity-70 cursor-not-allowed'
                  }`}
                >
                  {isSending
                    ? 'Envoi en cours...'
                    : isSent
                    ? 'Message Envoyé!'
                    : 'Envoyer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
