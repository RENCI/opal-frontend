export const flyTo = (mapRef, { latitude, longitude, zoom, duration }) => {
  if (!mapRef.current) {
    return
  }
  mapRef.current.flyTo({ center: [longitude, latitude], zoom, duration })
}

