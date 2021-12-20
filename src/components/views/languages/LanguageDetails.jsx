import React from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useLanguageDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import NotFoundAlert from '../../common/NotFoundAlert';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import './LanguageDetails.scss';

const bem = defineBlock('LanguageDetails');

const LanguageDetails = () => {
  const params = useParams();
  const { language, languageLoading, languageError } = useLanguageDetailsQuery(params.id);
  let content = null;
  if (languageLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (languageError) {
    content = <NetworkErrorAlert />;
  } else if (!language) {
    content = <NotFoundAlert />;
  } else {
    content = (
      <div className={bem('details')}>
        <Typography variant="subtitle1" gutterBottom component="div">
          Introducing the language of
          {' '}
          {language.name}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          <dl>
            <dt>Favorite</dt>
            <dd>
              <FavoriteButton code={language.code} type={language.__typename} />
            </dd>
            <dt>Code</dt>
            <dd>{language.code}</dd>
            <dt>Native</dt>
            <dd>{language.native}</dd>
            <dt>RTL</dt>
            <dd>{language.rtl ? 'Yes' : 'No'}</dd>
          </dl>
        </Typography>
      </div>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h5" gutterBottom>Language details</Typography>
      {content}
    </div>
  );
};

export default LanguageDetails;
