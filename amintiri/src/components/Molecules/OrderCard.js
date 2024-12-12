import React from 'react';
import { styled } from '@mui/system';
import DeliveryIcon from '../../assests/delivery.svg';

const CardContainer = styled('div')({
  width: '950px',
  backgroundColor: '#FFFFFF',
  marginBottom: '15px',
  display: 'flex',
  padding: '20px',
  gap: '10px',
  borderRadius: '8px',
  position: 'relative',
  marginTop:'50px',
  marginLeft:'-5px',
  position:'relative',
  boxShadow: '0px 1px 4px 0px #D9D9D926'
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

const OrderInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const OrderHeader = styled('div')({
  display:'flex',
  alignItems:'center',
  marginBottom:'5px',
});

const OrderNumber = styled('span')({
  fontFamily:'Futura Bk BT ',
  fontSize:'18px',
  fontWeight:700,
  color:'#000000',
  marginRight:'10px',
});

const OrderTimeContainer = styled('div')({
  backgroundColor:'#0A616940',
  padding:'2px 8px',
  borderRadius:'4px',
  display:'inline-flex',
  alignItems:'center',
  marginRight:'10px',
});

const OrderTimeLabel = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  color: '#06555C',
  marginRight: '4px',
});

const OrderTimeValue = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 700, 
  color: '#06555C',
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

const ItemsList = styled('div')({
  marginTop:'10px',
  color:'#000000',
  fontFamily:'Futura Bk BT',
  fontSize:'14px',
  display:'grid',
  gridTemplateColumns:'auto 50px 20px',
  gap:'10px 20px',
});

const ItemName = styled('span')({
  gridColumn:'1',
});

const ItemWeight = styled('span')({
  gridColumn:'2',
  marginLeft:'-150px',
});

const ItemQuantity = styled('span')({
  gridColumn:'3',
  marginLeft:'-100px',
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
});

const DeliveryTime = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  fontSize:'16px',
  fontFamily:'Futura Bk BT'
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

const OrderCard = ({ orderNumber, orderTime, status, items, deliveryTime, customerName, address }) => {
  const displayedItems = items.slice(0, 3);
  const remainingItemCount = items.length - displayedItems.length;

  const addressParts = address.split(', ');
  const addressWithoutCity = addressParts.slice(0, -1).join(', ');
  const city = addressParts[addressParts.length - 1];

  return (
    <CardContainer>
      <Checkbox type="checkbox"/>
      <OrderInfo>
      <OrderHeader>
      <OrderNumber>{orderNumber}</OrderNumber>
      <OrderTimeContainer>
      <OrderTimeLabel>Ordered Time</OrderTimeLabel>
      <OrderTimeValue>{orderTime}</OrderTimeValue>
      </OrderTimeContainer>
      <StatusLabel>{status}</StatusLabel>
      </OrderHeader>
      <ItemsList>
      {displayedItems.map((item, index) => (
      <React.Fragment key={index}>
      <ItemName>{item.itemName}</ItemName> 
      <ItemWeight>{item.productWeight}</ItemWeight> 
      <ItemQuantity>{item.quantity}</ItemQuantity>
      </React.Fragment>
        ))}
      {remainingItemCount > 0 && <ExtraItemsCircle>+{remainingItemCount}</ExtraItemsCircle>}
      </ItemsList>
      </OrderInfo>
      <AddressInfo>
      <DeliveryTime>
      <Icon src={DeliveryIcon} alt="Delivery Icon"/>
      {deliveryTime}
      </DeliveryTime>
      <CustomerName>{customerName}</CustomerName>
      <div>{addressWithoutCity},</div>
      <div>{city}</div>
      </AddressInfo>
      </CardContainer>
  );
};
export default OrderCard;
