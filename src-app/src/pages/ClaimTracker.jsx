import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClaims } from '../context/ClaimContext';
import { useAuth } from '../context/AuthContext';

export default function ClaimTracker() {
  const navigate = useNavigate();
  const { claims } = useClaims();
  const { user } = useAuth();

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md flex justify-between items-center px-6 h-16 shadow-[0_40px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline-variant/20">
            <img 
              alt="User Farmer Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDLyPi4bgIq4NJh0vUraU0eKIfPjIfKU_ZZ53AMyOM08n3QmCZc3Jxdp9wmRn-cc2fj4PTyoZxoMfvfR4t4au1Wb1qC4qjx0mgVJq8bhHlB5txXSr4rzqMwMzuQRcJ0wy4hMlrvP_5OZV1JIhVECFqWb951RcMemoVPNJwY48M5LeSfqJpkXOAd91VY3_nS1R0wn15s0HfrjuFhNzy6Ay8CZ-Kqds5k1IshjFUjosckfQPKFvwv-3uaWsGEOJ4l0O2Mm2HEBUfIs4A"
            />
          </div>
          <span className="text-xl font-black text-[#E2E2E2] tracking-tighter cursor-pointer" onClick={() => navigate('/')}>AgriTech</span>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#9CD2B5] hover:bg-[#393939] transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">mic</span>
        </button>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {claims.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-on-surface-variant">No Claims Found</h2>
            <p className="mt-2 text-on-surface-variant">You have not submitted any claims yet.</p>
            <button onClick={() => navigate('/claim/upload/1')} className="mt-6 bg-primary text-on-primary px-6 py-2 rounded-lg font-bold">
              File New Claim
            </button>
          </div>
        ) : (
          <div className="space-y-24">
            {claims.map((claim, idx) => (
              <div key={idx} className="relative">
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-primary px-3 py-1 bg-primary-container rounded-full">Claim #{claim.id}</span>
                    <span className="text-xs font-bold tracking-widest uppercase text-on-tertiary-container px-3 py-1 bg-tertiary-container rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">satellite_alt</span>
                      Verified via satellite data
                    </span>
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">{claim.cropName || 'Crop Loss Recovery'}</h1>
                  <p className="text-on-surface-variant body-md leading-relaxed">
                    {claim.notes || 'Flood damage assessment verified through orbital multispectral imaging.'}
                  </p>
                </section>

                <section className="grid grid-cols-2 gap-4 mb-12">
                  <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary shadow-sm cursor-pointer" onClick={() => navigate(`/claims/${claim.id}`)}>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Estimated Payout</p>
                    <p className="text-2xl font-black text-primary tracking-tighter">
                      ${claim.amount ? claim.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '14,250.00'}
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-outline-variant shadow-sm cursor-pointer" onClick={() => navigate(`/claims/${claim.id}`)}>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Expected Date</p>
                    <p className="text-2xl font-black text-on-surface tracking-tighter">{claim.date || 'Oct 24, 2023'}</p>
                  </div>
                </section>

                {/* Timeline */}
                <section className="relative">
                  <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-outline-variant/30"></div>
                  <div className="space-y-10">
                    {/* Completed State */}
                    <div className="relative flex gap-6 items-start">
                      <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-on-surface">Submitted</h3>
                        <p className="text-sm text-on-surface-variant">Documentation and initial imagery uploaded on {claim.date || 'Oct 12, 09:14 AM'}.</p>
                      </div>
                    </div>

                    {/* Active State */}
                    <div className="relative flex gap-6 items-start cursor-pointer" onClick={() => navigate('/claim/verify')}>
                      <div className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 ${claim.status === 'Approved' ? 'bg-primary text-on-primary border-primary' : 'bg-primary-container text-primary border-primary'}`}>
                        {claim.status === 'Approved' ? (
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        ) : (
                          <span className="material-symbols-outlined">analytics</span>
                        )}
                      </div>
                      <div className={`flex-1 p-5 rounded-xl border ${claim.status === 'Approved' ? 'bg-surface-container-low border-outline-variant/20' : 'bg-surface-container border-primary/20'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-lg font-bold ${claim.status === 'Approved' ? 'text-on-surface' : 'text-primary'}`}>Under Verification</h3>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-tighter ${claim.status === 'Approved' ? 'bg-primary-container text-primary' : 'bg-primary/10 text-primary'}`}>
                            {claim.status === 'Approved' ? 'Passed' : 'In Progress'}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant mb-4">Satellite SAR analysis is comparing historical vegetation indices with current ground-level saturation.</p>
                        <div className="h-48 w-full rounded-lg overflow-hidden relative">
                          <img 
                            alt="Satellite Farm Imagery" 
                            className="w-full h-full object-cover grayscale opacity-60" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaqi65hDxNs5Kipvw91-I0qGsOAs-05GHNgMLOKSBTkjY1v_Mowz44dp6gFRpwpWjXcVZx7TtIbQNO_XZuTyP7CqutgR2JDeNI9wifuu9e5scn4NWRrN5AFEXUD0lbQ-cLycvNUzLCALL1sAmUv52fX_INp3wjg16jnKLjhVG7iyWrzhe1sZV0B3fH87ML6hrpvtG_0W29wcyPHXxSKwhI6lQtChc5-iK8rZeZcONV93Bhmn2eaPrlh5fIQ1zmXUrghxeBUPTNN-ct"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface-container/90 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">satellite_alt</span>
                            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Sentinel-2 Live Feed</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Future States */}
                    <div className={`relative flex gap-6 items-start ${claim.status === 'Approved' ? 'opacity-100' : 'opacity-50'}`}>
                      <div className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full ${claim.status === 'Approved' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-outline'}`}>
                        {claim.status === 'Approved' ? (
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        ) : (
                          <span className="material-symbols-outlined">verified</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${claim.status === 'Approved' ? 'text-on-surface' : 'text-on-surface-variant'}`}>{claim.status === 'Approved' ? 'Approved' : 'Pending Approval'}</h3>
                        <p className="text-sm text-on-surface-variant">{claim.status === 'Approved' ? 'Verification signature received from regional officer.' : 'Pending final verification signature from regional officer.'}</p>
                      </div>
                    </div>

                    <div className="relative flex gap-6 items-start opacity-50">
                      <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-outline">
                        <span className="material-symbols-outlined">payments</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-on-surface-variant">Payment Processing</h3>
                        <p className="text-sm text-on-surface-variant">Funds will be disbursed to linked account ending in *4492.</p>
                      </div>
                    </div>

                    <div className="relative flex gap-6 items-start opacity-30">
                      <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-outline">
                        <span className="material-symbols-outlined">task_alt</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-on-surface-variant">Completed</h3>
                        <p className="text-sm text-on-surface-variant">Claim closed and ledger archived.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Visual Separator for multiple claims */}
                {idx < claims.length - 1 && (
                  <div className="mt-16 border-t-2 border-dashed border-outline-variant/30"></div>
                )}
              </div>
            ))}

            <div className="mt-12 p-6 bg-surface-container-high rounded-xl border border-outline-variant/20">
              <h4 className="text-sm font-bold text-on-surface mb-2">Need assistance?</h4>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">If you believe there is an error in the satellite assessment, you can request a manual ground inspection.</p>
              <button className="w-full py-3 bg-surface-bright text-on-surface font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-outline-variant transition-colors active:scale-[0.98]">
                Request Manual Review
              </button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-[#0E0E0E] border-t border-[#404943]/20 z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Home</span>
        </button>
        <button onClick={() => navigate('/claims')} className="flex flex-col items-center justify-center bg-[#06402B] text-[#9CD2B5] rounded-xl px-4 py-1 active:scale-90 duration-150">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Claims</span>
        </button>
        <button onClick={() => navigate('/notifications')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Alerts</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined">person</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
