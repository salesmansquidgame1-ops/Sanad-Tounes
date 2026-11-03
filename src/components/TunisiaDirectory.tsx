/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Phone,
  ShieldCheck,
  AlertCircle,
  Heart,
  ChevronRight,
  Filter,
  Eye,
} from 'lucide-react';
import {
  CATEGORY_LABELS,
  SolidarityPlace,
  TUNISIAN_GOVERNORATES,
} from '../data/tunisiaData';
import { TunisiaMapSvg } from './TunisiaMapSvg';

interface TunisiaDirectoryProps {
  places: SolidarityPlace[];
  onSelectPlace: (place: SolidarityPlace) => void;
  onSponsorFromPlace: (place: SolidarityPlace) => void;
  onDonateToPlace: (place: SolidarityPlace) => void;
}

export const TunisiaDirectory: React.FC<TunisiaDirectoryProps> = ({
  places,
  onSelectPlace,
  onSponsorFromPlace,
  onDonateToPlace,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('Tous les gouvernorats');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyCritical, setOnlyCritical] = useState(false);
  const [onlyVisits, setOnlyVisits] = useState(false);

  // Filtered places
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      // Governorate match
      if (
        selectedGovernorate !== 'Tous les gouvernorats' &&
        place.governorate !== selectedGovernorate
      ) {
        return false;
      }

      // Category match
      if (selectedCategory !== 'all' && place.category !== selectedCategory) {
        return false;
      }

      // Only critical needs
      if (onlyCritical) {
        const hasCritical = place.urgentNeeds.some((n) => n.urgency === 'critique');
        if (!hasCritical) return false;
      }

      // Only visits
      if (onlyVisits && !place.allowVisits) {
        return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(q);
        const matchesArabic = place.arabicName.toLowerCase().includes(q);
        const matchesCity = place.city.toLowerCase().includes(q);
        const matchesGov = place.governorate.toLowerCase().includes(q);
        const matchesNeeds = place.urgentNeeds.some((n) => n.item.toLowerCase().includes(q));
        const matchesTags = place.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesArabic && !matchesCity && !matchesGov && !matchesNeeds && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [places, selectedGovernorate, selectedCategory, onlyCritical, onlyVisits, searchQuery]);

  return (
    <section id="directory" className="py-12 lg:py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-800 font-semibold mb-1">
              Répertoire National Solidaire
            </div>
            <h2 className="text-3xl font-bold font-display text-stone-900 tracking-tight">
              Où Trouver et Aider les Orphelins & Meskins
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Consultez les adresses certifiées, les référents associatifs, les comptes CCP/RIB
              officiels et les listes de besoins urgents vérifiés sur le terrain.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            <span className="font-mono text-emerald-800 font-bold text-base tabular-nums">
              {filteredPlaces.length}
            </span>{' '}
            lieux d'accueil et d'entraide filtrés
          </div>
        </div>

        {/* Interactive Tunisia Map Section */}
        <TunisiaMapSvg
          selectedGovernorate={selectedGovernorate}
          onSelectGovernorate={setSelectedGovernorate}
          places={places}
        />

        {/* Featured Key Associations Showcase */}
        <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-2xl border border-emerald-900 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-emerald-900/80">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                Réseau National & Associations Reconnues
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Les Principales Structures d'Aide aux Orphelins & Bébés en Tunisie
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                Accès direct aux associations historiques : SOS Villages d'Enfants, Kafel El Yatim, Darna,
                Diar El Amal, La Voix de l'Enfant Nabeul, Sarra, Ofok, Beity, Amen de Famille et Gafsa.
              </p>
            </div>
            <div className="text-xs text-emerald-300 font-medium shrink-0">
              Cliquez pour voir localisation & fiche complète
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {[
              {
                id: 'sos-gammarth',
                title: "SOS Villages d'Enfants",
                loc: 'Gammarth, Siliana, Akouda, Mahres',
                desc: 'Maisons familiales et fratries protégées',
              },
              {
                id: 'kafel-el-yatim-tunisie',
                title: 'Kafel El Yatim Tunisie',
                loc: 'Tunis & National',
                desc: 'Parrainage éducatif, sanitaire et loisirs',
              },
              {
                id: 'association-darna',
                title: 'Association Darna',
                loc: 'La Soukra, Tunis',
                desc: 'Unités de vie intégrées & proximité humaine',
              },
              {
                id: 'diar-el-amal',
                title: 'Diar El Amal',
                loc: 'Bab Saadoun, Tunis',
                desc: 'Prise en charge des bébés dès la naissance',
              },
              {
                id: 'voix-enfant-nabeul',
                title: "La Voix de l'Enfant",
                loc: 'Nabeul, Cap Bon',
                desc: 'Crèche sociale & soutien aux mères isolées',
              },
              {
                id: 'association-sarra-tunis',
                title: 'Association Sarra',
                loc: 'Médina de Tunis',
                desc: 'Soins médicaux et assistance aux orphelins',
              },
              {
                id: 'association-ofok',
                title: 'Association Ofok',
                loc: 'Grand Tunis & Régions',
                desc: 'Parrainage de centaines d’orphelins',
              },
              {
                id: 'association-amen-famille',
                title: 'Amen de Famille',
                loc: 'Mégrine, Ben Arous',
                desc: 'Protection enfance & maintien du foyer',
              },
              {
                id: 'association-beity-tunis',
                title: 'Association Beity',
                loc: 'Bab Souika, Tunis',
                desc: 'Hébergement d’urgence femmes & enfants',
              },
              {
                id: 'orphelins-gafsa',
                title: 'Orphelins de Gafsa',
                loc: 'Gafsa & Bassin Minier',
                desc: 'Soutien aux orphelins et veuves du Sud',
              },
            ].map((item) => {
              const matchedPlace = places.find((p) => p.id === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (matchedPlace) {
                      onSelectPlace(matchedPlace);
                    } else {
                      setSearchQuery(item.title);
                    }
                  }}
                  className="p-3 bg-emerald-900/60 hover:bg-emerald-800/80 rounded-xl border border-emerald-700/50 text-left transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-emerald-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{item.loc}</span>
                    </div>
                    <p className="text-[11px] text-stone-300 line-clamp-2 mt-1.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-emerald-800/60 text-[10px] font-semibold text-emerald-300 flex items-center justify-between">
                    <span>Fiche & Coordonnées</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
          {/* Top row: search + governorate dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="relative md:col-span-8">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Rechercher par ville, orphelinat, besoin (lait, couvertures, loyer, cartables)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  Effacer
                </button>
              )}
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 cursor-pointer"
              >
                {TUNISIAN_GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov}>
                    {gov === 'Tous les gouvernorats' ? 'Tous les gouvernorats (24)' : gov}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs (interactive functional buttons) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Tous les Lieux
              </button>
              <button
                onClick={() => setSelectedCategory('orphelinat')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'orphelinat'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Orphelinats & SOS
              </button>
              <button
                onClick={() => setSelectedCategory('etudiants')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'etudiants'
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Étudiants Démunis
              </button>
              <button
                onClick={() => setSelectedCategory('jeunes_maries')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'jeunes_maries'
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Jeunes Mariés & Trousseau
              </button>
              <button
                onClick={() => setSelectedCategory('artisans_metiers')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'artisans_metiers'
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Artisans & Petits Métiers
              </button>
              <button
                onClick={() => setSelectedCategory('parents_familles')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'parents_familles'
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Parents & Bébés
              </button>
              <button
                onClick={() => setSelectedCategory('meskins_familles')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'meskins_familles'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Familles & Meskins
              </button>
              <button
                onClick={() => setSelectedCategory('sans_abris_restos')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'sans_abris_restos'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sans-Abris & Restos
              </button>
              <button
                onClick={() => setSelectedCategory('collecte_urgence')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'collecte_urgence'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Dépôt & Caravanes
              </button>
            </div>

            {/* Quick check toggles */}
            <div className="flex items-center gap-4 text-xs text-stone-600">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyCritical}
                  onChange={(e) => setOnlyCritical(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
                />
                <span>Urgences critiques</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyVisits}
                  onChange={(e) => setOnlyVisits(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
                />
                <span>Visites admises</span>
              </label>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        {filteredPlaces.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
            <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-stone-900">
              Aucun lieu ne correspond à ces critères
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Essayez d'élargir votre sélection de gouvernorat ou de réinitialiser la recherche par
              mot-clé.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGovernorate('Tous les gouvernorats');
                setSelectedCategory('all');
                setOnlyCritical(false);
                setOnlyVisits(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              Afficher tous les lieux de Tunisie
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => {
              const categoryMeta = CATEGORY_LABELS[place.category];
              const criticalNeeds = place.urgentNeeds.filter((n) => n.urgency === 'critique');

              return (
                <div
                  key={place.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header with Scrim */}
                    <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                      <img
                        src={place.imageUrl}
                        alt={place.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <span className="flex items-center gap-1 bg-stone-900/75 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/10">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          <span>{place.governorate}</span>
                        </span>
                        {place.verified && (
                          <span className="flex items-center gap-1 bg-emerald-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-semibold text-emerald-200 border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3 text-emerald-300" />
                            <span>Vérifié</span>
                          </span>
                        )}
                      </div>

                      {/* Bottom overlay title */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[11px] text-emerald-300 font-medium">
                          {categoryMeta.fr}
                        </div>
                        <h3 className="text-base font-bold font-display leading-snug line-clamp-1">
                          {place.name}
                        </h3>
                        <div className="text-xs font-arabic text-emerald-200/90 truncate">
                          {place.arabicName}
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      {/* Zero-Pill Unboxed Metadata line with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                        <span>{place.city}</span>
                        <span aria-hidden="true">·</span>
                        <span>{place.beneficiariesCount}</span>
                      </div>

                      {/* Description excerpt */}
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {place.description}
                      </p>

                      {/* Urgent needs list preview */}
                      <div className="pt-2 border-t border-stone-100">
                        <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Besoins prioritaires</span>
                          {criticalNeeds.length > 0 && (
                            <span className="text-red-700 text-[10px] font-bold">
                              {criticalNeeds.length} critique{criticalNeeds.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <ul className="space-y-1">
                          {place.urgentNeeds.slice(0, 2).map((n, i) => (
                            <li
                              key={i}
                              className="text-xs text-stone-700 flex items-start gap-1.5 truncate"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                  n.urgency === 'critique' ? 'bg-red-500' : 'bg-amber-500'
                                }`}
                              />
                              <span className="truncate">{n.item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 pt-2 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Fiche & Coordonnées</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {place.category === 'orphelinat' && (
                        <button
                          onClick={() => onSponsorFromPlace(place)}
                          className="px-2.5 py-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                        >
                          Kafala
                        </button>
                      )}
                      <button
                        onClick={() => onDonateToPlace(place)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        <Heart className="w-3 h-3 fill-white" />
                        <span>Aider</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
