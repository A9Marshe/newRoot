"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function JusoorLogo({ className }: { className?: string }) {
  const [error, setError] = useState(false);

  // High-fidelity SVG fallback
  if (error) {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-12 h-12", className)}
      >
        <circle cx="100" cy="100" r="95" stroke="#B08B57" strokeWidth="3" />
        <path d="M30 145 H170" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="85" cy="115" r="18" stroke="#B08B57" strokeWidth="3.5" />
        <circle cx="115" cy="115" r="18" stroke="#B08B57" strokeWidth="3.5" />
        <path d="M100 108 A 18 18 0 0 1 115 124" stroke="#B08B57" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M100 97 V65" stroke="#B08B57" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M100 65 L65 40" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100 65 L135 40" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100 75 L55 60" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100 75 L145 60" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100 85 L45 85" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100 85 L155 85" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        {[
          { cx: 65, cy: 40 }, { cx: 135, cy: 40 },
          { cx: 55, cy: 60 }, { cx: 145, cy: 60 },
          { cx: 45, cy: 85 }, { cx: 155, cy: 85 },
          { cx: 100, cy: 30 }
        ].map((pos, i) => (
          <circle key={i} cx={pos.cx} cy={pos.cy} r="4" fill="#B08B57" />
        ))}
        <path d="M100 65 V30" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100 133 L100 175" stroke="#B08B57" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100 133 Q 85 145, 75 170" stroke="#B08B57" strokeWidth="2" fill="none" />
        <path d="M100 133 Q 115 145, 125 170" stroke="#B08B57" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  return (
    <div className={cn("relative flex items-center justify-center shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="جسور"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
        onError={() => setError(true)}
        priority
      />
    </div>
  );
}
