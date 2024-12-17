import React from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import CalendarIcon from '../assests/calender.svg';
import DeliveryIcon from '../assests/delivery.svg';
import SortByIcon from '../assests/SortBy.svg';
import ArrowDropdownIcon from '../assests/arrow_drop_down (2).svg';
import ArrowDropdownIcon1 from '../assests/arrow_drop_down (1).svg';
import GroupCard from '../components/Molecules/GroupCard';

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

const ButtonsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  marginBottom: '20px',
  marginLeft:'40px'
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
  fontWeight: 400,
  color: '#06555C',
  cursor: 'pointer',
  gap: '10px',
});

const DeliveryTimeButton = styled('button')({
  width: '212px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #E1BD52',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  fontWeight: 400,
  color: '#06555C',
  cursor: 'pointer',
  gap: '10px',
});

const SortByButton = styled('button')({
  width: '130px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #E1BD52',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  fontWeight: 400,
  color: '#06555C',
  cursor: 'pointer',
  gap: '10px',
});

const DeliveryButton = styled('button')({
  width: '174px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#06555C',
  color: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  marginLeft:'90px',
  fontWeight: 400,
  cursor: 'pointer',
  gap: '30px',
  border: 'none',
  position: 'relative',
  '& img': {
    position: 'absolute',
    right: '10px',
    width: '10px',
    height: '10px',
  },
});


const groupsData = [
  {
    title: '#121',
    subTitle: '#1234',
    badge: '21/ 10 Batch',
    itemName: 'Classic Black Forest Cake',
    weight: '500 gm',
    quantity: '1',
    subTitle2: '#1235',
    badge2: '21/ 10 Batch',
    itemName2: 'Classic Black Forest Cake',
    weight2: '500 gm',
    quantity2: '1',
  },
];


const GroupsPage = () => {
  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate />
      </SidebarContainer>
      <MainContainer>
        {/* Buttons Section */}
        <ButtonsContainer>
          <DateButton>
          <img src={CalendarIcon} alt="Calendar" />
            12-11-2024
          </DateButton>
          <DeliveryTimeButton>
          <img src={DeliveryIcon} alt="Delivery" />
            Delivery Time
            <img src={ArrowDropdownIcon1} alt="Dropdown1" />
          </DeliveryTimeButton>
          <SortByButton>
            Sort By
            <img src={SortByIcon} alt="Sort By" />
          </SortByButton>
          <DeliveryButton>
            Delivery
            <img src={ArrowDropdownIcon} alt="Dropdown" />
          </DeliveryButton>
        </ButtonsContainer>
        {groupsData.map((group, index) => (
          <GroupCard key={index} group={group} />
        ))}
      </MainContainer>
    </LayoutContainer>
  );
};

export default GroupsPage;
