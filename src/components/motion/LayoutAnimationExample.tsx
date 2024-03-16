import { motion } from "framer-motion";
import { useState } from "react";

export default function LayoutAnimationExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <motion.div
        className="w-20 h-20 text-center bg-blue-500 data-[open=true]:bg-red-500 data-[open=true]:w-32 data-[open=true]:h-32"
        data-open={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        No Layout
      </motion.div>
      <motion.div
        className="w-20 h-20 text-center bg-blue-500 data-[open=true]:bg-red-500 data-[open=true]:w-32 data-[open=true]:h-32"
        data-open={isOpen}
        layout
        onClick={() => setIsOpen(!isOpen)}
      >
        Layout
      </motion.div>
    </div>
  );
}
