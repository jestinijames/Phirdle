import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Modal } from '@/components/Util';

export function Timer({
  start,
  setStart,
  isCorrect,
  solution,
  turn,
  totalScore,
  team,
}: {
  start: boolean;
  setStart: (start: boolean) => void;
  isCorrect: boolean;
  solution: string;
  turn: number;
  totalScore: number;
  team: string;
}) {
  const [open, setOpen] = useState(false);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setOpen(true); // Open the modal when time is up
      return <div className='timer'>Time's up...</div>;
    }

    return (
      <div className='flex flex-col items-center'>
        <div className='text'>Remaining</div>
        <div className='value text-2xl font-extrabold'>{remainingTime}</div>
        <div className='text'>seconds</div>
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-col items-center absolute top-[20%] left-[70%]'>
        <CountdownCircleTimer
          isPlaying={start}
          duration={60}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
        <button
          className='bg-sky-500/100 hover:bg-sky-500/50 text-white px-4 py-2 rounded-md mt-4'
          type='button'
          onClick={() => {
            setStart(!start);
          }}
        >
          {start ? 'Pause' : 'Start'}
        </button>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        isCorrect={isCorrect}
        turn={turn}
        solution={solution}
        totalScore={totalScore}
        team={team}
      />
    </>
  );
}
