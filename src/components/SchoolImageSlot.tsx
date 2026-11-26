import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  UploadCloud, 
  Trash2, 
  Image as ImageIcon, 
  Check, 
  RefreshCw,
  Building,
  Sparkles
} from 'lucide-react';

interface SchoolImageSlotProps {
  id: string;
  title: string;
  category?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-[4/5]", "aspect-[16/10]"
  recommendedDimensions?: string;
  className?: string;
  altText?: string;
  overlayBadge?: string;
  overlayCaption?: string;
  showOverlayOnImage?: boolean;
}

export const SchoolImageSlot: React.FC<SchoolImageSlotProps> = ({
  id,
  title,
  category = "Campus Photo",
  aspectRatio = "aspect-video",
  recommendedDimensions = "1200 × 750 px (PNG/JPG)",
  className = "",
  altText,
  overlayBadge,
  overlayCaption,
  showOverlayOnImage = true
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Storage key
  const storageKey = `hra_school_slot_${id}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setImageSrc(saved);
      }
    }
  }, [storageKey]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        try {
          localStorage.setItem(storageKey, dataUrl);
          setImageSrc(dataUrl);
          setJustSaved(true);
          setTimeout(() => setJustSaved(false), 2500);
        } catch (err) {
          console.error('Storage quota note:', err);
          // If localStorage quota is reached, compress or keep in memory
          setImageSrc(dataUrl);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove the photo for "${title}" and reset to placeholder?`)) {
      localStorage.removeItem(storageKey);
      setImageSrc(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`relative group rounded-2xl overflow-hidden transition-all duration-300 ${aspectRatio} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Hidden File Input */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Upload photo for ${title}`}
      />

      {imageSrc ? (
        /* ==================== 1. USER'S ORIGINAL PHOTO LOADED ==================== */
        <div className="relative w-full h-full">
          <img 
            src={imageSrc} 
            alt={altText || title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Optional Caption Overlay on top of image */}
          {showOverlayOnImage && (overlayBadge || overlayCaption) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 pointer-events-none">
              <div>
                {overlayBadge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-school-gold bg-black/70 px-2 py-0.5 rounded border border-school-gold/30">
                    {overlayBadge}
                  </span>
                )}
                {overlayCaption && (
                  <p className="text-xs font-semibold text-white mt-1 drop-shadow-md">
                    {overlayCaption}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Controls Bar on Hover */}
          <div className={`absolute top-3 right-3 flex items-center gap-1.5 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0 group-hover:opacity-100'}`}>
            <button
              onClick={triggerUpload}
              className="px-2.5 py-1.5 rounded-lg bg-black/80 hover:bg-emerald-700 text-white text-[11px] font-bold backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-lg transition-colors"
              title="Replace with another photo"
            >
              <RefreshCw className="w-3.5 h-3.5 text-school-gold" />
              <span>Replace Photo</span>
            </button>
            <button
              onClick={handleRemovePhoto}
              className="p-1.5 rounded-lg bg-black/80 hover:bg-red-700 text-red-300 hover:text-white backdrop-blur-md border border-white/20 shadow-lg transition-colors"
              title="Remove photo and return to slot placeholder"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Verified Original Photo Badge */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow">
              <Check className="w-3 h-3 text-white" />
              <span>Original Photo</span>
            </span>
          </div>
        </div>
      ) : (
        /* ==================== 2. PROFESSIONAL PLACEHOLDER (NO STOCK PHOTO) ==================== */
        <div 
          onClick={triggerUpload}
          className={`w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer border-2 border-solid transition-all duration-300 ${
            isDragOver 
              ? 'border-amber-400 bg-emerald-950/90 scale-[0.99]' 
              : 'border-emerald-600/50 bg-[#023a1e] hover:border-amber-400 hover:bg-[#024423] shadow-md text-white'
          }`}
        >
          {/* Slot Category Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-600 text-school-gold text-[10px] font-bold uppercase tracking-wider mb-3">
            <Building className="w-3 h-3 text-school-gold" />
            <span>{category}</span>
          </div>

          {/* Icon Crest */}
          <div className="relative mb-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-600/60 shadow-md flex items-center justify-center text-school-gold group-hover:scale-105 transition-transform duration-200">
              <Camera className="w-7 h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow font-bold">
              <UploadCloud className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          {/* Title & Prompt */}
          <h4 className="text-sm sm:text-base font-extrabold text-white font-heading">
            {title}
          </h4>
          <p className="text-xs font-semibold text-emerald-200 mt-1 flex items-center gap-1">
            <UploadCloud className="w-3.5 h-3.5 text-school-gold" />
            <span>Click to upload your official school photo</span>
          </p>

          {/* Specs / Dimensions */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] text-emerald-200/80">
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 font-mono text-emerald-200">
              {recommendedDimensions}
            </span>
            <span className="hidden sm:inline text-emerald-400">|</span>
            <span className="hidden sm:inline">PNG or JPG Format</span>
          </div>

          {/* CTA Button */}
          <div className="mt-4">
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-black shadow transition-all flex items-center gap-1.5"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Select School Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* Success Notification Flash */}
      {justSaved && (
        <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mb-2 shadow-lg">
            <Check className="w-6 h-6 text-white stroke-[3]" />
          </div>
          <p className="text-sm font-bold">Photo Saved Successfully!</p>
          <p className="text-xs text-emerald-200 mt-0.5">Displayed on Hammadur Rahman Academy website</p>
        </div>
      )}
    </div>
  );
};
