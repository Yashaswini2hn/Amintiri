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
  left: '150px',
  width:'350px',
 
  '@media (min-width : 1200px)' : {
    marginLeft : "850px"

  }
});

const LogoUnderline = styled(Box)({
  width:'150px',
  height:'0px',
  position:'relative',
  top:'4px',
  left:'2px',
  borderTop:'2px solid #E1BD52',
  opacity: 1,
  marginLeft:'580px',
  '@media (min-width : 1200px)' : {
    marginLeft : "850px"

  }

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
