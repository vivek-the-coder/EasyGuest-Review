'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Copy, 
  ExternalLink, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  RefreshCw, 
  Check, 
  AlertCircle
} from 'lucide-react';
import SchemaData from '@/components/SchemaData';
import { useReviewGenerator } from '@/hooks/useReviewGenerator';
import { ToastContainer, useToast } from '@/components/Toast';

export default function Home() {
  const { state, generateReview, copyToClipboard } = useReviewGenerator();
  const { toasts, removeToast, success, error } = useToast();

  const openGoogleReview = () => {
    const placeId = 'ChIJHxiDNywHYDkRggbFBozdlSw';
    // Full writereview URL — opens review dialog when handled correctly
    const reviewWebUrl = `https://search.google.com/local/writereview?placeid=${placeId}&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2`;

    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);

    if (isAndroid) {
      // intent:// forces this URL to be opened by the Maps app (com.google.android.apps.maps)
      // The Maps app DOES handle search.google.com/local/writereview URLs natively
      // and opens the review star-rating screen — not just the business profile.
      // S.browser_fallback_url is used gracefully if Maps is not installed.
      const encodedFallback = encodeURIComponent(reviewWebUrl);
      const intentUrl = `intent://search.google.com/local/writereview?placeid=${placeId}&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2#Intent;scheme=https;package=com.google.android.apps.maps;S.browser_fallback_url=${encodedFallback};end`;
      window.location.href = intentUrl;
    } else {
      // iOS + Desktop: web URL opens the review form reliably
      window.location.href = reviewWebUrl;
    }
  };

  const copyAndOpenReview = async () => {
    if (!state.review) return;
    
    try {
      await copyToClipboard();
      success('Review copied! Opening Google Maps...');
      
      // Delay to allow user to see the success message before transition
      setTimeout(() => {
        openGoogleReview();
      }, 1000);
    } catch (err) {
      error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#050a18] text-gold-50 selection:bg-gold-500/30 selection:text-gold-100 font-sans">
      <SchemaData />
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Navigation / Header */}
      <nav className="relative z-50 border-b border-white/5 bg-navy-950/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/30 p-0.5 bg-white shadow-[0_0_20px_rgba(175,138,79,0.2)]">
              <Image 
                src="/logo.jpg" 
                alt="Hotel Sai Darshan Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-tight text-white">
                Sai Darshan
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-semibold">
                Luxury & Comfort
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <span className="flex items-center gap-1.5 text-gold-400 bg-gold-400/5 px-3 py-1 rounded-full border border-gold-400/10">
              <Sparkles className="w-3.5 h-3.5 fill-gold-400" />
              4.8 Rated Experience
            </span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-24 grid-reorder gap-y-12 md:gap-y-20">
        
        {/* Hero Section */}
        <section className="area-hero text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-gold-200">AI-Powered Experience Assistant</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Immortalize Your <span className="text-gold-400 italic">Stay</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Let our AI capture the essence of your visit at Hotel Sai Darshan. 
            Generate a personalized review in seconds and share the magic with other travelers.
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-gold-400" />
              <div className="text-left">
                <p className="text-white font-semibold">Rajpipla</p>
                <p className="text-xs text-gray-500">Opp. Harshiddhimata Temple</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <Check className="w-5 h-5 text-gold-400" />
              <div className="text-left">
                <p className="text-white font-semibold">Premium Service</p>
                <p className="text-xs text-gray-500">Verified Guest Reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <Clock className="w-5 h-5 text-gold-400" />
              <div className="text-left">
                <p className="text-white font-semibold">Instant Result</p>
                <p className="text-xs text-gray-500">Less than 5 seconds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Card */}
        <div className="area-card relative group">
          {/* Card Border Background Mask */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-600/50 to-blue-600/30 rounded-[32px] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-[#0d152b] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300">
            {/* Header Pattern */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            <div className="p-8 md:p-12">
              {!state.review ? (
                <div className="text-center py-6">
                  <div className="w-24 h-24 bg-gold-400/10 rounded-3xl mx-auto mb-8 flex items-center justify-center border border-gold-400/20 group-hover:scale-110 transition-transform duration-500">
                    <Sparkles className="w-10 h-10 text-gold-400 animate-pulse" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                    Ready to share your story?
                  </h3>
                  <p className="text-gray-400 mb-10 max-w-sm mx-auto">
                    Click below to generate a unique, professional review based on our premium hospitality standards.
                  </p>
                  
                  <button
                    onClick={generateReview}
                    disabled={state.loading}
                    className="group relative w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500 to-gold-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(175,138,79,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.loading ? (
                      <>
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        <span>Curating Excellence...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        <span>Generate Review</span>
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                      <h4 className="text-xl font-serif font-bold text-white leading-none">Perfectly Crafted</h4>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {state.review.split(/\s+/).filter(w => w.length > 0).length} Words
                    </span>
                  </div>
                  
                  <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-10">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Sparkles className="w-12 h-12 text-gold-400" />
                    </div>
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light italic">
                      "{state.review}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={copyAndOpenReview}
                      className="group flex items-center justify-center gap-3 bg-white text-navy-950 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-gold-50 transition-all duration-300 hover:shadow-xl active:scale-95"
                    >
                      <Copy className="w-5 h-5" />
                      <span>Copy & Post to Maps</span>
                    </button>
                    
                    <button
                      onClick={generateReview}
                      disabled={state.loading}
                      className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 active:scale-95"
                    >
                      <RefreshCw className={`w-5 h-5 ${state.loading ? 'animate-spin' : ''}`} />
                      <span>Try Different Style</span>
                    </button>
                  </div>
                  
                  <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-2">
                    <Check className="w-3.5 h-3.5" />
                    Securely copied to your clipboard. Redirecting to Google Maps...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Luxury Experience Features */}
        <section className="mt-24">
          <h3 className="text-2xl font-serif font-bold text-white text-center mb-12">The Sai Darshan Promise</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Feature icon={<Sparkles className="w-6 h-6" />} label="5-Star Comfort" />
            <Feature icon={<MapPin className="w-6 h-6" />} label="Prime Location" />
            <Feature icon={<Phone className="w-6 h-6" />} label="24/7 Concierge" />
            <Feature icon={<Sparkles className="w-6 h-6" />} label="Daily Hygiene" />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Hotel Sai Darshan, Rajpipla. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
            A Premium Hospitality Experience near Harshiddhimataji Temple
          </p>
        </footer>
      </main>
    </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-500">
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gold-400 transition-colors">
        {label}
      </span>
    </div>
  );
}
