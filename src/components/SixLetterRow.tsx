import React from 'react';

import { Guess } from '@/components/SixLetterGrid';

export default function SixLetterRow({
  guess,
  currentGuess,
}: {
  guess?: Guess[];
  currentGuess?: string;
}) {
  if (guess) {
    return (
      <div className='row past'>
        {guess.map((l, i) => (
          <div key={i} className={l.color}>
            {l.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split('');

    return (
      <div className='row current'>
        {letters.map((letter: string, i: number) => (
          <div key={i} className='filled'>
            {letter}
          </div>
        ))}
        {[...Array(6 - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }

  return (
    <div className='row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
