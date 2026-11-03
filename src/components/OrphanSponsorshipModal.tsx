/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Heart,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Phone,
  FileText,
  User,
  ArrowRight,
} from 'lucide-react';
import { SolidarityPlace } from '../data/tunisiaData';

interface OrphanSponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetPlace?: SolidarityPlace | null;
}

export const OrphanSponsorshipModal: React.FC<OrphanSponsorshipModalProps> = ({
  isOpen,
  onClose,
  presetPlace,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<'scolaire' | 'vie' | 'integrale' | 'libre'>('scolaire');
  const [customAmount, setCustomAmount] = useState<number>(100);
  const [frequency, setFrequency] = useState<'mensuel' | 'trimestriel' | 'annuel'>('mensuel');
  const [selectedCenter, setSelectedCenter] = useState<string>(
    presetPlace ? presetPlace.name : 'Le centre ayant le besoin le plus urgent'
  );
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorCountry, setDonorCountry] = useState('Tunisie');
  const [paymentMethod, setPaymentMethod] = useState<'virement' | 'ccp' | 'd17'>('virement');
  const [pledgeCode, setPledgeCode] = useState('');
  const [copiedPledge, setCopiedPledge] = useState(false);

  if (!isOpen) return null;

  const plans = [
    {
      id: 'scolaire' as const,
      title: 'Kafala Scolaire & Éducative',
      arabic: 'كفالة تعليمية',
      amountTND: 60,
      amountEUR: 18,
      desc: 'Fournitures scolaires, livres, inscription, cours de soutien et activités parascolaires.',
    },
    {
      id: 'vie' as const,
      title: 'Kafala Vie Quotidienne & Santé',
      arabic: 'كفالة معيشية وصحية',
      amountTND: 90,
      amountEUR: 27,
      desc: 'Nourriture équilibrée, vêtements de saison, soins dentaires, pédiatriques et hygiène.',
    },
    {
      id: 'integrale' as const,
      title: 'Kafala Intégrale Pensionnaire',
      arabic: 'كفالة شاملة متكاملة',
      amountTND: 130,
      amountEUR: 39,
      desc: 'Prise en charge complète au sein d’une maison familiale avec mère éducatrice.',
    },
  ];

  const currentAmount =
    selectedPlan === 'libre'
      ? customAmount
      : plans.find((p) => p.id === selectedPlan)?.amountTND || 60;

  const handleConfirmPledge = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `KAFALA-TN-${Math.floor(100000 + Math.random() * 900000)}`;
    setPledgeCode(code);
    setStep(3);
  };

  const copyPledgeSummary = () => {
    const text = `Engagement de Parrainage Sanad Tounes:
Réf: ${pledgeCode}
Donateur: ${donorName} (${donorCountry})
Formule: ${selectedPlan.toUpperCase()} - ${currentAmount} TND / ${frequency}
Centre: ${selectedCenter}
Mode: ${paymentMethod.toUpperCase()}`;
    navigator.clipboard.writeText(text);
    setCopiedPledge(true);
    setTimeout(() => setCopiedPledge(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <span className="font-arabic text-sm text-emerald-300">كفالة يتيم · صدقة جارية</span>
            <span aria-hidden="true">·</span>
            <span>Parrainage d'Enfants Orphelins</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display leading-tight">
            Offrez un Avenir Digne à un Orphelin en Tunisie
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-lg">
            Un soutien régulier sans intermédiaire, directement reversé aux villages d'enfants et
            foyers agréés. Vous recevez un bilan semestriel anonymisé.
          </p>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-800 text-xs">
            <span
              className={`px-2.5 py-0.5 rounded-full font-semibold ${
                step >= 1 ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'
              }`}
            >
              1. Formule
            </span>
            <span className="text-stone-600">→</span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-semibold ${
                step >= 2 ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'
              }`}
            >
              2. Vos Coordonnées
            </span>
            <span className="text-stone-600">→</span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-semibold ${
                step === 3 ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'
              }`}
            >
              3. Confirmation
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Center Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Centre d'accueil ou région de destination
                </label>
                <select
                  value={selectedCenter}
                  onChange={(e) => setSelectedCenter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 cursor-pointer"
                >
                  <option value="Le centre ayant le besoin le plus urgent">
                    ⭐ Là où le besoin est le plus urgent (Recommandé)
                  </option>
                  <option value="SOS Village d'Enfants Gammarth (Grand Tunis)">
                    SOS Village d'Enfants Gammarth (Grand Tunis)
                  </option>
                  <option value="SOS Village d'Enfants Siliana (Hauts-Plateaux)">
                    SOS Village d'Enfants Siliana (Hauts-Plateaux)
                  </option>
                  <option value="SOS Village d'Enfants Akouda (Sousse / Sahel)">
                    SOS Village d'Enfants Akouda (Sousse / Sahel)
                  </option>
                  <option value="SOS Village d'Enfants Mahres (Sfax / Sud)">
                    SOS Village d'Enfants Mahres (Sfax / Sud)
                  </option>
                  <option value="Dar El Amal Nourrissons (Bab Saadoun, Tunis)">
                    Dar El Amal Nourrissons (Bab Saadoun, Tunis)
                  </option>
                  <option value="Foyer Al-Yatim Kairouan">Foyer Al-Yatim Kairouan</option>
                  <option value="Foyer de l'Enfance Menzel Bourguiba (Bizerte)">
                    Foyer de l'Enfance Menzel Bourguiba (Bizerte)
                  </option>
                </select>
              </div>

              {/* Plans Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Choisissez la formule de parrainage
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {plans.map((p) => {
                    const isSelected = selectedPlan === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPlan(p.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                          <span className="font-arabic text-sm">{p.arabic}</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-700" />}
                        </div>
                        <h4 className="text-xs font-bold text-stone-900 leading-tight">
                          {p.title}
                        </h4>
                        <div className="mt-2 text-lg font-bold font-mono text-emerald-900 tabular-nums">
                          {p.amountTND}{' '}
                          <span className="text-xs font-sans font-medium text-stone-500">
                            TND/mois (~{p.amountEUR} €)
                          </span>
                        </div>
                        <p className="mt-2 text-[11px] text-stone-600 leading-relaxed">{p.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Frequency Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Périodicité de versement
                </label>
                <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setFrequency('mensuel')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      frequency === 'mensuel'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Mensuel ({currentAmount} TND)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('trimestriel')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      frequency === 'trimestriel'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Trimestriel ({currentAmount * 3} TND)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('annuel')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      frequency === 'annuel'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Annuel ({currentAmount * 12} TND)
                  </button>
                </div>
              </div>

              {/* Next step button */}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Continuer vers mes coordonnées</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleConfirmPledge} className="space-y-4">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-stone-500">Parrainage choisi : </span>
                  <strong className="text-stone-900">
                    {selectedPlan.toUpperCase()} ({currentAmount} TND / {frequency})
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-emerald-800 underline font-semibold cursor-pointer"
                >
                  Modifier
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mohamed Ben Salem"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Numéro de Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+216 98 000 000 ou +33 6..."
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Adresse Email (pour le suivi semestriel) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@domaine.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Pays / Ville de résidence
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Tunis, Paris, Montréal, Sfax..."
                    value={donorCountry}
                    onChange={(e) => setDonorCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Moyen de paiement préféré
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('virement')}
                    className={`p-2.5 text-xs font-medium rounded-xl border text-center cursor-pointer ${
                      paymentMethod === 'virement'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Virement Bancaire (RIB)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ccp')}
                    className={`p-2.5 text-xs font-medium rounded-xl border text-center cursor-pointer ${
                      paymentMethod === 'ccp'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    La Poste (CCP)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('d17')}
                    className={`p-2.5 text-xs font-medium rounded-xl border text-center cursor-pointer ${
                      paymentMethod === 'd17'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    D17 Mobile
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Confirmer mon engagement de parrainage
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-display text-stone-900">
                  Barak Allahou Fikoum ! Engagement Enregistré
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  Votre engagement de parrainage pour <strong>{donorName}</strong> est validé sous la
                  référence officielle ci-dessous.
                </p>
              </div>

              {/* Official Certificate Card */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500 font-sans">Référence Dossier Kafala :</span>
                  <span className="font-bold text-emerald-800 text-sm">{pledgeCode}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-sans text-xs">
                  <div>
                    <span className="text-stone-500 block">Formule :</span>
                    <strong className="text-stone-900">{selectedPlan.toUpperCase()}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Montant :</span>
                    <strong className="text-emerald-800">
                      {currentAmount} TND / {frequency}
                    </strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-500 block">Centre affilié :</span>
                    <strong className="text-stone-900">{selectedCenter}</strong>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200/80 font-sans text-xs text-stone-700 space-y-1">
                  <div className="font-semibold text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Instructions de Règlement :</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Indiquez la mention <strong>« {pledgeCode} »</strong> dans le libellé de votre
                    virement bancaire ou mandat postal afin de lier votre contribution au dossier
                    parrain.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={copyPledgeSummary}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedPledge ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier le récapitulatif</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                >
                  Terminer et Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
