import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const NotFoundAlert = () => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    We couldn&apos;t find the resource you were looking for. Try entering a different URL
  </Alert>
);

export default NotFoundAlert;
