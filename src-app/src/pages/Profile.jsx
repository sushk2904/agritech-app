import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleAccordion = (name) => {
    setActiveAccordion(prev => prev === name ? null : name);
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md flex justify-between items-center px-6 h-16 shadow-[0_40px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-[#E2E2E2] tracking-tighter" onClick={() => navigate('/')}>AgriTech</span>
        </div>
        <button onClick={() => setShowSettings(true)} className="w-10 h-10 rounded-full flex items-center justify-center text-[#9CD2B5] hover:bg-[#393939] transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-8">
        <section className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-primary-container overflow-hidden border-4 border-surface-container-highest shadow-xl">
            <img 
              alt="User Farmer Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdaC2b9A8CI_iUoL3OYDtdWMJqSkBELbTR3q8qP_vaKC_DzkarTwKcJTOr8DWa2OrayHiEZAmh6S9lHLla18bnSy3Rxn-s03N1SlZIuxrdHyVtUEhoziG4BNXvcdo-gJyNmtMnNBWT99QP_-OAt2wz33_Lzaj8KpVyezN5nNPp1QSNbQYwCqLnT40ZM9x8NPM9JFQbCa2o8SwFovvZc598sToJK0wozFxYiRsBjXfPMf9fBtcwgoQ0sdbNhbmU0hX-QW19g4o6mII"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-on-surface tracking-tight">{user ? user.name : 'Farmer Profile'}</h1>
            <p className="text-sm font-bold tracking-widest uppercase text-primary mt-1">{user ? user.id : 'ID: 884-219'}</p>
          </div>
        </section>

        <section className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
          <h2 className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-4">Account Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
              <span className="text-sm text-on-surface-variant">Location</span>
              <span className="text-sm font-bold">{user ? user.location : 'Anantapur, AP'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
              <span className="text-sm text-on-surface-variant">Phone Number</span>
              <span className="text-sm font-bold">+91 98765 43210</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-on-surface-variant">Active Policies</span>
              <span className="text-sm font-bold text-primary">Kharif 2024</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          {/* Bank Accounts Accordion */}
          <div className="bg-surface-container rounded-xl overflow-hidden transition-all">
            <button onClick={() => toggleAccordion('bank')} className="w-full p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined">payments</span>
                <span className="font-bold text-sm">Bank Accounts</span>
              </div>
              <span className={`material-symbols-outlined text-on-surface-variant text-sm transition-transform ${activeAccordion === 'bank' ? 'rotate-90' : ''}`}>chevron_right</span>
            </button>
            {activeAccordion === 'bank' && (
              <div className="p-4 pt-0 border-t border-outline-variant/10 mt-2 bg-surface-container-low/50">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-surface-container-highest rounded-lg">
                    <span className="material-symbols-outlined text-primary">account_balance</span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">State Bank of India</p>
                      <p className="text-xs text-on-surface-variant tracking-wider">XXXX-XXXX-4492</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest rounded-full">Primary</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={() => navigate('/claims')} className="w-full bg-surface-container p-4 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined">history</span>
              <span className="font-bold text-sm">Claim History</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
          </button>

          {/* Help & Support Accordion */}
          <div className="bg-surface-container rounded-xl overflow-hidden transition-all">
            <button onClick={() => toggleAccordion('support')} className="w-full p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined">help</span>
                <span className="font-bold text-sm">Help & Support</span>
              </div>
              <span className={`material-symbols-outlined text-on-surface-variant text-sm transition-transform ${activeAccordion === 'support' ? 'rotate-90' : ''}`}>chevron_right</span>
            </button>
            {activeAccordion === 'support' && (
              <div className="p-4 pt-0 border-t border-outline-variant/10 mt-2 bg-surface-container-low/50">
                <div className="space-y-4 pt-3">
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary">call</span>
                    <span>1800-123-4567 (Toll Free)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    <span>support@agritech.com</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="pt-8">
          <button 
            onClick={handleLogout}
            className="w-full bg-error/10 text-error py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-error/20 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign Out
          </button>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-[#0E0E0E] border-t border-[#404943]/20 z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Home</span>
        </button>
        <button onClick={() => navigate('/claims')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined">description</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Claims</span>
        </button>
        <button onClick={() => navigate('/notifications')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Alerts</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-[#06402B] text-[#9CD2B5] rounded-xl px-4 py-1 active:scale-90 duration-150">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Profile</span>
        </button>
      </nav>

      {/* Settings Modal overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowSettings(false)}>
          <div className="w-full max-w-2xl bg-[#1A1A1A] rounded-t-3xl p-6 shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
              <h2 className="text-xl font-bold text-on-surface tracking-tight">App Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Push Notifications</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Receive alerts for claim updates</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative shadow-inner cursor-pointer opacity-80">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-[#1A1A1A] rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Biometric Authentication</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Fingerprint login enabled</p>
                </div>
                <div className="w-12 h-6 bg-surface-container-high rounded-full relative shadow-inner cursor-pointer" onClick={(e) => { e.currentTarget.classList.toggle('bg-primary'); e.currentTarget.classList.toggle('bg-surface-container-high'); const thumb = e.currentTarget.querySelector('div'); thumb.classList.toggle('right-1'); thumb.classList.toggle('left-1'); }}>
                  <div className="absolute right-1 top-1 w-4 h-4 bg-[#1A1A1A] rounded-full shadow-sm transition-all duration-300"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-on-surface">App Theme</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Locked in high-contrast dark mode</p>
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Dark</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
