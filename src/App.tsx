/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PrintableSheetModal } from './components/PrintableSheetModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CombosPage } from './pages/CombosPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';

const AppShell: React.FC = () => {
  const { route, toastMessage } = useStore();

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductPage slug={route.slug} />;
      case 'combos':
        return <CombosPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'about':
        return <AboutPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EE] text-[#2B231D]">
      <Header />

      <div className="flex-1">{renderPage()}</div>

      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <WishlistDrawer />
      <PrintableSheetModal />
      <WhatsAppButton />

      {/* Polite Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-20 right-4 z-50 px-4 py-2.5 rounded-xl bg-[#2B231D] text-[#FAF5EE] text-xs sm:text-sm font-semibold shadow-lg no-print"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
