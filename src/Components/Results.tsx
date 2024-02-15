import { motion } from "framer-motion";
import { State } from "../hooks/useEngine";
import { formatPercentage } from "../utils/helpers";
import Chart from 'react-apexcharts';
import { useState } from "react";
const Results = ({
  state,
  errors,
  accuracyPercentage,
  wpm,
  total,
  stopTimeRef,
  className = "",
}: {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
  wpm:number,
  stopTimeRef:any;
  className?: string;
}) => {
  if (state !== "finish") {
    return null;
  }
 
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (    
      <motion.ul
      initial={initial}
      animate={animate}
      
      className={`flex flex-row gap-10 justify-center items-center text-primary-400  rounded-lg text-base ${className}`}
    >            
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
        
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}        
      >
        Wpm: {wpm.toFixed()}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
        
      >
        Time: {stopTimeRef}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}        
      >
        Typed: {total}
      </motion.li>
      
    </motion.ul>
        
   
  );
};

export default Results;