import React from 'react';
import { Group, Circle, Line } from 'react-konva';

const PlayerWorm = ({ segments, isBoosterActive }) => {
  if (!segments || segments.length === 0) return null;
  
  // Get head position (first segment)
  const head = segments[0];
  
  // Colors based on booster state
  const headColor = isBoosterActive ? '#ff3333' : '#00ff00';
  const bodyColor = isBoosterActive ? '#ff6666' : '#33ff33';
  
  // Calculate segment sizes (head is larger)
  const headRadius = 15;
  const bodyRadius = 12;
  
  // Create line points for the body
  const linePoints = segments.flatMap(segment => [segment.x, segment.y]);
  
  return (
    <Group>
      {/* Draw body line */}
      <Line
        points={linePoints}
        stroke={bodyColor}
        strokeWidth={bodyRadius * 2}
        lineCap="round"
        lineJoin="round"
        opacity={0.8}
      />
      
      {/* Draw head */}
      <Circle
        x={head.x}
        y={head.y}
        radius={headRadius}
        fill={headColor}
      />
      
      {/* Draw eyes */}
      <Circle
        x={head.x + 5}
        y={head.y - 5}
        radius={3}
        fill="white"
      />
      <Circle
        x={head.x - 5}
        y={head.y - 5}
        radius={3}
        fill="white"
      />
      
      {/* Draw pupils */}
      <Circle
        x={head.x + 5}
        y={head.y - 5}
        radius={1.5}
        fill="black"
      />
      <Circle
        x={head.x - 5}
        y={head.y - 5}
        radius={1.5}
        fill="black"
      />
      
      {/* Draw booster effect if active */}
      {isBoosterActive && (
        <>
          <Circle
            x={segments[segments.length - 1].x}
            y={segments[segments.length - 1].y}
            radius={bodyRadius + 5}
            fill="#ff0000"
            opacity={0.5}
          />
          <Circle
            x={segments[segments.length - 1].x}
            y={segments[segments.length - 1].y}
            radius={bodyRadius + 10}
            fill="#ff6600"
            opacity={0.3}
          />
        </>
      )}
    </Group>
  );
};

export default PlayerWorm;