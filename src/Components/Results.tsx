import { motion } from "framer-motion";
import { State } from "../hooks/useEngine";
import { formatPercentage } from "../utils/helpers";
import Chart from 'react-apexcharts';
import { useState } from "react";
const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
  stopTimeRef,
  className = "",
}: {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
  stopTimeRef:any;
  className?: string;
}) => {
  if (state !== "finish") {
    return null;
  }
  const [line, setLine] = useState({
    options: {
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 25, 50, 49, 21, 70, 51]
    }, {
      name: 'series-2',
      data: [23, 12, 54, 61, 32, 56, 81, 19]
    },{
      name: 'series-3',
      data: [10, 12, 35, 55, 69, 1, 20, 11]
    }],
  });
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <div className="mx-auto grid max-w-screen-4xl grid-cols-12 gap-4 p-1">
      <motion.ul
      initial={initial}
      animate={animate}
      
      className={`flex flex-col items-center text-primary-400 col-span-8 rounded-lg p-32 sm:col-span-8space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
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
    <div className="col-span-8 h-sm p-16 sm:col-span-4 text-9xl text-slate-50 text-center mt-24">S</div>
    <Chart className="footer col-span-12 rounded-lg  p-6" options={line.options} series={line.series} type="area" width={900} height={250} />     
    </div>
   
  );
};

export default Results;