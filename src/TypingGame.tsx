import React from "react";

import RestartButton from "./Components/RestartButton";
import Results from "./Components/Results";
import UserTypings from "./Components/UserTypings";
import useEngine from "./hooks/useEngine";
import Word from "./Word";
import { calculateAccuracyPercentage } from "./utils/helpers";
import { calculateWPM } from "./utils/helpers";
const App = () => {
  const { words, typed, quote, timeLeft, errors, state, restart, totalTyped, stoppedTimeRef,startTime } =
    useEngine();


  console.log(stoppedTimeRef)
  return (
    <>
      
          <div className="bg-slate-900  max-w-screen-xl pl-10 pr-10 pt-5 pb-5 rounded-md shadow-md grid grid-cols-3 justify-center align-center ">
            <div className="flex gap-x-2 ">
              <button className="text-slate-100 text-sm" type="button">Quote</button>
              <button className="text-slate-100 text-sm" type="button">Words</button>
            </div>
            <div className="bg-slate-900 flex gap-x-4">
              <button className="text-slate-100 text-sm " type="button">short</button>
              <button className="text-slate-100 text-sm " type="button">medium</button>
              <button className="text-slate-100 text-sm " type="button">long</button>
              <button className="text-slate-100 text-sm " type="button">thicc</button>
            </div>
            <div className="bg-slate-900 flex gap-x-4">
              <button className="text-slate-100 text-sm " type="button">short</button>
              <button className="text-slate-100 text-sm " type="button">medium</button>
              <button className="text-slate-100 text-sm " type="button">long</button>
              <button className="text-slate-100 text-sm " type="button">thicc</button>
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
      
            <Results
              className="mt-10"
              state={state}
              errors={errors}
              wpm={calculateWPM(totalTyped,startTime as number)}
              accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
              stopTimeRef={stoppedTimeRef.current}
              total={totalTyped}
            />
            <RestartButton
              className={"mx-auto mt-10 text-slate-500"}
              onRestart={restart}
            />
          
    </>
  );
};


const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-4xl  leading-relaxed  mt-3 ">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

export default App;