'use client';
import * as React from 'react';

import Header from '@/components/header';

export default function HomePage() {
  //const [solution, setSolution] = React.useState(null);
  //  const [sixLetterSolution, setSixLetterSolution] = React.useState(null);

  // React.useEffect(() => {
  //   fetch('http://localhost:3002/solutions')
  //     .then((res) => res.json())
  //     .then((json) => {
  //       // random int between 0 & json.length
  //       const randomSolution = json[Math.floor(Math.random() * json.length)];
  //       setSolution(randomSolution.word);
  //     });
  // }, [setSolution]);

  // React.useEffect(() => {
  //   fetch('http://localhost:3002/sixLetterWords')
  //     .then((res) => res.json())
  //     .then((json) => {
  //       // random int between 0 & json.length
  //       const randomsixLetterSolution =
  //         json[Math.floor(Math.random() * json.length)];
  //       setSolution(randomsixLetterSolution.word);
  //     });
  // }, [setSolution]);

  // console.log(solution);

  return (
    <Header>
      <aside className='flex flex-col justify-center bg-foreground p-8 text-root xl:p-12'>
        <h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-2'>
          Welcome to Phirdle Wars! (Philippians + Wordle)
        </h1>

        <h2 className='scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors'>
          Rules
        </h2>
        <p className='leading-6 pb-2'>
          Phirdle is a word game that involves figuring out a secret five-letter
          (or more letter) word. You play by guessing different words to see how
          close they are to the secret word. When you submit a guess, the game
          will tell you how close your guess is by color-coding each letter in
          your guess.
        </p>
        <p className='leading-6 pb-2'>1. Each guess must be a valid word.</p>
        <p className='leading-6 pb-2'>
          2. The color of a tile will change to show you how close your guess
          was.
        </p>
        <p className='leading-6 pb-2'>
          3. If the tile turns{' '}
          <span className='bg-green-500 p-1 text-white border-green-500'>
            green
          </span>
          , the letter is in the word, and it is in the correct spot.
        </p>
        <p className='leading-6 pb-2'>
          4. If the tile turns{' '}
          <span className='bg-yellow-500 p-1 text-white border-yellow-500'>
            yellow
          </span>
          , the letter is in the word, but it is not in the correct spot.
        </p>
        <p className='leading-6 pb-2'>
          5. If the tile turns{' '}
          <span className='bg-gray-500 p-1 text-white border-gray-600'>
            gray
          </span>
          , the letter is not in the word.
        </p>
        <p className='leading-6 pb-2'>6. You cannot use non-sensical words.</p>
        <p className='leading-6 pb-2'>
          7. Each team will get a chance to guess upto 3 words in the game.
        </p>
        <p className='leading-6 pb-2'>
          8. Each word will have upto 6 turns to guess the right word.
        </p>
        <p className='leading-6 pb-2'>
          9. Each word will have a time limit of 1 minute.
        </p>
        <p className='leading-6 pb-2'>
          10. Each wrong attempt reduces 20 points from a total of 300 points.
        </p>
      </aside>
    </Header>
  );
}
