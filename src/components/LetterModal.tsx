import { motion } from 'motion/react';
import { X } from 'lucide-react';
import letterImage from '../assets/letter_backgroungd.png'

interface LetterModalProps {
  onClose: () => void;
  letterContent: string[];
}

export default function LetterModal({ onClose, letterContent }: LetterModalProps) {
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
        style={{ backgroundImage : `url(${letterImage})`,
                backgroundSize: '95% 100%',
          backgroundPosition: 'center', // 이미지가 요소의 정중앙에 오도록 보장
          backgroundRepeat: 'no-repeat'}}
        className=" rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-12 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b4513] hover:text-[#5c2e0b] transition-colors"
        >
          <X size={32} />
        </button>

        <h2 className="text-3xl md:text-4xl text-[#5c2e0b] text-center mb-8 border-b-4 border-[#8b4513] pb-4">
          졸업 축하 편지
        </h2>

        <div className="space-y-6 text-[#5c2e0b] text-lg md:text-xl leading-loose whitespace-pre-wrap">
          {letterContent.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 text-right text-[#8b4513] font-bold text-xl">
          - 채채가 -
        </div>
      </motion.div>
    </motion.div>
  );
}
