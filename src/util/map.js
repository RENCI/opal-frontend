export const flyTo = (mapRef, { latitude, longitude, zoom, duration }) => {
  if (!mapRef.current) {
    return;
  }
  mapRef.current.flyTo({ center: [longitude, latitude], zoom, duration });
};

export const jitterCoordinates = (coords, offset = 0.0005) => {
  const jitter = () => (Math.random() - 0.5) * offset * 2;
  return [
    coords[0] + jitter(), // longitude
    coords[1] + jitter(), // latitude
  ];
};
