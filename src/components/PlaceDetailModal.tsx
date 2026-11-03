/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Heart,
  Users,
  AlertTriangle,
  Building2,
} from 'lucide-react';
import { CATEGORY_LABELS, SolidarityPlace } from '../data/tunisiaData';

interface PlaceDetailModalProps {
  place: SolidarityPlace | null;
  onClose: () => void;
  onSelectForSponsorship: (place: SolidarityPlace) => void;
  onSelectForDonation: (place: SolidarityPlace) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  onSelectForSponsorship,
  onSelectForDonation,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!place) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const categoryMeta = CATEGORY_LABELS[place.category];
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image & close button */}
        <div className="relative h-48 sm:h-56 w-full bg-stone-900 shrink-0">
          <img
            src={place.imageUrl}
            alt={place.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors cursor-pointer border border-white/20"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title & Badges */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium mb-1.5">
              <span>{categoryMeta.fr}</span>
              <span aria-hidden="true">·</span>
              <span className="font-arabic text-sm text-emerald-200">{categoryMeta.ar}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-300">{place.governorate}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
              {place.name}
            </h2>
            <div className="text-sm font-arabic text-emerald-200/90 mt-0.5">
              {place.arabicName}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Status & Verification Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold text-stone-900">Structure Contrôlée & Vérifiée</span>
              <span className="text-stone-500 font-normal">
                (Agrément social / Répertoire solidaire)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-600">
              <Users className="w-3.5 h-3.5 text-stone-500" />
              <span className="font-medium text-stone-800">{place.beneficiariesCount}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              Mission & Prise en Charge
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">{place.description}</p>
          </div>

          {/* Urgent Needs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Besoins Urgents & Prioritaires</span>
              </h3>
              <span className="text-xs text-stone-400">À déposer ou financer</span>
            </div>
            <div className="space-y-2">
              {place.urgentNeeds.map((need, idx) => {
                const isCritique = need.urgency === 'critique';
                const isHaute = need.urgency === 'haute';
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs sm:text-sm ${
                      isCritique
                        ? 'bg-red-50/70 border-red-200 text-red-950 font-medium'
                        : isHaute
                        ? 'bg-amber-50/70 border-amber-200 text-amber-950 font-medium'
                        : 'bg-stone-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCritique ? 'bg-red-500' : isHaute ? 'bg-amber-500' : 'bg-stone-400'
                        }`}
                      />
                      <span>{need.item}</span>
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-wider font-semibold ${
                        isCritique ? 'text-red-700' : isHaute ? 'text-amber-700' : 'text-stone-500'
                      }`}
                    >
                      {need.urgency}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact & Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location & Visiting */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-600" />
                <span>Localisation & Horaires</span>
              </h4>
              <p className="text-xs text-stone-700 leading-normal font-medium">{place.address}</p>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{place.openingHours}</span>
              </div>
              <p className="text-xs text-stone-500 italic bg-white p-2.5 rounded-lg border border-stone-200/70">
                {place.visitGuidelines}
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline pt-1"
              >
                <span>Ouvrir l’itinéraire dans Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Contact Person */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-600" />
                <span>Référent Social & Contact Direct</span>
              </h4>
              <div className="text-xs">
                <div className="font-semibold text-stone-900">{place.contactPerson}</div>
                <div className="text-stone-500">{place.role}</div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={`tel:${place.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-stone-200 hover:border-emerald-600 transition-colors text-xs text-stone-800 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Appel téléphonique : {place.phone}</span>
                  </span>
                  <span className="text-[11px] text-emerald-800 font-semibold">Appeler</span>
                </a>

                {place.whatsapp && (
                  <a
                    href={`https://wa.me/${place.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Bonjour, je vous contacte via Sanad Tounes concernant une aide pour ${place.name}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-between px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors text-xs text-emerald-950 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                      <span>WhatsApp direct : {place.whatsapp}</span>
                    </span>
                    <span className="text-[11px] text-emerald-800 font-semibold">Envoyer message</span>
                  </a>
                )}

                {place.email && (
                  <a
                    href={`mailto:${place.email}`}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-stone-600 hover:text-stone-900"
                  >
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{place.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Official Bank / CCP / D17 Details for Direct Donations */}
          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Coordonnées Bancaires Officielles (Dons Directs)
              </h4>
              <span className="text-[11px] text-emerald-700 font-medium">Tunisie & Diaspora</span>
            </div>
            <p className="text-xs text-stone-600 mb-3">
              Bénéficiaire officiel : <strong>{place.bankDetails.beneficiaryName}</strong>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* RIB Bancaire */}
              <div className="bg-white p-3 rounded-lg border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">
                    RIB {place.bankDetails.bankName}
                  </div>
                  <div className="font-mono font-semibold text-stone-800 text-[11px] select-all">
                    {place.bankDetails.rib}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(place.bankDetails.rib, 'rib')}
                  className="p-1.5 rounded hover:bg-emerald-50 text-emerald-700 cursor-pointer transition-colors"
                  title="Copier le RIB"
                >
                  {copiedField === 'rib' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* CCP Poste Tunisienne */}
              <div className="bg-white p-3 rounded-lg border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">
                    CCP Poste Tunisienne
                  </div>
                  <div className="font-mono font-semibold text-stone-800 text-[11px] select-all">
                    {place.bankDetails.ccp}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(place.bankDetails.ccp, 'ccp')}
                  className="p-1.5 rounded hover:bg-emerald-50 text-emerald-700 cursor-pointer transition-colors"
                  title="Copier le CCP"
                >
                  {copiedField === 'ccp' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* D17 Mobile */}
              {place.bankDetails.d17 && (
                <div className="bg-white p-3 rounded-lg border border-emerald-200 flex items-center justify-between sm:col-span-2">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-700">
                      Paiement D17 Mobile (La Poste Tunisienne)
                    </div>
                    <div className="font-mono font-semibold text-stone-800 text-[11px] select-all">
                      {place.bankDetails.d17}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(place.bankDetails.d17!, 'd17')}
                    className="p-1.5 rounded hover:bg-emerald-50 text-emerald-700 cursor-pointer transition-colors"
                    title="Copier le numéro D17"
                  >
                    {copiedField === 'd17' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
            {copiedField && (
              <p className="text-center text-xs text-emerald-800 font-semibold mt-2 animate-pulse">
                Coordonnée copiée dans le presse-papier !
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer / CTAs */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Fermer la fiche
          </button>

          <div className="flex items-center gap-2">
            {place.category === 'orphelinat' && (
              <button
                onClick={() => {
                  onSelectForSponsorship(place);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
              >
                Parrainer un orphelin de ce centre
              </button>
            )}
            <button
              onClick={() => {
                onSelectForDonation(place);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Soutenir ce lieu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
