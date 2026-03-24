import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClaims } from '../context/ClaimContext';

export default function UploadStep1() {
  const navigate = useNavigate();
  const { currentDraft, updateDraft } = useClaims();
  
  const [images, setImages] = useState(currentDraft.images || []);
  const [selectedField, setSelectedField] = useState(currentDraft.cropName || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Optionally revoke object URLs on unmount to avoid memory leaks if they were created
    // But since we navigate and might come back, we keep them simple for this mock.
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (images.length + files.length > 4) {
      alert('You can only upload a maximum of 4 images.');
      return;
    }

    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages].slice(0, 4));
    
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleFieldSelect = (fieldName) => {
    setSelectedField(fieldName);
  };

  const handleNext = () => {
    if (images.length === 0) {
      alert('Please upload at least 1 image before proceeding.');
      return;
    }
    if (!selectedField) {
      alert('Please select a crop/land unit.');
      return;
    }
    updateDraft({ images, cropName: selectedField });
    navigate('/claim/upload/2');
  };

  return (
    <div className="min-h-screen pb-24 text-[#e2e2e2]">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md flex justify-between items-center px-6 h-16 shadow-[0_40px_40px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <span onClick={() => navigate(-1)} className="material-symbols-outlined text-[#9CD2B5] cursor-pointer hover:opacity-80 transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
          <span className="text-xl font-black text-[#E2E2E2] tracking-tighter uppercase cursor-pointer" onClick={() => navigate('/')}>AgriTech</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
            <img 
              alt="User Farmer Profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuBV-dREcZWOjBd69DwqAG319ItQcAsWFw4wyHSUDe2c9rkB470DVfubL6hhGqZM1XFDT2uW9N-5TZTpz6X_wPUhQRozQFmBsfTXq4tdUssaBQ_JlC88KcI7-wL-5KX8cjQTfyX2DJa4Pq5iMr2tNMTTByDJw8Fe9tbk5BZ6uWd2nAtJw7zwL3kKlEvNDDTIFhUDEz9Ruu9B5Ms17yrxQ7kQlPPf5sJSpkgFESAeLgZVwRMRzjl0fH-2CMF0eO9kHCEs1d_ZUBXyPC"
            />
          </div>
        </div>
      </nav>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Filing Process</span>
              <h1 className="text-3xl font-black text-on-surface tracking-tight mt-1">New Claim</h1>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-on-surface-variant font-label">STEP 1 OF 3</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(156,210,181,0.3)]"></div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface tracking-tight">Upload Crop Images</h2>
            <span className="text-[10px] bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Required</span>
          </div>

          <p className="text-xs text-on-surface-variant italic">Uploading multiple images improves claim verification accuracy (max 4).</p>

          {/* Hidden file input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*" 
            multiple 
          />

          {images.length < 4 && (
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => fileInputRef.current?.click()} className="group flex flex-col items-center justify-center gap-3 py-10 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all active:scale-[0.98]">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">photo_camera</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Camera</span>
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="group flex flex-col items-center justify-center gap-3 py-10 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all active:scale-[0.98]">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">gallery_thumbnail</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Gallery</span>
              </button>
            </div>
          )}

          {images.length > 0 && (
            <div className={`grid gap-4 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {images.map((src, idx) => (
                <div key={idx} className={`relative group w-full rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 ${images.length === 1 ? 'aspect-video' : 'aspect-square'}`}>
                  <img 
                    alt={`Preview ${idx + 1}`} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                    src={src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-lg">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  </div>
                  <button onClick={() => removeImage(idx)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-error/80 text-on-error backdrop-blur-md flex items-center justify-center hover:bg-error transition-colors">
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface tracking-tight">Select Crop / Land</h2>
            <span className="text-[10px] text-on-surface-variant px-2 py-0.5 font-bold uppercase tracking-widest bg-surface-container-high rounded-full">Step 2</span>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              {/* Option 1 */}
              <div 
                onClick={() => handleFieldSelect('North Field #22 - Maize')}
                className={`flex items-center justify-between p-4 cursor-pointer rounded-xl transition-colors border ${
                  selectedField === 'North Field #22 - Maize' 
                    ? 'bg-primary-container/30 border-primary/20' 
                    : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedField === 'North Field #22 - Maize' ? 'bg-primary-container text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined">psychiatry</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">North Field #22</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Maize • 12.4 Hectares</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedField === 'North Field #22 - Maize' ? 'border-primary' : 'border-outline-variant/30'}`}>
                  {selectedField === 'North Field #22 - Maize' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                </div>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => handleFieldSelect('South Plateau #09 - Wheat')}
                className={`flex items-center justify-between p-4 cursor-pointer rounded-xl transition-colors border ${
                  selectedField === 'South Plateau #09 - Wheat' 
                    ? 'bg-primary-container/30 border-primary/20' 
                    : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedField === 'South Plateau #09 - Wheat' ? 'bg-primary-container text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined">grass</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">South Plateau #09</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Wheat • 8.1 Hectares</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedField === 'South Plateau #09 - Wheat' ? 'border-primary' : 'border-outline-variant/30'}`}>
                  {selectedField === 'South Plateau #09 - Wheat' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#131313] via-[#131313] to-transparent pointer-events-none mb-16 z-30">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button 
              onClick={handleNext}
              className={`w-full py-4 font-black uppercase tracking-[0.2em] rounded-xl text-sm shadow-[0_20px_50px_-12px_rgba(156,210,181,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 ${
                images.length > 0 && selectedField 
                  ? 'bg-primary text-on-primary cursor-pointer hover:bg-primary-fixed' 
                  : 'bg-surface-container-highest text-outline cursor-not-allowed opacity-50 shadow-none'
              }`}
            >
              Next Phase <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
