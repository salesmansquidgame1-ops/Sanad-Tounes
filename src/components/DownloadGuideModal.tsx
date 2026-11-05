/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  FileText,
  Check,
  Heart,
  Github,
  Terminal,
  Copy,
  ChevronRight,
  FolderArchive,
} from 'lucide-react';
import { CATEGORY_LABELS, SolidarityPlace } from '../data/tunisiaData';

interface DownloadGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  places: SolidarityPlace[];
}

export const DownloadGuideModal: React.FC<DownloadGuideModalProps> = ({
  isOpen,
  onClose,
  places,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [zipLoading, setZipLoading] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);
  const [zipError, setZipError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setZipLoading(true);
      setZipError(null);
      const res = await fetch('/sanad-tounes-projet-complet.zip', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!res.ok) {
        throw new Error(`Erreur réseau (${res.status})`);
      }
      const blob = await res.blob();
      const zipBlob = new Blob([blob], { type: 'application/zip' });
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sanad-tounes-mohamed-aziz.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 4000);
    } catch (err: any) {
      console.error(err);
      setZipError('Erreur de téléchargement. Veuillez réessayer.');
    } finally {
      setZipLoading(false);
    }
  };

  const handleDownloadTextFile = () => {
    let content = `========================================================================\n`;
    content += `         SANAD TOUNES (سند تونس) - GUIDE NATIONAL DE SOLIDARITÉ\n`;
    content += `  Répertoire officiel des Orphelins, Meskins, Étudiants & Familles en Tunisie\n`;
    content += `        Créé et conçu avec cœur par Mohamed Aziz (12 ans) 🇹🇳\n`;
    content += `========================================================================\n\n`;
    content += `Date d'export : ${new Date().toLocaleDateString('fr-TN')} à ${new Date().toLocaleTimeString('fr-TN')}\n`;
    content += `Nombre total de lieux et centres répertoriés : ${places.length}\n\n`;

    places.forEach((p, idx) => {
      const cat = CATEGORY_LABELS[p.category]?.fr || p.category;
      content += `------------------------------------------------------------------------\n`;
      content += `${idx + 1}. ${p.name.toUpperCase()} (${p.arabicName})\n`;
      content += `Catégorie    : ${cat}\n`;
      content += `Gouvernorat  : ${p.governorate} | Ville : ${p.city}\n`;
      content += `Adresse      : ${p.address}\n`;
      content += `Téléphone    : ${p.phone} ${p.whatsapp ? `| WhatsApp : ${p.whatsapp}` : ''}\n`;
      content += `Référent     : ${p.contactPerson} (${p.role})\n`;
      content += `Bénéficiaires: ${p.beneficiariesCount}\n`;
      content += `Comptes Dons : RIB : ${p.bankDetails.rib} (${p.bankDetails.bankName})\n`;
      content += `               CCP : ${p.bankDetails.ccp}\n`;
      if (p.bankDetails.d17) {
        content += `               D17 : ${p.bankDetails.d17}\n`;
      }
      content += `Besoins urg. : ${p.urgentNeeds.map((n) => `[${n.urgency.toUpperCase()}] ${n.item}`).join(' | ')}\n`;
      content += `Description  : ${p.description}\n\n`;
    });

    content += `========================================================================\n`;
    content += `Numéros d'urgence Tunisie : Protection Civile 198 | SAMU 190 | SOS Villages +216 71 740 600\n`;
    content += `Guide réalisé pour le bien de la Tunisie par Mohamed Aziz, 12 ans.\n`;
    content += `========================================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sanad-Tounes-Repertoire-Tunisie-Mohamed-Aziz-12ans.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
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

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <Download className="w-3.5 h-3.5" />
            <span>Télécharger le Répertoire & Exporter sur GitHub</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display">
            Téléchargement & Publication GitHub
          </h2>
          <p className="text-xs text-emerald-200/80 mt-1">
            Téléchargez le guide hors-ligne (.TXT), imprimez-le en PDF ou récupérez le code source
            complet pour le mettre sur votre compte GitHub.
          </p>

          {/* Mohamed Aziz Tribute Tag */}
          <div className="mt-3 inline-flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-700/60 text-xs text-emerald-200">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>
              Projet conçu et réalisé par : <strong>Mohamed Aziz (12 ans)</strong> 🇹🇳
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-700">
          {/* Download Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Download Text / Document Card */}
            <button
              onClick={handleDownloadTextFile}
              className="p-4 bg-emerald-50 hover:bg-emerald-100/80 rounded-xl border border-emerald-300 text-left transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">
                  Répertoire Texte (.TXT)
                </h4>
                <p className="text-[11px] text-emerald-800/80 mt-1 leading-relaxed">
                  Toutes les adresses, téléphones et comptes RIB/CCP lisibles hors-ligne.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-200 flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
                {downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Téléchargé !</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger</span>
                  </>
                )}
              </div>
            </button>

            {/* Print / Save as PDF Card */}
            <button
              onClick={handlePrint}
              className="p-4 bg-stone-100 hover:bg-stone-200/80 rounded-xl border border-stone-300 text-left transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center mb-2">
                  <Printer className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                  Imprimer / PDF
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  Générer un PDF imprimable pour les mosquées, écoles et associations.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-200 flex items-center gap-1.5 font-bold text-stone-800 text-xs">
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer</span>
              </div>
            </button>

            {/* Download Complete Source Code for GitHub */}
            <button
              onClick={handleDownloadZip}
              disabled={zipLoading}
              className="p-4 bg-purple-50 hover:bg-purple-100/80 rounded-xl border border-purple-300 text-left transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center mb-2">
                  <FolderArchive className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-purple-950 text-xs sm:text-sm">
                  Code Source (.ZIP Windows & Mac)
                </h4>
                <p className="text-[11px] text-purple-800/80 mt-1 leading-relaxed">
                  L'archive ZIP complète du projet avec React, TypeScript, Tailwind, images et README.
                </p>
                {zipError && (
                  <p className="text-[10px] text-red-600 mt-1 font-semibold">{zipError}</p>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-purple-200 flex items-center gap-1.5 font-bold text-purple-900 text-xs">
                {zipLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-purple-700 border-t-transparent rounded-full animate-spin" />
                    <span>Préparation du ZIP...</span>
                  </>
                ) : zipSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Téléchargé ! Valide Windows</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger le .ZIP</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* GitHub Tutorial Box for Mohamed Aziz */}
          <div className="bg-stone-900 text-stone-100 p-5 rounded-2xl border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center text-white">
                  <Github className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm">
                  Comment mettre le projet sur ton GitHub (Facile en 3 étapes)
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950 border border-emerald-800 rounded">
                Pour Mohamed Aziz
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Step 1 */}
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-[11px]">
                  1
                </span>
                <div>
                  <strong className="text-white block">Crée un nouveau dépôt sur GitHub :</strong>
                  <span className="text-stone-300">
                    Connecte-toi sur{' '}
                    <a
                      href="https://github.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline hover:text-emerald-300"
                    >
                      github.com/new
                    </a>
                    , donne le nom <code className="bg-stone-800 px-1 py-0.5 rounded text-amber-300">sanad-tounes</code> et clique sur « Create repository ».
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-[11px]">
                  2
                </span>
                <div className="flex-1">
                  <strong className="text-white block">Choisis ta méthode préférée :</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                    <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700">
                      <div className="font-semibold text-emerald-300 text-[11px] mb-1">
                        Méthode A : Avec le fichier ZIP (Le plus simple)
                      </div>
                      <p className="text-[11px] text-stone-300 leading-snug">
                        Télécharge le <strong className="text-white">.ZIP</strong> ci-dessus, décompresse-le, et sur ta page GitHub clique sur « uploading an existing file » puis glisse tous les fichiers.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700">
                      <div className="font-semibold text-emerald-300 text-[11px] mb-1">
                        Méthode B : En ligne de commande (Git)
                      </div>
                      <p className="text-[11px] text-stone-300 leading-snug">
                        Le projet a déjà été initialisé et sauvegardé avec <code className="text-amber-300">git commit</code> sous ton nom.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-[11px]">
                  3
                </span>
                <div className="flex-1">
                  <strong className="text-white block">Commandes Git prêtes à copier :</strong>
                  <div className="mt-1.5 bg-black/70 p-2.5 rounded-lg font-mono text-[11px] text-emerald-300 relative border border-stone-700">
                    <div className="pr-12 space-y-1">
                      <div>git remote add origin https://github.com/TON-PSEUDO/sanad-tounes.git</div>
                      <div>git branch -M main</div>
                      <div>git push -u origin main</div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'git remote add origin https://github.com/TON-PSEUDO/sanad-tounes.git\ngit branch -M main\ngit push -u origin main',
                          'git-commands'
                        )
                      }
                      className="absolute top-2 right-2 p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="Copier les commandes"
                    >
                      {copiedCommand === 'git-commands' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mohamed Aziz personal message */}
          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-amber-950 leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-900">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Projet conçu et réalisé par Mohamed Aziz (12 ans) :</span>
            </div>
            <p className="italic">
              « J'ai voulu créer ce site pour que personne en Tunisie ne soit oublié : que les orphelins
              trouvent un parrain, que les étudiants puissent finir leurs études, que les jeunes mariés
              puissent s'installer, et que les pauvres et artisans trouvent de l'aide rapidement. Merci
              de partager ce répertoire autour de vous et sur GitHub ! »
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-stone-500 font-medium">
            Répertoire Sanad Tounes · Tunisie 🇹🇳 · Par Mohamed Aziz (12 ans)
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
