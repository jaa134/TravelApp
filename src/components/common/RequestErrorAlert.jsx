import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const RequestErrorAlert = () => (
  <Alert severity="error">
    <AlertTitle>Oops, something went wrong!</AlertTitle>
    Please contact the support team if this problem persists
  </Alert>
);

export default RequestErrorAlert;
