import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@/components/buttons/Button';

export default function Header({ children }: { children: React.ReactNode }) {
  // Initialize state with scores from local storage or set default values
  const storedScoresString = localStorage.getItem('teamScores');
  let storedScores: Record<string, number>;

  if (storedScoresString) {
    storedScores = JSON.parse(storedScoresString);
  } else {
    storedScores = {
      Commendable: 0,
      Purity: 0,
      Honourable: 0,
      Excellence: 0,
      Truthful: 0,
      Praiseworthy: 0,
    };

    // Save the initial scores to local storage
    localStorage.setItem('teamScores', JSON.stringify(storedScores));
  }

  const pathname = usePathname();

  const priority = [
    'Commendable',
    'Purity',
    'Honourable',
    'Excellence',
    'Truthful',
    'Praiseworthy',
  ];

  const sortedScores = Object.entries(storedScores).sort(([teamA], [teamB]) => {
    const indexA = priority.indexOf(teamA);
    const indexB = priority.indexOf(teamB);
    return indexA - indexB;
  });

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
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
                  <div className='flex flex-row items-center justify-center'>
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
                    <Link href='/manual'>
                      <Button className='bg-blue-500' type='button'>
                        Break it
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <section className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                {sortedScores.map(([team, score]) => (
                  // Team Commendable needs to come first

                  <Link key={team} href={`${team.toLowerCase()}/`}>
                    <div
                      className={`rounded-lg border bg-[#e4f7f2] text-[#1a1f2b] shadow-sm cursor-pointer ${
                        pathname === `/${team.toLowerCase()}`
                          ? 'border-[#6b4d49] bg-[#fbecd9]'
                          : ''
                      } hover:border-[#c86555] hover:bg-[#fbecd9]`}
                    >
                      <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                        <h3 className='tracking-tight text-md font-medium'>
                          {team}
                        </h3>
                      </div>
                      <div className='p-6 pt-0'>
                        <div className='text-2xl font-bold text-destructive-foreground'>
                          {score}
                        </div>
                        <p className='text-xs text-muted-foreground'>Points</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </section>
              {children}
            </section>
          </article>
        </main>
      </article>
    </>
  );
}
