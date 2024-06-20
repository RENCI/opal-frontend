import { Fragment, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  AspectRatio, CircularProgress, ListItemDecorator, Sheet,
  Skeleton, Tab, TabPanel, TabList, Tabs, Typography,
} from '@mui/joy'
import {
  BlurOn as DustIcon,
  Water as WaterIcon,
  Bloodtype as SerumIcon,
  Shower as TapwaterIcon,
  Storage as PfasDataIcon,
  Error as ErrorIcon,
} from '@mui/icons-material'
import { collapseAllNested, darkStyles, defaultStyles, JsonView } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'
import { usePreferences, useData } from '@context'

const DataTabStatusIndicator = ({ dataKey }) => {
  const data = useData()

  const errorIcon = <ErrorIcon fontSize="small" color="error" />

  if (!dataKey || !data || !(dataKey in data) || data[dataKey].isError) {
    return errorIcon
  }

  const icons = {
    dust: <DustIcon fontSize="small" color="primary" />,
    water: <WaterIcon fontSize="small" color="primary" />,
    serum: <SerumIcon fontSize="small" color="primary" />,
    pfasData: <PfasDataIcon fontSize="small" color="primary" />,
    tapwater: <TapwaterIcon fontSize="small" color="primary" />,
  }

  if (data[dataKey].isLoading || data[dataKey].isRefetching) {
    return (
      <CircularProgress
        size="sm"
        thickness={ 1 }
        sx={{ transform: 'scale(0.66)' }}
      />
    )
  }

  return icons[dataKey]
}

DataTabStatusIndicator.propTypes = {
  dataKey: PropTypes.string.isRequired,
}

//

const DataTabContentSkeleton = () => {
  return (
    <Fragment>
      <Typography>
        <Skeleton>#### samples</Skeleton>
      </Typography>
      <AspectRatio ratio="3/2">
        <Skeleton />
      </AspectRatio>
    </Fragment>
  )
}

//

const DataTabContent = ({ dataKey }) => {
  const { preferences } = usePreferences()
  const data = useData()

  const _data = data[dataKey].data

  const style = useMemo(() => preferences.colorMode.current === 'dark'
    ? darkStyles : defaultStyles, [preferences.colorMode.current])

  return (
    <Fragment>
      <Typography>{ _data.length } { dataKey } samples</Typography>
      <JsonView
        data={ _data }
        shouldExpandNode={ collapseAllNested }
        style={ style }
      />
    </Fragment>
  )
}

DataTabContent.propTypes = {
  dataKey: PropTypes.string.isRequired,
}

//

export const DataBrowser = () => {
  const data = useData()
  const keys = Object.keys(data)
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Sheet>
      <Tabs
        value={ tabIndex }
        onChange={ (event, value) => setTabIndex(Number(value)) }
      >
        <TabList tabFlex={ 1 }>
          {
            keys.map((key, i) => (
              <Tab
                key={ `${ key }-tab` }
                variant={ tabIndex === i ? 'outlined' : 'soft' }
              >
                <ListItemDecorator>
                  <DataTabStatusIndicator dataKey={ key } />
                </ListItemDecorator>
                { key }
              </Tab>
            ))
          }
        </TabList>
        {
          Object.keys(data).map((key, i) => (
            <TabPanel key={ `${ key }-json` } value={ i } sx={{ px: 0 }}>
              { data[key].isError && <Typography>An error occurred while fetching data.</Typography> }
              { data[key].isPending && <DataTabContentSkeleton /> }
              { data[key]?.data && <DataTabContent dataKey={ key } /> }
            </TabPanel>
          ))
        }
      </Tabs>
    </Sheet>
  )
}
