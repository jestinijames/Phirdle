import React, { useEffect, useState } from 'react';

interface Letter {
  key: string;
  // Add other properties if needed
}

export default function Keypad({
  usedKeys,
}: {
  usedKeys: { [key: string]: string }; //{a: 'grey', b: 'green', c: 'yellow'}
}) {
  const [letters, setLetters] = useState<Letter[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3002/letters')
      .then((res) => res.json())
      .then((json: Letter[]) => {
        setLetters(json);
      });
  }, []);

  return (
    <div className='keypad'>
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
