import React, {  useState } from 'react';
import { styled } from '@mui/system';
import UserIcon from '../../assests/User.svg';
import PhoneIcon from '../../assests/Phone.svg';
import OrdersIcon from '../../assests/orders.svg';
import MapPinIcon from '../../assests/MapPin.svg';
import ScrollIcon from '../../assests/Scroll.svg';
import DeliveryIcon from '../../assests/delivery.svg'; // Import delivery icon

const OrderDetailsContainer = styled('div')({
  width: '365px',
  height: '627px',
  padding: '10px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '0px',
  position: 'absolute',
  top: '70px',
  left: '1120px',
  marginTop: '30px',
  marginLeft:'30px'
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

const OrderID = styled('span')({
  fontFamily:'Futura Bk BT',
  fontSize:'20px',
  fontWeight:600,
  color: '#000000',
});

const Status = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  fontWeight: 400,
  color: '#06555C',
  backgroundColor: '#E1BD52',
  padding: '5px 5px',
  borderRadius: '0px',
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

const TimeDeliveryRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-5px', // Adjusted spacing
});

const AddressText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  fontSize:'12px',
  cursor: 'pointer', // Indicate that the text is clickable
  wordBreak: 'break-word',
});

const OrderItemsHeader = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  color: '#383838CC',
  padding: '10px 0',
  borderBottom: '1px solid #000', // Black line
  position: 'relative',
  marginBottom: '10px',
  '::before': { // Yellow line above
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: '#E1BD52',
  },
});

const OrderItems = styled('div')({
  fontFamily: 'Futura Bk BT',
});

const ItemRow = styled('div')({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
  alignItems: 'center',
  padding: '10px 0',
});

const ItemName = styled('span')({
  color: '#0A6169',
  fontSize: '16px',
});

const ItemQuantity = styled('span')({
  color: '#000000',
  fontSize: '16px',
  marginTop:'-25px'
});

const InstructionsContainer = styled('div')({
  display:'flex',
  alignItems:'center',
  color:'#383838CC',
  marginTop:'10px',
});

const InstructionsText = styled('span')({
  fontFamily:'Futura Lt BT',
  fontSize:'14px',
  marginLeft:'5px',
});

const ReadyButton = styled('button')({
  width:'100%',
  padding: '15px',
  backgroundColor: '#06555C',
  color: '#FFFFFF',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  border: 'none',
  borderRadius: '0px',
  cursor: 'pointer',
  marginTop: '170px',
  lineHeight:'18px'
});

const OrderDetails = ({order}) => {
  const addressParts = (order.deliveryAddress || "").split(', ');
  const addressLine1 = addressParts.slice(0, -1).join(', ');
  const addressLine2 = addressParts[addressParts.length - 1] || "";
  const [mainStatus, setMainStatus] = useState(order.status);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFullAddressVisible, setIsFullAddressVisible] = useState(false);
  const address = addressParts.join(', ');
  const [itemStatuses, setItemStatuses] = useState(
    order.items.map((item) => item.status)
  );

  const handleStatusChange = (newStatus) => {
    setMainStatus(newStatus);
    setDropdownOpen(false);
  };

  const handleItemStatusChange = (index, newStatus) => {
    setItemStatuses((prev) => {
      const updatedStatuses = [...prev];
      updatedStatuses[index] = newStatus;
      return updatedStatuses;
    });
  };

  const handleAddressToggle = () => {
    setIsFullAddressVisible((prev) => !prev); // Toggle the address visibility
  };

  const truncateAddress = (address) => {
    const words = address.split(' ');
    return words.length > 4 ? `${words.slice(0, 4).join(' ')}...` : address;
  };

  return (
    <OrderDetailsContainer>
      <Header>
      <OrderID>Orders ID {order.orderId}</OrderID> 
      <Status>{order.status}</Status>
      </Header>
      <CustomerInfo>
        <InfoRow style={{fontWeight: 'bold'}}>
          <Icon src={UserIcon} alt="User Icon"/>
          {order.customerName}
        </InfoRow>
        <InfoRow>
  <Icon src={PhoneIcon} alt="Phone Icon" />
  {order.customerMobile|| "No Mobile Number"}
</InfoRow>
        <TimeDeliveryRow>
          <InfoRow>
            <Icon src={MapPinIcon} alt="Map Pin Icon"/>
            <AddressText onClick={handleAddressToggle}>
            {isFullAddressVisible ? address : truncateAddress(address)}
            </AddressText>
          </InfoRow>
          <div>
            <InfoRow style={{marginTop:'-30px',marginLeft:'-30px'}}>
              <Icon src={OrdersIcon} alt="Orders Icon"/>
              {new Date(order.orderTime).toLocaleTimeString()} 
            </InfoRow>
            <InfoRow style={{marginLeft:'-30px'}}>
              <Icon src={DeliveryIcon} alt="Delivery Icon" />
              {new Date(order.deliveryTime).toLocaleTimeString()} 
            </InfoRow>
          </div>
        </TimeDeliveryRow>
      </CustomerInfo>
      <OrderItemsHeader>
        <div style={{marginLeft:'20px'}}>ITEM</div>
        <div style={{marginLeft:'50px'}}>QTY</div>
        <div style={{marginLeft:'40px'}}>STATUS</div>
      </OrderItemsHeader>
      <OrderItems>
    {order.items.map((item, index) => (
    <ItemRow key={index}>
      <div>
        <ItemName>{item.itemName}</ItemName> 
        <InstructionsContainer>
          <Icon src={ScrollIcon} alt="Scroll Icon" />
          <InstructionsText>
            {item.customizationNotes ? item.customizationNotes :'No Notes'}
          </InstructionsText>
        </InstructionsContainer>
      </div>
      <ItemQuantity>{item.productWeight}</ItemQuantity> 
      <Status>{item.status}</Status>
    </ItemRow>
  ))}
</OrderItems>
      <ReadyButton>Ready For Delivery</ReadyButton>
    </OrderDetailsContainer>
  );
};

export default OrderDetails;
