import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Login from './components/Login';
import LogoScreen from './components/LogoScreen';
import DialogueBox from './components/DialogueBox';
import InteractiveMap from './components/InteractiveMap';
import Greenhouse from './components/Greenhouse';
import LetterModal from './components/LetterModal';
import BakeryModal from './components/BakeryModal';


const LETTER_CONTENT = [
  "  안녕 예담아 졸업 축하해!",
  "  너의 졸업을 축하해주기 위해 기념으로 한번 웹사이트를 만들어 봤어\n\n\n",
  "  사실 그전에 생일때 이런 이벤트를 해주고 싶었지만",
  "  내 실력이 그땐 너무 미숙해서 구상만 하다가 끝나버렸지 모야ㅠㅠ\n\n\n",
  "  하지만 이젠 이정도는 하루만에 만들 수 있을 만큼 내가 성장을 했어!!",
  "  이제라도 해 줄 수 있다니 참 다행이야 ㅋㅋ\n\n\n",
  "  우리가 고등학교 때 처음 만나 두번이나 같은 반이 되었긴 했지만",
  "  중간에 코로나도 있고 대학도 다른 곳으로 가면서 ",
  "  더 많은 추억을 같이 쌓지 못한게 좀 아쉬운것 같어\n\n\n",
  "  이제 더 나이 들어 가면서 서로에 대해 더 모르게 될 수도 있고",
  "  어쩌면 사이가 멀어지는 일이 있을 일이 생길지도 모르지",
  "  하지만 그래도 항상 어디에선가 너를 응원하고 있을께\n\n\n",
  "  너는 진짜 최고의 친구고 좋은 사람이야",
  "  좀 오글거렸겠지만 ㅋㅋ 졸업 진심으로 축하해 ♡\n\n"
];

const FINAL_MESSAGE = "  나는 졸업생 전예담 헤헿. 나의 예담밸리를 탐색해볼까?";

export default function App() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);
  const [modal, setModal] = useState<'none' | 'letter' | 'greenhouse' | 'bakery'>('none');

  const handleLoginSuccess = () => setStep(1);
  const handleLogoComplete = () => setStep(2);

  const handleNextDialogue = () => {
    if (dialogueIndex < LETTER_CONTENT.length) {
      setDialogueIndex((prev) => prev + 1);
    }
  };

  const handleCloseDialogue = () => {
    setShowDialogue(false);
    setStep(3);
  };

  const currentDialogueText =
    dialogueIndex < LETTER_CONTENT.length
      ? LETTER_CONTENT[dialogueIndex]
      : FINAL_MESSAGE;

  // Placeholder portraits
  // App.tsx 상단 혹은 경로 정의 부분 수정
  const base = import.meta.env.BASE_URL; // 현재 설정된 base 경로('/GCW/')를 가져옵니다.

  // 경로 앞에 base를 붙여줍니다.
  const defaultPortrait = `${base}dev_charac.png`;
  const friendPortrait = `${base}doggy2.png`;
  const currentPortrait = dialogueIndex < LETTER_CONTENT.length ? defaultPortrait : friendPortrait;

  return (
    <div className="w-full h-screen bg-black overflow-hidden font-['DungGeunMo']">
      <AnimatePresence mode="wait">
        {step === 0 && <Login key="login" onSuccess={handleLoginSuccess} />}
        {step === 1 && <LogoScreen key="logo" onComplete={handleLogoComplete} />}
      </AnimatePresence>

      {(step === 2 || step === 3) && (
        <div className="relative w-full h-full">
          <InteractiveMap
            onOpenLetter={() => setModal('letter')}
            onOpenGreenhouse={() => setModal('greenhouse')}
            onOpenBakery={() => setModal('bakery')}
          />
          
          <AnimatePresence>
            {step === 2 && showDialogue && (
              <DialogueBox
                key="dialogue"
                text={currentDialogueText}
                portraitUrl={currentPortrait}
                onNext={handleNextDialogue}
                isLast={dialogueIndex === LETTER_CONTENT.length}
                onClose={handleCloseDialogue}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {modal === 'letter' && (
              <LetterModal
                key="letter-modal"
                onClose={() => setModal('none')}
                letterContent={LETTER_CONTENT}
              />
            )}
            {modal === 'greenhouse' && (
              <Greenhouse
                key="greenhouse-modal"
                onClose={() => setModal('none')}
              />
            )}
            {modal === 'bakery' && (
              <BakeryModal
                key="bakery-modal"
                onClose={() => setModal('none')}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}


