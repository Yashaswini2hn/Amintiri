import React from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';

const LayoutContainer = styled('div')({
  display: 'flex',
  height: '100vh',
});

const SidebarContainer = styled('div')({
  width: '178px',
  backgroundColor: '#FFFFFF',
  position: 'fixed', // Fix sidebar to the left
  top: '84px', // Space for header height
  bottom: 0,
  left: 0,
 
});

const MainContainer = styled('div')({
  flexGrow: 1,
  marginTop: '84px', 
  marginLeft: '178px', 
  padding: '20px',
  overflowY: 'auto',
  height: 'calc(100vh - 84px)', 
  backgroundColor: '#FFFFFF',
});

const MainPage = () => {
  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate />
      </SidebarContainer>
      <MainContainer>
      </MainContainer>
    </LayoutContainer>
  );
};

export default MainPage;
