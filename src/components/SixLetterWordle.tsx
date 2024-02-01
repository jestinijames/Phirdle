import React, { useEffect, useState } from 'react';

import Keypad from '@/components/Keypad';
import SixLetterGrid from '@/components/SixLetterGrid';
import { Timer } from '@/components/timer';
import { Modal } from '@/components/Util';

import useSixLetterWordle from '../hooks/useSixLetterWordle';

export default function SixLetterWordle({
  solution,
  team,
}: {
  solution: string;
  team: string;
}) {
  const [start, setStart] = React.useState(false);
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    totalScore,
    handleKeyup,
  } = useSixLetterWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 1000);
      window.removeEventListener('keyup', handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 1000);
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  // need to check in the above useEffect which value is constantly changing

  return (
    <div className='relative'>
      <SixLetterGrid
        guesses={guesses}
        currentGuess={currentGuess}
        turn={turn}
      />
      <Timer
        start={start}
        setStart={setStart}
        isCorrect={isCorrect}
        turn={turn}
        solution={solution}
        totalScore={totalScore}
        team={team}
      />
      <Keypad usedKeys={usedKeys} />

      <Modal
        open={showModal}
        setOpen={setShowModal}
        isCorrect={isCorrect}
        turn={turn}
        solution={solution}
        totalScore={totalScore}
        team={team}
      />
    </div>
  );
}
