'use client';
import * as React from 'react';

import FiveLetterWordle from '@/components/FiveLetterWordle';
import Header from '@/components/header';

const FiveLetterWord = ({ team }: { team: string }) => {
  const [solution, setSolution] = React.useState(null);

  React.useEffect(() => {
    const fetchRandomSolution = async () => {
      const solutions = await fetch('http://localhost:3002/solutions').then(
        (res) => res.json()
      );
      const storedSolutions = JSON.parse(
        localStorage.getItem('selectedSolutions') || '[]'
      );

      // Find a solution that is not in the storedSolutions array
      const availableSolutions = solutions.filter(
        (s: { word: string }) => !storedSolutions.includes(s.word)
      );

      if (availableSolutions.length === 0) {
        // All solutions are in the storedSolutions array, reset the array and try again
        localStorage.setItem('selectedSolutions', '[]');
        fetchRandomSolution();
        return;
      }

      // Randomly select a solution from the availableSolutions
      const randomSolution =
        availableSolutions[
          Math.floor(Math.random() * availableSolutions.length)
        ].word;

      // Add the selected solution to the storedSolutions array in local storage
      localStorage.setItem(
        'selectedSolutions',
        JSON.stringify([...storedSolutions, randomSolution])
      );

      // Set the solution in the component state
      setSolution(randomSolution);
    };

    // Fetch a random solution
    fetchRandomSolution();
  }, [setSolution]);

  return (
    <Header>
      <div className='rounded-lg border bg-[#f5f5f9} shadow-sm'>
        {solution && <FiveLetterWordle solution={solution} team={team} />}
      </div>
    </Header>
  );
};

export default FiveLetterWord;
