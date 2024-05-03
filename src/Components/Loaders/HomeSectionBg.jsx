import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from '../../home-section-bg.json'; 

const HomeSectionBg = () => {
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

  return <div ref={animationContainer} style={{width:900, height:900}}></div>;
};

export default HomeSectionBg;