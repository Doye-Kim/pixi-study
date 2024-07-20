export const initializeCollisionMap = (collisions) => {
  let tempCollisionMap = [];
  for (let i = 0; i < collisions.length; i += 61) {
    tempCollisionMap.push(collisions.slice(i, i + 61));
  }
  return tempCollisionMap;
};

export const initializeBoundaries = (
  collisionMap,
  BoundaryWidth,
  BoundaryHeight
) => {
  let tempBoundaries = [];
  collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 15) {
        tempBoundaries.push({
          position: {
            x: j * BoundaryWidth,
            y: i * BoundaryHeight,
          },
          width: BoundaryWidth,
          height: BoundaryHeight,
        });
      }
    });
  });
  return tempBoundaries;
};
