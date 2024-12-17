import React from 'react';
import { styled } from '@mui/system';
import UserIcon from '../../assests/User.svg';
import PhoneIcon from '../../assests/Phone.svg';
import MapPinIcon from '../../assests/MapPin.svg';

const CustomerDetailsContainer = styled('div')({
  width: '360px',
  height: '620px',
  padding: '10px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '0px',
  position: 'absolute',
  top: '10px',
  left: '1100px',
  marginTop: '0px',
  marginLeft: '-110px',
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
});

const CustomerInfo = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '12px',
  color: '#000000',
  marginBottom: '20px',
});

const InfoRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
});

const Icon = styled('img')({
  marginRight: '8px',
});

const AddressText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
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

const OrderRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#000000',
});
const OrderDate = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '14.4px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  textDecoration: 'underline',
  textDecorationStyle: 'solid',
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
  color: '#383838',
  marginBottom: '8px',
});

const OrderItemName = styled('span')({
  color: '#0A6169',
});

const OrderWeight = styled('span')({
  color: '#000000',
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
  marginTop: '210px',
});

const CustomerDetails = ({ customer = {} }) => {
  const {
    customerName = "Unknown Customer",
    mobileNumber = "N/A",
    address = "",
    items = [], // Default to an empty array if undefined
  } = customer;

  const addressParts = address.split(", ");
  const addressLine1 = addressParts.slice(0, -1).join(", ");
  const addressLine2 = addressParts[addressParts.length - 1] || "";

  return (
    <CustomerDetailsContainer>
      <Header>
        <CustomerName>{customerName}</CustomerName>
      </Header>
      <CustomerInfo>
        <InfoRow>
          <Icon src={PhoneIcon} alt="Phone Icon" />
          {mobileNumber}
        </InfoRow>
        <InfoRow>
          <Icon src={MapPinIcon} alt="Map Pin Icon" />
          <AddressText>
            <div>{addressLine1}</div>
            <div>{addressLine2}</div>
          </AddressText>
        </InfoRow>
      </CustomerInfo>
      <OrderHistoryHeader>Order History</OrderHistoryHeader>
      <OrderDate>Order 25-10-2024</OrderDate>
      {items.length > 0 ? (
        items.map((item, index) => (
          <OrderRow key={index}>
            <OrderItemName>{item.itemName || "Unnamed Item"}</OrderItemName>
            <OrderWeight>{item.productWeight || "Unknown Weight"}</OrderWeight>
          </OrderRow>
        ))
      ) : (
        <div>No orders found.</div>
      )}
      <SendOffersButton>Send Offers</SendOffersButton>
    </CustomerDetailsContainer>
  );
};

export default CustomerDetails;
