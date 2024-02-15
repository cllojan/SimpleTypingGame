import { useCallback, useEffect, useState } from "react";
import { countErrors, debug } from "../utils/helpers";
import useCountdown from "./useCountdown";
import useTypings from "./useTypings";
import  useWords  from "./useWords";
import useQuote  from "./useQuote";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 50;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { timeLeft,startTime, startCountdown, resetCountdown,stopCountdown,stoppedTimeRef } =
    useCountdown(COUNTDOWN_SECONDS);
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  
  const {quote} = useQuote(100);  
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
    state !== "finish"
  );
  
  const [errors, setErrors] = useState(0);
  const isStarting = state === "start" && cursor > 0;
  // logic finish
  let areWordsFinished =cursor>0 && cursor === quote.length;
  
  const restart = useCallback(() => {
    debug("restarting...");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  const sumErrors = useCallback(() => {
    debug(`cursor: ${cursor} - quote.length: ${quote.length}`);
    const wordsReached = quote.substring(0, Math.min(cursor, quote.length));
    console.log(wordsReached)
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, quote, cursor]);

  // as soon the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // when the time is up, we've finished
 
  useEffect(() => {
    if (!timeLeft && state === "run") {
      debug("time is up...");
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, state, sumErrors]);

  /**
   * when the current words are all filled up,
   * we generate and show another set of words
*/   
  useEffect(() => {
    
    if (areWordsFinished ) {
      
      debug("words are finished...");
      sumErrors();
      setState("finish");
      stopCountdown()
      clearTyped();
    }
  }, [clearTyped, words, updateWords,stopCountdown, sumErrors]);

  return { state, words, quote,typed, errors, restart, timeLeft, totalTyped,stoppedTimeRef,startTime };
};

export default useEngine;