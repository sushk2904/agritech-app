import React, { createContext, useContext, useState, useEffect } from 'react';

const ClaimContext = createContext();

export function ClaimProvider({ children }) {
  const [claims, setClaims] = useState(() => {
    const saved = localStorage.getItem('agritech_claims');
    return saved ? JSON.parse(saved) : [
      {
        id: '88219',
        cropName: 'Winter Wheat (Plot #22B)',
        date: 'Oct 14, 2023',
        amount: 14250.00,
        status: 'Approved',
        images: [],
        notes: 'Flood damage assessment for North Sector.'
      }
    ];
  });

  const [currentDraft, setCurrentDraft] = useState({
    images: [],
    cropName: '',
    notes: ''
  });

  // Whenever claims change, persist to local storage
  useEffect(() => {
    localStorage.setItem('agritech_claims', JSON.stringify(claims));
  }, [claims]);

  const addClaim = (newClaim) => {
    setClaims(prev => [newClaim, ...prev]);
  };

  const updateClaimStatus = (id, newStatus) => {
    setClaims(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const updateDraft = (data) => {
    setCurrentDraft(prev => ({ ...prev, ...data }));
  };

  const clearDraft = () => {
    setCurrentDraft({ images: [], cropName: '', notes: '' });
  };

  return (
    <ClaimContext.Provider value={{ 
      claims, 
      addClaim, 
      updateClaimStatus,
      currentDraft,
      updateDraft,
      clearDraft
    }}>
      {children}
    </ClaimContext.Provider>
  );
}

export function useClaims() {
  return useContext(ClaimContext);
}
