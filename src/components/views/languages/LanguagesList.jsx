import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListLanguagesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import { LanguageLink } from '../../common/Links';
import './LanguagesList.scss';

const bem = defineBlock('LanguagesList');

const LanguagesList = () => {
  const { languages, languagesLoading, languagesError } = useListLanguagesQuery();
  let content = null;
  if (languagesLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (languagesError) {
    content = <NetworkErrorAlert />;
  } else {
    content = (
      <table className={bem('table')}>
        <tbody>
          {languages.map((language) => (
            <tr key={language.code}>
              <td>{language.code}</td>
              <td>
                <LanguageLink code={language.code} name={language.name} />
              </td>
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
