import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { paths } from '../../../constants';
import { useListLanguagesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import LanguageCard from '../../views/languages/LanguageCard';
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
    if (languages?.length > 0) {
      const randomIndex = Math.floor(Math.random() * languages.length);
      setLanguage(languages[randomIndex]);
      timer = setTimeout(() => {
        setShouldNavigate(true);
      }, timeUntilNav);
    }
    return () => clearTimeout(timer);
  }, [languages]);

  let content = null;
  if (languagesLoading) {
    content = (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  } else if (languagesError) {
    content = <NetworkErrorAlert />;
  } else if (shouldNavigate) {
    content = (
      <Navigate to={`/${paths.LANGUAGE}/${language.code}`} />
    );
  } else if (language) {
    content = (
      <LanguageCard
        code={language.code}
        name={language.name}
        type={language.__typename}
        showType
      />
    );
  }
  return (
    <div className={bem()}>
      {content}
    </div>
  );
};

RandomLanguage.propTypes = {
  timeUntilNav: PropTypes.number.isRequired
};

export default RandomLanguage;
