'use client';

import { Copy, ExternalLink, MapPin, Phone, Clock, Sparkles, RefreshCw, Check, AlertCircle } from 'lucide-react';
import SchemaData from '@/components/SchemaData';
import { useReviewGenerator } from '@/hooks/useReviewGenerator';
import { ToastContainer, useToast } from '@/components/Toast';

export default function Home() {
  const { state, generateReview, copyToClipboard } = useReviewGenerator();
  const { toasts, removeToast, success, error } = useToast();

  const openGoogleReview = () => {
    window.open('https://g.page/r/CYIGxQaM3ZUsEBM/review', '_blank');
  };

  const copyAndOpenReview = async () => {
    if (!state.review) return;
    
    try {
      // Copy to clipboard using the hook function
      await copyToClipboard();
      success('Review copied! Opening Google review page...');
      
      // Open Google review page after a short delay
      setTimeout(() => {
        openGoogleReview();
      }, 800);
    } catch (err) {
      error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SchemaData />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">SD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hotel Sai Darshan</h1>
                <p className="text-sm text-gray-600">Rajpipla, Gujarat</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-yellow-700">4.8</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Share Your Experience
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Generate authentic, SEO-optimized reviews for Hotel Sai Darshan in seconds
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5 bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Opp. Harshiddhi Mata Temple</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Quick Check-in</span>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">AI Review Generator</h3>
            </div>
          </div>
          
          <div className="p-8">
            {state.error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{state.error}</p>
              </div>
            )}

            {!state.review ? (
              <div className="text-center py-8">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Generate a Review in 10 Seconds
                  </h4>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Our AI creates unique, human-like reviews that help other travelers discover Hotel Sai Darshan
                  </p>
                </div>
                
                <button
                  onClick={generateReview}
                  disabled={state.loading}
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {state.loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                      <span>Generate Review</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Your Review is Ready
                  </h4>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-2xl p-6 relative">
                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                      {state.review}
                    </p>
                    
                    {/* Word count */}
                    <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {state.review.split(/\s+/).filter(w => w.length > 0).length} words
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mb-4">
                  <button
                    onClick={copyAndOpenReview}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      state.copied 
                        ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-lg hover:scale-[1.02]'
                    }`}
                  >
                    {state.copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Copied! Opening Google...</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <ExternalLink className="w-4 h-4" />
                        <span>Copy & Post Review</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Click to copy and open Google review page
                  </p>
                </div>

                <button
                  onClick={generateReview}
                  disabled={state.loading}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 ${state.loading ? 'animate-spin' : ''}`} />
                  <span>{state.loading ? 'Generating...' : 'Generate Another Review'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Generate authentic reviews to help others discover Hotel Sai Darshan
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Located at Opp. Harshiddhimataji Temple, Rajpipla, Gujarat
          </p>
        </div>
      </main>
    </div>
  );
}
