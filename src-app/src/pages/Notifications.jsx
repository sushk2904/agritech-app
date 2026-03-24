import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-lowest min-h-screen pb-24 text-on-surface font-body">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md flex justify-between items-center px-6 h-16 shadow-[0_40px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant/20">
            <img 
              alt="User Farmer Profile" 
              className="w-full h-full object-cover" 
              data-alt="Close up portrait of a weathered, smiling Indian farmer wearing a traditional white turban, warm golden sunlight, high detail" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8H0PeAdjPZ0ZuiKd4k4Zi6l3xA_Ka9qJtWyhJOaYM4ln0Kai1bXLEhXRcMYw8EsJvZB-RlYv2ES87z5eWn3XQypxxfFawUr-TnefAE5KcVsk0VJwzfWhkG1OOILUI1iN7XS5cbYzoMKx1-vyPm0KAgUh8Ww8EOLVA6_FPOhOJJZkpS1tYUcv59wz0WTkvV37MqXMTtF35CgPfOIiPY9D_VhDTMG9yZFLDc8G5fp2Qu0QkBt8quOIVxAOuf8zVQ_XxHkQoMfPvimqC"
            />
          </div>
          <h1 className="text-xl font-black text-[#E2E2E2] tracking-tighter">AgriTech</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full text-[#9CD2B5] hover:bg-[#393939] transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined">mic</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-[1.75rem] font-headline font-bold text-on-surface leading-tight mb-2">Alerts</h2>
          <p className="text-on-surface-variant text-base">Real-time updates on your claims and farm status.</p>
        </div>

        {/* Notification Feed */}
        <div className="space-y-4">
          {/* Unread Message: Claim Approved */}
          <div className="relative group">
            <div className="bg-surface-container-low rounded-xl p-5 border-l-4 border-primary transition-all hover:bg-surface-container">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Approved</span>
                <span className="text-on-surface-variant text-[11px] font-medium">10:45 AM</span>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface font-bold text-lg mb-1">₹15,000 claim approved</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">The relief fund for your Kharif season crop loss has been sanctioned. Amount will be credited to your linked bank account within 48 hours.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Unread Message: Verification */}
          <div className="relative group">
            <div className="bg-surface-container-low rounded-xl p-5 border-l-4 border-primary transition-all hover:bg-surface-container">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Verified</span>
                <span className="text-on-surface-variant text-[11px] font-medium">Yesterday</span>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface font-bold text-lg mb-1">Your crop damage has been verified</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">The field officer has completed the inspection of Survey No. 402. The reported 70% damage has been officially logged in the ledger.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Date Separator */}
          <div className="flex items-center gap-4 py-4">
            <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Earlier this week</span>
            <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
          </div>

          {/* Read Message: Soil Report */}
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 opacity-80 transition-all hover:opacity-100">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Information</span>
              <span className="text-on-surface-variant text-[11px] font-medium">Oct 24</span>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <span className="material-symbols-outlined text-on-surface-variant text-2xl">description</span>
              </div>
              <div className="flex-1">
                <p className="text-on-surface font-bold text-lg mb-1">New Soil Health Card available</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">Your quarterly soil analysis is ready. Recommendations for nitrogen application have been updated based on recent moisture levels.</p>
              </div>
            </div>
          </div>

          {/* Read Message: Weather Alert */}
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 opacity-80 transition-all hover:opacity-100">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Warning</span>
              <span className="text-on-surface-variant text-[11px] font-medium">Oct 22</span>
            </div>
            <div className="flex gap-4">
              <div className="mt-1">
                <span className="material-symbols-outlined text-tertiary text-2xl">thunderstorm</span>
              </div>
              <div className="flex-1">
                <p className="text-on-surface font-bold text-lg mb-1">Heavy Rainfall Warning</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">IMD predicts heavy showers in your block for the next 48 hours. Ensure proper drainage in your pomegranate orchards.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-[#0E0E0E] border-t border-[#404943]/20 z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold">Home</span>
        </button>
        <button onClick={() => navigate('/claims')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">description</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold">Claims</span>
        </button>
        <button onClick={() => navigate('/notifications')} className="flex flex-col items-center justify-center bg-[#06402B] text-[#9CD2B5] rounded-xl px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold">Alerts</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
}
