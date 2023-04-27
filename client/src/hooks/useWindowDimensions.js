import { useState, useEffect, useMemo } from 'react';
import { size } from '../utilities/mediaQueries';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  const isMobileView = useMemo(() => windowDimensions.width <= size.mobileL, [windowDimensions]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [isMobileView, windowDimensions]
}