import { useCallback, useEffect, useRef, useState } from "react";

const useCountdown = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const hasTimerEnded = timeLeft <= 0;
  const isRunning = intervalRef.current != null;
  const stoppedTimeRef = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [setTimeLeft, hasTimerEnded, isRunning]);
  const stopCountdown = useCallback(() => {
    clearInterval(Number(intervalRef.current!));
    intervalRef.current = null;
    stoppedTimeRef.current = timeLeft;
  }, [timeLeft]);

  const resetCountdown = useCallback(() => {
    clearInterval(Number(intervalRef.current!));
    intervalRef.current = null;
    setTimeLeft(seconds);
  }, [seconds]);

  // when the countdown reaches 0, clear the countdown interval
  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(Number(intervalRef.current!));
      intervalRef.current = null;
    }
  }, [hasTimerEnded]);

  // clear interval when component unmounts
  useEffect(() => {
    return () => clearInterval(Number(intervalRef.current!));
  }, []);

  return { timeLeft, startCountdown, resetCountdown,stopCountdown,stoppedTimeRef };
};

export default useCountdown;