import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import RoseImg from '../assets/rose.png';
import SunflowerImg from '../assets/sunflower.png';
import FoggyflowerImg from '../assets/foggyflower.png';
import TulipImg from '../assets/tulip.png';
import LabenderImg from '../assets/labender.png';
import BundleImg from '../assets/flowerbundle.png';

interface GreenhouseProps {
  onClose: () => void;
}

const FLOWERS = [
  {
    id: 1,
    name: '장미꽃',
    color: 'text-red-500',
    desc: '항상 꽃길만 걸을 수 있는 ',
    word: '매력 만점 장미!',
    url: RoseImg
  },
  {
    id: 2,
    name: '라벤더',
    color: 'text-purple-500',
    desc: '어딜 가든 맛있는 음식을 먹게 해주는 ',
    word: '먹을 복의 라벤더!',
    url: LabenderImg
  },
  {
    id: 3,
    name: '해바라기',
    color: 'text-yellow-400',
    desc: '부자가 될 거야, ',
    word: '돈을 긁어모으는 황금빛 해바라기!',
    url: SunflowerImg
  },
  {
    id: 4,
    name: '튤립',
    color: 'text-pink-400',
    desc: '좋은 인연을 만나게 해주는 ',
    word: '사랑스러운 튤립!',
    url: TulipImg
  },
  {
    id: 5,
    name: '안개꽃',
    color: 'text-green-500',
    desc: '예기치 않은 행운이 팡팡 터지는 ',
    word: '마법의 안개꽃!',
    url: FoggyflowerImg
  }
];

export default function Greenhouse({ onClose }: GreenhouseProps) {
  const [selectedFlower, setSelectedFlower] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#f4d29c] border-8 border-[#8b4513] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b4513] hover:text-[#5c2e0b] transition-colors"
        >
          <X size={32} />
        </button>

        <h2 className="text-3xl md:text-4xl text-[#5c2e0b] text-center mb-6  pb-4 inline-block w-full">
          마법의 꽃다발
        </h2>

        {/* 꽃다발 전체 씬 사진 */}
        <div className="w-full max-w-sm mb-8 rounded-lg overflow-hidden ">
          <img 
            src={BundleImg} 
            alt="마법의 꽃다발" 
            className="w-full h-auto object-cover pixelated"
            // 이미지가 없을 경우를 대비한 대체 텍스트 스타일링
            style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8 w-full">
          {FLOWERS.map((flower) => (
            <button
              key={flower.id}
              onClick={() => setSelectedFlower(flower.id)}
              className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-transform hover:scale-110 ${
                selectedFlower === flower.id ? 'ring-4 ring-[#8b4513] bg-white/50' : ''
              }`}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-4xl `}>
                <img
                  src={flower.url}
                />
              </div>
              <span className="text-[#5c2e0b] font-bold text-sm md:text-base">
                {flower.name}
              </span>
            </button>
          ))}
        </div>

        <div className="h-32 bg-[#fff8e7] rounded-lg p-4 flex items-center justify-center shadow-inner w-full">
          <AnimatePresence mode="wait">
            {selectedFlower ? (() => {
              // 1. 선택된 꽃 데이터를 먼저 찾습니다.
              const currentFlower = FLOWERS.find((f) => f.id === selectedFlower);
              if (!currentFlower) return null;
            
              return (
                <motion.p
                  key={selectedFlower}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-[#5c2e0b] text-lg md:text-xl text-center leading-relaxed"
                >
                  {currentFlower.desc} 
                  {/* 2. 백틱(`)을 사용한 템플릿 리터럴로 클래스를 합칩니다. */}
                  <span className={`${currentFlower.color.replace('bg-', 'text-')} font-black`}>
                    {currentFlower.word}
                  </span>
                </motion.p>
              );
            })() : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#a0522d] text-lg text-center"
              >
                꽃을 클릭해서 마법의 메시지를 확인해보세요!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
