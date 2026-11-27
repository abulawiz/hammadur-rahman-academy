import React from 'react';
import { BookOpen, Building2, HeartHandshake, Laptop, Microscope, UsersRound } from 'lucide-react';

interface SchoolImageSlotProps {
  id: string;
  title: string;
  category?: string;
  aspectRatio?: string;
  recommendedDimensions?: string;
  className?: string;
  altText?: string;
  overlayBadge?: string;
  overlayCaption?: string;
  showOverlayOnImage?: boolean;
}

const iconForSlot = (id: string) => {
  const normalizedId = id.toLowerCase();
  const iconClass = 'h-7 w-7';
  if (normalizedId.includes('science')) return <Microscope className={iconClass} aria-hidden="true" />;
  if (normalizedId.includes('library')) return <BookOpen className={iconClass} aria-hidden="true" />;
  if (normalizedId.includes('computer') || normalizedId.includes('cbt')) return <Laptop className={iconClass} aria-hidden="true" />;
  if (normalizedId.includes('student') || normalizedId.includes('hostel')) return <UsersRound className={iconClass} aria-hidden="true" />;
  if (normalizedId.includes('principal')) return <HeartHandshake className={iconClass} aria-hidden="true" />;
  return <Building2 className={iconClass} aria-hidden="true" />;
};

export const SchoolImageSlot: React.FC<SchoolImageSlotProps> = ({
  id,
  aspectRatio = 'aspect-video',
  className = '',
}) => {
  return (
    <div className={`relative isolate grid overflow-hidden rounded-xl bg-gradient-to-br from-[#e8eee7] to-[#d4e0d5] ${aspectRatio} ${className}`} aria-hidden="true">
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-[#b7c8b7]/70" />
      <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full border border-[#b7c8b7]/70" />
      <div className="relative m-auto grid h-16 w-16 place-items-center rounded-xl border border-white/80 bg-white/75 text-[#17633f] shadow-sm">
        {iconForSlot(id)}
      </div>
    </div>
  );
};
