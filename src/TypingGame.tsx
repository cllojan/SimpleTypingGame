// TypingGame.js
import { useState, useEffect } from 'react';
import Word from './Word';
import RestartButton from "./Components/RestartButton"
import { faker } from "@faker-js/faker";
const TheWords = faker.random.words(10);
const TypingGame = () => {
  console.log(TheWords)
  const words = [TheWords];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e:any) => {
      if (e.key === 'Enter') {
        checkInput();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputValue]);

  const checkInput = () => {
    const currentWord = words[currentWordIndex];
    if (inputValue.trim().toLowerCase() === currentWord) {
      setScore(score + 1);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>Typing Game</h1>
      <p>Score: {score}</p>
      <CountDownTimer timeLeft={30}/>
      <div>
        {words.map((word, index) => (
          <Word
            key={index}
            value={word}
            current={index === currentWordIndex}
            onRemove={() => {}}
          />
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default TypingGame;


const CountDownTimer = ({timeLeft}: {timeLeft:number}) => {

  return (
    <div>
      <h2 className="text-primary-400 font-medium">
      Time: {timeLeft}
      
    </h2>
    <RestartButton className={"mx-auto mt-10 text-slate-500"} onRestart={() => null}/>
    </div>
  )

}