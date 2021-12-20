import React from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useLanguageDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import PageTitle from '../../common/PageTitle';
import RequestErrorAlert from '../../common/RequestErrorAlert';
import NotFoundAlert from '../../common/NotFoundAlert';
import LabeledDetail from '../../common/LabeledDetail';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import './LanguageDetails.scss';

export const bem = defineBlock('LanguageDetails');

const LanguageDetails = () => {
  const params = useParams();
  const { language, languageLoading, languageError } = useLanguageDetailsQuery(params.id);
  let content = null;
  if (languageLoading) {
    content = <CircularProgress />;
  } else if (languageError) {
    content = <RequestErrorAlert />;
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
      <PageTitle text="Language details" />
      {content}
    </div>
  );
};

export default LanguageDetails;
