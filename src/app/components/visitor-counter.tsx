'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHUD, setShowHUD] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      // Show immediately so the "Live_Cloud_Count" doesn't look stuck
      setShowHUD(true);
      try {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 6500);

        const response = await fetch(
          'https://api.api-ninjas.com/v1/counter?id=aravindhan_portfolio_global&hit=true',
          {
            headers: {
              'X-Api-Key': 'FJCitd9noaxPRPCKSPBlgBF0cpnWfg0FkyMtpqjd',
            },
            signal: controller.signal,
          }
        );

        window.clearTimeout(timeoutId);
        const data = await response.json();
        if (data.value !== undefined) {
          setCount(data.value); // Showing raw value from API-Ninjas
        }
      } catch (error) {
        console.error('Visitor Counter Error:', error);
        setCount(124); // Fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
    return () => {
      setIsLoading(false);
    };
  }, []);

  if (!showHUD) return null;

  return (
    <div className="fixed top-24 right-8 z-[9999] animate-slide-in-right select-none pointer-events-none">
      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-full px-4 py-2 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <Users size={14} className="text-cyan-400" />
        </div>
        <div className="flex items-center gap-2 font-mono">
          <div className="flex flex-col">
            <span className="text-[9px] text-stone-500 uppercase tracking-tighter leading-none mb-0.5">Live_Cloud_Count</span>
            <span className="text-sm font-bold text-white tabular-nums tracking-wide leading-none">
              {isLoading ? '---' : count?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
