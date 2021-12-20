import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const NoItemsAlert = () => (
  <Alert severity="info">
    <AlertTitle>It&apos;s quite empty</AlertTitle>
    There doesn&apos;t seem to be any data here
  </Alert>
);

export default NoItemsAlert;
