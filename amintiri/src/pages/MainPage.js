import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import CalendarIcon from '../assests/calender.svg';
import DeliveryIcon from '../assests/delivery.svg';
import DropdownIcon from '../assests/arrow_drop_down (1).svg';
import OrderCard from '../components/Molecules/OrderCard';
import OrderDetails from '../components/Molecules/OrderDetails';
import { ordersData } from '../components/Molecules/OrdersData';

const LayoutContainer = styled('div')({
  display: 'flex',
  height: '100vh',
});

const SidebarContainer = styled('div')({
  width: '178px',
  backgroundColor: '#FFFFFF',
  position: 'fixed',
  top: '84px',
  bottom: 0,
  left: 0,
});

const MainContainer = styled('div')({
  flexGrow: 1,
  marginTop: '84px',
  marginLeft: '178px',
  padding: '20px',
  overflowY: 'auto',
  height: 'calc(100vh - 84px)',
  backgroundColor: '#FFFFFF',
  display: 'flex',
});

const OrderListContainer = styled('div')({
  flex: 1,
  marginRight: '0px',
  width: '600px',
});

const OrderDetailsContainer = styled('div')({
  width: '390px',
});

const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '15px',
  marginBottom: '20px',
  justifyContent: 'center',
  marginTop: '35px',
  marginLeft: '-100px',
  position: 'relative',
});

const OrdersButton = styled('button')({
  fontFamily:'Futura Bk BT',
  fontSize:'18px',
  fontWeight:400,
  lineHeight:'21.6px',
  letterSpacing:'0.05em',
  textAlign:'center',
  color:'#06555C',
  backgroundColor:'transparent',
  border:'1px solid #E1BD52',
  padding:'10px 40px',
  borderRadius:'0px',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  cursor:'pointer',
  width:'154px',
});

const DropdownContainer = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position:'absolute',
  top:'100%',
  left:'110px',
  backgroundColor:'#FFFFFF',
  width:'158px', 
  height:'100px',
  borderRadius:'0px',
  boxShadow:'0 2px 8px rgba(0, 0, 0, 0.1)',
  zIndex:1000,
  padding:'10px',
}));

const DropdownInner = styled('div')({
  backgroundColor:'#FFFFFF',
  border:'0.8px solid #E1BD52',
  borderRadius:'0px',
});

const DropdownItem = styled('div')({
  fontFamily:'Futura Lt BT',
  fontSize:'14px',
  fontWeight:400,
  lineHeight:'16.8px',
  letterSpacing:'0.05em',
  color:'#0A6169',
  padding:'10px',
  cursor:'pointer',
  '&:hover': {
  backgroundColor:'#F0F0F0',
  },
});

const DateButton = styled('button')({
  fontFamily:'Futura Bk BT',
  fontSize:'18px',
  fontWeight:400,
  lineHeight:'21.6px',
  letterSpacing:'0.05em',
  textAlign:'center',
  color:'#06555C',
  backgroundColor:'transparent',
  border:'1px solid #E1BD52',
  padding:'10px 20px',
  borderRadius:'0px',
  display:'flex',
  alignItems:'center',
  gap:'10px',
  cursor:'pointer',
  width:'193px',
});

const DeliveryButton = styled('button')({
  fontFamily:'Futura Bk BT',
  fontSize:'18px',
  fontWeight:400,
  lineHeight:'21.6px',
  letterSpacing:'0.05em',
  textAlign:'center',
  color:'#06555C',
  backgroundColor:'transparent',
  border:'1px solid #E1BD52',
  padding:'10px 20px',
  borderRadius:'0px',
  display:'flex',
  alignItems:'center',
  gap:'10px',
  cursor:'pointer',
  width:'238px',
});

const StatusButton = styled('button')({
  fontFamily:'Futura Bk BT',
  fontSize:'18px',
  fontWeight:400,
  lineHeight:'21.6px',
  letterSpacing:'0.05em',
  textAlign:'center',
  color:'#06555C',
  backgroundColor:'transparent',
  border:'1px solid #E1BD52',
  padding:'10px 40px',
  borderRadius:'0px',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  cursor:'pointer',
  width:'140px',
  gap:'20px',
});

const BatchButton = styled('button')({
  width:'108px',
  height:'44px',
  position:'absolute',
  top:'139px',
  left:'1020px',
  backgroundColor:'#06555C',
  fontFamily:'Futura Bk BT',
  fontSize:'18px',
  fontWeight:400,
  lineHeight:'21.6px',
  textAlign:'center',
  color:'#FFFFFF',
  border:'none',
  cursor:'pointer',
  '&:hover': {
  backgroundColor:'#054E50',
  },
});

const DeliveryDropdownOuter = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  width: '212px',
  height: '289px',
  top: '44px', // Position below button
  left: 0,
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
}));

const DeliveryDropdownInner = styled('div')({
  position: 'absolute',
  width: '196px',
  height: '274px',
  top: '8px',
  left: '8px',
  border: '0.8px solid #E1BD52',
  backgroundColor: '#FFFFFF',
  overflowY: 'auto',
});

const DeliveryDropdownItem = styled('div')({
  fontFamily: 'Futura Lt BT',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '16.8px',
  letterSpacing: '0.05em',
  color: '#0A6169',
  padding: '10px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#0A6169',
    color: '#FFFFFF',
  },
});


const times = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
];

