import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClaims } from '../context/ClaimContext';

export default function UploadStep2() {
  const navigate = useNavigate();
  const { currentDraft, updateDraft, addClaim, clearDraft } = useClaims();
  const [notes, setNotes] = useState(currentDraft.notes || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Auto-generate claim data for mock
    const newClaim = {
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      cropName: currentDraft.cropName || 'Unknown Crop',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      amount: Math.floor(5000 + Math.random() * 20000), // Random amount 5k-25k
      status: 'Under Verification',
      images: currentDraft.images || [],
      notes: notes
    };

    addClaim(newClaim);
    clearDraft();
    navigate('/claim/verify');
  };

  const handleSaveDraft = () => {
    updateDraft({ notes });
    navigate('/');
  };

  // Get first two images for preview, and count of remaining
  const previewImages = currentDraft.images ? currentDraft.images.slice(0, 2) : [];
  const remainingImagesCount = currentDraft.images ? Math.max(0, currentDraft.images.length - 2) : 0;

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md flex justify-between items-center px-6 h-16 shadow-[0_40px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <button onClick={() => { updateDraft({ notes }); navigate(-1); }} className="material-symbols-outlined text-[#9CD2B5] hover:opacity-80 transition-opacity">arrow_back</button>
          <span onClick={() => navigate('/')} className="text-xl font-black text-[#E2E2E2] tracking-tighter cursor-pointer">AgriTech</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center overflow-hidden">
            <img 
              alt="User Farmer Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2aWYSOIrA61yqFOPPdPCXRcY_KgGBKet0kFK02MVF3pTTucXThnOfHrtfhi0LhMHS9febjYQEHooXUm-vGZpNFKte6j4jkb8cLmz_AhK-nB_usmnntJ_E8MlXfmjRtXZ4IzHiHJUhHPiwYkZe3PdemgD41bvlan8cV_8vWjiRogqrTA4unpfi6vO5R8mWsa3XqwcpZ8VVBT-A8Lg1YfSwGlYPYXtmqaQA5RvihjqnW-dakPnjEZvg-w5A8XJ3GU-EjIpC6MhyR8Bx"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 mt-16 px-6 max-w-2xl mx-auto w-full">
        {/* Progress Indicator */}
        <section className="py-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Current Progress</p>
              <h1 className="text-2xl font-bold text-on-surface tracking-tight">Finalize Claim</h1>
            </div>
            <div className="text-right">
              <span className="text-primary font-black text-xl">Step 3</span>
              <span className="text-on-surface-variant font-medium"> of 3</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary w-full transition-all duration-500 shadow-[0_0_12px_rgba(156,210,181,0.3)]"></div>
          </div>
        </section>

        {/* Bento Layout for Form Sections */}
        <div className="grid grid-cols-1 gap-6">
          {/* Voice Input & Notes Section */}
          <section className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-8xl">description</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Add Notes</h2>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Provide additional context about the crop damage. You can type or use the voice transcription for hands-free reporting.</p>
              <div className="bg-surface-container-highest rounded-xl p-5 min-h-[160px] border-b-2 border-primary/40 flex flex-col justify-between">
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline p-0 w-full resize-none body-md outline-none" 
                  placeholder="Describe the conditions, extent of damage, or specific areas affected..."
                ></textarea>
                <div className="flex justify-end items-center mt-4">
                  <button className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all active:scale-90 shadow-lg" title="Voice to text (Simulated)">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Summary Card */}
          <section className="bg-surface-container-low rounded-xl p-6 border-l-4 border-primary/20">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Claim Summary</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant">potted_plant</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Crop Type / Field</p>
                  <p className="text-on-surface font-semibold">{currentDraft.cropName || 'Not selected'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant">event</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Incident Date</p>
                  <p className="text-on-surface font-semibold">Today</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant">photo_library</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Evidence ({currentDraft.images?.length || 0})</p>
                  <div className="flex gap-2 mt-2">
                    {previewImages.map((src, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-lg bg-surface-container-highest overflow-hidden">
                        <img className="w-full h-full object-cover" src={src} alt="Evidence Preview" />
                      </div>
                    ))}
                    {remainingImagesCount > 0 && (
                      <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                        +{remainingImagesCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Submit Section */}
          <section className="mt-4 pb-10">
            <div className="bg-primary-container/20 p-5 rounded-xl mb-6 border border-primary/10">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-xl">gavel</span>
                <p className="text-xs text-on-primary-container leading-relaxed">
                  By submitting, you confirm that the information provided is accurate to the best of your knowledge. This claim will be reviewed by an AI-assisted verified officer.
                </p>
              </div>
            </div>

            <button 
              onClick={handleSubmit} 
              className="w-full bg-primary text-on-primary py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-all hover:bg-primary-fixed md:hover:scale-[1.02]"
            >
              <span>Submit Claim</span>
              <span className="material-symbols-outlined">send</span>
            </button>

            <button onClick={handleSaveDraft} className="w-full mt-4 py-4 text-on-surface-variant font-bold text-sm uppercase tracking-widest hover:text-on-surface transition-colors">
              Save as Draft
            </button>
          </section>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-[#0E0E0E] z-40 border-t border-[#404943]/20">
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
