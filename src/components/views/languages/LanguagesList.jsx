import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListLanguagesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import './LanguagesList.scss';

const bem = defineBlock('LanguagesList');

const LanguagesList = () => {
  const { languages, languagesLoading, languagesError } = useListLanguagesQuery();
  let content = null;
  if (languagesLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (languagesError) {
    content = (
      <Alert severity="error">
        <AlertTitle>Oops, something went wrong!</AlertTitle>
        Please contact the support team if this problem persists
      </Alert>
    );
  } else {
    content = (
      <table className={bem('table')}>
        <tbody>
          {languages.map((language) => (
            <tr key={language.code}>
              <td>{language.code}</td>
              <td>{language.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h5" gutterBottom>Languages</Typography>
      {content}
    </div>
  );
};

export default LanguagesList;
