import { useState, useEffect } from 'react';
import ConvScreen from '../assets/conversation_screen.png';
import NextButton from '../assets/next_button.png'
import { motion, AnimatePresence } from 'motion/react';

interface DialogueBoxProps {
  text: string;
  portraitUrl: string;
  onNext: () => void;
  isLast: boolean;
  onClose?: () => void;
}

export default function DialogueBox({ text, portraitUrl, onNext, isLast, onClose }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      style={{ 
        backgroundImage: `url(${ConvScreen})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      // 1. px, py (안쪽 여백)를 대폭 늘려서 글자와 사진이 배경 테두리 안쪽으로 들어오게 합니다.
      // 2. min-h (최소 높이)를 주어 창이 너무 납작해져서 이미지가 찌그러지는 것을 막습니다.
      className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl px-10 py-8 md:px-16 md:py-12 flex gap-6 md:gap-10 items-center z-50 min-h-[180px] md:min-h-[240px]"
    >
      {/* Text Area */}
      {/* Text Area */}
      <div className="flex-1 flex flex-col justify-between h-full min-h-[100px] md:min-h-[140px] min-w-0">
        <div className="overflow-y-auto pr-4">
          <p className="text-[#5c2e0b] text-lg md:text-2xl leading-relaxed whitespace-pre-wrap break-words">
            {displayedText}
          </p>
        </div>
        
        <div className="flex justify-end mt-4 shrink-0">
          {!isTyping && (
            <button
              onClick={isLast && onClose ? onClose : onNext}
              style={{ 
                backgroundImage: `url(${NextButton})`,
                // cover 대신 100% 100%를 사용하여 이미지가 잘리지 않고 버튼 틀에 딱 맞게 들어갑니다.
                // 만약 비율 유지가 중요하다면 'contain'을 사용할 수도 있습니다.
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'transparent' // 혹시 모를 배경색 간섭 제거
              }}
              // 1. text-[#FFFFF] 오타를 text-white로 수정
              // 2. px-4를 px-8로 늘려서 버튼 좌우 이미지가 텍스트에 가리지 않고 잘 보이게 확보
              // 3. min-w-[100px] 등을 추가해 버튼이 너무 작아지는 것을 방지
              className="min-w-[100px] px-8 py-3 text-black hover:brightness-90  font-bold flex items-center justify-center active:translate-y-1 transition-transform text-sm md:text-base animate-pulse"
            >
              {isLast && onClose ? '닫기' : '다음 '}
            </button>
          )}
        </div>
      </div>

      {/* Portrait */}
      {/* 4. 캐릭터 이미지가 너무 크면 삐져나갈 수 있으므로 모바일 사이즈를 살짝 줄였습니다. */}
      <div className="w-20 h-20 md:w-32 md:h-32 shrink-0 border-4 border-[#8b4513] bg-[#d2b48c] overflow-hidden rounded-md relative shadow-lg">
        <img
          src={portraitUrl}
          alt="Portrait"
          className="w-full h-full object-cover pixelated"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}