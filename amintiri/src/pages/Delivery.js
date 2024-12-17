import React from 'react';
import { styled } from '@mui/system';
import SearchIcon from '../assests/Search.svg';
import DropdownIcon from '../assests/arrow_drop_down (1).svg';
import CalendarIcon from '../assests/calender.svg';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';

const LayoutContainer = styled('div')({
    display: 'flex',
    height: '100vh',
  });
  
  const SidebarContainer = styled('div')({
    position: 'fixed',
    top: '84px', 
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

const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '20px',
  justifyContent: 'flex-start',
  marginTop: '20px',
  marginLeft:'120px'
});

const SearchButton = styled('button')({
  width: '371px',
  height: '44px',
  border: '1px solid #E1BD52',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: 'transparent',
  padding: '10px',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '21.6px',
  letterSpacing: '0.05em',
  color: '#06555C',
  cursor: 'pointer',
});

const TypeButton = styled('button')({
  width: '177px',
  height: '44px',
  border: '1px solid #E1BD52',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'transparent',
  padding: '10px',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  color: '#06555C',
  cursor: 'pointer',
});

const DateButton = styled('button')({
  width: '174px',
  height: '44px',
  border: '1px solid #E1BD52',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: 'transparent',
  padding: '10px',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  color: '#06555C',
  cursor: 'pointer',
});


const DeliveryPage = () => {
  return (
    <LayoutContainer>
     <HeaderTemplate/>
     <SidebarContainer>
        <SidebarTemplate/>
     </SidebarContainer>
     <MainContainer>
      <ButtonGroup>
        <SearchButton>
          <img src={SearchIcon} alt="Search" style={{ width: '24px', height: '24px' }} />
          Search
        </SearchButton>

        <TypeButton>
          Type
          <img src={DropdownIcon} alt="Dropdown" style={{ width: '16px', height: '16px' }} />
        </TypeButton>

        <DateButton>
          <img src={CalendarIcon} alt="Calendar" style={{ width: '24px', height: '24px' }} />
          12-11-2024
        </DateButton>
      </ButtonGroup>

      
      </MainContainer>
      </LayoutContainer>
  );
};

export default DeliveryPage;
