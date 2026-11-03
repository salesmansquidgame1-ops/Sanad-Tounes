/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { GOVERNORATE_COORDINATES, SolidarityPlace } from '../data/tunisiaData';

interface TunisiaMapSvgProps {
  selectedGovernorate: string;
  onSelectGovernorate: (gov: string) => void;
  places: SolidarityPlace[];
}

export const TunisiaMapSvg: React.FC<TunisiaMapSvgProps> = ({
  selectedGovernorate,
  onSelectGovernorate,
  places,
}) => {
  // Count places per governorate
  const countsByGov = React.useMemo(() => {
    const acc: Record<string, number> = {};
    places.forEach((p) => {
      acc[p.governorate] = (acc[p.governorate] || 0) + 1;
    });
    return acc;
  }, [places]);

  const governorates = Object.keys(GOVERNORATE_COORDINATES);

  const regionGroups = [
    { name: 'Grand Tunis', govs: ['Tunis', 'Ariana', 'Ben Arous', 'Manouba'] },
    { name: 'Nord & Littoral', govs: ['Bizerte', 'Nabeul', 'Zaghouan', 'Béja', 'Jendouba'] },
    { name: 'Centre & Hauts-Plateaux', govs: ['Le Kef', 'Siliana', 'Kairouan', 'Kasserine', 'Sidi Bouzid'] },
    { name: 'Sahel & Centre-Est', govs: ['Sousse', 'Monastir', 'Mahdia', 'Sfax'] },
    { name: 'Sud & Oasis', govs: ['Gafsa', 'Tozeur', 'Kébili', 'Gabès', 'Médenine', 'Tataouine'] },
  ];

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 lg:p-8 shadow-md border border-stone-800">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-6 pb-6 border-b border-stone-800">
        <div>
          <div className="text-xs uppercase tracking-wider text-emerald-400 font-medium mb-1">
            Cartographie Solidaire de Tunisie
          </div>
          <h3 className="text-2xl font-bold font-display text-white">
            24 Gouvernorats d'Entraide et d'Action
          </h3>
          <p className="text-sm text-stone-400 mt-1 max-w-xl">
            Cliquez sur un gouvernorat ou une zone pour afficher instantanément les orphelinats,
            foyers d'accueil, cantines solidaires et points de collecte vérifiés.
          </p>
        </div>

        {selectedGovernorate !== 'Tous les gouvernorats' && (
          <div className="flex items-center gap-3 bg-stone-800/80 px-4 py-2 rounded-xl border border-stone-700">
            <div className="text-xs text-stone-300">
              Gouvernorat actif : <strong className="text-emerald-400">{selectedGovernorate}</strong>
            </div>
            <button
              onClick={() => onSelectGovernorate('Tous les gouvernorats')}
              className="text-xs font-semibold text-stone-300 hover:text-white underline cursor-pointer"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>

      {/* Quick Regions Selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-stone-400 font-medium mr-1">Régions :</span>
        <button
          onClick={() => onSelectGovernorate('Tous les gouvernorats')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            selectedGovernorate === 'Tous les gouvernorats'
              ? 'bg-emerald-600 text-white font-semibold'
              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
          }`}
        >
          Toute la Tunisie ({places.length})
        </button>
        {regionGroups.map((group) => {
          const totalInGroup = group.govs.reduce((sum, g) => sum + (countsByGov[g] || 0), 0);
          const isGroupSelected = group.govs.includes(selectedGovernorate);
          return (
            <div key={group.name} className="relative group/reg">
              <button
                onClick={() => {
                  // pick first gov in group that has places or first gov
                  const found = group.govs.find((g) => countsByGov[g] > 0) || group.govs[0];
                  onSelectGovernorate(found);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  isGroupSelected
                    ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-600/60'
                    : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {group.name} ({totalInGroup})
              </button>
            </div>
          );
        })}
      </div>

      {/* Visual interactive map display + Governorate Badges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Stylized SVG Map of Tunisia */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-4 bg-stone-950/70 rounded-xl border border-stone-800 min-h-[420px]">
          <svg
            viewBox="0 0 100 105"
            className="w-full max-w-[340px] h-[390px] drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tunisia simplified outline vector silhouette */}
            <path
              d="M 38 12 
                 C 45 10, 56 10, 62 14
                 C 68 18, 76 22, 78 28
                 C 74 34, 69 36, 68 44
                 C 73 47, 76 52, 74 58
                 C 71 63, 68 66, 69 72
                 C 65 77, 68 83, 68 89
                 C 63 94, 60 99, 57 101
                 C 52 98, 48 88, 45 84
                 C 38 82, 28 80, 22 75
                 C 17 71, 22 65, 27 60
                 C 25 54, 23 48, 25 40
                 C 22 35, 22 28, 26 23
                 C 30 18, 32 15, 38 12 Z"
              className="fill-stone-800/80 stroke-stone-700"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Mediterranean Coast Accent */}
            <path
              d="M 26 23 C 38 12, 60 11, 78 28 C 72 38, 70 50, 74 58 C 70 65, 68 76, 68 89"
              className="stroke-emerald-500/40"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Governorate Pins */}
            {governorates.map((gov) => {
              const pos = GOVERNORATE_COORDINATES[gov];
              const count = countsByGov[gov] || 0;
              const isSelected = selectedGovernorate === gov;

              return (
                <g
                  key={gov}
                  className="cursor-pointer transition-transform duration-200 hover:scale-125"
                  onClick={() => onSelectGovernorate(gov)}
                  transform-origin={`${pos.x} ${pos.y}`}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 3.5 : count > 0 ? 2.4 : 1.6}
                    className={`transition-all duration-200 ${
                      isSelected
                        ? 'fill-emerald-400 stroke-white stroke-[0.8]'
                        : count > 0
                        ? 'fill-emerald-500 hover:fill-emerald-300'
                        : 'fill-stone-600 hover:fill-stone-400'
                    }`}
                  />
                  {count > 0 && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? 6 : 4.5}
                      className="fill-emerald-400/20 stroke-emerald-400/50 stroke-[0.3]"
                    />
                  )}
                  {/* Label for selected or prominent governorates */}
                  {(isSelected || count > 0) && (
                    <text
                      x={pos.x + 3}
                      y={pos.y + 1.2}
                      className={`text-[3.2px] font-sans font-medium select-none pointer-events-none ${
                        isSelected ? 'fill-emerald-300 font-bold' : 'fill-stone-300'
                      }`}
                    >
                      {gov} {count > 0 ? `(${count})` : ''}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-3 text-[11px] text-stone-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Lieux vérifiés disponibles</span>
          </div>
        </div>

        {/* Governorates Interactive Badges List */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 font-medium mb-3">
              <span>Sélection directe par gouvernorat :</span>
              <span>{places.length} centres répertoriés</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {governorates.map((gov) => {
                const count = countsByGov[gov] || 0;
                const isSelected = selectedGovernorate === gov;

                return (
                  <button
                    key={gov}
                    onClick={() => onSelectGovernorate(gov)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-700 text-white border-emerald-500 shadow-sm'
                        : count > 0
                        ? 'bg-stone-800/80 text-stone-200 border-stone-700/70 hover:bg-stone-750 hover:border-emerald-600/50'
                        : 'bg-stone-900/60 text-stone-400 border-stone-800/50 hover:text-stone-300'
                    }`}
                  >
                    <span className="truncate mr-1.5">{gov}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono tabular-nums ${
                        isSelected
                          ? 'bg-emerald-900 text-emerald-100'
                          : count > 0
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                          : 'text-stone-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chaque lieu comporte adresse, contact direct, RIB et besoins prioritaires.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
