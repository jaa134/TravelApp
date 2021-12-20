import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListLanguagesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import LanguageCard from './LanguageCard';

const bem = defineBlock('LanguagesList');

const NUM_LOADING_MOCKS = 100;
const CARD_HEIGHT = 142;

const LanguagesList = () => {
  const { languages, languagesLoading, languagesError } = useListLanguagesQuery();
  let content = null;
  if (languagesError) {
    content = <NetworkErrorAlert />;
  } else {
    let gridItems = null;
    if (languagesLoading) {
      gridItems = [...Array(NUM_LOADING_MOCKS)].map((_, i) => ({
        key: i,
        component: (
          <Skeleton
            variant="rectangular"
            height={CARD_HEIGHT}
          />
        )
      }));
    } else {
      gridItems = languages.map((language) => ({
        key: language.code,
        component: (
          <LanguageCard
            code={language.code}
            name={language.name}
            type={language.__typename}
          />
        )
      }));
    }
    content = (
      <Grid container spacing={2}>
        {gridItems.map((item) => (
          <Grid
            key={item.key}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
          >
            {item.component}
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h4" gutterBottom>Languages</Typography>
      {content}
    </div>
  );
};

export default LanguagesList;
