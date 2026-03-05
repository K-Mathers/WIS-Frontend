import { motion, type Variants } from "framer-motion";
import { fadeInUp } from "./index";

interface IMotionWrapper {
  children: React.ReactNode;
  width?: string;
}

const MotionWrapper = ({ children, width = "100%" }: IMotionWrapper) => {
  return (
    <motion.div
      variants={fadeInUp as Variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
