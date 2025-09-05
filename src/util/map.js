export const jitterCoordinates = (coords, offset = 0.0005) => {
  const jitter = () => (Math.random() - 0.5) * offset * 2;
  return [
    coords[0] + jitter(), // longitude
    coords[1] + jitter(), // latitude
  ];
};

export const loadMapImage = (map, id, url) => {
  return new Promise((resolve, reject) => {
    if (map.hasImage(id)) {
      resolve();
      return;
    }

    map.loadImage(url, (error, image) => {
      if (error) {
        reject(error);
      } else if (!map.hasImage(id)) {
        map.addImage(id, image);
      }
      resolve();
    });
  });
};

export const recenterOn = (map, coordinates, options = {}) => {
  if (!map) return;

  map.easeTo({
    center: coordinates,
    duration: 1000,
    ...options,
  });
};
