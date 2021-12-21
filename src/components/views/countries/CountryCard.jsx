import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CountryLink } from '../../common/Links';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import './CountryCard.scss';
import defineBlock from '../../../utils/defineBlock';

const bem = defineBlock('CountryCard');

const CountryCard = ({
  name, code, emoji, type
}) => (
  <Card className={bem()} sx={{ maxWidth: 500 }}>
    <CardContent>
      <div className={bem('header')}>
        <Typography className={bem('name')} variant="h6" noWrap component="div">
          {name}
        </Typography>
        <FavoriteButton code={code} type={type} />
      </div>
      <Typography className={bem('details')} variant="body1" noWrap component="div">
        <div className={bem('detail')}>
          <div className={bem('label')}>Emoji</div>
          <div className={bem(['value', 'emoji'])}>{emoji}</div>
        </div>
        <div className={bem('detail')}>
          <div className={bem('label')}>Code</div>
          <div className={bem('value')}>{code}</div>
        </div>
      </Typography>
    </CardContent>
    <CardActions>
      <CountryLink code={code} text="Learn more" />
    </CardActions>
  </Card>
);

CountryCard.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default CountryCard;
