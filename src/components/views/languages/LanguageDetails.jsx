import React from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useLanguageDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import NotFoundAlert from '../../common/NotFoundAlert';
import LabeledDetail from '../../common/LabeledDetail';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import './LanguageDetails.scss';

const bem = defineBlock('LanguageDetails');

const LanguageDetails = () => {
  const params = useParams();
  const { language, languageLoading, languageError } = useLanguageDetailsQuery(params.id);
  let content = null;
  if (languageLoading) {
    content = <CircularProgress />;
  } else if (languageError) {
    content = <NetworkErrorAlert />;
  } else if (!language) {
    content = <NotFoundAlert />;
  } else {
    const favoriteButton = <FavoriteButton code={language.code} type={language.__typename} />;
    content = (
      <div className={bem('details')}>
        <Typography className={bem('subheader')} variant="h5" gutterBottom>
          {language.name}
        </Typography>
        <LabeledDetail label="Favorite" value={favoriteButton} />
        <LabeledDetail label="Code" value={language.code} />
        <LabeledDetail label="Native" value={language.native} />
        <LabeledDetail label="RTL" value={language.rtl ? 'Yes' : 'No'} />
      </div>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h4" gutterBottom>Language details</Typography>
      {content}
    </div>
  );
};

export default LanguageDetails;
