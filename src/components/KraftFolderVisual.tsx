import React from 'react';
import {
  Armchair,
  BookOpen,
  Compass,
  Feather,
  HardHat,
  Home,
  LampDesk,
  Landmark,
  Map,
  PenTool,
  Recycle,
  Scissors,
  Sprout,
  Wrench,
} from 'lucide-react';
import { CollectionPack } from '../types/catalog';

interface KraftFolderVisualProps {
  collection: CollectionPack;
  preferPhoto?: boolean;
  className?: string;
}

export const MotifIcon: React.FC<{
  motif: CollectionPack['motif'];
  className?: string;
}> = ({ motif, className = 'w-6 h-6' }) => {
  switch (motif) {
    case 'architect':
      return <Compass className={className} strokeWidth={1.8} />;
    case 'interior':
      return <Armchair className={className} strokeWidth={1.8} />;
    case 'landscape':
      return <Sprout className={className} strokeWidth={1.8} />;
    case 'urban':
      return <Map className={className} strokeWidth={1.8} />;
    case 'product':
      return <LampDesk className={className} strokeWidth={1.8} />;
    case 'engineer':
      return <HardHat className={className} strokeWidth={1.8} />;
    case 'graphic':
      return <PenTool className={className} strokeWidth={1.8} />;
    case 'fashion':
      return <Scissors className={className} strokeWidth={1.8} />;
    case 'eco':
      return <Recycle className={className} strokeWidth={1.8} />;
    case 'folk':
      return <Landmark className={className} strokeWidth={1.8} />;
    case 'storyteller':
      return <BookOpen className={className} strokeWidth={1.8} />;
    case 'dreamtown':
      return <Home className={className} strokeWidth={1.8} />;
    default:
      return <Wrench className={className} strokeWidth={1.8} />;
  }
};

export const KraftFolderVisual: React.FC<KraftFolderVisualProps> = ({
  collection,
  preferPhoto = false,
  className = '',
}) => {
  if (preferPhoto && collection.imageUrl) {
    return (
      <div
        className={`relative overflow-hidden bg-[#EFE2D0] ${className}`}
      >
        <img
          src={collection.imageUrl}
          alt={`Month ${collection.monthCode}: ${collection.title} kraft learning kit`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center p-5 bg-[#F5EDE1] overflow-hidden select-none ${className}`}
    >
      {/* Subtle blueprint grid lines behind the kraft folder */}
      <div className="absolute inset-0 paper-grid opacity-70 pointer-events-none" />

      {/* Physical Kraft Folder silhouette */}
      <div className="relative w-full max-w-[230px] aspect-[4/3.1] rounded-r-xl rounded-bl-xl rounded-tl-sm bg-[#D6B892] shadow-[0_10px_22px_-8px_rgba(43,35,29,0.22)] border border-[#BA976B] flex flex-col justify-between overflow-hidden transition-transform duration-200 group-hover:-translate-y-0.5">
        {/* Top folder tab */}
        <div className="flex items-center justify-between px-3.5 pt-2.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#5A422B] tabular-nums">
            Month {collection.monthCode}
          </span>
          <span className="text-[10px] font-semibold text-[#5A422B]/80">
            The Little Designer
          </span>
        </div>

        {/* Colour-coded belly band */}
        <div
          className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-sm"
          style={{
            backgroundColor: collection.heroHex,
            color: collection.heroTextOnColor,
          }}
        >
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide opacity-90 truncate">
              {collection.colourName} Edition
            </p>
            <p className="font-display text-sm font-bold leading-tight truncate">
              {collection.title}
            </p>
          </div>
          <div className="shrink-0 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <MotifIcon motif={collection.motif} className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom stitched kraft edge */}
        <div className="px-3.5 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#5A422B]">
            <Feather className="w-3 h-3" strokeWidth={1.8} />
            <span>12 Mission Sheets</span>
          </div>
          <span className="text-[10px] font-semibold text-[#5A422B] tabular-nums">
            6–12 yrs
          </span>
        </div>

        {/* Subtle kraft spine crease */}
        <div className="absolute inset-y-0 left-0 w-2.5 bg-black/10 pointer-events-none" />
      </div>
    </div>
  );
};
