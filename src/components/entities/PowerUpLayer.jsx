import React from 'react';
import { Group, Circle, Star } from 'react-konva';

const PowerUpLayer = ({ powerUps }) => {
  if (!powerUps || powerUps.length === 0) return null;
  
  return (
    <Group>
      {powerUps.map((powerUp, index) => {
        // Different shapes based on power-up type
        if (powerUp.type % 3 === 0) {
          // Star shape for special power-ups
          return (
            <Star
              key={index}
              x={powerUp.x}
              y={powerUp.y}
              numPoints={5}
              innerRadius={10}
              outerRadius={20}
              fill={powerUp.color}
              opacity={0.8}
              shadowColor="white"
              shadowBlur={10}
              shadowOpacity={0.6}
            />
          );
        } else {
          // Circle with pulsing effect
          return (
            <Circle
              key={index}
              x={powerUp.x}
              y={powerUp.y}
              radius={15}
              fill={powerUp.color}
              opacity={0.8}
              shadowColor="white"
              shadowBlur={15}
              shadowOpacity={0.6}
            />
          );
        }
      })}
    </Group>
  );
};

export default PowerUpLayer;