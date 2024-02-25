import { motion } from 'framer-motion'

export default function Circle() {
  return (
    <motion.div
      className='w-20 h-20 rounded-full bg-green-500'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  )
}
