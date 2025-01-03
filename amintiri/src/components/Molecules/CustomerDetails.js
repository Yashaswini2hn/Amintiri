import React, { useState } from 'react';
import { styled } from '@mui/system';
import PhoneIcon from '../../assests/Phone.svg';
import MapPinIcon from '../../assests/MapPin.svg';

const CustomerDetailsContainer = styled('div')({
  width: '370px',
  height: '610px',
  padding: '10px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '0px',
  position: 'absolute',
  top: '120px',
  left: '1140px',
  
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
  borderBottom: '2px solid #E1BD52',
  paddingBottom: '10px',
  marginTop: '10px',
});

const CustomerName = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '20px',
  fontWeight: 600,
  color: '#000000',
  '@media (min-width:1200px)' : {
    fontSize:'30px'
  }
});

const CustomerInfo = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '12px',
  color: '#000000',
  marginBottom: '20px',
  '@media (min-width:1200px)' : {
    marginBottom:'20px'
  }
});

const InfoRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px', 
  '@media (min-width:1200px)' : {
    fontSize:'18px',  
  }
});

const Icon = styled('img')({
  marginRight: '8px',
});

const AddressText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
  wordWrap: 'break-word',
  cursor: 'pointer',
  '@media (min-width:1200px)' : {
    fontSize:'18px',
    marginTop:'10px'
  }
});

const OrderHistoryHeader = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#383838CC',
  padding: '10px 0',
  borderBottom: '1px solid #000',
  marginBottom: '10px',
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: '#E1BD52',
  },
});

const OrderDate = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#383838',
  marginBottom: '10px',
  '@media (min-width:1200px)':{
    fontSize:'18px',
  }
});

const OrderRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#000000',
});

const OrderItemName = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#000000',
  flex: 1,
});

const OrderWeight = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#383838',
});

const SendOffersButton = styled('button')({
  width: '100%',
  padding: '15px',
  backgroundColor: '#06555C',
  color: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '310px',
  marginBottom:'100px'
});

const CustomerDetails = ({ customer, orders }) => {
  const {
    name = 'Unknown Customer',
    mobile = 'N/A',
    addresses = [],
  } = customer;

  const [isFullAddressVisible, setIsFullAddressVisible] = useState(false);

  const addressLine1 = addresses[0]?.address_line1 || 'No address available';

  const handleAddressToggle = () => {
    setIsFullAddressVisible((prev) => !prev);
  };

  const truncateAddress = (address) => {
    const words = address.split(' ');
    return words.length > 4 ? `${words.slice(0, 4).join(' ')}...` : address;
  };

  return (
    <CustomerDetailsContainer>
      <Header>
        <CustomerName>{name}</CustomerName>
      </Header>
      <CustomerInfo>
        <InfoRow>
          <Icon src={PhoneIcon} alt="Phone Icon" />
          {mobile}
        </InfoRow>
        <InfoRow>
          <Icon src={MapPinIcon} alt="Map Pin Icon" />
          <AddressText onClick={handleAddressToggle}>
            {isFullAddressVisible ? addressLine1 : truncateAddress(addressLine1)}
          </AddressText>
        </InfoRow>
      </CustomerInfo>
      <OrderHistoryHeader>Order History</OrderHistoryHeader>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index}>
            <OrderDate>Order {order.orderDate}</OrderDate>
            {order.items.map((item, idx) => (
              <OrderRow key={idx}>
                <OrderItemName>{item.itemName || 'Unnamed Item'}</OrderItemName>
                <OrderWeight>{item.productWeight || 'Unknown Weight'}</OrderWeight>
              </OrderRow>
            ))}
          </div>
        ))
      ) : (
        <div>No orders found.</div>
      )}
      <SendOffersButton>Send Offers</SendOffersButton>
    </CustomerDetailsContainer>
  );
};

export default CustomerDetails;


