import { useCallback, useState} from "react";
import getQuote from "../utils/getQuotes";
const useQuote = (limit: number) => {
    let quote = getQuote(limit);     
    const updateQuote = useCallback(() => {
      quote = getQuote(limit);
    },[limit])
    
    return {quote,  updateQuote }
  } 

export default useQuote;