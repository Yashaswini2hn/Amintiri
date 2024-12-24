
import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import loaderGif from '../../assests/loader.gif'; 

const LoaderOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <LoaderOverlay>
      <img src={loaderGif} alt="Loading..." />
    </LoaderOverlay>
  );
};

export default Loader;
