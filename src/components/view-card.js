import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/joy'
import {
  ArrowForward as LinkIcon,
} from '@mui/icons-material'
import { Markdown } from '@components/markdown'
import { Link } from '@components/link'


const shimmerHoverStyle = {
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  '&::before': {
    zIndex: -1,
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 'calc(100% + 1rem)',
    height: '100%',
    backgroundColor: 'var(--joy-palette-primary-300)',
    filter: 'opacity(0.15)',
    transform: 'translate(calc(100% - 3rem))',
    clipPath: 'polygon(2rem 0, 100% 0, 100% 100%, 0 100%)',
    transition: 'transform 300ms, filter 350ms 100ms',
  },
  '&:hover': {
    color: 'var(--joy-palette-text-primary)',
  },
  '&:hover::before': {
    filter: 'opacity(0.0)',
    transform: ' translate(-1rem)',
    transition: 'transform 300ms, filter 350ms 200ms',
  }
};

const animateButtonContentsStyle = {
  perspective: '100px',
  '.text': { fontSize: '150%', transform: 'translate3d(0, 0, -10px)', transition: 'transform 300ms' },
  '.icon': { transform: 'translate3d(0, 0, -10px)', transition: 'transform 200ms' },
  '&:hover .icon': { transform: 'translate3d(6px, 0, 0)', transition: 'transform 500ms ease-out' },
  '&:hover .text': { transform: 'translate3d(-2px, 0, 0)', transition: 'transform 250ms ease-out' },
};

export const ViewCard = ({ title, description, icon, path }) => {
  return (
    <Card variant="outlined" sx={{
      padding: 0,
      borderTopLeftRadius: '2rem',
      borderBottomRightRadius: '2rem',
    }}>
      <CardContent component={ Stack } direction="column">
        <Stack sx={{ flex: '0 0 40px' }}>
          <Typography
            level="h3"
            startDecorator={ icon }
            sx={{
              fontWeight: '300',
              padding: '1.75rem 1rem 1.25rem 1rem',
            }}
          >{ title }</Typography>
        </Stack>
        <Divider inset="none" />
        <Box sx={{ padding: '1rem 1rem 0 1rem', flex: 1 }}>
          <Markdown>{ description }</Markdown>
        </Box>
      </CardContent>
      
      <CardActions sx={{ padding: '1rem' }}>
        <Button
          variant="soft"
          component={ Link }
          to={ path }
          sx={{
            ...shimmerHoverStyle,
            ...animateButtonContentsStyle,
            borderBottomRightRadius: '1.1rem',
            padding: '1rem 0',
          }}
          endDecorator={ <LinkIcon className="icon" /> }
        ><span className="text">View</span></Button>
      </CardActions>
    </Card>
  )
}

ViewCard.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}
