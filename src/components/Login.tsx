import { useState } from 'react';
import { motion } from 'motion/react';
import backgroundImage from '../assets/first_page_background.jpg';
import loginScreen from '../assets/login_screen.png'
import okayButton from '../assets/button_okay.png'

interface LoginProps {
  onSuccess: () => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === '031228') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="fixed inset-0 flex flex-col items-center justify-center text-[#f4d29c]"
    >
      <div className="p-2 rounded-md ">
        <div style={{ 
              backgroundImage: `url(${loginScreen})`,
              backgroundSize: '100% 65%',      // 꽉 채우기
              backgroundPosition: 'center', // 가운데 정렬
              backgroundRepeat: 'no-repeat' // 반복 안 함
            }} className=" p-30  rounded-sm flex flex-col items-center gap-6">
          <h1 className="text-2xl md:text-4xl text-[#5c2e0b] text-center leading-relaxed">
            생일 6자를<br />입력하시오
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <input
              type="password"
              maxLength={6}
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
              className={`w-48 text-center text-3xl p-2 bg-[#fff8e7]  outline-none ${
                error ? 'border-red-500 animate-shake' : 'border-[#8b4513]'
              } text-[#5c2e0b]`}
              autoFocus
            />
            <button
              type="submit"
              style={{backgroundImage: `url(${okayButton})`,
                      backgroundSize:'100% 100%'}}
              className="px-8 py-6  hover:brightness-90 active:translate-y-1 transition-transform"
            >
              
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
