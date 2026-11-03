/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Flame,
  Clock,
  Users,
  Heart,
  Copy,
  Check,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { URGENT_CAMPAIGNS, UrgentCampaign } from '../data/tunisiaData';

interface UrgentCampaignsSectionProps {
  onDonateCampaign: (campaign: UrgentCampaign) => void;
}

export const UrgentCampaignsSection: React.FC<UrgentCampaignsSectionProps> = ({
  onDonateCampaign,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyRib = (rib: string, id: string) => {
    navigator.clipboard.writeText(rib);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="campaigns" className="py-12 lg:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-700 font-semibold mb-1">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Appels à Solidarité d'Urgence</span>
            </div>
            <h2 className="text-3xl font-bold font-display text-stone-900 tracking-tight">
              Campagnes Actives sur le Terrain
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Ces collectes répondent à des situations critiques immédiates (vagues de froid,
              enfants déscolarisés, foyers menacés d'expulsion).
            </p>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Mises à jour quotidiennes avec les associations coordinatrices
          </span>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {URGENT_CAMPAIGNS.map((campaign) => {
            const percent = Math.min(
              100,
              Math.round((campaign.raisedAmountTND / campaign.targetAmountTND) * 100)
            );

            return (
              <div
                key={campaign.id}
                className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Campaign Image */}
                  <div className="relative h-48 w-full bg-stone-900 overflow-hidden">
                    <img
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="bg-stone-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/10">
                        {campaign.location}
                      </span>
                      <span className="flex items-center gap-1 bg-amber-900/85 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-semibold text-amber-200 border border-amber-500/30">
                        <Clock className="w-3 h-3" />
                        <span>{campaign.daysLeft} jours restants</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] text-amber-300 font-medium">
                        {campaign.governorate}
                      </div>
                      <h3 className="text-base font-bold font-display leading-snug line-clamp-1">
                        {campaign.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
                      {campaign.summary}
                    </p>

                    {/* Progress Bar & Amount */}
                    <div className="space-y-1.5 bg-white p-3 rounded-xl border border-stone-200/80">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-900 font-mono text-sm tabular-nums">
                          {campaign.raisedAmountTND.toLocaleString()} TND
                        </span>
                        <span className="text-stone-500 font-medium">
                          Objectif {campaign.targetAmountTND.toLocaleString()} TND
                        </span>
                      </div>

                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-stone-400" />
                          <span>{campaign.donorsCount} donateurs</span>
                        </span>
                        <span className="font-semibold text-emerald-800 font-mono tabular-nums">
                          {percent}% collecté
                        </span>
                      </div>
                    </div>

                    {/* Impact Note */}
                    <div className="text-xs text-emerald-900 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/60 font-medium">
                      {campaign.beneficiaryImpact}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => copyRib(campaign.bankInfo.rib, campaign.id)}
                    className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
                    title="Copier le RIB de cette campagne"
                  >
                    {copiedId === campaign.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">RIB Copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-400" />
                        <span>Copier RIB</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onDonateCampaign(campaign)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Contribuer</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
