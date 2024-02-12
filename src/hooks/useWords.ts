import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";


const generateWords = (length: number) => {
  return faker.word.words({count:{min:length,max:length}});
};

const useWords = (length: number) => {
  const [words, setWords] = useState<string>(generateWords(length));

  const updateWords = useCallback(() => {
    setWords(generateWords(length));
  }, [length]);
  
  return { words, updateWords };
};

export default useWords;