import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  onHover: {
    scale: 1.2,
  },
  base: {
    scale: 1,
  },
};
export default function VariantsExample() {
  return (
    <motion.div
      className="w-20 h-20 rounded-full bg-green-500"
      initial="base"
      whileHover="onHover"
      variants={variants}
    />
  );
}
