/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Shirt,
  HeartHandshake,
  Utensils,
  Globe2,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Wrench,
  Baby,
} from 'lucide-react';
import { SolidarityPlace, TUNISIAN_GOVERNORATES } from '../data/tunisiaData';

interface SolidarityAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  places: SolidarityPlace[];
  onSelectPlace: (place: SolidarityPlace) => void;
  onOpenSponsorship: () => void;
}

export const SolidarityAdvisorModal: React.FC<SolidarityAdvisorModalProps> = ({
  isOpen,
  onClose,
  places,
  onSelectPlace,
  onOpenSponsorship,
}) => {
  const [aidType, setAidType] = useState<
    | 'vetements'
    | 'nourriture'
    | 'parrainage'
    | 'etudiants_aide'
    | 'mariage_aide'
    | 'artisan_aide'
    | 'parents_aide'
    | 'diaspora'
    | 'benevolat'
  >('vetements');
  const [selectedGov, setSelectedGov] = useState<string>('Tous');

  if (!isOpen) return null;

  const recommendations = React.useMemo(() => {
    return places.filter((p) => {
      if (selectedGov !== 'Tous' && p.governorate !== selectedGov) return false;

      if (aidType === 'vetements') {
        return (
          p.category === 'collecte_urgence' ||
          p.urgentNeeds.some(
            (n) =>
              n.item.toLowerCase().includes('vêtements') ||
              n.item.toLowerCase().includes('couvertures') ||
              n.item.toLowerCase().includes('manteaux')
          )
        );
      }

      if (aidType === 'nourriture') {
        return (
          p.category === 'sans_abris_restos' ||
          p.category === 'meskins_familles' ||
          p.urgentNeeds.some(
            (n) =>
              n.item.toLowerCase().includes('semoule') ||
              n.item.toLowerCase().includes('lait') ||
              n.item.toLowerCase().includes('nourriture') ||
              n.item.toLowerCase().includes('denrées')
          )
        );
      }

      if (aidType === 'parrainage') {
        return p.category === 'orphelinat';
      }

      if (aidType === 'etudiants_aide') {
        return p.category === 'etudiants';
      }

      if (aidType === 'mariage_aide') {
        return p.category === 'jeunes_maries';
      }

      if (aidType === 'artisan_aide') {
        return p.category === 'artisans_metiers';
      }

      if (aidType === 'parents_aide') {
        return (
          p.category === 'parents_familles' ||
          p.urgentNeeds.some(
            (n) => n.item.toLowerCase().includes('lait') || n.item.toLowerCase().includes('couches')
          )
        );
      }

      if (aidType === 'benevolat') {
        return p.allowVisits;
      }

      if (aidType === 'diaspora') {
        return p.verified && p.bankDetails.rib;
      }

      return true;
    });
  }, [places, aidType, selectedGov]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guide Intelligent d'Orientation Solidaire</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display">
            Où et Comment Agir Selon Vos Moyens ?
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-lg">
            Indiquez ce que vous souhaitez donner pour obtenir instantanément les centres et
            contacts les plus adaptés en Tunisie.
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Action types selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Que souhaitez-vous apporter ?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setAidType('etudiants_aide')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                  aidType === 'etudiants_aide'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Étudiants (Loyer & PC)</span>
              </button>

              <button
                type="button"
                onClick={() => setAidType('mariage_aide')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                  aidType === 'mariage_aide'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Jeunes Mariés (Trousseau)</span>
              </button>

              <button
                type="button"
                onClick={() => setAidType('artisan_aide')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                  aidType === 'artisan_aide'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Wrench className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Artisans (Outils & Machines)</span>
              </button>

              <button
                type="button"
                onClick={() => setAidType('parents_aide')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                  aidType === 'parents_aide'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Baby className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Parents & Bébés</span>
              </button>

              <button
                type="button"
                onClick={() => setAidType('parrainage')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                  aidType === 'parrainage'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Parrainage d'Orphelin</span>
              </button>

              <button
                type="button"
                onClick={() => setAidType('vetements')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                  aidType === 'vetements'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Shirt className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Vêtements & Couvertures</span>
              </button>

              <button
                type="button"
                onClick={() => setAidType('nourriture')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                  aidType === 'nourriture'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Utensils className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Nourriture & Couffins</span>
              </button>

              <button
                type="button"
                onClick={() => setAidType('benevolat')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                  aidType === 'benevolat'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Temps & Bénévolat</span>
              </button>

              <button
                type="button"
                onClick={() => setAidType('diaspora')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors sm:col-span-2 ${
                  aidType === 'diaspora'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Globe2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Diaspora Tunisienne (TRE - Virement International)</span>
              </button>
            </div>
          </div>

          {/* Governorates Filter */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-500 font-medium">Filtrer par région de destination :</span>
            <select
              value={selectedGov}
              onChange={(e) => setSelectedGov(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs"
            >
              <option value="Tous">Toutes les régions</option>
              {TUNISIAN_GOVERNORATES.filter((g) => g !== 'Tous les gouvernorats').map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
          </div>

          {/* Results List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500">
              <span>Lieux Recommandés ({recommendations.length})</span>
              {aidType === 'parrainage' && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenSponsorship();
                  }}
                  className="text-emerald-800 underline lowercase font-semibold"
                >
                  Ouvrir le simulateur de kafala →
                </button>
              )}
            </div>

            {recommendations.length === 0 ? (
              <div className="p-6 text-center bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500">
                Aucun lieu spécifique trouvé dans cette région pour cette catégorie. Essayez avec «
                Toutes les régions ».
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {recommendations.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => {
                      onClose();
                      onSelectPlace(place);
                    }}
                    className="p-3 bg-stone-50 hover:bg-emerald-50/50 rounded-xl border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                        <span>{place.name}</span>
                        {place.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-stone-500 text-[11px] mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>
                            {place.city}, {place.governorate}
                          </span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{place.phone}</span>
                      </div>
                      <div className="text-[11px] text-emerald-800 font-medium mt-1">
                        Besoins : {place.urgentNeeds.map((n) => n.item).join(', ')}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-emerald-800 font-semibold text-[11px]">
                      <span>Voir la fiche</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Fermer le guide
          </button>
        </div>
      </div>
    </div>
  );
};
