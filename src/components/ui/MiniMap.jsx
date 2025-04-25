import React, { useRef, useEffect } from 'react';

const MiniMap = ({ worldSize, playerPosition, aiPositions = [] }) => {
  const canvasRef = useRef(null);
  
  // Size of the minimap
  const mapSize = 150;
  
  // Draw minimap
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, mapSize, mapSize);
    
    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, mapSize, mapSize);
    
    // Draw border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, mapSize, mapSize);
    
    // Calculate scale factor
    const scaleFactor = mapSize / worldSize;
    
    // Draw AI worms
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    aiPositions.forEach(pos => {
      ctx.beginPath();
      ctx.arc(
        pos.x * scaleFactor,
        pos.y * scaleFactor,
        1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
    
    // Draw player
    ctx.fillStyle = 'rgba(0, 255, 0, 1)';
    ctx.beginPath();
    ctx.arc(
      playerPosition.x * scaleFactor,
      playerPosition.y * scaleFactor,
      3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
  }, [worldSize, playerPosition, aiPositions, mapSize]);
  
  return (
    <div className="mini-map">
      <canvas 
        ref={canvasRef}
        width={mapSize}
        height={mapSize}
      />
    </div>
  );
};

export default MiniMap;