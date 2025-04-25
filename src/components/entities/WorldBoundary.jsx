import React from 'react';
import { Rect } from 'react-konva';

const WorldBoundary = ({ worldSize }) => {
  return (
    <>
      {/* World background */}
      <Rect
        x={0}
        y={0}
        width={worldSize}
        height={worldSize}
        fill="#111827"
      />
      
      {/* World border */}
      <Rect
        x={0}
        y={0}
        width={worldSize}
        height={worldSize}
        stroke="#444"
        strokeWidth={10}
        perfectDrawEnabled={false}
      />
      
      {/* Grid pattern for visual reference */}
      {Array.from({ length: 50 }).map((_, i) => (
        <React.Fragment key={`grid-${i}`}>
          {/* Vertical lines */}
          <Rect
            x={i * (worldSize / 50)}
            y={0}
            width={1}
            height={worldSize}
            fill="#222"
          />
          
          {/* Horizontal lines */}
          <Rect
            x={0}
            y={i * (worldSize / 50)}
            width={worldSize}
            height={1}
            fill="#222"
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default WorldBoundary;