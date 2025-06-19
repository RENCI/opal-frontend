import { ContentPage } from '@components/layout';
import {
  Box,
  Divider,
  Typography,
} from '@mui/joy';
import Markdown from 'react-markdown';
import { Link } from '@components/link';
import policy from '@content/policy.md';
import overview from '@content/overview.md';
import contributors from '@content/contributors.md';

const Section = ({ ...props }) => <Box component="section" mb={3} { ...props } />;

const Overview = () => <Markdown>{ overview }</Markdown>
const Contributors = () => <Markdown components={{
  // eslint-disable-next-line no-unused-vars
  a: ({ href, node, ...props }) => <Link to={ href } { ...props } />,
}}>{ contributors }</Markdown>

const Policy = () => <Markdown components={{
  // eslint-disable-next-line no-unused-vars
  ol: ({ node, ...props }) => <ol { ...props } type="a" />,
  // eslint-disable-next-line no-unused-vars
  li: ({ node, ...props }) => <li { ...props } style={{ marginBottom: '1rem' }} />,
}}>{ policy }</Markdown>

export const AboutView = () => {
  return (
    <ContentPage maxWidth="lg">
        
      <Typography level="h1" id="about-opal">About OPAL</Typography>
      <Divider />

      <br />
      
      <Section>
        <Typography level="h2" id="project-overview">Project Overview</Typography>
        <Overview />
      </Section>

      <Section>
        <Typography level="h2" id="contributors">Contributors</Typography>

        <Contributors />
      </Section>

      <Section>
        <Typography level="h2" id="policy">OPAL Data Sharing and Use Policy</Typography>
        <Policy />
      </Section>

    </ContentPage>
  )
}
