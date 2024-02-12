// useQuote.js
import { useState, useEffect } from "react";
//import getQuote from "../utils/getQuotes";
import { MdAssignmentReturn } from "react-icons/md";
import {getRandom} from '@anilseervi/inspirational-quotes';
const getQuote = (limit: number) => {
  let words:string = "";
  useEffect(() => {
    const fetchWords = async () => {
        try {
            const response = await fetch(`https://api.quotable.io/random?minLength=${limit}`);
            console.log(response)
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const result = await response.json();
            
            words = result.content
        } catch (error) {
            console.error('Error al obtener las palabras:', error);
        }
    };

    fetchWords();
  }, []);
      return words;
}

const useQuote = (limit: number) => {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.quotable.io/random?minLength=${limit}`);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const result = await response.json();
        setQuote(result.content);
      } catch (error) {
        console.error('Error al obtener la cita:', error);
      }
    };

    fetchData();
  }, [limit]);

  useEffect(() => {
    console.log(quote); // Imprime el valor de quote cuando cambie
  }, [quote]);

  return { quote };
};

export default useQuote;