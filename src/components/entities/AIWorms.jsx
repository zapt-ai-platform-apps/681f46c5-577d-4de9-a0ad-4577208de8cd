import React from 'react';
import { Group, Circle, Line } from 'react-konva';

const AIWorms = ({ aiWorms }) => {
  if (!aiWorms || aiWorms.length === 0) return null;
  
  return (
    <Group>
      {aiWorms.map((worm, index) => (
        <Group key={index}>
          {/* Draw body line */}
          <Line
            points={worm.segments.flatMap(segment => [segment.x, segment.y])}
            stroke={worm.color}
            strokeWidth={worm.size * 2}
            lineCap="round"
            lineJoin="round"
            opacity={0.8}
          />
          
          {/* Draw head */}
          <Circle
            x={worm.segments[0].x}
            y={worm.segments[0].y}
            radius={worm.size + 3}
            fill={worm.color}
          />
          
          {/* Draw eyes */}
          <Circle
            x={worm.segments[0].x + 3}
            y={worm.segments[0].y - 3}
            radius={2}
            fill="white"
          />
          <Circle
            x={worm.segments[0].x - 3}
            y={worm.segments[0].y - 3}
            radius={2}
            fill="white"
          />
          
          {/* Draw booster effect if active */}
          {worm.isBoosterActive && (
            <>
              <Circle
                x={worm.segments[worm.segments.length - 1].x}
                y={worm.segments[worm.segments.length - 1].y}
                radius={worm.size + 5}
                fill="#ff0000"
                opacity={0.5}
              />
              <Circle
                x={worm.segments[worm.segments.length - 1].x}
                y={worm.segments[worm.segments.length - 1].y}
                radius={worm.size + 10}
                fill="#ff6600"
                opacity={0.3}
              />
            </>
          )}
        </Group>
      ))}
    </Group>
  );
};

export default AIWorms;