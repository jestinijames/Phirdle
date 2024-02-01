import { useState } from 'react';
import { toast } from 'react-toastify';

import { VALID_SIX_LETTER_GUESSES } from '../constant/validSixLetterGuesses';

const useSixLetterWordle = (solution) => {
  const [turn, setTurn] = useState(0); //Number of turns each team has
  const [currentGuess, setCurrentGuess] = useState('');
  // const [currentTeam, setCurrentTeam] = useState('');
  const [totalScore, setTotalScore] = useState(300);
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'grey', b: 'green', c: 'yellow'} etc

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: 'grey' };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    // If current guess is not the solution, subtract 20 from total score
    if (currentGuess !== solution) {
      setTotalScore((prevTotalScore) => {
        return prevTotalScore - 20;
      });
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === 'green') {
          prevUsedKeys[l.key] = 'green';
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[l.key] = 'yellow';
          return;
        }
        if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
          prevUsedKeys[l.key] = 'grey';
          return;
        }
      });

      return prevUsedKeys;
    });
    setCurrentGuess('');
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        //console.log('you used all your guesses!');
        toast.error('you used all your guesses!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setTotalScore(0);

        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        //console.log('you already tried that word.');
        toast.error('you already tried that word', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return;
      }
      // check word is 6 chars
      if (currentGuess.length !== 6) {
        // console.log('word must be 6 chars.');
        toast.error('word must be 6 chars.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return;
      }

      // Check if word is included within our valid guesses
      if (!VALID_SIX_LETTER_GUESSES.includes(currentGuess.toUpperCase())) {
        //console.log(currentGuess);
        // console.log('word must be 6 chars.');
        toast.error('word must be a valid word.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 6) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    totalScore,
    handleKeyup,
  };
};

export default useSixLetterWordle;
