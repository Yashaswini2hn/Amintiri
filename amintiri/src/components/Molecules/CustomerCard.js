import React from 'react';
import { styled } from '@mui/system';
import MapIcon from '../../assests/Map.svg';

const CardContainer = styled('div')({
  width:'70%',
  backgroundColor:'#FFFFFF',
  marginBottom:'15px',
  display:'flex',
  padding:'20px',
  gap:'10px',
  borderRadius:'8px',
  marginTop:'15px',
  marginLeft:'0px',
  position:'relative',
  boxShadow:'0px 1px 4px 0px #D9D9D926',
  cursor:'pointer',
  justifyContent:'flex-start'
});

const Checkbox = styled('input')({
  appearance: 'none',
  position: 'absolute',
  top: '-15px',
  left: '10px',
  width: '24px',
  height: '24px',
  border: '2px solid #06555C',
  borderRadius: '2.5px',
  boxShadow: '0px 0px 4px 0px #00000040',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  '&:checked': {
    backgroundColor: '#06555C',
    border: '2px solid #06555C',
  },
  '&:checked::after': {
    content: '""',
    position: 'absolute',
    top: '1px',
    left: '6.5px',
    width: '8px',
    height: '16px',
    border: 'solid white',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
  },
  '&:hover': {
    border: '2px solid #054E50',
  },
});

const CustomerInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  color: '#000000',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  lineHeight: '1.5',
});

const CustomerName = styled('div')({
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '5px',
});

const MapViewLink = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: '#06555C',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  cursor: 'pointer',
});

const CustomerCard = ({ customerName, mobileNumber, deliveryAddress }) => {
  return (
    <CardContainer>
      <Checkbox type="checkbox" />
      <CustomerInfo>
        <CustomerName>{customerName}</CustomerName>
        <div>{mobileNumber}</div>
        <div>{deliveryAddress}</div>
      </CustomerInfo>
      <MapViewLink>
        <img src={MapIcon} alt="Map Icon" />
        Map View
      </MapViewLink>
    </CardContainer>
  );
};

export default CustomerCard;
