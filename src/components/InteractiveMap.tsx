import { motion } from 'motion/react';
import { useState } from 'react';
import MainBackground from '../assets/main_background.jpg';
import MainScreen from '../assets/main_screen.png';
import HouseImg from '../assets/letter_home.png';
import GreenhouseImg from '../assets/green_house.png';
import BakeryImg from '../assets/bakery.png';

interface InteractiveMapProps {
  onOpenLetter: () => void;
  onOpenGreenhouse: () => void;
  onOpenBakery: () => void;
}

export default function InteractiveMap({ onOpenLetter, onOpenGreenhouse, onOpenBakery }: InteractiveMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Pattern - Simple grass pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${MainBackground})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Map Container - Scales to fit screen */}
      <div 
        style={{ 
          backgroundImage: `url(${MainScreen})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh] border-8 border-[#8b4513] bg-[#000000] rounded-xl shadow-2xl overflow-hidden"
      >
        
        {/* House (가정집) */}
        <button
          onClick={onOpenLetter}
          className="absolute top-[32%] left-[10%] w-32 h-32 md:w-48 md:h-48 group hover:scale-110 transition-transform cursor-pointer z-10"
        >
          <img 
            src={HouseImg} 
            alt="가정집" 
            className="w-full h-full object-contain pixelated drop-shadow-lg"
          />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
            편지 다시 보기
          </div>
        </button>

        {/* Greenhouse (식물원) */}
        <button
          onClick={onOpenGreenhouse}
          className="absolute top-[25%] right-[9%] w-36 h-32 md:w-56 md:h-48 group hover:scale-110 transition-transform cursor-pointer z-10"
        >
          <img 
            src={GreenhouseImg} 
            alt="식물원" 
            className="w-full h-full object-contain pixelated drop-shadow-lg"
          />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
            마법의 꽃다발
          </div>
        </button>

        {/* Bakery (빵집) */}
        <button
          onClick={onOpenBakery}
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-40 h-36 md:w-56 md:h-48 group hover:scale-110 transition-transform cursor-pointer z-10"
        >
          <img 
            src={BakeryImg} 
            alt="빵집" 
            className="w-full h-full object-contain pixelated drop-shadow-lg"
          />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
            졸업 축하 케잌
          </div>
        </button>

      </div>
    </motion.div>
  );
}
