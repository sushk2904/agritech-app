import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClaims } from '../context/ClaimContext';

export default function VerificationSimulator() {
  const navigate = useNavigate();
  const { claims, updateClaimStatus } = useClaims();
  
  // Find the most recent claim that is still "Under Verification"
  const [claimId, setClaimId] = useState(null);

  useEffect(() => {
    const claim = claims.find(c => c.status === 'Under Verification');
    if (claim && !claimId) {
      setClaimId(claim.id);
    }
  }, [claims, claimId]);
  
  const [step, setStep] = useState(0); 
  // 0: Uploading, 1: Verifying, 2: Geo-checking, 3: Final Decision, 4: Approved

  useEffect(() => {
    if (!claimId) return;

    const timers = [
      setTimeout(() => setStep(1), 1500),  // Move to Verifying
      setTimeout(() => setStep(2), 4000),  // Move to Geo-checking
      setTimeout(() => setStep(3), 6500),  // Move to Final Decision
      setTimeout(() => {
        setStep(4); // Approved
        updateClaimStatus(claimId, 'Approved');
      }, 9000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [claimId, updateClaimStatus]);

  if (!claimId && step < 4) {
     // If user navigates here directly or no active verification
     return (
        <div className="bg-[#131313] text-[#e2e2e2] min-h-screen flex flex-col items-center justify-center p-6">
           <h2 className="text-xl font-bold mb-4">No active verification in progress</h2>
           <button onClick={() => navigate('/claims')} className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold">Back to Claims</button>
        </div>
     );
  }

  const isComplete = step >= 4;

  return (
    <div className="bg-[#131313] text-[#e2e2e2] min-h-screen pb-24 font-['Inter']">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md flex justify-between items-center px-6 h-16 shadow-[0_40px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#9CD2B5]" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
          <span className="text-xl font-black text-[#E2E2E2] tracking-tighter cursor-pointer" onClick={() => navigate('/')}>AgriTech</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#C0C9C1] hover:bg-[#393939] p-2 rounded-full transition-colors cursor-pointer">mic</span>
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20">
            <img 
              alt="User Farmer Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJnzElVjkbJ2eiego8i1Kvm25n2g3KeBk5NCeCHHvhjxyIy-eoCnped_ugKnYTLOkPT7rZQSUbzLtgvHokutr6SBD1A-qS8O_XXH0WjASFJrD4QKp3PA0e0xnMdIdckA2Rh2cJ2tcdxanjqCcOBIOFErgEq1BaAscx9jzcqcyzbVoc2eDMaN0k9rIzDTPRtLrbCTyGNodExWk-8Mrxzky4WE53mpTA4NkR_62wphmRvdtWwJ6g46Chliz7saR-U1Vi9QVMk3fhNSzQ"
            />
          </div>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <section className="space-y-2">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase">Verification Stage</span>
              <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mt-1">Satellite Analysis</h1>
            </div>
            {isComplete ? (
              <div className="bg-primary-container border border-primary/20 px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Verified</span>
              </div>
            ) : (
              <div className="bg-primary-container/30 border border-primary/20 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm animate-spin">sync</span>
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Processing</span>
              </div>
            )}
          </div>
        </section>

        {/* Central Progress Indicator */}
        <section className="relative aspect-square md:aspect-video w-full rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/10 shadow-2xl flex flex-col items-center justify-center p-8">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
            <img 
              className="w-full h-full object-cover grayscale opacity-50" 
              alt="satellite view" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC0AsJawv-QK_C6QDlMIK80dyPHuQuDLyJRKtUGLFjL0pDN5WhyljAg26gm0UFj1UhkeGY3AZfzK37LQMok7DX3C2rT18x-fVXpDhHmyMzU0fiYHW4QhdmXhM4gvP4IlsL3l_MawO6OGLwu63Usl76MEMrSqGsCy955MGUFDK-cow3sFtv6SezEg4tbLx8PVOzGvrdPe6f98cWIJiFLBrbPGVO8WMbn2Vjj_cCjuV7UBoR9bFkGTHBxyWyRZ_ZvIMfg-HSzxwb7qEN"
            />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] bg-[length:32px_32px]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            {isComplete ? (
              <div className="relative flex items-center justify-center">
                <div className="absolute w-48 h-48 border-2 border-primary/40 rounded-full animate-pulse"></div>
                <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center bg-primary text-on-primary shadow-xl scale-110 transition-transform">
                  <span className="material-symbols-outlined text-5xl">task_alt</span>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <div className="absolute w-48 h-48 border-2 border-primary/20 rounded-full animate-ping"></div>
                <div className="absolute w-64 h-64 border border-primary/10 rounded-full animate-pulse"></div>
                <div className="w-32 h-32 rounded-full border-4 border-primary/40 flex items-center justify-center bg-surface-container-high shadow-xl">
                  <span className="material-symbols-outlined text-5xl text-primary">{step === 0 ? 'cloud_upload' : step === 1 ? 'data_exploration' : step === 2 ? 'person_pin_circle' : 'gavel'}</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-2xl font-bold tracking-tight text-on-surface">
                {isComplete ? 'Verification Successful!' : 
                  step === 0 ? 'Uploading claim data...' : 
                  step === 1 ? 'Analyzing proxy signatures...' : 
                  step === 2 ? 'Validating geo-spatial coordinates...' : 
                  'Generating insurance policy decision...'}
              </p>
              <p className="text-on-surface-variant font-medium max-w-sm mx-auto">
                {isComplete ? 'All data points corroborated. Your claim has been approved.' : 'Cross-referencing historical NDVI patterns with current infrared captures.'}
              </p>
            </div>

            <div className="w-full max-w-md h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary shadow-[0_0_15px_rgba(156,210,181,0.5)] transition-all duration-1000" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
            
            {isComplete && (
               <button onClick={() => navigate(`/claims/${claimId}`)} className="mt-4 px-8 py-4 bg-primary text-on-primary font-bold uppercase tracking-widest rounded-xl shadow-2xl active:scale-95 transition-all hover:bg-primary-fixed">
                 View Claim Details
               </button>
            )}
          </div>

          <div className="absolute top-6 left-6 text-[10px] font-bold text-outline tracking-[0.2em] uppercase">Auth: Gov-V2</div>
          <div className="absolute top-6 right-6 text-[10px] font-bold text-outline tracking-[0.2em] uppercase">GPS: 45.32 N, 122.1 W</div>
          <div className="absolute bottom-6 left-6 text-[10px] font-bold text-outline tracking-[0.2em] uppercase">Sync: Active</div>
          <div className="absolute bottom-6 right-6 text-[10px] font-bold text-primary tracking-[0.2em] uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Live Stream
          </div>
        </section>

        {/* Status Checklist Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-6 rounded-xl flex items-center justify-between border-b-2 transition-all ${step >= 0 ? 'bg-surface-container-low border-primary/20' : 'bg-surface-container-low border-transparent opacity-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step > 0 ? 'bg-primary-container text-primary' : 'bg-surface-container-highest text-primary'}`}>
                <span className={`material-symbols-outlined ${step === 0 ? 'animate-spin' : ''}`} style={step > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}>{step > 0 ? 'check_circle' : 'refresh'}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface tracking-wide uppercase">Uploading</h3>
                <p className="text-xs text-on-surface-variant">Multi-spectral data received</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${step >= 1 ? 'text-primary' : (step === 0 ? 'text-primary' : 'text-outline')}`}>{step >= 1 ? 'Completed' : 'Processing'}</span>
          </div>

          <div className={`p-6 rounded-xl flex items-center justify-between border-b-2 transition-all ${step >= 1 ? 'bg-surface-container-low border-primary/20' : 'bg-surface-container-low border-transparent opacity-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step > 1 ? 'bg-primary-container text-primary' : (step === 1 ? 'bg-surface-container-highest text-primary' : 'bg-surface-container-highest text-outline')}`}>
                <span className={`material-symbols-outlined ${step === 1 ? 'animate-spin' : ''}`} style={step > 1 ? { fontVariationSettings: "'FILL' 1" } : {}}>{step > 1 ? 'check_circle' : step === 1 ? 'refresh' : 'analytics'}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface tracking-wide uppercase">Verifying</h3>
                <p className="text-xs text-on-surface-variant">Neural Network running inference</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${step >= 2 ? 'text-primary' : (step === 1 ? 'text-primary animate-pulse' : 'text-outline')}`}>{step >= 2 ? 'Completed' : (step === 1 ? 'Processing' : 'Pending')}</span>
          </div>

          <div className={`p-6 rounded-xl flex items-center justify-between border-b-2 transition-all ${step >= 2 ? 'bg-surface-container-low border-primary/20' : 'bg-surface-container-low border-transparent opacity-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step > 2 ? 'bg-primary-container text-primary' : (step === 2 ? 'bg-surface-container-highest text-primary' : 'bg-surface-container-highest text-outline')}`}>
                <span className={`material-symbols-outlined ${step === 2 ? 'animate-spin' : ''}`} style={step > 2 ? { fontVariationSettings: "'FILL' 1" } : {}}>{step > 2 ? 'check_circle' : step === 2 ? 'refresh' : 'location_on'}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface tracking-wide uppercase">Geo-checking</h3>
                <p className="text-xs text-on-surface-variant">Waiting for coordinate handshake</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${step >= 3 ? 'text-primary' : (step === 2 ? 'text-primary animate-pulse' : 'text-outline')}`}>{step >= 3 ? 'Completed' : (step === 2 ? 'Processing' : 'Pending')}</span>
          </div>

          <div className={`p-6 rounded-xl flex items-center justify-between border-b-2 transition-all ${step >= 3 ? 'bg-surface-container-low border-primary/20' : 'bg-surface-container-low border-transparent opacity-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-primary-container text-primary' : (step === 3 ? 'bg-surface-container-highest text-primary' : 'bg-surface-container-highest text-outline')}`}>
                <span className={`material-symbols-outlined ${step === 3 ? 'animate-spin' : ''}`} style={step >= 4 ? { fontVariationSettings: "'FILL' 1" } : {}}>{step >= 4 ? 'check_circle' : step === 3 ? 'refresh' : 'gavel'}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface tracking-wide uppercase">Final Decision</h3>
                <p className="text-xs text-on-surface-variant">Insurance contract generation</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${step >= 4 ? 'text-primary' : (step === 3 ? 'text-primary animate-pulse' : 'text-outline')}`}>{step >= 4 ? 'Completed' : (step === 3 ? 'Processing' : 'Pending')}</span>
          </div>
        </section>

        {/* Asymmetric Info Card */}
        <section className="bg-primary-container p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -mr-8 -mt-8"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              <h2 className="text-lg font-bold text-primary tracking-tight">System Insight</h2>
            </div>
            <p className="text-on-primary-container text-sm leading-relaxed max-w-2xl">
              Our AI model is currently detecting <strong>Maize growth stage R1</strong>. The verification process is ensuring that the declared acreage matches the visual boundaries identified by the sentinel-2 satellite constellation.
            </p>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
              View Raw Data
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-[#0E0E0E] border-t border-[#404943]/20 z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold">Home</span>
        </button>
        <button onClick={() => navigate('/claims')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">description</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold">Claims</span>
        </button>
        <button onClick={() => navigate('/notifications')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">notifications</span>
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
