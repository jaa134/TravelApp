import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import defineBlock from '../../../utils/defineBlock';
import LabeledDetail from '../../common/LabeledDetail';
import { CountryLink } from '../../common/Links';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import './CountryCard.scss';

export const bem = defineBlock('CountryCard');

const CountryCard = ({
  name, code, emoji, type, showType
}) => (
  <Card className={bem()} variant="outlined" sx={{ maxWidth: 500 }}>
    <CardContent>
      <div className={bem('header')}>
        <Typography className={bem('name')} variant="h6" noWrap component="div">
          {name}
        </Typography>
        <FavoriteButton code={code} type={type} />
      </div>
      <Typography className={bem('details')} variant="body1" noWrap component="div">
        {showType && <LabeledDetail label="Type" value={type} />}
        <LabeledDetail label="Emoji" value={emoji} />
        <LabeledDetail label="Code" value={code} />
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
  type: PropTypes.string.isRequired,
  showType: PropTypes.bool
};

CountryCard.defaultProps = {
  showType: false
};

export default CountryCard;
