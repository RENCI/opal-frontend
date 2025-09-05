import {
  Button,
  ButtonGroup,
} from '@mui/joy';
import {
  ViewList as TableIcon,
  DonutSmall as ChartsIcon,
  CompareArrows as CompareIcon,
  Map as MapIcon,
  Science as ExposureIcon,
} from '@mui/icons-material';
import { usePreferences } from '@context';
import { Link } from '@components/link';

const pfasMenuItems = [
  { id: 'table',    path: '/pfas/table',    label: 'Table',          Icon: TableIcon },
  { id: 'charts',   path: '/pfas/charts',   label: 'Visualizations', Icon: ChartsIcon },
  { id: 'compare',  path: '/pfas/compare',  label: 'Comparison',     Icon: CompareIcon },
  { id: 'map',      path: '/pfas/map',      label: 'Map',            Icon: MapIcon },
  { id: 'exposure', path: '/pfas/exposure', label: 'Exposure',       Icon: ExposureIcon },
];

export const TargetedPrimaryMenu = () => {
  const preferences = usePreferences();

  return (
    <ButtonGroup
      role="menu"
      variant="outlined"
      spacing="0.5rem"
      size="md"
      sx={{
        padding: 'var(--joy-spacing)',
        '& [aria-current="page"]': {
          pointerEvents: 'none',
          backgroundColor: 'var(--joy-palette-primary-outlinedActiveBg)',
          color: preferences.colorMode.dark
            ? 'var(--joy-palette-common-white)'
            : 'var(--joy-palette-primary-700)',
          '.MuiSvgIcon-root': {
            fill: preferences.colorMode.dark
              ? 'var(--joy-palette-common-white)'
              : 'var(--joy-palette-primary-700)',
          },
        },
      }}
    >
      {pfasMenuItems.map(({ id, Icon, label, path }) => (
        <Button
          key={ id }
          component={ Link } nav to={ path }
          role="menuitem" aria-label={ label }
          startDecorator={ <Icon /> }
        >
          { label }
        </Button>
      ))}
    </ButtonGroup>  );
};