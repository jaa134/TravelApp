import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import defineBlock from '../../utils/defineBlock';
import './LabeledDetail.scss';

const bem = defineBlock('LabeledDetail');

const LabeledDetail = ({
  label, value
}) => (
  <Typography className={bem()} variant="body1" noWrap component="div">
    <div className={bem('label')}>{label}</div>
    <div className={bem('value')}>{value}</div>
  </Typography>
);

LabeledDetail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired
};

export default LabeledDetail;
