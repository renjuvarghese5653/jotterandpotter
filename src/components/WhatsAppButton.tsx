import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/919845012345?text=Hello%20Jotter%20%26%20Potter%2C%20I%20have%20a%20question%20about%20The%20Little%20Designer%20kits."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Jotter and Potter on WhatsApp"
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 h-11 px-4 rounded-full bg-[#25894B] text-white text-sm font-bold shadow-[0_6px_20px_rgba(37,137,75,0.32)] hover:bg-[#1E723E] transition-transform duration-150 hover:-translate-y-0.5 no-print"
    >
      <MessageCircle className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp Us</span>
    </a>
  );
};
