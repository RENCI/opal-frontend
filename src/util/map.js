export const jitterCoordinates = (coords, offset = 0.0005) => {
  const jitter = () => (Math.random() - 0.5) * offset * 2;
  return [
    coords[0] + jitter(), // longitude
    coords[1] + jitter(), // latitude
  ];
};
