/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TunisiaDirectory } from './components/TunisiaDirectory';
import { UrgentCampaignsSection } from './components/UrgentCampaignsSection';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { OrphanSponsorshipModal } from './components/OrphanSponsorshipModal';
import { DonationBasketModal } from './components/DonationBasketModal';
import { ReportNeedModal } from './components/ReportNeedModal';
import { ZakatCalculatorModal } from './components/ZakatCalculatorModal';
import { SolidarityAdvisorModal } from './components/SolidarityAdvisorModal';
import { DownloadGuideModal } from './components/DownloadGuideModal';
import { Footer } from './components/Footer';
import { INITIAL_PLACES, SolidarityPlace, UrgentCampaign } from './data/tunisiaData';

export default function App() {
  const [places, setPlaces] = useState<SolidarityPlace[]>(() => {
    try {
      const saved = localStorage.getItem('sanad_tounes_places');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Keep any citizen-reported custom places and prepend them to INITIAL_PLACES
          const customCitizenCases = parsed.filter(
            (p: SolidarityPlace) => p.id && p.id.startsWith('citoyen-')
          );
          return [...customCitizenCases, ...INITIAL_PLACES];
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PLACES;
  });

  const [selectedPlaceForDetail, setSelectedPlaceForDetail] = useState<SolidarityPlace | null>(null);
  const [isSponsorshipOpen, setIsSponsorshipOpen] = useState(false);
  const [sponsorshipPresetPlace, setSponsorshipPresetPlace] = useState<SolidarityPlace | null>(null);

  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [donationPresetTarget, setDonationPresetTarget] = useState<SolidarityPlace | UrgentCampaign | null>(null);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isZakatOpen, setIsZakatOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Save places to localStorage when updated
  const handleAddPlace = (newPlace: SolidarityPlace) => {
    setPlaces((prev) => {
      const updated = [newPlace, ...prev];
      try {
        localStorage.setItem('sanad_tounes_places', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleScrollToDirectory = () => {
    const el = document.getElementById('directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSponsorshipWithPlace = (place: SolidarityPlace) => {
    setSponsorshipPresetPlace(place);
    setIsSponsorshipOpen(true);
  };

  const handleOpenDonationWithTarget = (target: SolidarityPlace | UrgentCampaign) => {
    setDonationPresetTarget(target);
    setIsDonationOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenSponsorship={() => {
          setSponsorshipPresetPlace(null);
          setIsSponsorshipOpen(true);
        }}
        onOpenDonate={() => {
          setDonationPresetTarget(null);
          setIsDonationOpen(true);
        }}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenZakat={() => setIsZakatOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
        activeSection="home"
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenSponsorship={() => {
            setSponsorshipPresetPlace(null);
            setIsSponsorshipOpen(true);
          }}
          onOpenDonate={() => {
            setDonationPresetTarget(null);
            setIsDonationOpen(true);
          }}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onOpenDownload={() => setIsDownloadOpen(true)}
          onScrollToDirectory={handleScrollToDirectory}
        />

        {/* Directory & Interactive Map across Tunisia */}
        <TunisiaDirectory
          places={places}
          onSelectPlace={(place) => setSelectedPlaceForDetail(place)}
          onSponsorFromPlace={handleOpenSponsorshipWithPlace}
          onDonateToPlace={handleOpenDonationWithTarget}
        />

        {/* Urgent Live Campaigns */}
        <UrgentCampaignsSection
          onDonateCampaign={(campaign) => handleOpenDonationWithTarget(campaign)}
        />
      </main>

      {/* Modals */}
      <PlaceDetailModal
        place={selectedPlaceForDetail}
        onClose={() => setSelectedPlaceForDetail(null)}
        onSelectForSponsorship={handleOpenSponsorshipWithPlace}
        onSelectForDonation={handleOpenDonationWithTarget}
      />

      <OrphanSponsorshipModal
        isOpen={isSponsorshipOpen}
        onClose={() => {
          setIsSponsorshipOpen(false);
          setSponsorshipPresetPlace(null);
        }}
        presetPlace={sponsorshipPresetPlace}
      />

      <DonationBasketModal
        isOpen={isDonationOpen}
        onClose={() => {
          setIsDonationOpen(false);
          setDonationPresetTarget(null);
        }}
        presetTarget={donationPresetTarget}
      />

      <ReportNeedModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onAddPlace={handleAddPlace}
      />

      <ZakatCalculatorModal
        isOpen={isZakatOpen}
        onClose={() => setIsZakatOpen(false)}
        onDirectToDonate={() => {
          setDonationPresetTarget(null);
          setIsDonationOpen(true);
        }}
      />

      <SolidarityAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        places={places}
        onSelectPlace={(place) => setSelectedPlaceForDetail(place)}
        onOpenSponsorship={() => {
          setSponsorshipPresetPlace(null);
          setIsSponsorshipOpen(true);
        }}
      />

      <DownloadGuideModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        places={places}
      />

      {/* Footer */}
      <Footer
        onOpenSponsorship={() => {
          setSponsorshipPresetPlace(null);
          setIsSponsorshipOpen(true);
        }}
        onOpenDonate={() => {
          setDonationPresetTarget(null);
          setIsDonationOpen(true);
        }}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenZakat={() => setIsZakatOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />
    </div>
  );
}
