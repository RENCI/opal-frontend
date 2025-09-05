import { useCallback, useMemo, useState } from 'react';

export const useLayers = () => {
  const [layerMap, setLayerMap] = useState(() => new Map([
    ['sample-sites', true],
    ['superfund-sites', true],
  ]));

  const toggleLayer = useCallback(layerId => {
    setLayerMap(prev => {
      const newMap = new Map(prev);
      if (newMap.has(layerId)) {
        newMap.set(layerId, !newMap.get(layerId));
      }
      return newMap;
    });
  }, []);

  const activeLayerIds = useMemo(() => {
    return Array.from(layerMap.entries())
      .filter(([, enabled]) => enabled)
      .map(([id]) => id);
  }, [layerMap]);

  return {
    current: layerMap,
    toggle: toggleLayer,
    active: activeLayerIds,
  };
};