const MainPage = () => {
  const [activeOption,setActiveOption] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [orders,setOrders] = useState([]);
  const [selectedOrder,setSelectedOrder] = useState(null);
  const [isDeliveryTimeDropdownVisible,setIsDeliveryTimeDropdownVisible] = useState(false);
  const [isStatusDropdownVisible,setIsStatusDropdownVisible] = useState(false);
  const [isOrdersDropdownVisible,setIsOrdersDropdownVisible] = useState(false);
  

  useEffect(() => {
    const fetchOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const sortedOrders = [...ordersData].sort(
        (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
      );
      setOrders(sortedOrders);
      setSelectedOrder(sortedOrders[0]);
    };
    if (activeOption === 'ORDERS') {
      fetchOrders();
    }
  }, [activeOption]);

  const toggleStatusDropdown = () => {
    setIsStatusDropdownVisible((prev) => !prev);
  };

  const toggleOrdersDropdown = () => {
    setIsOrdersDropdownVisible((prev) => !prev);
  };

  const toggleDeliveryTimeDropdown = () => {
    setIsDeliveryTimeDropdownVisible((prev) => !prev);
  };

  return (
    <LayoutContainer>
      <HeaderTemplate/>
      <SidebarContainer>
        <SidebarTemplate onOptionSelect={setActiveOption}/>
      </SidebarContainer>
      <MainContainer>
        {activeOption === 'ORDERS' && (
          <>
            <BatchButton>Batch</BatchButton>
            <OrderListContainer>
              <ButtonGroup>
                <OrdersButton onMouseEnter={() => setIsOrdersDropdownVisible(true)}
                 onMouseLeave={() => setIsOrdersDropdownVisible(false)}>Orders</OrdersButton>
                 {isOrdersDropdownVisible && (
                  <DropdownContainer isVisible={isOrdersDropdownVisible}>
                    <DropdownInner>
                      <DropdownItem>All Orders</DropdownItem>
                      <DropdownItem>New Orders</DropdownItem>
                      <DropdownItem>Completed Orders</DropdownItem>
                      <DropdownItem>Cancelled Orders</DropdownItem>
                    </DropdownInner>
                  </DropdownContainer>
                )}
                <DateButton>
                <img src={CalendarIcon} alt="Calendar Icon" style={{width:'24px',height:'24px',marginRight:'10px'}}/>
                  12-11-2024
                </DateButton>
                <DeliveryButton
                 onMouseEnter={() => setIsDeliveryTimeDropdownVisible(true)}
                 onMouseLeave={() => setIsDeliveryTimeDropdownVisible(false)}
                 style={{ position: 'relative' }} // Make the button a relative reference
                 >
                <img
                  src={DeliveryIcon}
                  alt="Delivery Icon"
                  style={{ width: '24px', height: '24px', marginRight: '10px' }}
                    />
                Delivery Time
  <img
    src={DropdownIcon}
    alt="Dropdown Icon"
    style={{ width: '16px', height: '16px', marginLeft: '8px' }}
  />


  {isDeliveryTimeDropdownVisible && (
    <div
      style={{
        position: 'absolute',
        top: '44px', 
        left: '0',
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
        width: '212px',
        height: '289px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          border: '0.8px solid #E1BD52',
          width: '196px',
          height: '274px',
          backgroundColor: '#FFFFFF',
        }}
      >
        {times.map((time, index) => (
          <div
            key={index}
            style={{
              fontFamily: 'Futura Lt BT',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '16.8px',
              letterSpacing: '0.05em',
              padding: '10px',
              cursor: 'pointer',
              textAlign: 'left',
              color: '#0A6169',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0A6169', e.target.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent', e.target.style.color = '#0A6169')}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  )}
</DeliveryButton>

                  {/* {isDeliveryTimeDropdownVisible && (
                 <DeliveryDropdownOuter>
                  <DeliveryDropdownInner>
                    {times.map((time, index) => (
                    <DeliveryDropdownItem key={index}>{time}</DeliveryDropdownItem>
                    ))}
                  </DeliveryDropdownInner>
                </DeliveryDropdownOuter>
              )} */}

                <StatusButton onClick={toggleStatusDropdown}>
                  Status
                <img src={DropdownIcon} alt="Dropdown Icon" style={{width:'16px',height:'16px',marginLeft:'8px'}}/>
                </StatusButton>
                {isStatusDropdownVisible && (
                 <DropdownContainer>
                 <DropdownInner>
                 <DropdownItem>Pending</DropdownItem>
                 <DropdownItem>In Kitchen</DropdownItem>
                 <DropdownItem>Ready</DropdownItem>
                 </DropdownInner>
                 </DropdownContainer>
                )}
              </ButtonGroup>
              {orders.map((order) => (
                <OrderCard
                  key={order.orderId}
                  orderNumber={order.orderId}
                  orderTime={new Date(order.orderTime).toLocaleTimeString()}
                  status={order.status}
                  items={order.items}
                  deliveryTime={new Date(order.deliveryTime).toLocaleTimeString()}
                  customerName={order.customerName}
                  address={order.deliveryAddress}
                  onClick={() => setSelectedOrder(order)}
                />
              ))}
            </OrderListContainer>
            {selectedOrder && (
            <OrderDetailsContainer>
            <OrderDetails order={selectedOrder}/>
            </OrderDetailsContainer>
            )}
          </>
        )}
      </MainContainer>
    </LayoutContainer>
  );
};
export default MainPage; 