// ...
'use client';

import Link from 'next/link';

import { Button } from '@/components/buttons/Button';
import { manualUpdateScore } from '@/components/Util';

// Define a function to update the score for a specific team
const updateScoreManually = (team: any, newScore: any) => {
  const parsedScore = parseInt(newScore, 10);
  if (!isNaN(parsedScore)) {
    manualUpdateScore(team, parsedScore);
    window.location.reload();
  } else {
    // Handle invalid input (non-numeric)
    console.error(`Invalid input for team ${team}: ${newScore}`);
  }
};

export default function Manual() {
  // Fetch the current teams and their scores from local storage
  const storedScoresString = localStorage.getItem('teamScores');
  const storedScores = storedScoresString ? JSON.parse(storedScoresString) : {};

  // useEffect(() => {
  //   const storedScoresString = localStorage.getItem('teamScores');
  //   const storedScores = storedScoresString
  //     ? JSON.parse(storedScoresString)
  //     : {};

  //   // Now you can use storedScores in your component
  // }, []);

  return (
    //<Header>
    <article className='flex min-h-screen flex-col'>
      <main className='break-word flex-1 overflow-auto bg-background px-6 py-4 md:ml-16'>
        <article className='w-full flex-1 bg-background'>
          <section
            className='mb-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-center'
            role='presentation'
          >
            <Link href='/'>
              <div className='mb-2 flex flex-col'>
                <h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>
                  Phirdle
                </h1>
              </div>
            </Link>
          </section>
          <div
            data-orientation='horizontal'
            role='none'
            className='shrink-0 bg-muted h-[1px] w-full mb-2'
          />
          <section>
            <div className='mb-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <div className='flex flex-col'>
                <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight transition-colors'>
                  Scoreboard
                </h2>

                <Button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  variant='destructive'
                  type='button'
                >
                  Clear Scores
                </Button>
              </div>
            </div>

            <section className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
              {Object.entries(storedScores).map(([team, score]) => (
                <div
                  key={team}
                  className='rounded-lg border bg-[#e4f7f2] text-[#1a1f2b] shadow-sm cursor-pointer  hover:border-[#c86555] hover:bg-[#fbecd9]'
                >
                  <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                    <h3 className='tracking-tight text-md font-medium'>
                      {team}
                    </h3>
                    {/* Button to manually update score */}
                  </div>
                  <div className='p-6 pt-0'>
                    <div className='text-2xl font-bold text-destructive-foreground'>
                      {String(score)}
                    </div>
                    <p className='text-xs text-muted-foreground'>Points</p>
                  </div>
                  <div className='flex justify-center items-center mb-2'>
                    <button
                      onClick={() => {
                        const newScore = prompt(
                          `Enter new score for ${team}:`,
                          String(score)
                        );
                        if (newScore !== null) {
                          updateScoreManually(team, newScore);
                        }
                      }}
                      className='px-3 py-1 bg-blue-500 text-white rounded-md'
                    >
                      Update Score
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </section>
        </article>
      </main>
    </article>
  );
}
