// useQuote.js
import { useState, useEffect } from "react";
//import getQuote from "../utils/getQuotes";
import { MdAssignmentReturn } from "react-icons/md";
import {getRandom} from '@anilseervi/inspirational-quotes';
const getQuote = (limit: number) => {
  
    return getRandom().quote;
}

const useQuote = (limit: number) => {
  const [quote, setQuote] = useState<string>(getQuote(limit));
    
  return { quote };
};

export default useQuote;