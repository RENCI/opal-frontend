import { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import {
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Menu,
  MenuItem,
  Typography,
} from '@mui/joy'
import {
  Info as AboutIcon,
  Science as AnalytesIcon,
  RadioButtonUnchecked as NonTargetedIcon,
  RadioButtonChecked as TableIcon,
  ArrowDropDown as DropdownIcon,
} from '@mui/icons-material'
import { useLocalStorage } from '@hooks'
import { usePreferences } from '@context'
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Sheet } from '@mui/joy';
import { Link } from '@components/link'
import { Brand } from '@components/brand'

const menuItems = [
  { id: 'about',        path: '/about',       label: 'About',                   Icon: AboutIcon },
  { id: 'pfas',         path: '/pfas/table',  label: 'Targeted Primary',        Icon: TableIcon },
  { id: 'ucmr5',        path: 'pfas2',        label: 'Targeted Secondary',      Icon: TableIcon },
  { id: 'non-targeted', path: 'non-targeted', label: 'Non-Targeted',            Icon: NonTargetedIcon },
  { id: 'analytes',     path: 'analytes',     label: 'Analytes',                Icon: AnalytesIcon },
]

const NavDropdown = function NavDropdown({ label, subitems = [] }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const actionRef = useRef(null);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useLocalStorage('pfas-view', 0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate(subitems[index].path);
    setOpen(false);
  };

  const Icon = subitems[selectedIndex].Icon

  return (
    <Fragment>
      <ButtonGroup
        ref={ anchorRef }
        variant="plain"
        aria-label={ `${label}-menu` }
      >
        <ListItemButton
          size="lg" variant="soft"
          component={ Link } nav to={ subitems[selectedIndex].path }
          role="menuitem" aria-label={ label }
        >
          <ListItemDecorator>
            <Icon />
          </ListItemDecorator>
          { label } { subitems[selectedIndex].label }
        </ListItemButton>
        <IconButton
          aria-controls={ open ? `${label}-menu` : undefined }
          aria-expanded={ open ? 'true' : undefined }
          aria-label={ `select ${label} view` }
          aria-haspopup="menu"
          onMouseDown={ () => { actionRef.current = () => setOpen(!open); } }
          onKeyDown={ () => { actionRef.current = () => setOpen(!open); } }
          onClick={ () => { actionRef.current?.(); } }
        >
          <DropdownIcon />
        </IconButton>
      </ButtonGroup>
      <Menu
        open={ open }
        onClose={ () => setOpen(false) }
        anchorEl={ anchorRef.current }
        sx={{ width: '216px', transform: 'translateY(-3px)' }}
      >
        {subitems.map((item, index) => (
          <MenuItem
            key={item.id}
            selected={ index === selectedIndex }
            onClick={ event => handleMenuItemClick(event, index) }
          >
            <ListItemDecorator>
              <item.Icon />
            </ListItemDecorator>
            <Typography>{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}

NavDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  subitems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      Icon: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export const DashboardMenu = () => {
  const preferences = usePreferences();

  return (
    <List
      role="menubar"
      orientation="horizontal"
      color="primary"
      sx={{
        '--List-gap': 0,
        '--List-flex': 1,
        justifyContent: 'flex-end',
        p: 0,
        '& > *:first-of-type': {
          borderLeft: '1px solid var(--joy-palette-neutral-outlinedBorder)',
        },
        '& > *:not(:last-of-type)': {
          borderRight: '1px solid var(--joy-palette-neutral-outlinedBorder)',
        },
        '.MuiListItemButton-root': {
          transition: 'background-color 250ms',
          borderRadius: 'sm',
          '&[aria-current="page"]': {
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
        },
      }}
    >
      {
        menuItems.map(({ Icon, id, label, path, subitems = [] }) =>
          subitems?.length ? (
            <NavDropdown
              key={`nav-${id}`}
              label={label}
              subitems={subitems}
            />
          ) : (
            <ListItem role="navigation" key={`nav-${id}`}>
              <ListItemButton
                size="lg" variant="soft"
                component={Link} nav to={path}
                role="menuitem" aria-label={label}
              >
                <ListItemDecorator><Icon /></ListItemDecorator>
                {label}
              </ListItemButton>
            </ListItem>
          )
        )
      }
    </List>
  );
};


export const CompactDashboardMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  return (
    <>
      <IconButton
        variant="soft"
        onClick={ toggleDrawer }
        sx={{ ml: 'auto' }}
        aria-label="Open navigation menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={drawerOpen} onClose={ toggleDrawer }>
        <Sheet
          variant="plain"
          sx={{ p: 2, width: 280 }}
          role="presentation"
          onClick={ toggleDrawer }
          onKeyDown={ toggleDrawer }
        >
          <Brand />

          <br />

          <List orientation="vertical">
            {menuItems.map(({ Icon, id, label, path, subitems = [] }) =>
              subitems?.length ? (
                <Fragment key={`nav-${id}`}>
                  <Typography level="title-sm" sx={{ mt: 1 }}>
                    {label}
                  </Typography>
                  {subitems.map((item) => (
                    <ListItemButton
                      key={item.id}
                      component={Link}
                      nav
                      to={item.path}
                    >
                      <ListItemDecorator><item.Icon /></ListItemDecorator>
                      {item.label}
                    </ListItemButton>
                  ))}
                </Fragment>
              ) : (
                <ListItemButton
                  key={`nav-${id}`}
                  component={Link}
                  nav
                  to={path}
                >
                  <ListItemDecorator><Icon /></ListItemDecorator>
                  {label}
                </ListItemButton>
              )
            )}
          </List>
        </Sheet>
      </Drawer>
    </>
  );
};
