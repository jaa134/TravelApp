import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LanguageLink } from '../../common/Links';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import './LanguageCard.scss';
import defineBlock from '../../../utils/defineBlock';

const bem = defineBlock('LanguageCard');

const LanguageCard = ({
  name, code, type
}) => (
  <Card className={bem()}>
    <CardContent>
      <div className={bem('header')}>
        <Typography className={bem('name')} variant="h6" noWrap component="div">
          {name}
        </Typography>
        <FavoriteButton code={code} type={type} />
      </div>
      <Typography className={bem('details')} variant="body1" noWrap component="div">
        <div className={bem('detail')}>
          <div className={bem('label')}>Code</div>
          <div className={bem('value')}>{code}</div>
        </div>
      </Typography>
    </CardContent>
    <CardActions>
      <LanguageLink code={code} text="Learn more" />
    </CardActions>
  </Card>
);

LanguageCard.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default LanguageCard;
