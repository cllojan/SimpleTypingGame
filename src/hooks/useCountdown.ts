import { useCallback, useEffect, useRef, useState } from "react";

const useCountdown = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [startTime, setStartTime] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const hasTimerEnded = timeLeft <= 0;
  const isRunning = intervalRef.current != null;
  const stoppedTimeRef = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      setStartTime(Date.now());

      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        
      }, 1000);
    }
  }, [setTimeLeft, hasTimerEnded, isRunning]);
  const stopCountdown = useCallback(() => {
    clearInterval(Number(intervalRef.current!));
    intervalRef.current = null;
    stoppedTimeRef.current = timeLeft;
    if (startTime !== null) {
      // Calcular el tiempo total transcurrido hasta ahora
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - elapsedTime, 0));
    }
  }, [timeLeft]);

  const resetCountdown = useCallback(() => {
    clearInterval(Number(intervalRef.current!));
    intervalRef.current = null;
    setTimeLeft(seconds);
    setStartTime(null);
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

  return { timeLeft,startTime, startCountdown, resetCountdown,stopCountdown,stoppedTimeRef };
};

export default useCountdown;