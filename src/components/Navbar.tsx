/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, PlusCircle, Sparkles, Download } from 'lucide-react';

interface NavbarProps {
  onOpenSponsorship: () => void;
  onOpenDonate: () => void;
  onOpenReport: () => void;
  onOpenZakat: () => void;
  onOpenAdvisor: () => void;
  onOpenDownload: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSponsorship,
  onOpenDonate,
  onOpenReport,
  onOpenZakat,
  onOpenAdvisor,
  onOpenDownload,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a href="#" className="flex items-center gap-2.5 text-stone-900 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            س
          </div>
          <div className="leading-tight">
            <span className="text-xl font-bold tracking-tight text-emerald-950 font-display">
              Sanad Tounes
            </span>
            <span className="text-xs text-emerald-700 block font-medium">سند تونس</span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (single line, no wrap) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="#directory"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
          >
            Lieux & Centres
          </a>
          <a
            href="#campaigns"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
          >
            Appels d'Urgence
          </a>
          <button
            onClick={onOpenSponsorship}
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 font-medium cursor-pointer"
          >
            Parrainer un Orphelin
          </button>
          <button
            onClick={onOpenZakat}
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 font-medium cursor-pointer"
          >
            Guide Zakat & Meskins
          </button>
          <button
            onClick={onOpenAdvisor}
            className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 font-medium cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guide de Don</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenDownload}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-300 whitespace-nowrap shrink-0 cursor-pointer"
            title="Télécharger le répertoire complet hors-ligne"
          >
            <Download className="w-3.5 h-3.5 text-stone-700" />
            <span className="hidden sm:inline">Télécharger</span>
          </button>
          <button
            onClick={onOpenReport}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Signaler un Cas</span>
          </button>
          <button
            onClick={onOpenDonate}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Faire un Don</span>
          </button>
        </div>
      </div>
    </header>
  );
};
