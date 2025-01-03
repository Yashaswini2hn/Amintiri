import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assests/logo.svg'; 

const HeaderAppBar = styled(AppBar)({
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  padding: '16px 32px',
  width: '100vw',
  position: 'fixed',
  zIndex: 1000,
});

const LogoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Logo = styled('img')({
 
  height: '60px',
  marginBottom: '4px',
  marginLeft: '560px',
  width:'350px',
 
});

const LogoUnderline = styled(Box)({
  width:'150px',
  height:'0px',
  position:'relative',
  top:'4px',
  left:'2px',
  borderTop:'2px solid #E1BD52',
  opacity: 1,
  marginLeft:'560px',

});


const LoginHeaderTemplate = () => {
  return (
    <HeaderAppBar>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <LogoContainer>
          <Logo src={logo} alt="AMINTIRI"/>
          <LogoUnderline />
        </LogoContainer>

      </Toolbar>
    </HeaderAppBar>
  );
};

export default LoginHeaderTemplate;
