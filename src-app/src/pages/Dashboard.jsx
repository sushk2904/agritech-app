import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useClaims } from '../context/ClaimContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { claims } = useClaims();

  const activeClaim = claims.length > 0 ? claims[0] : null;

  return (
    <div className="text-on-surface antialiased min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md shadow-[0_40px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center px-6 h-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
              <img 
                alt="User Farmer Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbXqjIjq8xGiRYXswpKO_oTOkPxkR6WlgczeQZBBvUjUANkq28AlOYqW9u8dUICxKoWlWREzuQtmfTzg90ErlG4Izl7lycd0WnooBJa4g2hNP2PMGClKrAGMSob6szpOJWfxP5-soePU7VlddSyivy1ljo2_5R061NIe3xZVrGEInioFeGPwqAmkCutssV4ThXGxMPc7NbQEqP6UPWlCi9XG7Yb6yHVW3Q5FPUrpBqe5E5LwUC17m8ImVL9An7epWqudj7Fn_zPQST"
              />
            </div>
            <span className="text-xl font-black text-[#E2E2E2] tracking-tighter">AgriTech</span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#393939] transition-colors active:scale-95 duration-200 text-[#9CD2B5]">
            <span className="material-symbols-outlined">mic</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-8">
        {/* Farmer Greeting */}
        <section className="space-y-1">
          <p className="text-on-surface-variant font-medium tracking-wide">Namaste,</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">{user ? user.name : 'Ramesh Rao'}</h1>
        </section>

        {/* Weather Snippet */}
        <section className="flex items-center justify-between p-5 bg-surface-container rounded-xl border-l-4 border-primary">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary text-4xl">partly_cloudy_day</span>
            <div>
              <h2 className="text-2xl font-bold">28°C</h2>
              <p className="text-sm text-on-surface-variant">Slight chance of rain at 4 PM</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest font-bold text-primary">{user ? user.location : 'Anantapur'}</p>
            <p className="text-sm text-on-surface-variant">Humidity: 64%</p>
          </div>
        </section>

        {/* Primary Overview Card */}
        <section className="relative overflow-hidden bg-surface-container-low rounded-xl p-6 shadow-xl group">
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant">Policy Details</span>
                <h3 className="text-xl font-bold mt-1">Active Policy: Kharif 2024</h3>
              </div>
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Verified
              </span>
            </div>
            
            {activeClaim ? (
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <div className="space-y-1">
                  <p className="text-xs text-on-surface-variant">Current Claim #{activeClaim.id}</p>
                  <p className="text-lg font-bold text-primary">{activeClaim.status}</p>
                </div>
                <button 
                  onClick={() => navigate(`/claims/${activeClaim.id}`)} 
                  className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm active:scale-95 transition-transform hover:bg-primary-fixed"
                >
                  View Details
                </button>
              </div>
            ) : (
               <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <div className="space-y-1">
                  <p className="text-xs text-on-surface-variant">Current Claim Status</p>
                  <p className="text-lg font-bold text-on-surface-variant">No Active Claims</p>
                </div>
                <button 
                  onClick={() => navigate('/claim/upload/1')} 
                  className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm active:scale-95 transition-transform hover:bg-primary-fixed"
                >
                  File Claim
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => navigate('/claim/upload/1')}
            className="bg-surface-container-high p-5 rounded-xl flex flex-col gap-4 hover:bg-surface-bright transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">add_box</span>
            </div>
            <span className="font-bold text-sm leading-tight">File New<br/>Claim</span>
          </div>

          <div 
            onClick={() => navigate('/claims')}
            className="bg-surface-container-high p-5 rounded-xl flex flex-col gap-4 hover:bg-surface-bright transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">fact_check</span>
            </div>
            <span className="font-bold text-sm leading-tight">Check Claim<br/>Status</span>
          </div>

          <div 
            onClick={() => navigate('/claim/upload/1')}
            className="bg-surface-container-high p-5 rounded-xl flex flex-col gap-4 hover:bg-surface-bright transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">photo_camera</span>
            </div>
            <span className="font-bold text-sm leading-tight">Upload Crop<br/>Images</span>
          </div>

          <div 
            onClick={() => navigate('/notifications')}
            className="bg-surface-container-high p-5 rounded-xl flex flex-col gap-4 hover:bg-surface-bright transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <span className="font-bold text-sm leading-tight">Weather<br/>Alert</span>
          </div>
        </section>

        {/* Activity Cards */}
        <section className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant">Recent Activity</h4>
          <div className="bg-surface-container-low space-y-2 rounded-xl cursor-default overflow-hidden">
            {activeClaim ? (
              <div onClick={() => navigate(`/claims/${activeClaim.id}`)} className="bg-surface-container p-4 flex items-center gap-4 cursor-pointer hover:bg-surface-container-high transition-colors">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-surface-container-highest flex items-center justify-center">
                  {activeClaim.images && activeClaim.images.length > 0 ? (
                    <img alt="Crop" className="w-full h-full object-cover" src={activeClaim.images[0]} />
                  ) : (
                    <span className="material-symbols-outlined text-on-surface-variant text-3xl">image</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Claim {activeClaim.id} Submitted</p>
                  <p className="text-xs text-on-surface-variant">{activeClaim.date} • {activeClaim.status}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
              </div>
            ) : (
              <div className="bg-surface-container p-4 flex items-center gap-4">
                <div className="flex-1 p-2">
                  <p className="text-sm font-bold text-on-surface-variant">No recent activity</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Visual Anchor: Voice FAB */}
        <div className="flex justify-center pt-4">
          <button className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(156,210,181,0.3)] active:scale-90 transition-all hover:bg-primary-fixed">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
            Voice Assistant
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-[#0E0E0E] border-t border-[#404943]/20 z-40">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center bg-[#06402B] text-[#9CD2B5] rounded-xl px-4 py-1 active:scale-90 duration-150 transition-all">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Home</span>
        </button>
        <button onClick={() => navigate('/claims')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] active:scale-90 duration-150 transition-all">
          <span className="material-symbols-outlined">description</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Claims</span>
        </button>
        <button onClick={() => navigate('/notifications')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] active:scale-90 duration-150 transition-all relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Alerts</span>
          <div className="absolute top-1 right-5 w-2 h-2 bg-error rounded-full"></div>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] active:scale-90 duration-150 transition-all">
          <span className="material-symbols-outlined" data-icon="person">person</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
