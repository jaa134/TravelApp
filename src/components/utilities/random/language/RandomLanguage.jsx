import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { paths } from '../../../../constants';
import { useListLanguagesQuery } from '../../../../api/lists';
import defineBlock from '../../../../utils/defineBlock';
import './RandomLanguage.scss';

const bem = defineBlock('RandomLanguage');

const RandomLanguage = ({
  timeUntilNav
}) => {
  const { languages, languagesLoading, languagesError } = useListLanguagesQuery();
  const [language, setLanguage] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Once the number of languages changes, choose a random
  // language and initiate a countdown for navigation
  useEffect(() => {
    let timer;
    if (languages.length > 0) {
      const randomIndex = Math.floor(Math.random() * languages.length);
      setLanguage(languages[randomIndex]);
      timer = setTimeout(() => {
        setShouldNavigate(true);
      }, timeUntilNav);
    }
    return () => clearTimeout(timer);
  }, [languages.length]);

  let content = null;
  if (languagesLoading) {
    content = (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  } else if (languagesError) {
    content = (
      <Alert severity="error">
        <AlertTitle>Oops, something went wrong!</AlertTitle>
        Please contact the support team if this problem persists
      </Alert>
    );
  } else if (shouldNavigate) {
    content = (
      <Navigate to={`/${paths.LANGUAGE}/${language.code}`} />
    );
  } else if (language) {
    content = (
      <>
        <Typography variant="subtitle1">Hold on tight...</Typography>
        <Typography variant="body1">
          You are going to
          {' '}
          {language.name}
        </Typography>
      </>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h5">
        Teleporting you to a random language page!
      </Typography>
      {content}
    </div>
  );
};

RandomLanguage.propTypes = {
  timeUntilNav: PropTypes.number.isRequired
};

export default RandomLanguage;
