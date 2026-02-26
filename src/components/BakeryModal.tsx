import { useState } from 'react';
import { motion } from 'motion/react';
import { X, RotateCcw } from 'lucide-react';
import Cake3D from './Cake3D';

interface BakeryModalProps {
  onClose: () => void;
}

export default function BakeryModal({ onClose }: BakeryModalProps) {
  const [resetKey, setResetKey] = useState(0);
  const [isEaten, setIsEaten] = useState(false);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    setIsEaten(false);
  };

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
        className="bg-[#f4d29c] border-8 border-[#8b4513] rounded-xl w-full max-w-2xl h-[80vh] flex flex-col relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b4513] hover:text-[#5c2e0b] transition-colors z-10"
        >
          <X size={32} />
        </button>

        <div className="p-6 text-center border-b-4 border-[#8b4513] bg-[#e4a672]">
          <h2 className="text-3xl md:text-4xl text-[#5c2e0b] inline-block">
            졸업 축하 케잌
          </h2>
          <p className="text-[#8b4513] mt-2">케이크를 클릭해서 맛있게 먹어보세요!</p>
        </div>

        <div className="flex-1 relative bg-[#2c1e16]">
          <Cake3D key={resetKey} onFullyEaten={() => setIsEaten(true)} />
          
          {isEaten && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none"
            >
              <button
                onClick={handleReset}
                className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-[#8b4513] text-[#f4d29c] border-4 border-[#5c2e0b] rounded-lg hover:bg-[#a0522d] active:translate-y-1 transition-all text-xl"
              >
                <RotateCcw size={24} />
                다시 먹기
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
