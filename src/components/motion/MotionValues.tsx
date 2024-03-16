import { motion, useMotionValue, useTransform } from "framer-motion";
export default function MotionValues() {
  const x = useMotionValue(0);
  const backgroundColor = useTransform(
    x,
    [-200, 0, 200],
    ["#ff0000", "#00ff00", "#0000ff"]
  );

  return (
    <motion.div
      className="w-20 h-20 bg-green-500"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, backgroundColor }}
    />
  );
}
