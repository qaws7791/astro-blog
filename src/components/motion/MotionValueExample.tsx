import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MotionValueExample() {
  const x = useMotionValue(0);
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    ["#cee520", "#1fdf7f", "#1fdee8"]
  );

  return (
    <motion.div
      className="w-20 h-20"
      dragConstraints={{ left: -100, right: 100 }}
      drag="x"
      style={{ x, backgroundColor }}
    />
  );
}
