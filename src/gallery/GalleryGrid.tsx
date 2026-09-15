import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, MapPin, Calendar } from 'lucide-react';
import { StagePhoto } from '../types';

interface GalleryGridProps {
  photos: StagePhoto[];
  onSelectPhoto: (photo: StagePhoto) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ photos, onSelectPhoto }) => {
  return (
    <div className="w-full">
      {/* Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
      >
        <AnimatePresence>
          {photos.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              onClick={() => onSelectPhoto(item)}
              className="group relative aspect-[3/4] rounded-[24px] overflow-hidden border border-white/10 hover:border-volt/80 bg-[#0E0E14] cursor-pointer shadow-xl transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(255,208,0,0.25)] flex flex-col justify-end"
            >
              {/* Photo Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />

              {/* Shading gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-volt/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top Corner Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-volt tracking-wider uppercase">
                  #{String(index + 1).padStart(2, '0')}
                </span>

                <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Maximize2 className="w-4 h-4 text-volt" />
                </div>
              </div>

              {/* Bottom Card Details */}
              <div className="relative z-10 p-5 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center gap-2 text-[11px] font-mono text-volt mb-1">
                  <MapPin className="w-3 h-3 text-volt" />
                  <span>{item.location}</span>
                  <span>•</span>
                  <Calendar className="w-3 h-3 text-volt" />
                  <span>{item.year}</span>
                </div>

                <h3 className="font-kanit font-black text-base text-white uppercase tracking-wider line-clamp-1 group-hover:text-volt transition-colors">
                  {item.title}
                </h3>

                <p className="text-[11px] font-mono text-slate-300 line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Klik untuk memperbesar resolusi tinggi
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
