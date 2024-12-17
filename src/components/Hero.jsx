import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="h-screen flex items-center justify-center text-center"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-6xl font-bold mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Explore the Constellations
        </motion.h1>
        <p className="text-xl text-gray-300">
          Journey through the celestial patterns that have guided humanity for millennia
        </p>
      </div>
    </motion.div>
  );
};

export default Hero;
