import { DialogClose } from '@radix-ui/react-dialog';
import React from 'react';

import { Button } from '@/components/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog';

export function Modal({
  open,
  setOpen,
  isCorrect,
  solution,
  turn,
  totalScore,
  team,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isCorrect: boolean;
  solution: string;
  turn: number;
  totalScore: number;
  team: string;
}) {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className='flex items-center gap-2'>
              <DialogTitle>
                <span
                  className={`${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  } rounded-lg
              } text-white p-3`}
                >
                  {isCorrect ? 'CORRECT' : 'WRONG'}
                </span>
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className='flex flex-col gap-2'>
            <h3 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl pb-2'>
              THE WORD IS :{' '}
              <span className='text-fuchsia-500'>{solution.toUpperCase()}</span>
            </h3>

            <p className='leading-6 font-semibold'>
              {isCorrect
                ? `You found the solution in ${turn} guesses.`
                : 'Sorry! you guessed wrong.'}

              {isCorrect
                ? `Your score is ${totalScore}`
                : ' All the best for next time!'}
            </p>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ring-offset-background active:translate-y-px bg-indigo-500 !text-white  hover:bg-primary/90 h-10 py-2 px-4 col-span-1 gap-2 space-y-2'
                onClick={() => {
                  isCorrect
                    ? updateScore(team, totalScore)
                    : updateScore(team, 0);

                  setOpen(false);
                  window.location.reload();
                }}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function updateScore(team: string, score: number) {
  // Fetch existing team scores from local storage
  const existingTeamScoresString = localStorage.getItem('teamScores');
  const existingTeamScores: { [key: string]: number } = existingTeamScoresString
    ? JSON.parse(existingTeamScoresString)
    : {};

  // Update the score for the specified team
  existingTeamScores[team] = (existingTeamScores[team] || 0) + score;

  // Save the updated scores back to local storage
  localStorage.setItem('teamScores', JSON.stringify(existingTeamScores));
}

export function manualUpdateScore(team: string, score: number) {
  const existingTeamScoresString = localStorage.getItem('teamScores');
  const existingTeamScores: { [key: string]: number } = existingTeamScoresString
    ? JSON.parse(existingTeamScoresString)
    : {};

  // Update the score for the specified team
  existingTeamScores[team] = score;

  // Save the updated scores back to local storage
  localStorage.setItem('teamScores', JSON.stringify(existingTeamScores));
}
