import { NavLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/joy'
import {
  Policy as PolicyIcon,
} from '@mui/icons-material'

export const PolicyCard = () => {

  return (
    <Card
      variant="soft"
      sx={{
        borderTopRightRadius: '2rem',
        borderBottom: 0,
      }}
    >
      <CardContent>
        <Typography
          color="neutral"
          level="h4"
          sx={{ fontWeight: 'bold' }}
        >Planning to publish?</Typography>
        <Typography>
          Please contact the investigators who generated the data.
          Co-authorship or formal acknowledgment may be appropriate.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={ <PolicyIcon /> }
          component={ NavLink }
          to="/policy"
        >Review our Data Sharing and Use Policy</Button>
      </CardActions>
    </Card>
  )
};
