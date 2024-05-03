import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from '../../home-section-right.json'; 

const HomeSectionLoader = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      animationData: animationData,
      loop: true, 
      renderer: 'svg',
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return <div ref={animationContainer} style={{width:450, height:450}}></div>;
};

export default HomeSectionLoader;