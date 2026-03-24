import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [idInput, setIdInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (idInput.trim()) {
      login(idInput);
      navigate('/');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Monolith Texture (Subtle) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-on-tertiary-container/20 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Logo Section */}
      <header className="mb-16 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-2">
          AgriTech
        </h1>
        <p className="text-on-surface-variant font-medium tracking-[0.2em] uppercase text-xs">
          Empowering Rural Prosperity
        </p>
      </header>

      {/* Login Container */}
      <div className="w-full max-w-md z-10">
        <div className="bg-surface-container-low p-8 md:p-10 rounded-xl space-y-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]">
          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-on-surface">Sign in</h2>
            <p className="text-on-surface-variant text-sm">Access your farm records and insurance dashboard.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label 
                className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2" 
                htmlFor="farmer-id"
              >
                Farmer ID or Mobile Number
              </label>
              <div className="relative">
                <input 
                  className="w-full h-14 bg-surface-container-highest border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 text-on-surface placeholder:text-outline transition-all rounded-t-lg px-4 text-lg outline-none" 
                  id="farmer-id" 
                  placeholder="e.g., 9876543210" 
                  type="text"
                  value={idInput}
                  onChange={(e) => setIdInput(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Primary Action */}
            <button 
              type="submit"
              className="w-full h-14 bg-primary text-on-primary font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all text-lg"
            >
              Send OTP
              <span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
            </button>

            {/* Accessibility Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">or</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>

            {/* Voice Sign-in */}
            <button 
              type="button"
              className="w-full h-14 bg-surface-container border border-outline-variant/20 text-on-surface font-bold rounded-lg flex items-center justify-center gap-3 hover:bg-surface-bright active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-primary" data-icon="mic" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
              Voice Sign-in
            </button>
          </form>

          {/* Security Badge */}
          <div className="pt-4 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-primary-container/30 rounded-full">
              <span className="material-symbols-outlined text-[16px] text-on-primary-container" data-icon="verified_user" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container">Trustworthy &amp; Secure</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <footer className="mt-12 flex justify-between items-center text-on-surface-variant">
          <button className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Need Help?</button>
          <div className="flex gap-4">
            <button className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">English</button>
            <span className="text-outline-variant">|</span>
            <button className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">हिन्दी</button>
          </div>
        </footer>
      </div>

      {/* Decorative Earth Imagery (Bottom Corner) */}
      <div className="fixed bottom-0 right-0 w-64 h-64 opacity-20 grayscale pointer-events-none mix-blend-screen">
        <img 
          alt="dramatic aerial view of plowed farm fields at sunset" 
          className="w-full h-full object-cover rounded-tl-[120px]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKzFymGyp58KjYQC6Z5qB1eIgcad91oizApVO6cbV5Ro6vhGx0251571PWrbVqJWo_1Q3uyfyH50Sl6L994h_OxN0TmfsuAtCRl96dRhBWkeocBYDhxknbU4AyRCcvaNUYyreJpqI3yKGZPw1VU_3l6AtBkpNUzxcwPYZXjQf7r3j8y3v6eWg50jaXailWzeE06niS9wXxhtNAWM5QVZea4uUzhWwCvSYZD7U6OwYT5YVfPs1LD8lNIbv2gHjUGgX77IVnMTJ8ZNJz"
        />
      </div>
    </main>
  );
}
