/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import SixLetterRow from '@/components/SixLetterRow';

export interface Guess {
  key: string;
  color: string;
}

export default function SixLetterGrid({
  guesses,
  currentGuess,
  turn,
}: {
  guesses: any;
  currentGuess: string;
  turn: number;
}) {
  return (
    <div>
      {guesses.map(
        (g: Guess[] | undefined, i: React.Key | null | undefined) => {
          if (turn === i) {
            return (
              <SixLetterRow
                key={i}
                currentGuess={currentGuess}
                guess={undefined}
              />
            );
          }
          return <SixLetterRow key={i} guess={g} currentGuess={undefined} />;
        }
      )}
    </div>
  );
}
