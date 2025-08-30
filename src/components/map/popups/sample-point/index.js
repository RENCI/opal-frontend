import PropTypes from 'prop-types';
import { Divider, Typography } from '@mui/joy';
import { ListItemDecorator, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
} from '@mui/joy';
import {
  Info as DetailsIcon,
  FormatListBulleted as ListIcon,
  PieChart as VisualizationIcon,
  DataObject as RawDetailsIcon,
  Summarize as SampleInfoIcon,
} from '@mui/icons-material';
import { Pre } from '@components/pre';
import { analytes } from '@data';
import superfundSiteMarker from '@images/pin-grey.png';
import { sampleDetectionSummary } from './sample-detection-list';
import { SamplesDetectionPie } from './sample-detection-pie';
import { NearestSuperfundSite } from '../../layers/nearest-superfund-site';
import { MediumIcon } from '@components/medium-icon';
import { SampleDetails } from './sample-details';

export const PointBrowserTabs = ({ properties }) => {
  return (
    <Tabs aria-label="Sample tabs" defaultValue={ 0 }>
      <TabPanel value={ 0 }>
        <Typography
          level="title-sm"
          textAlign="center"
        >PFAS Concentrations</Typography>
        { sampleDetectionSummary(properties) }
      </TabPanel>
      <TabPanel value={ 1 }>
        <Typography level="title-sm" textAlign="center">PFAS Concentrations</Typography>
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
      <TabPanel value={ 2 } sx={{ padding: 0 }}>
        <AccordionGroup>
          <Accordion defaultExpanded>
            <AccordionSummary>
              <SampleInfoIcon />
              Sample Details
            </AccordionSummary>
            <AccordionDetails>
              <SampleDetails properties={ properties } />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <img src={ superfundSiteMarker } width={ 16 } />
              Nearest Superfund Site
            </AccordionSummary>
            <AccordionDetails>
              <NearestSuperfundSite coordinates={ [properties.longitude, properties.latitude] } />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <RawDetailsIcon />
              Sample Raw Data
            </AccordionSummary> 
            <AccordionDetails>
              <Pre sx={{ maxHeight: '200px' }}>
                { JSON.stringify(properties, null, 2) }
              </Pre>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </TabPanel>
      
      <Divider />

      <TabList tabFlex={ 1 }>
        <Tab value={ 0 } indicatorPlacement="top">
          <ListItemDecorator><ListIcon /></ListItemDecorator>
        </Tab>
        <Tab value={ 1 } indicatorPlacement="top">
          <ListItemDecorator><VisualizationIcon /></ListItemDecorator>
        </Tab>
        <Tab value={ 2 } indicatorPlacement="top">
          <ListItemDecorator><DetailsIcon /></ListItemDecorator>
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
      <br />
      <Typography
        level="title-sm"
        variant="soft"
        textAlign="center"
        color="primary"
        sx={{
          whiteSpace: 'nowrap',
          flex: 1,
          verticalAlign: 'middle',
          lineHeight: 3,
          margin: 'var(--joy-spacing) 0',
        }}
        startDecorator={ <MediumIcon medium={ properties.medium } sx={{ fontSize: '24px' }} /> }
      >ID: { properties.sample_id }</Typography>

      <Divider/>

      <PointBrowserTabs properties={ properties } />
    </>
  )
};

PointBrowser.propTypes = {
  properties: PropTypes.object.isRequired,
};