import { motion } from "framer-motion";
export default function ScrollTriggeredAnimation() {
  return (
    <motion.div
      className="w-20 h-20 bg-green-500"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, type: "spring" }}
    />
  );
}
