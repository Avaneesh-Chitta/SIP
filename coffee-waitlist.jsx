import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * HIGH-CONVERSION WAITLIST LANDING PAGE
 * 
 * DESIGN DECISIONS:
 * 1. Typography: Cormorant Garamond (refined serif) + DM Sans (clean sans)
 * 2. Color: Warm neutrals - avoids stark black/white, feels sophisticated
 * 3. Spacing: Generous whitespace creates premium feel, improves readability
 * 4. Copy: Every word earns its place - no fluff, no hype
 * 5. Conversion: Two CTAs (hero + dedicated section), friction reducers throughout
 * 6. Motion: Subtle fade-ups on scroll, smooth interactions, never jarring
 */

export default function CoffeeWaitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Check if already submitted
  useEffect(() => {
    const checkSubmission = async () => {
      try {
        const result = await window.storage.get('waitlist_submitted');
        if (result) {
          setSubmitted(true);
        }
      } catch (err) {
        // Key doesn't exist, user hasn't submitted
      }
    };
    checkSubmission();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    try {
      // Store submission (in real app, this would call your backend)
      const timestamp = new Date().toISOString();
      await window.storage.set('waitlist_submitted', 'true');
      await window.storage.set('waitlist_email', email);
      if (name) {
        await window.storage.set('waitlist_name', name);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8E4DD]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="sip-logo.png" 
              alt="Sip Coffee" 
              className="h-10 w-auto"
            />
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={scrollToWaitlist}
            className="font-body text-sm font-medium text-[#1A1A1A] hover:text-[#8B6F47] transition-colors duration-200"
          >
            Join waitlist
          </motion.button>
        </div>
      </header>

      {/* Custom Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@400;500;600&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .font-display {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-body {
          font-family: 'DM Sans', sans-serif;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom selection color */
        ::selection {
          background-color: #D4C5B0;
          color: #1A1A1A;
        }

        /* Remove number input arrows */
        input[type="email"]::-webkit-outer-spin-button,
        input[type="email"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>

      {/* HERO SECTION - Critical first impression */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1A1A1A 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          {/* Main headline - does the heavy lifting */}
          <h1 className="font-display font-light text-5xl md:text-7xl leading-[1.1] mb-6 tracking-tight">
            Flavoured coffee<br />designed like fragrance
          </h1>
          
          {/* Reframe - shifts perception immediately */}
          <p className="font-body text-lg md:text-xl text-[#4A4A4A] mb-10 max-w-2xl mx-auto leading-relaxed">
            High-quality Arabica. Naturally identical flavours. Carefully ratioed.<br className="hidden md:block" />
            Not sweet. Not a cover-up. An intentional layer.
          </p>

          {/* Primary CTA - high contrast, unmissable */}
          <button
            onClick={scrollToWaitlist}
            className="font-body bg-[#1A1A1A] text-[#FAF8F5] px-10 py-4 text-base font-medium tracking-wide
                     hover:bg-[#2A2A2A] transition-colors duration-300 mb-4 inline-block"
          >
            Join the waitlist
          </button>

          {/* Friction reducer - builds trust */}
          <p className="font-body text-sm text-[#6A6A6A]">
            Get the Caf'e to your home with us. <br/>
            Early access for founding tasters.
          </p>
        </motion.div>
      </section>

      {/* PROBLEM REFRAME - Validates skepticism */}
      <section className="py-24 px-6 border-t border-[#E8E4DD]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-light mb-6 leading-tight">
            Flavoured coffee has a reputation problem
          </h2>
          <div className="font-body text-base md:text-lg text-[#4A4A4A] leading-relaxed space-y-4">
            <p>
              Most flavoured coffees taste like they're hiding something. Because they are.
              Poor beans, artificial syrups, dessert-level sweetness.
            </p>
            <p>
              The flavour for them isn't meant to complement the coffee. It's meant to mask it.
            </p>
            <p>
              We think that's backwards.
            </p>
          </div>
        </motion.div>
      </section>

      {/* DIFFERENCE - Execution-focused, no fluff */}
      <section className="py-24 px-6 bg-[#F5F2ED]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-light mb-12 leading-tight text-center">
            What we're doing differently
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Point 1 */}
            <div>
              <div className="font-display text-6xl font-light text-[#8B6F47] mb-4">01</div>
              <h3 className="font-body font-medium text-lg mb-3">Coffee quality first</h3>
              <p className="font-body text-[#4A4A4A] leading-relaxed">
                100% Arabica beans, ground fresh. The kind of coffee that stands on its own.
                Flavour starts with what's in the cup.
              </p>
            </div>

            {/* Point 2 */}
            <div>
              <div className="font-display text-6xl font-light text-[#8B6F47] mb-4">02</div>
              <h3 className="font-body font-medium text-lg mb-3">Flavour as a layer, not a cover</h3>
              <p className="font-body text-[#4A4A4A] leading-relaxed">
                Naturally identical flavours, carefully measured. Experience it like a fragrance with different notes.
                You taste coffee first. The flavour reveals it.
              </p>
            </div>

            {/* Point 3 */}
            <div>
              <div className="font-display text-6xl font-light text-[#8B6F47] mb-4">03</div>
              <h3 className="font-body font-medium text-lg mb-3">Designed ratios</h3>
              <p className="font-body text-[#4A4A4A] leading-relaxed">
                Not random flavouring. Each blend is tested for balance, enough to be distinct,
                restrained enough to let the coffee speak.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* HOW TO DRINK - Elevates the ritual */}
      <section className="py-24 px-6 border-t border-[#E8E4DD]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-light mb-8 leading-tight">
            How it's meant to be drunk
          </h2>
          <div className="font-body text-base md:text-lg text-[#4A4A4A] leading-relaxed space-y-6">
            <p>
              <span className="font-medium text-[#1A1A1A]">200ml of hot water.</span> Not boiling. Just off the boil.
            </p>
            <p>
              <span className="font-medium text-[#1A1A1A]">One teaspoon of specially crafted SIP coffee in a filter .</span> Stir. Let it settle for 30 seconds.
            </p>
            <p>
              <span className="font-medium text-[#1A1A1A]">Smell it first.</span> That's where the layers reveal themselves.
            </p>
            <p className="text-sm pt-4 border-t border-[#E8E4DD] mt-8">
              Ground coffee can be intentional. It doesn't have to be "instant" to be good.
            </p>
          </div>
        </motion.div>
      </section>

      {/* WHO IT'S FOR - Selective positioning increases desire */}
      <section className="py-24 px-6 bg-[#F5F2ED]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Who it's for */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light mb-6">This is for you if:</h2>
              <ul className="font-body text-[#4A4A4A] leading-relaxed space-y-3">
                <li className="flex items-start">
                  <span className="text-[#8B6F47] mr-3 mt-1">—</span>
                  <span>You're curious about flavoured coffee but never found one that felt right</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8B6F47] mr-3 mt-1">—</span>
                  <span>You care about what you drink, not just the caffeine</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8B6F47] mr-3 mt-1">—</span>
                  <span>You appreciate restraint and intention over loud claims</span>
                </li>
              </ul>
            </div>

            </div>
        </motion.div>
      </section>

      {/* WAITLIST SECTION - Conversion optimized */}
      <section id="waitlist" className="py-32 px-6 border-t border-[#E8E4DD]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          {!submitted ? (
            <>
              {/* Logo before heading */}
              <div className="flex justify-center mb-8">
                <img 
                  src="sip-logo.png" 
                  alt="Sip Coffee" 
                  className="h-16 w-auto opacity-90"
                />
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4 leading-tight text-center">
                Be among the first
              </h2>
              <p className="font-body text-lg text-[#4A4A4A] mb-10 text-center leading-relaxed">
                Limited first batch. Early access for founding tasters.<br />
                We'll reach out when it's ready.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name input */}
                <input
                  type="text"
                  placeholder="Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-[#E8E4DD] font-body
                           focus:outline-none focus:border-[#8B6F47] transition-colors duration-200
                           placeholder:text-[#9A9A9A]"
                />

                {/* Email input - primary conversion point */}
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-4 bg-white border border-[#E8E4DD] font-body
                           focus:outline-none focus:border-[#8B6F47] transition-colors duration-200
                           placeholder:text-[#9A9A9A]"
                />

                {error && (
                  <p className="text-sm text-red-600 font-body">{error}</p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1A1A1A] text-[#FAF8F5] py-4 font-body font-medium
                           hover:bg-[#2A2A2A] transition-colors duration-300 disabled:opacity-50
                           disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Join the waitlist'}
                </button>

                <p className="text-sm text-[#6A6A6A] text-center font-body pt-2">
                  No spam. Just launch updates. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#8B6F47] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#FAF8F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-3xl font-light mb-3">You're on the list</h3>
              <p className="font-body text-lg text-[#4A4A4A] leading-relaxed">
                We'll reach out when the first batch is ready.<br />
                Thank you for your interest.
              </p>
            </div>
          )}
        </motion.div>
      </section>

      {/* FOOTER - Minimal, confident */}
      <footer className="py-12 px-6 border-t border-[#E8E4DD]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-lg text-[#4A4A4A] mb-4">
            Flavoured coffee, done right
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#6A6A6A] hover:text-[#1A1A1A] transition-colors duration-200 font-body text-sm"
            >
              Instagram
            </a>
            <a 
              href="mailto:hello@example.com"
              className="text-[#6A6A6A] hover:text-[#1A1A1A] transition-colors duration-200 font-body text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
