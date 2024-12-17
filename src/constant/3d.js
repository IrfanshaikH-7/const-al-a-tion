import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';

const Constellation3D = () => {
  const controlsRef = useRef();
  
  const handleWheel = (event) => {
    event.stopPropagation();
    
    if (controlsRef.current) {
      const distance = controlsRef.current.getDistance();
      controlsRef.current.update();
      
      if (event.deltaY > 0 && distance >= 4) {
        const nextSection = event.target.closest('section').nextElementSibling;
        nextSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (event.deltaY < 0 && distance <= 2) {
        const prevSection = event.target.closest('section').previousElementSibling;
        prevSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div onWheel={handleWheel}>
      <Canvas style={{ height: '100vh' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars 
          radius={100}
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
        />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          minDistance={2}
          maxDistance={4}
          zoomSpeed={0.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableDamping={false}
          dampingFactor={0}
          rotateSpeed={0.5}
          mouseButtons={{
            LEFT: 1,
            MIDDLE: 0,
            RIGHT: 0
          }}
          touches={{
            ONE: 1,
            TWO: 0
          }}
          enablePan={false}
          enableRotate={true}
          enableZoomDamping={false}
          screenSpacePanning={false}
          autoRotate={false}
        />
        <motion.mesh
          animate={{
            rotateY: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="white" wireframe />
        </motion.mesh>
      </Canvas>
    </div>
  );
};





import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRef, useState } from 'react';

const Constellation3D2 = () => {
  const controlsRef = useRef();
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    { 
      title: "Discover the Cosmos", 
      content: "Begin your journey through space"
    },
    { 
      title: "Navigate the Stars", 
      content: "Explore celestial patterns"
    },
    { 
      title: "Ancient Wisdom", 
      content: "Learn from the night sky"
    },
    { 
      title: "Future Horizons", 
      content: "Look beyond what's known"
    }
  ];

  const handleWheel = (event) => {
    event.stopPropagation();
    
    if (controlsRef.current) {
      const distance = controlsRef.current.getDistance();
      controlsRef.current.update();
      
      // Calculate current section based on zoom level
      const progress = (distance - 2) / 2; // 0 to 1
      const newSection = Math.floor(progress * 4);
      if (newSection !== currentSection && newSection >= 0 && newSection < 4) {
        setCurrentSection(newSection);
      }

      if (event.deltaY > 0 && distance >= 4) {
        const nextSection = event.target.closest('section').nextElementSibling;
        nextSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (event.deltaY < 0 && distance <= 2) {
        const prevSection = event.target.closest('section').previousElementSibling;
        prevSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div onWheel={handleWheel} className="relative">
      {/* Section Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={currentSection}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">{sections[currentSection].title}</h2>
          <p className="text-xl text-gray-300">{sections[currentSection].content}</p>
        </motion.div>
      </div>

      <Canvas style={{ height: '100vh' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars 
          radius={100}
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
        />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          minDistance={2}
          maxDistance={4}
          zoomSpeed={0.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableDamping={false}
          dampingFactor={0}
          rotateSpeed={0.5}
          mouseButtons={{
            LEFT: 1,
            MIDDLE: 0,
            RIGHT: 0
          }}
          touches={{
            ONE: 1,
            TWO: 0
          }}
          enablePan={false}
          enableRotate={true}
          enableZoomDamping={false}
          screenSpacePanning={false}
          autoRotate={false}
        />
        <motion.mesh
          animate={{
            rotateY: 360,
            x: -2 + (currentSection * 1.33), // Move left to right based on section
          }}
          transition={{
            rotateY: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            },
            x: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="white" wireframe />
        </motion.mesh>
      </Canvas>
    </div>
  );
};






import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRef, useState } from 'react';

const Constellation3D3 = () => {
  const controlsRef = useRef();
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    { 
      title: "Discover the Cosmos", 
      content: "Begin your journey through space"
    },
    { 
      title: "Navigate the Stars", 
      content: "Explore celestial patterns"
    },
    { 
      title: "Ancient Wisdom", 
      content: "Learn from the night sky"
    },
    { 
      title: "Future Horizons", 
      content: "Look beyond what's known"
    }
  ];

  const handleWheel = (event) => {
    event.stopPropagation();
    
    if (controlsRef.current) {
      const distance = controlsRef.current.getDistance();
      controlsRef.current.update();
      
      // More sensitive section changes
      const progress = (distance - 2) / 2 * 1; // Keeping this the same
      const newSection = Math.floor(progress * 4);
      if (newSection !== currentSection && newSection >= 0 && newSection < 4) {
        setCurrentSection(newSection);
      }

      // More conservative thresholds for section transitions
      if (event.deltaY > 0 && distance >= 3.95) { // Changed from 3.8 to 3.95
        const nextSection = event.target.closest('section').nextElementSibling;
        nextSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (event.deltaY < 0 && distance <= 2.05) { // Changed from 2.2 to 2.05
        const prevSection = event.target.closest('section').previousElementSibling;
        prevSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div onWheel={handleWheel} className="relative">
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={currentSection}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">{sections[currentSection].title}</h2>
          <p className="text-xl text-gray-300">{sections[currentSection].content}</p>
        </motion.div>
      </div>

      <Canvas style={{ height: '100vh' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars 
          radius={100}
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
        />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          minDistance={2}
          maxDistance={4}
          zoomSpeed={0.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableDamping={false}
          dampingFactor={0}
          rotateSpeed={0.5}
          mouseButtons={{
            LEFT: 1,
            MIDDLE: 0,
            RIGHT: 0
          }}
          touches={{
            ONE: 1,
            TWO: 0
          }}
          enablePan={false}
          enableRotate={true}
          enableZoomDamping={false}
          screenSpacePanning={false}
          autoRotate={false}
        />
        <motion.mesh
          animate={{
            rotateY: 360,
            x: -2 + (currentSection * 1.33),
          }}
          transition={{
            rotateY: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            },
            x: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="white" wireframe />
        </motion.mesh>
      </Canvas>
    </div>
  );
};



import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRef, useState } from 'react';

const Constellation3D4 = () => {
  const controlsRef = useRef();
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(Date.now());
  
  const sections = [
    { 
      title: "Discover the Cosmos", 
      content: "Begin your journey through space"
    },
    { 
      title: "Navigate the Stars", 
      content: "Explore celestial patterns"
    },
    { 
      title: "Ancient Wisdom", 
      content: "Learn from the night sky"
    },
    { 
      title: "Future Horizons", 
      content: "Look beyond what's known"
    }
  ];

  const handleWheel = (event) => {
    event.stopPropagation();
    const now = Date.now();
    
    // Prevent rapid scrolling
    if (now - lastScrollTime.current < 100) return;
    lastScrollTime.current = now;

    if (controlsRef.current && !isScrolling) {
      setIsScrolling(true);
      const distance = controlsRef.current.getDistance();
      
      // Determine scroll direction
      const scrollingDown = event.deltaY > 0;
      
      // Handle scroll
      if (scrollingDown && currentSection < 3) {
        controlsRef.current.dollyOut(1.05);
        setCurrentSection(prev => Math.min(prev + 1, 3));
      } else if (!scrollingDown && currentSection > 0) {
        controlsRef.current.dollyIn(1.05);
        setCurrentSection(prev => Math.max(prev - 1, 0));
      }

      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  };

  return (
    <div onWheel={handleWheel} className="relative">
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={currentSection}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">{sections[currentSection].title}</h2>
          <p className="text-xl text-gray-300">{sections[currentSection].content}</p>
        </motion.div>
      </div>

      <Canvas style={{ height: '100vh' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars 
          radius={100}
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
        />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true}
          minDistance={2}
          maxDistance={4}
          zoomSpeed={0.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableDamping={false}
          dampingFactor={0}
          rotateSpeed={0.5}
          mouseButtons={{
            LEFT: 1,
            MIDDLE: 0,
            RIGHT: 0
          }}
          touches={{
            ONE: 1,
            TWO: 0
          }}
          enablePan={false}
          enableRotate={true}
          enableZoomDamping={false}
          screenSpacePanning={false}
          autoRotate={false}
        />
        <motion.mesh
          animate={{
            rotateY: 360,
            x: -6 + (currentSection * 1.33),
          }}
          initial={{
            x: -6,
            rotateY: 0
          }}
          transition={{
            rotateY: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            },
            x: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="white" wireframe />
        </motion.mesh>
      </Canvas>
    </div>
  );
};

export default Constellation3D4;



