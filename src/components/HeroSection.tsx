/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDown, Heart, ShieldCheck, MapPin, Users, Sparkles, Download } from 'lucide-react';

interface HeroSectionProps {
  onOpenSponsorship: () => void;
  onOpenDonate: () => void;
  onOpenAdvisor: () => void;
  onOpenDownload: () => void;
  onScrollToDirectory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSponsorship,
  onOpenDonate,
  onOpenAdvisor,
  onOpenDownload,
  onScrollToDirectory,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* National Solidarity Kicker with Arabic Typography */}
            <div className="flex items-center gap-2.5 text-xs text-emerald-400 font-semibold tracking-wide">
              <span className="font-arabic text-sm text-emerald-300">سند تونس · تضامن وأخوة</span>
              <span aria-hidden="true">·</span>
              <span>Plateforme Nationale de Solidarité</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-[1.15] text-balance">
              Soutenir les orphelins, les meskins, étudiants, jeunes mariés & artisans en Tunisie.
            </h1>

            {/* Subtitle / Pitch */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              Localisez et soutenez les orphelinats, étudiants sans ressources, jeunes couples
              préparant leur foyer, artisans en péril et parents en grande difficulté à travers les 24
              gouvernorats. Coordonnées directes et comptes officiels sans intermédiaire.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToDirectory}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-200" />
                <span>Voir les lieux en Tunisie</span>
              </button>

              <button
                onClick={onOpenSponsorship}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-emerald-100 bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-700 transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 text-emerald-400" />
                <span>Parrainer un orphelin (كفالة)</span>
              </button>

              <button
                onClick={onOpenDownload}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-amber-200 bg-amber-950/40 hover:bg-amber-900/60 rounded-xl border border-amber-700/60 transition-all cursor-pointer"
                title="Télécharger le fichier complet avec toutes les adresses de Tunisie"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Télécharger le Guide</span>
              </button>

              <button
                onClick={onOpenAdvisor}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Guide de don interactif</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Structures associatives agréées</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Versements directs CCP / RIB sans frais</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Focal Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950 aspect-[4/3] lg:aspect-auto lg:h-[420px]">
              <img
                src="/src/assets/images/hero_solidarity_tunisia_1793725181433.jpg"
                alt="Bénévoles solidaires préparant des colis d'aide en Tunisie"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

              {/* Overlay Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold mb-1">
                  <span>Action de Terrain en Direct</span>
                  <span className="text-[10px] text-stone-400">Grand Tunis & Régions de l'Intérieur</span>
                </div>
                <p className="text-xs text-stone-300 leading-snug">
                  Préparation et expédition des couffins alimentaires et couvertures chaudes pour les
                  zones rurales enclavées.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: 4 KPI items below the hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-stone-800">
          <div className="p-4 bg-stone-800/40 rounded-xl border border-stone-800">
            <div className="text-2xl font-bold font-mono text-white tabular-nums">24 / 24</div>
            <div className="text-xs text-stone-400 mt-1">Gouvernorats couverts du Nord au Sud</div>
          </div>
          <div className="p-4 bg-stone-800/40 rounded-xl border border-stone-800">
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">1 450+</div>
            <div className="text-xs text-stone-400 mt-1">Orphelins & nourrissons hébergés</div>
          </div>
          <div className="p-4 bg-stone-800/40 rounded-xl border border-stone-800">
            <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">4 800+</div>
            <div className="text-xs text-stone-400 mt-1">Familles & meskins suivis</div>
          </div>
          <div className="p-4 bg-stone-800/40 rounded-xl border border-stone-800">
            <div className="text-2xl font-bold font-mono text-white tabular-nums">0%</div>
            <div className="text-xs text-stone-400 mt-1">Frais : vous donnez directement aux comptes officiels</div>
          </div>
        </div>
      </div>
    </section>
  );
};
