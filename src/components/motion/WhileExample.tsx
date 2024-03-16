import { motion } from "framer-motion";
export default function WhileExample() {
  return (
    <motion.button
      className="w-20 h-20 bg-green-500"
      drag
      initial={{ rotate: 90 }}
      whileDrag={{ scale: 1.2 }}
      whileFocus={{ scale: 1.2 }}
      whileHover={{ borderRadius: "100%" }}
      whileTap={{ scale: 0.8 }}
      whileInView={{ rotate: 0 }}
    >
      버튼
    </motion.button>
  );
}
