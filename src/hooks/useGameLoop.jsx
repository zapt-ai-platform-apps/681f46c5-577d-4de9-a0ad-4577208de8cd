import { useRef, useEffect } from 'react';

export const useGameLoop = (callback) => {
  // Use useRef for mutable variables that we don't want to rerender for
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const callbackRef = useRef(callback);
  
  // Remember the latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  // Set up the animation loop
  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        // Calculate elapsed time since last frame
        const deltaTime = time - previousTimeRef.current;
        
        // Call the callback with deltaTime
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation loop
    requestRef.current = requestAnimationFrame(animate);
    
    // Clean up
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []); // Empty dependencies array means this effect runs once on mount
};