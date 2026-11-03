/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Flame,
  GraduationCap,
  HeartPulse,
  BookOpen,
  Sparkles,
  Wrench,
  Baby,
  Plus,
  Minus,
  Copy,
  Check,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { SOLIDARITY_PACKAGES, SolidarityPlace, UrgentCampaign } from '../data/tunisiaData';

interface DonationBasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTarget?: SolidarityPlace | UrgentCampaign | null;
}

export const DonationBasketModal: React.FC<DonationBasketModalProps> = ({
  isOpen,
  onClose,
  presetTarget,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'pack-couffin': 1,
    'pack-orphelin': 0,
    'pack-hiver': 0,
    'pack-sante': 0,
  });
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentStep, setPaymentStep] = useState<1 | 2>(1);
  const [donorName, setDonorName] = useState('');
  const [copiedRib, setCopiedRib] = useState(false);

  if (!isOpen) return null;

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const calculateTotalTND = () => {
    let sum = 0;
    SOLIDARITY_PACKAGES.forEach((p) => {
      sum += (quantities[p.id] || 0) * p.costTND;
    });
    if (customAmount && !isNaN(Number(customAmount))) {
      sum += Number(customAmount);
    }
    return sum;
  };

  const totalTND = calculateTotalTND();
  const totalEUR = (totalTND * 0.3).toFixed(1);
  const totalUSD = (totalTND * 0.32).toFixed(1);

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-emerald-700" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-blue-700" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-indigo-700" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'Wrench':
        return <Wrench className="w-4 h-4 text-amber-700" />;
      case 'Baby':
        return <Baby className="w-4 h-4 text-pink-600" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-amber-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      default:
        return <Heart className="w-4 h-4 text-emerald-700" />;
    }
  };

  const ccpNumber = '17001-0000000008899-72';
  const ribNumber = '03 000 0100 115006789 42 (BNA Tunis)';
  const d17Number = '+216 98 123 450';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRib(true);
    setTimeout(() => setCopiedRib(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-emerald-950 text-white shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-emerald-900/80 text-white hover:bg-emerald-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-xs text-emerald-400 font-semibold mb-1">
            <span className="font-arabic text-sm text-emerald-300">الصدقة تطفئ الخطيئة</span>
            <span className="mx-2">·</span>
            <span>Panier Solidaire & Aumône Directe</span>
          </div>
          <h2 className="text-xl font-bold font-display">
            {presetTarget
              ? `Soutien pour : ${'name' in presetTarget ? presetTarget.name : presetTarget.title}`
              : 'Composez Votre Action Solidaire'}
          </h2>
          <p className="text-xs text-emerald-200/80 mt-1">
            Chaque dinar va directement aux bénéficiaires sans frais de plateforme.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {paymentStep === 1 ? (
            <>
              {/* Packages List */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Packs et Secours d'Urgence
                </div>
                {SOLIDARITY_PACKAGES.map((pkg) => {
                  const qty = quantities[pkg.id] || 0;
                  return (
                    <div
                      key={pkg.id}
                      className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1 pr-3">
                        <div className="p-2 bg-white rounded-lg border border-stone-200 shadow-2xs mt-0.5">
                          {getIcon(pkg.iconName)}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-stone-900">
                            {pkg.title}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {pkg.description}
                          </div>
                          <div className="text-xs font-mono font-semibold text-emerald-800 mt-1">
                            {pkg.costTND} TND{' '}
                            <span className="text-[10px] text-stone-400 font-normal">
                              (~{pkg.equivalentEUR} €)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-stone-200 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(pkg.id, -1)}
                          disabled={qty === 0}
                          className="p-1 rounded hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5 text-stone-600" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold font-mono tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(pkg.id, 1)}
                          className="p-1 rounded hover:bg-stone-100 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-stone-600" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom additional amount */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Ou ajouter un montant libre (Dinars Tunisiens)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    step="5"
                    placeholder="Ex: 50"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold text-stone-500">
                    TND
                  </span>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-900 font-medium">Total de votre action :</div>
                  <div className="text-xl font-bold font-mono text-emerald-950 tabular-nums">
                    {totalTND} TND
                  </div>
                </div>
                <div className="text-right text-xs text-stone-600 font-medium">
                  <div>Equivalent Diaspora :</div>
                  <div className="font-mono text-emerald-800 font-semibold">
                    ≈ {totalEUR} € · {totalUSD} $
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPaymentStep(2)}
                disabled={totalTND <= 0}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Procéder au versement ({totalTND} TND)
              </button>
            </>
          ) : (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <div className="text-xs uppercase font-bold tracking-wider text-emerald-800">
                  Coordonnées Officielles de Versement
                </div>
                <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                  {totalTND} TND
                </div>
                <p className="text-xs text-stone-500">
                  Effectuez votre don par virement ou D17 avec les références suivantes :
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {/* RIB */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400">
                      RIB BNA Officiel
                    </div>
                    <div className="font-mono font-semibold text-stone-900 text-xs sm:text-sm select-all">
                      {ribNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(ribNumber)}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
                    title="Copier le RIB"
                  >
                    {copiedRib ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* CCP */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400">
                      Compte Courant Postal (CCP)
                    </div>
                    <div className="font-mono font-semibold text-stone-900 text-xs sm:text-sm select-all">
                      {ccpNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(ccpNumber)}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
                    title="Copier le CCP"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* D17 */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400">
                      D17 Mobile (La Poste Tunisienne)
                    </div>
                    <div className="font-mono font-semibold text-stone-900 text-xs sm:text-sm select-all">
                      {d17Number}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(d17Number)}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
                    title="Copier D17"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {copiedRib && (
                <div className="text-center text-xs font-semibold text-emerald-800">
                  Coordonnée copiée ! Collez-la dans votre application bancaire ou D17.
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentStep(1)}
                  className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Modifier le panier
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors cursor-pointer text-center"
                >
                  J'ai effectué mon don / Terminer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
