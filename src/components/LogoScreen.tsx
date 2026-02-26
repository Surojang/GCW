import { motion } from 'motion/react';
import { useEffect } from 'react';
import firstLogo from '../assets/first_page_logo.png';

interface LogoScreenProps {
  onComplete: () => void;
}

export default function LogoScreen({ onComplete }: LogoScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0, y: 0, rotate: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          // 나타난 이후에 위아래로 통통 튀고 살짝 흔들리도록 배열 값 설정
          y: [0, -15, 0, -15, 0],
          rotate: [0, -3, 3, -3, 0]
        }}
        transition={{ 
          // 1. 처음에 스르륵 나타나는 애니메이션 (0.5초 대기 후 1초 동안)
          delay: 0.5, 
          duration: 1, 
          
          // 2. 완전히 나타난 이후(delay: 1.5)부터 통통 튀는 애니메이션 무한 반복
          y: {
            delay: 1.5, 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            delay: 1.5,
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        style={{ 
          backgroundImage: `url(${firstLogo})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center', // 이미지가 요소의 정중앙에 오도록 보장
          backgroundRepeat: 'no-repeat'
        }}
        // 모바일에서는 좀 더 넓게(80%), PC에서는 50% 크기로 반응형 적용
        className="w-[80%] md:w-[50%] h-[30%] block" 
      />
    </motion.div>
  );
}