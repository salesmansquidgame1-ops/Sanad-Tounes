/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, BookOpen, Calculator, Check, Heart, Sparkles } from 'lucide-react';

interface ZakatCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDirectToDonate: () => void;
}

export const ZakatCalculatorModal: React.FC<ZakatCalculatorModalProps> = ({
  isOpen,
  onClose,
  onDirectToDonate,
}) => {
  // Tunisian Nisab estimate in TND (based on current 85g of gold standard in Tunisia ~ 18,500 TND)
  const [cash, setCash] = useState<string>('5000');
  const [bankSavings, setBankSavings] = useState<string>('15000');
  const [goldValue, setGoldValue] = useState<string>('0');
  const [debts, setDebts] = useState<string>('0');
  const [nisabStandard] = useState<number>(18500); // 85g gold standard in Tunisia approx.

  if (!isOpen) return null;

  const totalAssets =
    (parseFloat(cash) || 0) +
    (parseFloat(bankSavings) || 0) +
    (parseFloat(goldValue) || 0);

  const netWealth = Math.max(0, totalAssets - (parseFloat(debts) || 0));
  const isEligible = netWealth >= nisabStandard;
  const zakatAmount = isEligible ? Math.round(netWealth * 0.025) : 0;

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
            <span className="font-arabic text-sm text-emerald-300">
              إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ
            </span>
            <span aria-hidden="true">·</span>
            <span>Guide Éthique & Calculateur</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display leading-tight">
            Comprendre : Orphelins, Meskins & Pauvres en Tunisie
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-lg">
            Définitions fondamentales de la solidarité et calcul direct de votre Zakat Al-Mal en
            Dinars Tunisiens (TND).
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* 3 Definitions Cards */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Les 3 Catégories de Bénéficiaires
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Orphelins */}
              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                  <span>Les Orphelins</span>
                  <span className="font-arabic text-sm text-emerald-800">الأيتام</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed">
                  Enfants mineurs ayant perdu un ou deux parents, ou sans soutien familial (SOS
                  Villages, pouponnières de Bab Saadoun). La priorité est leur sécurité affective,
                  scolaire et sanitaire.
                </p>
              </div>

              {/* Meskins */}
              <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200">
                <div className="text-xs font-bold text-amber-950 flex items-center justify-between">
                  <span>Les Meskins</span>
                  <span className="font-arabic text-sm text-amber-800">المساكين</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed">
                  Personnes ou familles qui travaillent ou ont un petit revenu modeste, mais dont les
                  gains ne suffisent pas à couvrir le loyer, l'électricité et la nourriture de leurs
                  enfants.
                </p>
              </div>

              {/* Pauvres */}
              <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200">
                <div className="text-xs font-bold text-rose-950 flex items-center justify-between">
                  <span>Les Pauvres</span>
                  <span className="font-arabic text-sm text-rose-800">الفقراء</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed">
                  Ceux qui n'ont aucune ressource financière stable, vivant sans abri ou en grande
                  détresse d'urgence vitale (sans-abris des gares, malades chroniques isolés, mechtas
                  enclavées).
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Zakat Al-Mal Calculator */}
          <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-800" />
                <h3 className="text-sm font-bold text-stone-900">
                  Calculateur de Zakat Al-Mal (Dinars Tunisiens)
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">
                Nissab estimé : <strong>{nisabStandard.toLocaleString()} TND</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Liquidités & espèces (TND)
                </label>
                <input
                  type="number"
                  min="0"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Épargne bancaire / CCP (TND)
                </label>
                <input
                  type="number"
                  min="0"
                  value={bankSavings}
                  onChange={(e) => setBankSavings(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Or d'investissement & avoirs marchands (TND)
                </label>
                <input
                  type="number"
                  min="0"
                  value={goldValue}
                  onChange={(e) => setGoldValue(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Dettes immédiates à déduire (TND)
                </label>
                <input
                  type="number"
                  min="0"
                  value={debts}
                  onChange={(e) => setDebts(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-stone-900 font-mono"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs text-stone-500">Patrimoine net soumis :</div>
                <div className="text-sm font-bold font-mono text-stone-900">
                  {netWealth.toLocaleString()} TND
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="text-xs font-medium text-emerald-800">
                  {isEligible ? 'Montant de Zakat dû (2,5%) :' : 'Patrimoine inférieur au Nissab :'}
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-950 tabular-nums">
                  {isEligible ? `${zakatAmount.toLocaleString()} TND` : '0 TND'}
                </div>
              </div>
            </div>

            {isEligible ? (
              <p className="text-[11px] text-stone-500 italic">
                Cette somme de <strong>{zakatAmount.toLocaleString()} TND</strong> peut être versée
                directement aux orphelinats agréés ou aux comités de soutien des meskins répertoriés
                sur Sanad Tounes.
              </p>
            ) : (
              <p className="text-[11px] text-stone-500 italic">
                Votre épargne n'atteint pas le seuil du Nissab ({nisabStandard.toLocaleString()} TND),
                vous n'êtes pas astreint à la Zakat légale, mais l'aumône volontaire (Sadaqah) reste
                ouverte et hautement méritoire.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Fermer
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onDirectToDonate();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Distribuer ma Zakat / Aumône</span>
          </button>
        </div>
      </div>
    </div>
  );
};
