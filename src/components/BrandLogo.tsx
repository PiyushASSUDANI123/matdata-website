'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
}

const sizeConfig = {
  sm: { icon: 28, text: 'text-base', sub: 'text-[10px]', gap: 'gap-2' },
  md: { icon: 38, text: 'text-lg', sub: 'text-xs', gap: 'gap-2.5' },
  lg: { icon: 46, text: 'text-xl', sub: 'text-xs', gap: 'gap-3' },
  xl: { icon: 56, text: 'text-2xl', sub: 'text-sm', gap: 'gap-3.5' },
};

export default function BrandLogo({
  size = 'md',
  showText = true,
  showSubtitle = true,
  subtitleText = 'चुनाव रणनीति',
  className = '',
  theme = 'light',
}: BrandLogoProps) {
  const cfg = sizeConfig[size] || sizeConfig.md;
  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex items-center ${cfg.gap} select-none group ${className}`}>
      {/* Premium Minimalist Emblem */}
      <div 
        className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-105 rounded-xl overflow-hidden shadow-sm"
        style={{ width: cfg.icon, height: cfg.icon }}
      >
        <Image
          src="/logo.png"
          alt="Chunav Ranniti"
          width={cfg.icon}
          height={cfg.icon}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${cfg.text} ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Chunav<span className="text-orange-600">Ranniti</span>
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
          </div>

          {showSubtitle && (
            <div className="flex items-center gap-1 mt-0.5">
              <span
                className={`font-bold tracking-wide ${cfg.sub} ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {subtitleText}
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-semibold bg-orange-100 text-orange-700 border border-orange-200">
                PRO
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
