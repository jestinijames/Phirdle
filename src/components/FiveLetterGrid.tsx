/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// components
import FiveLetterRow from './FiveLetterRow';

export interface Guess {
  key: string;
  color: string;
}

export default function FiveLetterGrid({
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
              <FiveLetterRow
                key={i}
                currentGuess={currentGuess}
                guess={undefined}
              />
            );
          }
          return <FiveLetterRow key={i} guess={g} currentGuess={undefined} />;
        }
      )}
    </div>
  );
}
