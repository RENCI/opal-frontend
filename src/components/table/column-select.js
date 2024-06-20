import PropTypes from 'prop-types'
import {
  Checkbox,
  Dropdown,
  List,
  Menu,
  ListItem,
  ListItemDecorator,
  ListSubheader,
  MenuButton,
} from '@mui/joy'
import {
  KeyboardArrowDown as ChevronDownIcon,
  ViewColumn as ColumnsIcon,
} from '@mui/icons-material'

export const ColumnSelect = ({ table }) => {
  const handleClickToggleColumnGroup = ({ columns }) => event => {
    // we have to make some assumptions here.
    // we perform different actions based on whether
    // checkboxes are currently selected.
    // we have logic below to check the checkbox if
    // some column in the group is visible; no need to
    // duplicate that here. so we'll just look at the
    // checked state of the clicked checkbox.
    if (event.target.checked) {
      columns
        .filter(col => !col.getIsVisible())
        .forEach(col => col.toggleVisibility())
      return
    }
    columns
      .filter(col => col.getIsVisible())
      .forEach(col => col.toggleVisibility())
  }

  return (
    <Dropdown>
      <MenuButton
        variant="outlined"
        size="sm"
        color="neutral"
        endDecorator={ <ChevronDownIcon fontSize="sm" /> }
        startDecorator={ <ColumnsIcon /> }
      >Columns</MenuButton>
      <Menu aria-labelledby="column-select" size="sm">
        <List sx={{
          width: '250px',
          maxWidth: '250px',
          height: '50vh',
          maxHeight: '600px',
          overflowY: 'auto',
        }}>
          {
            table.getAllColumns().map(columnGroup => {
              const selectedColumnCount = columnGroup.columns
                .filter(col => col.getIsVisible())
                .length
              const checked = selectedColumnCount > 0
              const checkboxColor = selectedColumnCount === columnGroup.columns.length
                ? 'primary' : 'neutral'
              return (
                <ListItem nested key={ columnGroup.id }>
                  <ListSubheader sticky>
                    <ListItemDecorator>
                      <Checkbox
                        checked={ checked }
                        onChange={ handleClickToggleColumnGroup(columnGroup) }
                        variant="soft"
                        color={ checkboxColor }
                        size="sm"
                      />
                    </ListItemDecorator>
                    { columnGroup.id.toUpperCase() }
                  </ListSubheader>
                  <List>
                    {
                      columnGroup.columns.map(column => (
                        <ListItem key={ column.id }>
                          <ListItemDecorator />
                          <Checkbox
                            label={ column.id }
                            checked={ column.getIsVisible() }
                            onChange={ column.getToggleVisibilityHandler() }
                            variant="soft"
                            size="sm"
                          />
                        </ListItem>
                      ))                    
                    }
                  </List>
                </ListItem>
              )
            })
          }
        </List>
      </Menu>
    </Dropdown>
  )
}

ColumnSelect.propTypes = {
  table: PropTypes.object.isRequired,
}

