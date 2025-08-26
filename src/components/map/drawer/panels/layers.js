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
            <img src={ pin } width="18" />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerPanel>
  )
}

LayersPanel.propTypes = {

};

