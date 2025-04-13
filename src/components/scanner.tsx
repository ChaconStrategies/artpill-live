'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const Scanner = ({ onComplete }: { onComplete: () => void }) => {
  const [percentage, setPercentage] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [scanAnimation, setScanAnimation] = useState<'scanning' | 'complete' | 'finishing'>('scanning');
  const [isClient, setIsClient] = useState(false);

  // Audio references
  const scanSoundRef = useRef<HTMLAudioElement | null>(null);
  const scanOnSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Mark that we're now on the client
    setIsClient(true);

    // Initialize audio elements
    scanSoundRef.current = new Audio('https://ext.same-assets.com/393895214/3945869342.mpga');
    scanOnSoundRef.current = new Audio('https://ext.same-assets.com/393895214/3294672003.mpga');

    // Play initial sound
    if (scanOnSoundRef.current) {
      scanOnSoundRef.current.play().catch(error => console.log('Audio playback prevented:', error));
    }

    // Start scanning animation
    const scanInterval = setInterval(() => {
      setPercentage(prev => {
        // Play scan sound at 15%, 45%, and 75%
        if (prev === 15 || prev === 45 || prev === 75) {
          if (scanSoundRef.current) {
            scanSoundRef.current.play().catch(error => console.log('Audio playback prevented:', error));
          }
        }

        if (prev >= 100) {
          clearInterval(scanInterval);
          setScanAnimation('complete');
          setTimeout(() => {
            setScanAnimation('finishing');
            setTimeout(() => {
              onComplete();
            }, 1000);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => {
      clearInterval(scanInterval);
      if (scanSoundRef.current) scanSoundRef.current.pause();
      if (scanOnSoundRef.current) scanOnSoundRef.current.pause();
    };
  }, [onComplete]);

  if (!isClient) {
    // Return a minimal placeholder during server rendering to avoid hydration issues
    return (
      <div className="fixed inset-0 z-50 bg-[#ececec] flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#ececec] flex items-center justify-center">
      <div id="scannercontent" className="max-w-lg w-full text-center px-6">
        <div id="scanlight" className="relative h-[2px] w-full bg-black/10 mb-8">
          <div
            className="absolute top-0 left-0 h-full bg-black"
            style={{ width: `${percentage}%`, transition: 'width 0.5s linear' }}
          ></div>

          {scanAnimation === 'scanning' && (
            <div className="absolute -top-[1px] h-[4px] w-[4px] bg-red-500 animate-pulse"
                 style={{ left: `${percentage}%`, transition: 'left 0.5s linear' }}></div>
          )}

          <div className="absolute top-0 w-full">
            <div className="relative">
              {/* Use next/image with proper crossOrigin */}
              <div style={{ position: 'relative', width: '100%', height: '16px' }}>
                <Image
                  src="https://ext.same-assets.com/393895214/1628762451.jpeg"
                  alt="Scanning Light"
                  width={400}
                  height={20}
                  className="absolute top-0 left-0 w-full h-4 object-cover opacity-30"
                  style={{
                    clipPath: `inset(0 ${100 - percentage}% 0 0)`,
                    transition: 'clip-path 0.5s linear'
                  }}
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="scannercontentin" className="mb-10">
          <div id="scannerperc" className="text-2xl mb-4 font-light">
            <span>{percentage}</span>%
          </div>

          <div id="scannertext" className="text-sm mb-6 font-light">
            Made to design experiences for:<br />
            <div className="mt-2 space-y-1 max-w-xs mx-auto text-left">
              <div className={`transition-opacity duration-300 ${percentage > 10 ? 'opacity-100' : 'opacity-30'}`}>
                <span>Pop-ups</span>
              </div>
              <div className={`transition-opacity duration-300 ${percentage > 20 ? 'opacity-100' : 'opacity-30'}`}>
                <span>Dinners</span>
              </div>
              <div className={`transition-opacity duration-300 ${percentage > 30 ? 'opacity-100' : 'opacity-30'}`}>
                <span>Store activations</span>
              </div>
              <div className={`transition-opacity duration-300 ${percentage > 40 ? 'opacity-100' : 'opacity-30'}`}>
                <span>Exhibitions</span>
              </div>
              <div className={`transition-opacity duration-300 ${percentage > 50 ? 'opacity-100' : 'opacity-30'}`}>
                <span>Fashion shows</span>
              </div>
              <div className={`transition-opacity duration-300 ${percentage > 60 ? 'opacity-100' : 'opacity-30'}`}>
                <span>Architecture</span>
              </div>
              <div className={`transition-opacity duration-300 ${percentage > 70 ? 'opacity-100' : 'opacity-30'}`}>
                <span>Objects</span>
              </div>
              <div className={`transition-opacity duration-300 ${percentage > 80 ? 'opacity-100' : 'opacity-30'}`}>
                <span>Guideline creations</span>
              </div>
            </div>
          </div>

          <div id="loading" className="flex flex-col items-center font-light">
            <div id="scan" className="mb-2">
              <div>
                {scanAnimation === 'scanning' && (
                  <>Scanning<span className="animate-pulse">...</span></>
                )}
                {scanAnimation === 'complete' && 'Scan Complete'}
                {scanAnimation === 'finishing' && 'Starting...'}
              </div>
            </div>

            <div className="mb-2">analyze</div>
            <div className="mb-4">Object composition</div>

            <div id="loadingbar" className="flex space-x-1">
              {Array(20).fill(0).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-8 transition-all duration-300 ${
                    percentage > i * 5
                      ? 'bg-black'
                      : 'bg-black/20'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div
          id="circle"
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
            scanAnimation === 'scanning' ? 'bg-black/10' : 'bg-[#dcfb44]'
          }`}
        >
          {scanAnimation === 'scanning' ? (
            <div className="w-10 h-10 rounded-full animate-pulse">
              <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                <Image
                  src="https://ext.same-assets.com/393895214/197770503.svg"
                  alt="Scan"
                  width={40}
                  height={40}
                  className="object-contain opacity-70"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          ) : (
            <div className="text-2xl">:)</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
