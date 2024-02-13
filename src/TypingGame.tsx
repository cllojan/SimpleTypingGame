import React from "react";

import RestartButton from "./Components/RestartButton";
import Results from "./Components/Results";
import UserTypings from "./Components/UserTypings";
import useEngine from "./hooks/useEngine";
import Word from "./Word";
import { calculateAccuracyPercentage } from "./utils/helpers";

const App = () => {
  const { words, typed, quote, timeLeft, errors, state, restart, totalTyped, stoppedTimeRef } =
    useEngine();


  console.log(stoppedTimeRef)
  return (
    <>

      <div className="bg-slate-900  max-w-screen-xl grid grid-cols-2 justify-center align-center ">
        <div className="flex gap-x-2 ">
          <button className="text-slate-100 text-2xl"type="button">Quote</button>
          <button className="text-slate-100 text-2xl"type="button">Words</button>
        </div>
        <div className="bg-slate-900 ">
          <button className="text-slate-100 text-2xl"type="button">Quote</button>
          <button className="text-slate-100 text-2xl"type="button">Words</button>
        </div>
      </div>
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <Word key={words} words={quote} />
        {/* User typed characters will be overlayed over the generated words */}
        <UserTypings
          className="absolute inset-0 text-wrap "
          words={quote}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={restart}
      />
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        stopTimeRef={stoppedTimeRef.current}
        total={totalTyped}
      />
    </>
  );
};


const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-4xl max-h-screen-xl leading-relaxed  mt-3 ">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

export default App;