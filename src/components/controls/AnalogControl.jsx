import React, { useState, useEffect, useRef } from 'react';

const AnalogControl = ({ onDirectionChange }) => {
  const containerRef = useRef(null);
  const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const maxDistance = 40; // Maximum stick travel distance
  
  // Initialize position at center
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setStickPosition({
        x: rect.width / 2,
        y: rect.height / 2
      });
    }
  }, []);
  
  // Calculate normalized direction vector
  useEffect(() => {
    if (!containerRef.current || !isPressed) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate direction vector
    const dx = stickPosition.x - centerX;
    const dy = stickPosition.y - centerY;
    
    // Calculate magnitude
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize if magnitude is not zero
    if (magnitude > 0) {
      const normalizedX = dx / magnitude;
      const normalizedY = dy / magnitude;
      onDirectionChange({ x: normalizedX, y: normalizedY });
    } else {
      onDirectionChange({ x: 0, y: 0 });
    }
  }, [stickPosition, isPressed, onDirectionChange]);
  
  const handleStart = (clientX, clientY) => {
    setIsPressed(true);
    updateStickPosition(clientX, clientY);
  };
  
  const handleMove = (clientX, clientY) => {
    if (isPressed) {
      updateStickPosition(clientX, clientY);
    }
  };
  
  const handleEnd = () => {
    setIsPressed(false);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setStickPosition({
        x: rect.width / 2,
        y: rect.height / 2
      });
    }
    onDirectionChange({ x: 0, y: 0 });
  };
  
  const updateStickPosition = (clientX, clientY) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate position relative to center
    let dx = clientX - rect.left - centerX;
    let dy = clientY - rect.top - centerY;
    
    // Calculate distance from center
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Limit distance to maxDistance
    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }
    
    setStickPosition({
      x: centerX + dx,
      y: centerY + dy
    });
  };
  
  // Touch event handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };
  
  // Mouse event handlers
  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };
  
  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };
  
  // Add global mouse events when the stick is pressed
  useEffect(() => {
    if (isPressed) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isPressed]);
  
  return (
    <div 
      ref={containerRef}
      className="analog-control"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div 
        className="analog-stick"
        style={{
          left: stickPosition.x,
          top: stickPosition.y
        }}
      />
    </div>
  );
};

export default AnalogControl;