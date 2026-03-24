import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClaims } from '../context/ClaimContext';

export default function ClaimDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { claims } = useClaims();

  const claim = claims.find(c => c.id === id);

  if (!claim) {
    return (
      <div className="bg-surface-container-lowest text-on-surface min-h-screen pb-32 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Claim Not Found</h1>
        <button onClick={() => navigate('/claims')} className="mt-4 bg-primary text-on-primary px-4 py-2 rounded-lg font-bold">
          Back to Claims
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body selection:bg-primary-container selection:text-primary min-h-screen pb-32">
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md flex justify-between items-center px-6 h-16 shadow-[0_40px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <span onClick={() => navigate(-1)} className="material-symbols-outlined text-[#9CD2B5] transition-colors hover:opacity-80 active:scale-95 duration-200 cursor-pointer">arrow_back</span>
          <span className="text-xl font-black text-[#E2E2E2] tracking-tighter" onClick={() => navigate('/')}>AgriTech</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#9CD2B5] transition-colors active:scale-95 duration-200 cursor-pointer">mic</span>
          <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/20 overflow-hidden">
            <img 
              alt="User Farmer Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdaC2b9A8CI_iUoL3OYDtdWMJqSkBELbTR3q8qP_vaKC_DzkarTwKcJTOr8DWa2OrayHiEZAmh6S9lHLla18bnSy3Rxn-s03N1SlZIuxrdHyVtUEhoziG4BNXvcdo-gJyNmtMnNBWT99QP_-OAt2wz33_Lzaj8KpVyezN5nNPp1QSNbQYwCqLnT40ZM9x8NPM9JFQbCa2o8SwFovvZc598sToJK0wozFxYiRsBjXfPMf9fBtcwgoQ0sdbNhbmU0hX-QW19g4o6mII"
            />
          </div>
        </div>
      </nav>

      <main className="pt-24 px-6 max-w-5xl mx-auto space-y-12">
        {/* Header Section with Prominent Badge */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className={`inline-flex items-center px-4 py-1 rounded-full ${claim.status === 'Approved' ? 'bg-primary-container text-primary' : 'bg-surface-container-high text-on-surface-variant'} text-[10px] font-bold tracking-widest uppercase`}>
              Status: {claim.status}
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface leading-none">
              Claim #{claim.id}
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl">
              Filed on {claim.date} • {claim.cropName}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold transition-all hover:bg-primary-fixed active:scale-95">Download PDF</button>
          </div>
        </header>

        {/* Bento Grid Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Analysis Summary */}
          <section className="md:col-span-7 bg-surface-container-low p-8 rounded-xl flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-6">Damage Analysis Summary</h2>
              <div className="space-y-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl font-black text-primary tracking-tighter">40%</span>
                  <p className="text-xl text-on-surface-variant font-medium">Verified Crop Damage</p>
                </div>
                <p className="text-on-surface leading-relaxed text-lg italic">
                  "{claim.notes || 'No notes provided by user.'}"
                </p>
              </div>
            </div>
            <div className="mt-8 flex gap-8">
              <div>
                <p className="text-[10px] uppercase font-bold text-outline tracking-widest">Cause</p>
                <p className="text-on-surface font-bold">Excessive Rain (Auto-filled)</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-outline tracking-widest">Acreage Affected</p>
                <p className="text-on-surface font-bold">TBD</p>
              </div>
            </div>
          </section>

          {/* Map Snapshot */}
          <section className="md:col-span-5 aspect-square md:aspect-auto bg-surface-container-low rounded-xl overflow-hidden relative">
            <img 
              className="w-full h-full object-cover grayscale opacity-50 contrast-125" 
              alt="Satellite Map"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIBtAQiSdVKWdxrZCCOMb7MTRUDxwnGpht6WZuBl4wj-SUhXx5YewrXxaxw6GSMLs1ba6UfIdqTs3HDcdCgPXG6J9nwSr_TAjjOIswbxcIQRChnPAxeFQdU2cVhWCVEZA8tr069S6I0dJ1XSEpHIARFxMVxPgba49i1o6hlmDqIqtfVl7-GokwUM8HJAxmcHa8xeMCktAfhEKznSvkcKq01-L0NyG0yUylGwYLFcu67al1Cx1TxnUvmT8t8iW3qW3mwa5P4Qyx_nAM"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Location Context</p>
              <p className="text-sm font-bold text-on-surface">38.9072° N, 95.2741° W</p>
            </div>
          </section>

          {/* Image Preview */}
          <section className="md:col-span-4 h-64 bg-surface-container-low rounded-xl overflow-hidden group relative cursor-zoom-in">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              alt="Crop Damage"
              src={claim.images && claim.images.length > 0 ? claim.images[0] : "https://lh3.googleusercontent.com/aida-public/AB6AXuCzpgQRqqXgOuYcOW6-3OwH1hjk9j2fU3o1w1dUbKaBbAvBn8f5igxbJjLvT8DDuf9DJm6ZUoOh3YPYo8onRrhRaIP6w4gXRQT_lq5B3ffAFQRq6eK--hfnIu5gxmPS_BmBl6lQXC2I6BweCHgV-Mpt8Rfc0zb-rmIL_jIsec09-bKjdaOFkEITW36VkTdEUg21PmbuhTNueB-ougV35hTIhxFDFW0GRykTKMG8F2Ilu9H0OYFyfmNAL4DZINHJ7J02UzB6q23R-87L"}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-lg">
              <span className="material-symbols-outlined text-white text-sm">visibility</span>
            </div>
            {claim.images && claim.images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                +{claim.images.length - 1} more
              </div>
            )}
          </section>

          {/* Calculation Table */}
          <section className="md:col-span-8 bg-surface-container-low p-8 rounded-xl overflow-x-auto">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-outline mb-6">Insurance Amount Calculation</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">Component</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr>
                  <td className="py-4 text-on-surface font-medium">Total Insured Value</td>
                  <td className="py-4 text-on-surface font-bold text-right">$142,000.00</td>
                </tr>
                <tr>
                  <td className="py-4 text-on-surface font-medium">Damage Coefficient (40%)</td>
                  <td className="py-4 text-on-surface font-bold text-right">$56,800.00</td>
                </tr>
                <tr>
                  <td className="py-4 text-on-surface font-medium">Policy Deductible</td>
                  <td className="py-4 text-error font-bold text-right">-$2,500.00</td>
                </tr>
                <tr className="bg-primary-container/20">
                  <td className="py-5 px-4 text-primary font-black uppercase text-sm tracking-widest">{claim.status === 'Approved' ? 'Final Approved Payout' : 'Estimated Payout'}</td>
                  <td className="py-5 px-4 text-primary font-black text-2xl text-right tracking-tight">
                    ${claim.amount ? claim.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '54,300.00'}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>

      {/* Bottom Navigation Shell */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-[#0E0E0E] border-t border-[#404943]/20 z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center text-[#C0C9C1] px-4 py-1 hover:text-[#9CD2B5] transition-all active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-['Inter'] uppercase text-[10px] tracking-widest font-bold">Home</span>
        </button>
        <button onClick={() => navigate('/claims')} className="flex flex-col items-center justify-center bg-[#06402B] text-[#9CD2B5] rounded-xl px-4 py-1 active:scale-90 duration-150">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
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
