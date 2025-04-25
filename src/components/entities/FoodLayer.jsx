import React from 'react';
import { Group, Circle } from 'react-konva';

const FoodLayer = ({ foodItems }) => {
  if (!foodItems || foodItems.length === 0) return null;
  
  return (
    <Group>
      {foodItems.map((food, index) => (
        <Circle
          key={index}
          x={food.x}
          y={food.y}
          radius={food.size}
          fill={food.color}
        />
      ))}
    </Group>
  );
};

export default FoodLayer;