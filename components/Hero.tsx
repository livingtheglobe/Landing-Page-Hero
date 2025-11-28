import React, { useState } from 'react';
import { MapPin, AlertCircle, Search, Tag, Smartphone, CheckCircle, Download, ShieldCheck, Star } from 'lucide-react';
import { FeatureBullet } from './FeatureBullet';

// Shopify Variant Configuration
const VARIANTS = {
  English: '50232071356720',
  Deutsch: '50232071422256'
};

export const Hero: React.FC = () => {
  // Pre-select English
  const [selectedLang, setSelectedLang] = useState<'English' | 'Deutsch'>('English');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedLang) return;

    setIsAddingToCart(true);
    const variantId = VARIANTS[selectedLang];

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      });

      const data = await response.json();
      
      if (data.id) {
        // Success - redirect to cart
        window.location.href = '/cart';
      } else {
        console.error('Shopify Error:', data);
        alert('There was an issue adding to the cart. Please try again.');
        setIsAddingToCart(false);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Network error. Please try again.');
      setIsAddingToCart(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-maldives-50 to-sand-100">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-maldives-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-60"></div>

      <div className="container relative z-10 mx-auto px-5 py-12 lg:py-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-20">
          
          {/* LEFT COLUMN: Copy & CTA */}
          <div className="w-full lg:w-1/2 max-w-2xl pt-4">
            
            {/* Trust Element */}
            <div className="flex items-center gap-2 mb-6">
               <div className="flex text-accent-500">
                 {[1,2,3,4,5].map(i => (
                   <Star key={i} className="w-4 h-4 fill-current" />
                 ))}
               </div>
               <span className="text-sm font-medium text-gray-600 tracking-wide">Trusted by 2,000+ travelers</span>
            </div>

            {/* Headline (H2 as requested) */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ocean-900 leading-[1.1] mb-6 tracking-tight">
              Plan Your Trip <br className="hidden sm:block" />
              The Easy Way and <br className="hidden sm:block" />
              <span className="relative whitespace-nowrap">
                 Save Hundreds
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-500 opacity-90 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 font-light">
             Made for anyone who wants the dream Maldives island holiday without resort prices.
            </p>

            {/* Feature Bullets */}
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-4 mb-10">
              <FeatureBullet icon={MapPin} text="Find the best islands for your budget" />
              <FeatureBullet icon={CheckCircle} text="Planning strategies to save time & money" />
              <FeatureBullet icon={AlertCircle} text="Avoid expensive mistakes first-timers make" />
              <FeatureBullet icon={Smartphone} text="300+ pages Interactive Guide (maps & videos)" />
              <FeatureBullet icon={Tag} text="BONUS: Hotel discounts (save up to 50%)" />
              <FeatureBullet icon={Search} text="BONUS: Local Island Finder Tool ($19.99 Value)" />
            </div>

            {/* SHOPIFY CART SECTION */}
            <div className="bg-white/60 backdrop-blur-sm border border-maldives-100 rounded-2xl p-6 md:p-8 shadow-soft">
              
              {/* Language Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-ocean-900 uppercase tracking-widest mb-3 text-center sm:text-left">Select Your Language</h3>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  <button 
                    onClick={() => setSelectedLang('English')}
                    className={`flex-1 sm:flex-none py-3 px-6 rounded-lg border-2 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      selectedLang === 'English' 
                        ? 'border-maldives-500 bg-maldives-500 text-white shadow-md' 
                        : 'border-gray-200 bg-white text-gray-600 hover:border-maldives-500 hover:text-maldives-500'
                    }`}
                  >
                    <span className="text-lg">🇬🇧</span> English
                  </button>
                  <button 
                    onClick={() => setSelectedLang('Deutsch')}
                    className={`flex-1 sm:flex-none py-3 px-6 rounded-lg border-2 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      selectedLang === 'Deutsch' 
                        ? 'border-maldives-500 bg-maldives-500 text-white shadow-md' 
                        : 'border-gray-200 bg-white text-gray-600 hover:border-maldives-500 hover:text-maldives-500'
                    }`}
                  >
                    <span className="text-lg">🇩🇪</span> Deutsch
                  </button>
                </div>
              </div>

              {/* Price Display */}
              <div className="flex flex-col items-center sm:items-start mb-4">
                 <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif font-bold text-ocean-900">$29.99</span>
                    <span className="text-lg font-medium text-gray-400">USD</span>
                 </div>
              </div>

              {/* Main CTA Button */}
              <button 
                onClick={handleAddToCart}
                disabled={!selectedLang || isAddingToCart}
                className={`group w-full relative overflow-hidden text-white text-lg font-bold py-5 px-8 rounded-xl shadow-soft transition-all duration-300 transform ${
                  !selectedLang 
                    ? 'bg-gray-300 cursor-not-allowed opacity-80' 
                    : 'bg-maldives-500 hover:bg-maldives-600 hover:-translate-y-1'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isAddingToCart ? (
                    'Adding to cart...'
                  ) : !selectedLang ? (
                    'Select a Language Above'
                  ) : (
                    <>
                      Download the Guide
                      <Download className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                {/* Shine effect */}
                {selectedLang && <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>}
              </button>
              
              {/* Frictionless Message */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                   <ShieldCheck className="w-4 h-4 text-maldives-500" />
                   <span>Instant PDF access.</span>
                </div>
                <span className="hidden sm:inline text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                   <CheckCircle className="w-4 h-4 text-maldives-500" />
                   <span>Future Updates included.</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Image (Hidden on Mobile, Larger on Desktop) */}
          <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center h-full">
            <div className="relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500 w-full flex justify-center">
              <img 
                src="https://cdn.shopify.com/s/files/1/0942/5666/0784/files/MOAB.png?v=1764162757" 
                alt="Maldives on a Budget Smart Guide Book Cover"
                className="w-[700px] max-w-none drop-shadow-2xl rounded-r-lg"
              />
            </div>
            {/* Background blur effect behind book */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-maldives-400/20 blur-3xl rounded-full -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};
