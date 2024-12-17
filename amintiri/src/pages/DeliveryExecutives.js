import React from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import SearchIcon from '../assests/Search.svg';
import CalendarIcon from '../assests/calender.svg';
import ArrowDropdownIcon from '../assests/arrow_drop_down (1).svg';
import ExecutiveCard from '../components/Molecules/ExecutiveCard';

const LayoutContainer = styled('div')({
  display: 'flex',
  height: '100vh',
});

const SidebarContainer = styled('div')({
  position: 'fixed',
  top: '84px', // Below the header
  left: 0,
  bottom: 0,
  width: '178px',
  backgroundColor: '#FFFFFF',
  zIndex: 1000,
});

const MainContainer = styled('div')({
  marginTop: '84px',
  marginLeft: '178px',
  padding: '20px',
  flexGrow: 1,
  backgroundColor: '#FFFFFF',
});

const ButtonsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '43px',
  marginBottom: '20px',
  marginLeft:'230px'
});

const SearchButton = styled('button')({
  width: '257px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  border: '1px solid #E1BD52',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  color: '#06555C',
  cursor: 'pointer',
  gap:'20px',
  padding: '10px 15px',
  '& img': {
    width: '20px',
    height: '20px',
  },
});

const DateButton = styled('button')({
  width: '174px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #E1BD52',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  color: '#06555C',
  cursor: 'pointer',
  gap:'20px',
  padding: '10px 15px',
  '& img': {
    width: '20px',
    height: '20px',
  },
});

const StatusButton = styled('button')({
  width: '130px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #E1BD52',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  gap:'30px',
  color: '#06555C',
  cursor: 'pointer',
  padding: '10px 15px',
  '& img': {
    width: '20px',
    height: '20px',
  },
});

const DeliveryExecutives = () => {
  return (
    <LayoutContainer>
      {/* Header Template */}
      <HeaderTemplate />

      {/* Sidebar Template */}
      <SidebarContainer>
        <SidebarTemplate />
      </SidebarContainer>

      {/* Main Content */}
      <MainContainer>
        {/* Buttons Section */}
        <ButtonsContainer>
          <SearchButton>
          <img src={SearchIcon} alt="Search Icon" />
            Search
          </SearchButton>
          <DateButton>
          <img src={CalendarIcon} alt="Calendar Icon" />
            12-11-2024
          </DateButton>
          <StatusButton>
            Status
            <img src={ArrowDropdownIcon} alt="Status Icon" />
          </StatusButton>
        </ButtonsContainer>

        <ExecutiveCard />
        <ExecutiveCard />
        <ExecutiveCard />
      </MainContainer>
    </LayoutContainer>
  );
};

export default DeliveryExecutives;
