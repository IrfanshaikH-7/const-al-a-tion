import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Constellation3D() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const constellationRef = useRef(null);
  const geometryRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create different constellation patterns
    const createConstellationPatterns = () => {
      const patterns = {
        pattern1: () => {
          const geometry = new THREE.BufferGeometry();
          const vertices = [];
          for (let i = 0; i < 1000; i++) {
            vertices.push(
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            );
          }
          return vertices;
        },
        pattern2: () => {
          const vertices = [];
          const radius = 5;
          for (let i = 0; i < 1000; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            vertices.push(
              radius * Math.sin(phi) * Math.cos(theta),
              radius * Math.sin(phi) * Math.sin(theta),
              radius * Math.cos(phi)
            );
          }
          return vertices;
        },
        pattern3: () => {
          const vertices = [];
          for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 10;
            vertices.push(
              x,
              Math.sin(x) * 5,
              Math.cos(x) * 5
            );
          }
          return vertices;
        },
        pattern4: () => {
          const vertices = [];
          for (let i = 0; i < 1000; i++) {
            const angle = (i / 1000) * Math.PI * 20;
            const radius = (i / 1000) * 5;
            vertices.push(
              Math.cos(angle) * radius,
              (Math.random() - 0.5) * 2,
              Math.sin(angle) * radius
            );
          }
          return vertices;
        }
      };

      return patterns;
    };

    const patterns = createConstellationPatterns();
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
    });

    geometryRef.current = geometry;
    materialRef.current = material;

    const constellation = new THREE.Points(geometry, material);
    constellationRef.current = constellation;
    scene.add(constellation);

    // Update constellation pattern based on scroll position
    const updateConstellation = (index) => {
      const patternFuncs = [
        patterns.pattern1,
        patterns.pattern2,
        patterns.pattern3,
        patterns.pattern4
      ];
      
      const vertices = patternFuncs[index]();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      geometry.attributes.position.needsUpdate = true;
    };

    // Update scroll animations to use the inner container
    const scrollContainer = document.querySelector('.constellation-scroll-container');
    
    // Initial pattern
    updateConstellation(0);

    // Scroll animations for patterns and camera
    const sections = document.querySelectorAll('.constellation-subsection');
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scroller: '.constellation-scroll-container', // Specify the scroll container
        onEnter: () => updateConstellation(index),
        onEnterBack: () => updateConstellation(index),
      });
    });

    // Camera animations based on inner scroll
    gsap.to(camera.position, {
      scrollTrigger: {
        trigger: '.constellation-scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scroller: '.constellation-scroll-container', // Specify the scroll container
        scrub: 1,
        onUpdate: (self) => {
          if (constellationRef.current) {
            // Rotate model based on scroll progress
            constellationRef.current.rotation.y = self.progress * Math.PI * 4;
            constellationRef.current.rotation.x = self.progress * Math.PI * 2;
            
            // Move camera in a circular path
            camera.position.x = Math.sin(self.progress * Math.PI * 2) * 3;
            camera.position.z = 5 + Math.cos(self.progress * Math.PI * 2) * 3;
            camera.position.y = Math.sin(self.progress * Math.PI) * 2;
            
            // Make camera look at center
            camera.lookAt(0, 0, 0);
          }
        },
      },
      duration: 2,
    });

    // Update the animation function for smoother constant rotation
    const animate = () => {
      requestAnimationFrame(animate);
      if (constellationRef.current) {
        // Add subtle constant rotation
        constellationRef.current.rotation.x += 0.001;
        constellationRef.current.rotation.y += 0.001;
        
        // Add gentle floating motion
        constellationRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      // Cleanup with proper refs
      if (constellationRef.current) {
        scene.remove(constellationRef.current);
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="relative snap-y snap-mandatory h-screen overflow-y-auto">
      {/* First Section */}
      <section className="h-screen flex items-center justify-center bg-black snap-start snap-always">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-white"
        >
          Welcome to the Constellation
        </motion.h1>
      </section>

      {/* Constellation Section with Subsections */}
      <div className="constellation-wrapper snap-start snap-always">
        <div className="constellation-section sticky top-0 h-screen overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
          
          {/* Scrollable subsections container */}
          <div className="constellation-scroll-container relative h-screen overflow-y-auto snap-y snap-mandatory">
            {[
              { title: "Stellar Birth", desc: "Witness the formation of new stars" },
              { title: "Cosmic Dance", desc: "Experience the orbital harmony" },
              { title: "Galactic Waves", desc: "Ride the waves of stardust" },
              { title: "Universal Spiral", desc: "Follow the cosmic spiral" }
            ].map((section, index) => (
              <div 
                key={index}
                className="constellation-subsection h-screen snap-start snap-always flex items-center justify-center"
              >
                <motion.div 
                  className="text-white text-center max-w-md p-6 bg-black/50 rounded-lg backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: false }}
                >
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <p>{section.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Section */}
      <section className="h-screen flex items-center justify-center bg-black snap-start snap-always">
        <motion.div 
          className="text-white text-center max-w-md"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Journey Complete</h2>
          <p>Thank you for exploring the constellation with us.</p>
        </motion.div>
      </section>
    </div>
  );
}
