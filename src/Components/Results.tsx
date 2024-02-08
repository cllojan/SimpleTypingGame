import { motion }from "framer-motion";

const Results = ({    
    errors,
    accuracyPercentage,
    total, 
    className,
}:{
    errors:number;
    accuracyPercentage:number;
    total:number;
    className?:string
}) => {

    const initial = {opacity: 3};
    const animate = { opacity : 1};
    const duration = { opacity : 1};
  return (
    <motion.ul
        className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >

        <motion.li initial={initial} animate={animate} transition={{...duration, delay:0.5}}className="text-xl font-semibold">Results</motion.li>
        <motion.li initial={initial} animate={animate} transition={{...duration, delay:0.5}}>Accuaracy: {accuracyPercentage}</motion.li>
        <motion.li initial={initial} animate={animate} transition={{...duration, delay:0.5}}className="text-red-500">Errors: {errors}</motion.li>
        <motion.li initial={initial} animate={animate} transition={{...duration, delay:0.5}}>Typed: {total}</motion.li>

    </motion.ul>
  )
}

export default Results