import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from '../../signup.json'; 

const SignupLoader = () => {
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

  return <div ref={animationContainer} style={{width:500, height:500}}></div>;
};

export default SignupLoader;