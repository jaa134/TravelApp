import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import defineBlock from '../../../utils/defineBlock';
import LabeledDetail from '../../common/LabeledDetail';
import './StateCard.scss';

const bem = defineBlock('StateCard');

const StateCard = ({
  name, code, type, showType
}) => (
  <Card className={bem()} sx={{ maxWidth: 500 }}>
    <CardContent>
      <div className={bem('header')}>
        <Typography className={bem('name')} variant="h6" noWrap component="div">
          {name}
        </Typography>
      </div>
      <Typography className={bem('details')} variant="body1" noWrap component="div">
        {showType && <LabeledDetail label="Type" value={type} />}
        <LabeledDetail label="Code" value={code} />
      </Typography>
    </CardContent>
  </Card>
);

StateCard.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  showType: PropTypes.bool
};

StateCard.defaultProps = {
  showType: false
};

export default StateCard;
