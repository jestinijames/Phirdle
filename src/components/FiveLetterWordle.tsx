import React, { useEffect, useState } from 'react';

import { Timer } from '@/components/timer';
import { Modal } from '@/components/Util';

// components
import FiveLetterGrid from './FiveLetterGrid';
import Keypad from './Keypad';
import useFiveLetterWordle from '../hooks/useFiveLetterWordle';

export default function FiveLetterWordle({
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
  } = useFiveLetterWordle(solution);
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

  return (
    <div className='relative'>
      <FiveLetterGrid
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
