import React, { useState } from 'react';
import { styled } from '@mui/system';
import DeliveryIcon from '../../assests/delivery.svg';

const CardContainer = styled('div')(({ isActive }) => ({
  width: '100%',
  backgroundColor: '#FFFFFF',
  marginBottom: '15px',
  display: 'flex',
  padding: '20px',
  gap: '10px',
  borderRadius: '8px',
  position: 'relative',
  marginTop: '50px',
  marginLeft: '0px',
  boxShadow: '0px 4px 4px 0px #00000026',
  alignItems: 'flex-start',
  border: isActive ? '2px solid #E1BD52' : '2px solid transparent', 
  transition: 'transform 0.3s ease-in-out, border 0.3s ease',
  transform: 'scale(1)',
  '&:hover': {
    transform: 'scale(1.05)', 
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

const OrderInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const OrderHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px',
});

const OrderNumber = styled('span')({
  fontFamily: 'Futura Bk BT ',
  fontSize: '18px',
  fontWeight: 700,
  color: '#000000',
  marginRight: '10px',
});

const OrderTimeContainer = styled('div')({
  backgroundColor: '#0A616940',
  padding: '4px 10px', // Adjust padding for better appearance
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginRight: '10px',
  gap: '5px',
  '@media (max-width: 768px)': {
    width: '100%', // Full width on smaller screens
    justifyContent: 'flex-start', // Align items to the start
    gap: '8px',
    padding:'4px 10px',
    justifyContent:'space-between'
  },
});

const OrderTimeLabel = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  color: '#06555C',
  marginRight: '4px',
  '@media (max-width: 768px)': {
    fontSize: '12px', 
  },
});

const OrderDateValue = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '12px',
  fontWeight: 700,
  color: '#06555C',
  marginRight: '5px',
  '@media (max-width: 768px)': {
    fontSize: '11px', // Reduce font size for smaller screens
  },
});

const OrderTimeValue = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '12px',
  fontWeight: 700,
  color: '#06555C',
  '@media (max-width: 768px)': {
    fontSize: '11px', // Adjust for smaller screens
  },
});

const StatusLabel = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  color: '#06555C',
  backgroundColor: '#E1BD5280',
  padding: '2px 8px',
  borderRadius: '4px',
  display: 'inline-block',
});

// const ItemsList = styled('div')({
//   marginTop: '10px',
//   color: '#000000',
//   fontFamily: 'Futura Bk BT',
//   fontSize: '14px',
//   display: 'grid',
//   gridTemplateColumns: 'auto 50px 20px',
//   gap: '10px 20px',
// });

const ItemName = styled('span')({
  gridColumn: '1',
 
});

const ItemsList = styled('div')({
  marginTop: '10px',
  color: '#000000',
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr', // Adjust columns for better alignment
  gap: '10px',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr', // Stack items vertically on smaller screens
    gap: '8px',
  },
});

const ItemWeight = styled('span')({
  gridColumn: '2', // Place in the second column
  textAlign: 'right', // Align to the right
  fontSize: '12px',
  '@media (max-width: 768px)': {
    textAlign: 'left', // Align to the left for smaller screens
    marginLeft: '10px',
  },
});

const ItemQuantity = styled('span')({
  gridColumn: '3', // Place in the third column
  textAlign: 'center', // Center-align for consistency
  fontSize: '12px',
  '@media (max-width: 768px)': {
    textAlign: 'left', // Align to the left for smaller screens
    marginLeft: '10px',
  },
});

const ExtraItemsCircle = styled('div')({
  backgroundColor: '#D9D9D9',
  width: '22px',
  height: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  fontSize: '12px',
  color: '#000000',
  opacity: 0.7,
});

const AddressInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  color: '#000000',
  fontFamily: 'Futura Bk BT !important',
  fontSize: '18px',
  lineHeight: '1.5',
  wordWrap: 'break-word',
  maxWidth: '250px',
  textAlign: 'right',
  cursor: 'pointer',
});

const DeliveryTime = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  fontSize: '16px',
  fontFamily: 'Futura Bk BT',
});

const Icon = styled('img')({
  width: '24px',
  height: '24px',
  marginRight: '8px',
});

const CustomerName = styled('div')({
  fontWeight: 'bold',
  marginBottom: '5px',
  fontSize: '18px',
});

const OrderCard = ({ orderNumber, orderTime, orderDate,status, items = [], deliveryTime, customerName, address = '', onCheckboxChange, onSelect ,isActive}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFullAddressVisible, setIsFullAddressVisible] = useState(false);

  const displayedItems = items.slice(0, 3); 
  const remainingItemCount = items.length - displayedItems.length;

  const addressParts = address.split(', ');
  const addressWithoutCity = addressParts.slice(0, -1).join(', ');
  const city = addressParts[addressParts.length - 1];

  const handleAddressToggle = () => {
    setIsFullAddressVisible((prev) => !prev);
  };

  const truncateAddress = (address) => {
    const words = address.split(' ');
    return words.length > 4 ? `${words.slice(0, 4).join(' ')}...` : address;
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(orderNumber, !isChecked);
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect({
        orderId: orderNumber,
        orderTime,
        orderDate,
        status,
        items,
        deliveryTime,
        customerName,
        deliveryAddress: address,
      });
    }
  };

  return (
    <CardContainer onClick={handleCardClick} isActive={isActive}>
      <Checkbox type="checkbox" checked={isChecked} onChange={handleCheckboxClick}/>
      <OrderInfo>
      <OrderHeader>
      <OrderNumber>{orderNumber}</OrderNumber>
      <OrderTimeContainer>
      <OrderTimeLabel>Ordered:</OrderTimeLabel>
      <OrderDateValue>{orderDate}</OrderDateValue>
      <OrderTimeValue>{orderTime}</OrderTimeValue>
      </OrderTimeContainer>
      <StatusLabel>{status}</StatusLabel>
      </OrderHeader>
        <ItemsList>
          {displayedItems.map((item, index) => (
            <React.Fragment key={index}>
              <ItemName>{item.itemName || 'N/A'}</ItemName>
              <ItemWeight>{item.productWeight || 'N/A'}</ItemWeight>
              <ItemQuantity>{item.quantity || 0}</ItemQuantity>
            </React.Fragment>
          ))}
          {remainingItemCount > 0 && <ExtraItemsCircle>+{remainingItemCount}</ExtraItemsCircle>}
        </ItemsList>
      </OrderInfo>
      <AddressInfo onClick={handleAddressToggle}>
        <DeliveryTime>
          <Icon src={DeliveryIcon} alt="Delivery Icon" />
          {deliveryTime}
        </DeliveryTime>
        <CustomerName>{customerName}</CustomerName>
        <div>{isFullAddressVisible ? address : truncateAddress(address)}</div>
      </AddressInfo>
    </CardContainer>
  );
};

export default OrderCard;
