import React, {  useState } from 'react';
import { styled } from '@mui/system';
import MapIcon from '../../assests/Map.svg';

const CardContainer = styled('div')(({ isActive }) => ({
  width: '70%',
  backgroundColor: '#FFFFFF',
  marginBottom: '15px',
  display: 'flex',
  padding: '20px',
  gap: '10px',
  borderRadius: '8px',
  marginTop: '15px',
  marginLeft: '0px',
  position: 'relative',
  boxShadow: '4px 4px 4px 4px #00000026',
  cursor: 'pointer',
  justifyContent: 'flex-start',
  transition: 'transform 0.3s ease-in-out, border 0.3s ease',
  transform: 'scale(1)',
  border: isActive ? '2px solid #E1BD52' : '2px solid transparent',
  '&:hover': {
    transform: 'scale(1.05)', 
  },
  '@media (max-width:1200px)': {
    width:'70%', 
   
  },
}));


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

const Address = styled('div')({
  cursor:'pointer'
});

// const MapViewLink = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '5px',
//   color: '#06555C',
//   fontFamily: 'Futura Bk BT',
//   fontSize: '16px',
//   cursor: 'pointer',
// });

const CustomerCard = ({ customerName, mobileNumber, deliveryAddress , onClick}) => {

  const [isFullAddressVisible, setIsFullAddressVisible] = useState(false);

  const handleAddressToggle = () => {
    setIsFullAddressVisible((prev) => !prev); 
  };

  const truncateAddress = (address) => {
    const words = address.split(' ');
    return words.length > 4 ? `${words.slice(0, 4).join(' ')}...` : address;
  };



  return (
    <CardContainer onClick={onClick}>
      <Checkbox type="checkbox" />
      <CustomerInfo>
        <CustomerName>{customerName}</CustomerName>
        <div>{mobileNumber}</div>
        <Address onClick={handleAddressToggle}>{isFullAddressVisible ? deliveryAddress : truncateAddress(deliveryAddress)}</Address>
      </CustomerInfo>
      {/* <MapViewLink>
        <img src={MapIcon} alt="Map Icon" />
        Map View
      </MapViewLink> */}
    </CardContainer>
  );
};

export default CustomerCard;
