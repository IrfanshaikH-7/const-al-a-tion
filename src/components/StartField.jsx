import { useEffect } from 'react';

const StarField = () => {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star fixed';
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.position = 'fixed';
      document.body.appendChild(star);
      
      setTimeout(() => {
        star.remove();
      }, 5000);
    };

    const interval = setInterval(() => {
      createStar();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default StarField;
