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
import pfasMarker from '@images/pin-red.png';
import noPfasMarker from '@images/pin-blue.png';
import { useLayers } from '../../layers';

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
            <Checkbox label="Sample Sites" uncheckedIcon={ <UnselectedIcon /> } checked={ true } />
            <SampleSitesIcon sx={{ fill: '#51bbd6' }} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={ () => layers.toggle('superfund-sites') }>
            <Checkbox label="Superfund Sites" uncheckedIcon={ <UnselectedIcon /> } checked={ true } />
            <img src={ noPfasMarker } width="18" style={{ transform: 'translate(0, -2px)' }} />
            <img src={ pfasMarker } width="18" style={{ transform: 'translate(-16px, 2px)' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerPanel>
  )
}

LayersPanel.propTypes = {

};

