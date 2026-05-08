"use client";

import { useEffect, useState } from "react";

interface XPAnimationProps {
  show: boolean;
  xp: number;
  onComplete?: () => void;
}

export function XPAnimation({ show, xp, onComplete }: XPAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <div className="animate-xp-float text-4xl font-bold text-[#fbbf24] drop-shadow-lg">
        +{xp} XP
      </div>
      <style jsx>{`
        @keyframes xp-float {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-30px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.8);
          }
        }
        .animate-xp-float {
          animation: xp-float 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export function ConfettiExplosion({ show }: { show: boolean }) {
  useEffect(() => {
    if (show) {
      // Confetti is handled by canvas-confetti in the lesson page
    }
  }, [show]);

  return null;
}