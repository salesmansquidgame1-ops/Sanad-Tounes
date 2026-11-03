/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenSponsorship: () => void;
  onOpenDonate: () => void;
  onOpenReport: () => void;
  onOpenZakat: () => void;
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSponsorship,
  onOpenDonate,
  onOpenReport,
  onOpenZakat,
  onOpenDownload,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-base">
                س
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                Sanad Tounes
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Plateforme nationale d'information et d'action citoyenne pour la protection des
              orphelins, le soutien aux meskins et l'assistance aux familles vulnérables à travers
              les 24 gouvernorats de la République Tunisienne.
            </p>

            <div className="text-xs font-arabic text-emerald-400 pt-1">
              وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation Rapide
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#directory" className="hover:text-emerald-400 transition-colors">
                  Répertoire des 24 Gouvernorats
                </a>
              </li>
              <li>
                <a href="#campaigns" className="hover:text-emerald-400 transition-colors">
                  Appels d'Urgence Hiver & Vivres
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenSponsorship}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Parrainer un Orphelin (كفالة)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenZakat}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Guide Zakat Al-Mal & Meskins
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Solidarity Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Agir & Contribuer
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenDownload}
                  className="hover:text-emerald-400 transition-colors text-left font-semibold text-emerald-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>📥 Télécharger le Répertoire Complet</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDonate}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Offrir un Couffin Alimentaire
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReport}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Signaler un Foyer en Détresse
                </button>
              </li>
              <li>
                <span className="text-stone-400 block">
                  Dons sans intermédiaire via comptes CCP & RIB agréés
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency & Official Hotlines in Tunisia */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Urgences & Solidarité
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div>
                <strong className="text-stone-200">Protection Civile :</strong> 198
              </div>
              <div>
                <strong className="text-stone-200">SAMU Secours :</strong> 190
              </div>
              <div>
                <strong className="text-stone-200">SOS Villages Tunisie :</strong> +216 71 740 600
              </div>
              <div>
                <strong className="text-stone-200">Croissant-Rouge Tunisien :</strong> +216 71 325 572
              </div>
            </div>
          </div>
        </div>

        {/* Tribute to Creator: Mohamed Aziz, 12 ans */}
        <div className="mt-10 p-5 rounded-2xl bg-stone-950/80 border border-emerald-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              🇹🇳
            </div>
            <div>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                Initiative Citoyenne & Créateur du Projet
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white font-display">
                Conçu et réalisé avec cœur par <span className="text-emerald-300">Mohamed Aziz (12 ans)</span>
              </h4>
              <p className="text-xs text-stone-400 font-arabic mt-0.5">
                صنع بكل حب وفخر من طرف التلميذ محمد عزيز (12 سنة) لمساعدة الأيتام، الطلبة، العرائس، الحرفيين والمحتاجين في تونس
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDownload}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <span>Télécharger le Guide de Mohamed Aziz</span>
          </button>
        </div>

        {/* Bottom hairline & quiet copyright */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Sanad Tounes (سند تونس) · Conçu par <strong>Mohamed Aziz (12 ans)</strong>.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparence & Traçabilité des aides</span>
            </span>
            <span>Tunisie 🇹🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
