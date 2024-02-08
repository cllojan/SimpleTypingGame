import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";
import useCountdown from "./useCountdown";

const generateWords = (count: number) => {
  return faker.random.words(count).toLowerCase();
};

const useWords = (count: number) => {
  const [words, setWords] = useState<string>(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);
  console.log(words)
  return { words, updateWords };
};

export default useWords;