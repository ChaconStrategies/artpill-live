'use client';

import { useState, useEffect, FormEvent } from 'react';
import Header from '@/components/header';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import WebGLScene dynamically to prevent SSR issues
const WebGLScene = dynamic(() => import('@/components/webgl-scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#ececec]"></div>
});

export default function ContactPage() {
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showWebGL, setShowWebGL] = useState(false);

  useEffect(() => {
    setLoaded(true);

    // Show WebGL scene after a short delay
    const timer = setTimeout(() => {
      setShowWebGL(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormState({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#ececec]">
      {showWebGL && <WebGLScene />}

      <Header />

      <div className={`section pt-24 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} id="contactwrapper">
        <div className="max-w-2xl mx-auto px-4">
          <div id="footertit" className="mb-20">
            <h2 className="text-6xl md:text-8xl text-center mb-8 animate-fade-in">Let's imagine</h2>
            <h2 className="text-6xl md:text-8xl text-center relative animate-fade-in animation-delay-150">
              Together
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#dcfb44] rounded-full flex items-center justify-center animate-fade-in animation-delay-300">
                :)
              </span>
            </h2>
          </div>

          <div id="formulario" className="w-full">
            <div>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="mb-6 overflow-hidden">
                  <input
                    placeholder="NAME"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border-b border-black/30 bg-transparent focus:outline-none focus:border-black transform transition-transform duration-300 hover:-translate-y-1 focus:-translate-y-1"
                    required
                  />
                </div>

                <div className="mb-6 overflow-hidden">
                  <input
                    placeholder="EMAIL"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border-b border-black/30 bg-transparent focus:outline-none focus:border-black transform transition-transform duration-300 hover:-translate-y-1 focus:-translate-y-1"
                    required
                  />
                </div>

                <div className="mb-6 overflow-hidden">
                  <input
                    placeholder="COMPANY"
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleInputChange}
                    className="w-full p-2 border-b border-black/30 bg-transparent focus:outline-none focus:border-black transform transition-transform duration-300 hover:-translate-y-1 focus:-translate-y-1"
                  />
                </div>

                <div className="mb-6 overflow-hidden">
                  <textarea
                    placeholder="MESSAGE"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border-b border-black/30 bg-transparent focus:outline-none focus:border-black resize-none transform transition-transform duration-300 hover:-translate-y-1 focus:-translate-y-1"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`btn relative overflow-hidden transition-all duration-300 ${
                      formStatus === 'submitting' ? 'opacity-70 pointer-events-none' :
                      formStatus === 'success' ? 'bg-[#dcfb44] text-black border-[#dcfb44]' : ''
                    }`}
                    disabled={formStatus === 'submitting'}
                  >
                    <span className={`transition-opacity duration-300 ${formStatus === 'success' ? 'opacity-0' : 'opacity-100'}`}>
                      {formStatus === 'submitting' ? 'SENDING...' : 'SEND'}
                    </span>

                    {formStatus === 'success' && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        SENT! :)
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="silencio mt-24 text-xs text-center text-black/50">
            Website made by <a href="https://silencio.es" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/80 transition-colors">SILENCIO</a>.
          </div>
        </div>
      </div>
    </main>
  );
}
