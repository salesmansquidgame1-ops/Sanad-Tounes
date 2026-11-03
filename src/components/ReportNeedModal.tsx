/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, PlusCircle, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SolidarityPlace, TUNISIAN_GOVERNORATES } from '../data/tunisiaData';

interface ReportNeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlace: (newPlace: SolidarityPlace) => void;
}

export const ReportNeedModal: React.FC<ReportNeedModalProps> = ({
  isOpen,
  onClose,
  onAddPlace,
}) => {
  const [name, setName] = useState('');
  const [arabicName, setArabicName] = useState('');
  const [category, setCategory] = useState<SolidarityPlace['category']>('meskins_familles');
  const [governorate, setGovernorate] = useState<string>('Tunis');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [urgentNeedText, setUrgentNeedText] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const needsArray = urgentNeedText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => ({ item, urgency: 'critique' as const }));

    const newPlace: SolidarityPlace = {
      id: `citoyen-${Date.now()}`,
      name: name.trim(),
      arabicName: arabicName.trim() || name.trim(),
      category,
      governorate,
      city: city.trim() || governorate,
      address: address.trim() || `${city}, ${governorate}`,
      phone: phone.trim(),
      contactPerson: contactPerson.trim() || 'Référent local de quartier',
      role: 'Signalement Citoyen Terrain',
      verified: false,
      coordinates: { lat: 36.8, lng: 10.18 }, // default approximate center
      urgentNeeds: needsArray.length > 0 ? needsArray : [{ item: 'Aide d’urgence vitale', urgency: 'critique' }],
      beneficiariesCount: 'Cas d’urgence signalé',
      bankDetails: {
        bankName: 'Poste Tunisienne',
        rib: 'En cours de validation',
        ccp: '17001-XXXXX (Dépôt direct de vivres recommandé)',
        beneficiaryName: name.trim(),
      },
      description: description.trim(),
      openingHours: 'Visite ou dépôt sur appel préalable',
      imageUrl: '/src/assets/images/food_basket_tunisia_1793725182929.jpg',
      allowVisits: true,
      visitGuidelines: 'Contacter le référent avant tout déplacement pour préserver la dignité du foyer.',
      tags: ['Signalement Citoyen', governorate, 'Urgence'],
    };

    onAddPlace(newPlace);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setArabicName('');
    setCity('');
    setAddress('');
    setPhone('');
    setUrgentNeedText('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
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
            <span className="font-arabic text-sm text-emerald-300">الدال على الخير كفاعله</span>
            <span aria-hidden="true">·</span>
            <span>Signalement Citoyen & Solidarité</span>
          </div>

          <h2 className="text-xl font-bold font-display">
            Signaler une Famille, des Orphelins ou un Foyer
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Permettez aux bienfaiteurs de localiser un cas de grande précarité nécessitant des vivres,
            un abri ou des soins en Tunisie.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold font-display text-stone-900">
                Signalement Ajouté au Répertoire !
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                Le cas que vous avez indiqué apparaît désormais dans le répertoire solidaire avec le
                statut « Signalement Citoyen ». Les bienfaiteurs et associations de la région peuvent
                prendre contact.
              </p>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                Voir dans la liste
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Veillez à respecter la dignité des personnes. Indiquez de préférence le contact d'un
                  voisin de confiance, d'un imam de quartier ou d'un bénévole associatif local.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nom du foyer / Association / Famille *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Famille veuve avec 4 orphelins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nom en Arabe (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: عائلة أيتام وأرملة"
                    value={arabicName}
                    onChange={(e) => setArabicName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 font-arabic focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Catégorie *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 cursor-pointer"
                  >
                    <option value="meskins_familles">Famille Nécessiteuse & Meskin (العائلات المعوزة)</option>
                    <option value="etudiants">Étudiant(e) Démuni(e) (الطلبة المحتاجون)</option>
                    <option value="jeunes_maries">Jeunes Mariés / Trousseau (تيسير زواج الشباب)</option>
                    <option value="artisans_metiers">Artisan / Petit Métier en péril (الحرفيون والمهنيون)</option>
                    <option value="parents_familles">Parents en Détresse & Bébés (الأولياء والرضع)</option>
                    <option value="orphelinat">Orphelin(s) sans soutien parental (الأيتام)</option>
                    <option value="sans_abris_restos">Personne sans-abri / Repas urgent (فاقدو المأوى)</option>
                    <option value="collecte_urgence">Point de collecte d'urgence (نقاط التبرع)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Gouvernorat *</label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 cursor-pointer"
                  >
                    {TUNISIAN_GOVERNORATES.filter((g) => g !== 'Tous les gouvernorats').map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Ville / Délégation / Cité *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Foussana, Makthar, Douar Hicher..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Adresse ou point de repère *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Près de la mosquée Al-Nour"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nom du référent / bénévole de contact *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Si Hedi (Voisin) ou Association locale"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Numéro de Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+216 98 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Besoins urgents (séparés par des virgules) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Couvertures chaudes, Lait bébé 2ème âge, 1 sac de semoule, Médicaments"
                  value={urgentNeedText}
                  onChange={(e) => setUrgentNeedText(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Description de la situation *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Expliquez succinctement la situation (ex: mère veuve élevant 3 enfants en bas âge sans ressources fixes suite au décès du père...)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Publier le signalement
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
