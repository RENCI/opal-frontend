import {
  Checkbox,
  List, ListItem, ListItemButton,
} from '@mui/joy'
import {
  Layers as PanelIcon,
  Circle as SampleSitesIcon,
  Close as UnselectedIcon,
} from '@mui/icons-material';
import { DrawerPanel } from '../panel';
import pin from '@images/pin.png';

import { useCallback, useMemo, useState } from 'react';

const useLayers = () => {
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

export const LayersPanel = () => {
  const layers = useLayers();

  return (
    <DrawerPanel
      title="Layers"
      icon={ <PanelIcon /> }
      defaultExpanded
    >
      <List
        orientation="vertical"
        size="sm"
        sx={{
          padding: 'var(--joy-spacing)',
          gap: 'var(--joy-spacing)',
        }}
      >
        <ListItem>
          <ListItemButton onClick={ () => layers.toggle('sample-sites') }>
            <Checkbox label="Sample Sites" uncheckedIcon={ <UnselectedIcon /> } />
            <SampleSitesIcon sx={{ fill: '#51bbd6' }} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={ () => layers.toggle('superfund-sites') }>
            <Checkbox label="Superfund Sites" uncheckedIcon={ <UnselectedIcon /> } />
            <img src={ pin } width="18" />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerPanel>
  )
}

LayersPanel.propTypes = {

};

