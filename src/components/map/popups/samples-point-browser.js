import PropTypes from 'prop-types';
import { Divider, Typography } from '@mui/joy';
import { ListItemDecorator, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { analytes } from '@data';
import {
  FormatListBulleted as ListIcon,
  PieChart as VisualizationIcon,
} from '@mui/icons-material';
import { sampleDetectionSummary } from './samples-sample-detection-list';
import { SamplesDetectionPie } from './samples-sample-detection-pie';

export const PointBrowserTabs = ({ properties }) => {
  return (
    <Tabs aria-label="Sample tabs" defaultValue={ 0 }>
      <TabPanel value={ 0 }>
        <Typography size="title-sm" textAlign="center">PFAS Concentrations</Typography>
        { sampleDetectionSummary(properties) }
      </TabPanel>
      <TabPanel value={ 1 }>
        <Typography size="title-sm" textAlign="center">PFAS Concentrations</Typography>
        <SamplesDetectionPie data={
          analytes.reduce((acc, { id, abbreviation }) => {
            const value = properties?.[`${ id }_concentration`];
            if (value > 0) {
              acc.push(({
                id: abbreviation,
                value: value,
              }))
            }
            return acc;
          }, [])
        } />
      </TabPanel>
      
      <Divider />

      <TabList tabFlex={ 1 }>
        <Tab value={ 0 } indicatorPlacement="top">
          <ListItemDecorator><ListIcon /></ListItemDecorator>
        </Tab>
        <Tab value={ 1 } indicatorPlacement="top">
          <ListItemDecorator><VisualizationIcon /></ListItemDecorator>
        </Tab>
      </TabList>
    </Tabs>
  );
};

PointBrowserTabs.propTypes = {
  properties: PropTypes.object.isRequired,
};

export const PointBrowser = ({ properties }) => {
  return (
    <>
      <Typography level="title-sm" variant="soft" textAlign="center" color="primary" sx={{
        whiteSpace: 'nowrap', flex: 1, verticalAlign: 'middle', lineHeight: 3, margin: 'var(--joy-spacing) 0',
      }}>ID: { properties.sample_id }</Typography>

      <Divider/>

      <PointBrowserTabs properties={ properties } />
    </>
  )
};

PointBrowser.propTypes = {
  properties: PropTypes.object.isRequired,
};