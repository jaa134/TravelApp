import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import defineBlock from '../../utils/defineBlock';
import globeSrc from '../../assets/images/globe.svg';
import PageTitle from '../common/PageTitle';
import './Home.scss';

const bem = defineBlock('Home');

const renderFeature = (feature) => (
  <Box key={feature.name} className={bem('feature')}>
    <Typography className={bem('feature-name')} variant="h5" component="div" gutterBottom>
      {feature.name}
    </Typography>
    <Typography variant="body1" component="div">
      {feature.description}
    </Typography>
  </Box>
);

const features = [
  {
    name: 'All encompassing API',
    description: `
      Planet Planner offers integration with an amazing travel API that is 
      developed here: "https://github.com/trevorblades/countries". Trevor
      has put together a public GraphQL API for information about countries, 
      continents, and languages. We take advantage of his work so we can
      display up-to-date information for your benefit. Navigate lists and 
      more detailed views of everything travel related. Get the data you
      need with our simple to use interfaces!
    `
  },
  {
    name: 'Virtual world tour',
    description: `
      Take a spin around the globe from our virtual world tour page. We use 
      Cesium and up-to-date geojson files so you can travel the world from 
      the comfort of your own chair. Interact with this 3d model of Earth and 
      its many countries. View country borders all across the globe, search 
      for places to find them quickly, or click around the map for more 
      detailed views.
    `
  },
  {
    name: 'Favoriting',
    description: `
      While you explore, make sure to favorite the places you want to visit 
      most. Manage your choices from the favorites tab which you can find 
      under the utilities section of the main navigation. Like and unlike 
      your data from the detail pages. No worries if you leave the site or 
      even close your browser. Your favorites will still be here when you 
      come back. We will persist this data in your browser using LocalStorage. 
      Our solution is to use a context provider and custom hooks to manage 
      the state of your favorites. This way we can keep all of the complicated 
      business logic in a single location while also easily being able to 
      provide methods for managing favorites to deeply nested components 
      using context. Keeping your favorites in a sinlge location ensures that 
      your data is consistent across our product.
    `
  },
  {
    name: 'Random exploration',
    description: `
      Are you more of a free spirit? Do you not like being held back by concrete 
      plans? Why not try something new and exciting? Use our randomness utility 
      to navigate to a random page on our application. Explore more freely by not 
      having the pressure of choosing your next vacation. Let us do it for you!
    `
  },
  {
    name: 'GraphiQL API playground',
    description: `
      Are you more of a techinical user? Do you have a background with GraphQL 
      development? Then maybe our GraphQL playground is just right for you! Get 
      the data you need from our API with the customization you deserve. From the 
      GraphiQL tab, you can use our API directly. We have enabled introspection so 
      users can discover more details about the data we have to offer. Our API has 
      no mutations and no sensitive data which means bad actors can't cause harm 
      by exposing this information. Use this feature as you wish!
    `
  }
];

const Home = () => (
  <div className={bem()}>

    <Box className={bem('header-box')}>
      <img
        className={bem('logo')}
        src={globeSrc}
        alt="logo"
        height="150"
      />
      <Box>
        <Typography variant="h2" component="div">
          Welcome to Planet Planner
        </Typography>
        <Typography className={bem('subheader')} variant="h5" component="div">
          We help you plan trips to other continents, countries, and states.
          Easily explore and learn about the places you want to visit with the
          world&apos;s #1 travel site!
        </Typography>
      </Box>
    </Box>
    <Alert severity="info">
      <AlertTitle>Limited time offer</AlertTitle>
      We are giving away our services for
      {' '}
      <strong>free</strong>
      !
    </Alert>

    <PageTitle text="Features" />
    {features.map(renderFeature)}
  </div>
);

export default Home;
