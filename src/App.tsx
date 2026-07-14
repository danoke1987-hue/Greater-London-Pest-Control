/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter, Link } from './lib/router';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import ChatBot from './components/ChatBot';

// Import views
import HomeView from './views/HomeView';
import PestsHubView from './views/PestsHubView';
import PestDetailView from './views/PestDetailView';
import ServicesHubView from './views/ServicesHubView';
import ServiceDetailView from './views/ServiceDetailView';
import AreasHubView from './views/AreasHubView';
import LocationDetailView from './views/LocationDetailView';
import BoroughDetailView from './views/BoroughDetailView';
import PostcodeDetailView from './views/PostcodeDetailView';
import SectorView from './views/SectorView';
import IndustryView from './views/IndustryView';
import PricingView from './views/PricingView';
import HowItWorksView from './views/HowItWorksView';
import CaseStudiesView from './views/CaseStudiesView';
import AdviceView from './views/AdviceView';
import LegalView from './views/LegalView';
import AdminSeoView from './views/AdminSeoView';

function AppContent() {
  const { pathname } = useRouter();

  const getActiveView = () => {
    // Exact Static Route Matches
    if (pathname === '/') return <HomeView />;
    if (pathname === '/pests') return <PestsHubView />;
    if (pathname === '/services') return <ServicesHubView />;
    if (pathname === '/areas') return <AreasHubView />;
    if (pathname === '/pest-control-prices') return <PricingView />;
    if (pathname === '/how-it-works') return <HowItWorksView />;
    if (pathname === '/case-studies') return <CaseStudiesView />;
    if (pathname === '/advice') return <AdviceView />;
    if (pathname === '/admin') return <AdminSeoView />;

    // Sectors
    if (pathname === '/residential-pest-control') return <SectorView sector="residential" />;
    if (pathname === '/commercial-pest-control') return <SectorView sector="commercial" />;
    if (pathname === '/landlord-pest-control') return <SectorView sector="landlord" />;

    // Industries (Slugs from editorial.ts)
    if (pathname === '/restaurant-pest-control') return <IndustryView industrySlug="restaurants" />;
    if (pathname === '/hotel-pest-control') return <IndustryView industrySlug="hotels" />;
    if (pathname === '/office-pest-control') return <IndustryView industrySlug="offices" />;
    if (pathname === '/retail-pest-control') return <IndustryView industrySlug="retail" />;
    if (pathname === '/warehouse-pest-control') return <IndustryView industrySlug="warehouses" />;
    if (pathname === '/school-pest-control') return <IndustryView industrySlug="school" />;
    if (pathname === '/healthcare-pest-control') return <IndustryView industrySlug="healthcare" />;
    if (pathname === '/construction-site-pest-control') return <IndustryView industrySlug="construction" />;

    // Legal Policies
    if (pathname === '/privacy-policy') return <LegalView page="privacy" />;
    if (pathname === '/cookie-policy') return <LegalView page="cookies" />;
    if (pathname === '/terms-and-conditions') return <LegalView page="terms" />;
    if (pathname === '/complaints-procedure') return <LegalView page="complaints" />;
    if (pathname === '/accessibility-statement') return <LegalView page="accessibility" />;
    if (pathname === '/website-disclaimer') return <LegalView page="disclaimer" />;

    // Dynamic Route Matches
    if (pathname.startsWith('/pests/')) {
      const slug = pathname.substring('/pests/'.length);
      return <PestDetailView slug={slug} />;
    }
    if (pathname.startsWith('/services/')) {
      const slug = pathname.substring('/services/'.length);
      return <ServiceDetailView slug={slug} />;
    }
    if (pathname.startsWith('/locations/')) {
      const slug = pathname.substring('/locations/'.length);
      return <LocationDetailView slug={slug} />;
    }
    if (pathname.startsWith('/boroughs/')) {
      const slug = pathname.substring('/boroughs/'.length);
      return <BoroughDetailView slug={slug} />;
    }
    if (pathname.startsWith('/postcodes/')) {
      const slug = pathname.substring('/postcodes/'.length);
      return <PostcodeDetailView outwardCode={slug} />;
    }
    if (pathname.startsWith('/case-studies/')) {
      const slug = pathname.substring('/case-studies/'.length);
      return <CaseStudiesView slug={slug} />;
    }
    if (pathname.startsWith('/advice/')) {
      const slug = pathname.substring('/advice/'.length);
      return <AdviceView slug={slug} />;
    }

    // 404 Fallback View
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-left" id="not-found-view">
        <h1 className="font-sans text-4xl font-extrabold text-gray-950 sm:text-5xl">Page Not Found</h1>
        <p className="text-sm text-gray-600 mt-3 max-w-md mx-auto">
          The requested page could not be located on Greater London Pest Control. Verify the path name or return home.
        </p>
        <div className="mt-8">
          <Link href="/" className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 shadow-sm transition-all">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-900 font-sans antialiased selection:bg-emerald-600 selection:text-white">
      
      {/* 1. Accessible Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-emerald-600 focus:text-white focus:px-4 focus:py-2.5 focus:rounded-lg focus:font-bold focus:shadow-lg focus:z-50">
        Skip to main content
      </a>

      {/* 2. Standard Header */}
      <Header />

      {/* 3. Main Dynamic Canvas stage */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        {getActiveView()}
      </main>

      {/* 4. Footers & Sticky bottom selectors */}
      <Footer />
      <MobileStickyBar />
      <ChatBot />
      
    </div>
  );
}

export default function App() {
  return (
    <StrictModeWrapper>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </StrictModeWrapper>
  );
}

// Ensure StrictMode or rendering consistency is respected cleanly
function StrictModeWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
