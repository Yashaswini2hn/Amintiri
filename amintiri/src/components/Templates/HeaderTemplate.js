import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assests/logo.svg'; 
import person from '../../assests/person.svg'; 

const HeaderAppBar = styled(AppBar)({
  backgroundColor: '#FFFFFF', 
  boxShadow: 'none',
  padding: '16px 32px',
  width: '100vw', // Ensure full viewport width
  position: 'fixed', // Stay fixed at the top
  zIndex: 1000,
});

const LogoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Logo = styled('img')({
  height: '40px',
  marginBottom: '4px', 
  marginLeft:'-30px'
});

const LogoUnderline = styled(Box)({
  width: '55px',
  height: '0px',
  position: 'relative',
  top: '4px',
  left: '2px',
  borderTop: '2px solid #E1BD52',
  opacity: 1,
});

const Icon = styled('img')({
  height: '24px',
  cursor: 'pointer',
});

const HeaderTemplate = () => {
  return (
    <HeaderAppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <LogoContainer>
          <Logo src={logo} alt="AMINTIRI" />
          <LogoUnderline />
        </LogoContainer>
        <Icon src={person} alt="User Icon" />
      </Toolbar>
    </HeaderAppBar>
  );
};

export default HeaderTemplate;
