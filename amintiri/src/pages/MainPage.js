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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


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
  overflowY: 'scroll', 
  height: 'calc(100vh - 84px)',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  scrollbarWidth: 'none', 
  '&::-webkit-scrollbar': {
    display: 'none', 
  },
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
  justifyContent: 'flex-start', 
  marginTop: '5px',
  marginLeft: '0px', 
  position: 'relative',
});

const OrdersButton = styled('button')({
  fontFamily:'Futura Bk BT',
  fontSize:'14px',
  fontWeight:400,
  lineHeight:'18px',
  letterSpacing:'0.05em',
  textAlign:'center',
  color:'#06555C',
  backgroundColor:'transparent',
  border:'1px solid #E1BD52',
  borderRadius:'0px',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  cursor:'pointer',
  width:'130px', 
  transition: 'border-color 0.3s ease', 
  '&:hover': {
    borderColor: '#a24463',
    borderWidth:'2px'
  },
});

const OrdersDropdownOuter = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  width: '130px',
  height: '158px',
  top: '44px', 
  left: 'translateY(-1px)',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px 0px #00000040',
  zIndex: 1000,
  marginTop:'1px'
}));

const OrdersDropdownInner = styled('div')({
  position: 'absolute',
  width: '110px',
  height: '142px',
  top: '8px',
  left: '8px',
  border: '0.8px solid #E1BD52',
  backgroundColor: '#FFFFFF',
});

const OrdersDropdownItem = styled('div')(({ isSelected }) => ({
  fontFamily: 'Futura Lt BT',
  fontSize: '10px',
  fontWeight: 400,
  lineHeight: '16.8px',
  letterSpacing: '0.05em',
  padding: '10px',
  cursor: 'pointer',
  color: isSelected ? '#FFFFFF' : '#0A6169',
  backgroundColor: isSelected ? '#0A6169' : 'transparent',
  '&:hover': {
    backgroundColor: '#0A6169',
    color: '#FFFFFF',
  },
}));

const DateButton = styled('button')({
  fontFamily:'Futura Bk BT',
  fontSize:'14px',
  fontWeight:400,
  lineHeight:'18px',
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
  width:'185px',
  transition: 'border-color 0.3s ease', 
  '&:hover': {
    borderColor: '#a24463',
    borderWidth:'2px'
  },
});

const DeliveryButton = styled('button')({
  fontFamily:'Futura Bk BT',
  fontSize:'14px',
  fontWeight:400,
  lineHeight:'18px',
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
  width:'230px',
  transition: 'border-color 0.3s ease', 
  '&:hover': {
    borderColor: '#a24463',
    borderWidth:'2px'
  },
});

const DeliveryDropdownOuter = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  width: '230px', 
  height: '380px',
  top: '44px', 
  left: '0',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px 0px #00000040', 
  zIndex: 1000,
  marginTop: '1px', 
}));

const DeliveryDropdownInner = styled('div')({
  position: 'absolute',
  width: '214px',
  height: '365px',
  top: '8px',
  left: '8px',
  border: '0.8px solid #E1BD52',
  backgroundColor: '#FFFFFF',
});

const DeliveryDropdownItem = styled('div')(({ isSelected }) => ({
  fontFamily: 'Futura Lt BT',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '16.8px',
  letterSpacing: '0.05em',
  textAlign:'left',
  padding: '10px',
  cursor: 'pointer',
  color: isSelected ? '#FFFFFF' : '#0A6169',
  backgroundColor: isSelected ? '#0A6169' : 'transparent',
  '&:hover': {
    backgroundColor: '#0A6169',
    color: '#FFFFFF',
  },
}));

const StatusButton = styled('button')({
  fontFamily:'Futura Bk BT',
  fontSize:'14px',
  fontWeight:400,
  lineHeight:'18px',
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
  width:'130px',
  gap:'20px',
  transition: 'border-color 0.3s ease', 
  '&:hover': {
    borderColor: '#a24463',
    borderWidth:'2px'
  },
});

const StatusDropdownOuter = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  width: '130px', 
  height: '120px',
  top: '44px', 
  left: '0',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px 0px #00000040', 
  zIndex: 1000,
  marginTop: '1px',
}));

const StatusDropdownInner = styled('div')({
  position: 'absolute',
  width: '116px',
  height: '106px',
  top: '8px',
  left: '8px',
  border: '0.8px solid #E1BD52', 
  backgroundColor: '#FFFFFF',
});

const StatusDropdownItem = styled('div')(({ isSelected }) => ({
  fontFamily: 'Futura Lt BT',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '16.8px',
  letterSpacing: '0.05em',
  padding: '10px',
  cursor: 'pointer',
  color: isSelected ? '#FFFFFF' : '#0A6169',
  backgroundColor: isSelected ? '#0A6169' : 'transparent',
  '&:hover': {
    backgroundColor: '#0A6169',
    color: '#FFFFFF',
  },
}));


const BatchButton = styled('button')(({ isDisabled }) => ({
  width:'108px',
  height:'44px',
  position:'absolute',
  top:'109px',
  left:'1000px',
  backgroundColor: isDisabled ? '#0A616940' : '#06555C',
  fontFamily:'Futura Bk BT',
  fontSize:'18px',
  fontWeight:400,
  lineHeight:'18px',
  textAlign:'center',
  color: isDisabled ? '#FFFFFF' : '#FFFFFF',
  border:'none',
  cursor:'pointer',
  '&:hover': {
    backgroundColor: isDisabled ? '#0A616940' : '#054E50',
  },
}));

const CalendarDropdown = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  top: '100%', // Opens just below the button
  left: 0,
  background: '#FFFFFF',
  border: '1px solid #E1BD52',
  zIndex: 1000,
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '5px',
  padding: '10px',
}));


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
  const [activeOption,setActiveOption] = useState('ORDERS');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [orders,setOrders] = useState([]);
  const [selectedOrder,setSelectedOrder] = useState(null);
  const [isDeliveryTimeDropdownVisible,setIsDeliveryTimeDropdownVisible] = useState(false);
  const [isStatusDropdownVisible,setIsStatusDropdownVisible] = useState(false);
  const [isOrdersDropdownVisible,setIsOrdersDropdownVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const [selectedCards, setSelectedCards] = useState([]); 
  

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

  const handleCheckboxChange = (orderId, isChecked) => {
    setSelectedCards((prevSelected) =>
      isChecked
        ? [...prevSelected, orderId]
        : prevSelected.filter((id) => id!== orderId)
    );
  };

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarVisible(false); // Close calendar on date selection
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
              <BatchButton isDisabled={selectedCards.length === 0} disabled={selectedCards.length === 0}>Batch</BatchButton>
            <OrderListContainer>
              <ButtonGroup>
              <OrdersButton
               onMouseEnter={() => setIsOrdersDropdownVisible(true)}
               onMouseLeave={() => setIsOrdersDropdownVisible(false)}
               style={{ position: 'relative' }} 
               >
               Orders
               {isOrdersDropdownVisible && (
               <OrdersDropdownOuter
                isVisible={isOrdersDropdownVisible}
                onMouseEnter={() => setIsOrdersDropdownVisible(true)}
                onMouseLeave={() => setIsOrdersDropdownVisible(false)}
                >
               <OrdersDropdownInner>
               {['All Orders', 'New Orders', 'Completed Orders', 'Cancelled Orders'].map(
               (orderType, index) => (
               <OrdersDropdownItem
                key={index}
                isSelected={activeDropdown === orderType}
                onClick={() => setActiveDropdown(orderType)}
            >
              {orderType}
            </OrdersDropdownItem>
            )
            )}
           </OrdersDropdownInner>
           </OrdersDropdownOuter>
            )}
           </OrdersButton>

            <DateButton onClick={toggleCalendar}>
                <img src={CalendarIcon} alt="Calendar Icon" style={{width:'24px',height:'24px',marginRight:'10px'}}/>
                  {/* 12-11-2024 */}
                  {selectedDate.toLocaleDateString()}
                </DateButton>
                <CalendarDropdown isVisible={isCalendarVisible}>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </CalendarDropdown>
                <DeliveryButton
                 onMouseEnter={() => setIsDeliveryTimeDropdownVisible(true)}
                 onMouseLeave={() => setIsDeliveryTimeDropdownVisible(false)}
                 style={{ position: 'relative' }} 
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
                <DeliveryDropdownOuter
                 isVisible={isDeliveryTimeDropdownVisible}
                 onMouseEnter={() => setIsDeliveryTimeDropdownVisible(true)}
                 onMouseLeave={() => setIsDeliveryTimeDropdownVisible(false)}
                 >
                <DeliveryDropdownInner>
                {times.map((time, index) => (
                <DeliveryDropdownItem
                key={index}
               isSelected={activeDropdown === time}
             onClick={() => setActiveDropdown(time)}
          >
            {time}
          </DeliveryDropdownItem>
        ))}
      </DeliveryDropdownInner>
    </DeliveryDropdownOuter>
  )}
</DeliveryButton>
               
<StatusButton
  onMouseEnter={() => setIsStatusDropdownVisible(true)}
  onMouseLeave={() => setIsStatusDropdownVisible(false)}
  style={{ position: 'relative' }} 
>
  Status
  <img
    src={DropdownIcon}
    alt="Dropdown Icon"
    style={{ width: '16px', height: '16px', marginLeft: '8px' }}
  />

  {isStatusDropdownVisible && (
    <StatusDropdownOuter
      isVisible={isStatusDropdownVisible}
      onMouseEnter={() => setIsStatusDropdownVisible(true)}
      onMouseLeave={() => setIsStatusDropdownVisible(false)}
    >
      <StatusDropdownInner>
        {['Pending', 'In Kitchen', 'Ready'].map((status, index) => (
          <StatusDropdownItem
            key={index}
            isSelected={activeDropdown === status}
            onClick={() => setActiveDropdown(status)}
          >
            {status}
          </StatusDropdownItem>
        ))}
      </StatusDropdownInner>
    </StatusDropdownOuter>
  )}
</StatusButton>

                
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
                  onSelect={(selectedOrder) => setSelectedOrder(selectedOrder)}
                  onCheckboxChange={handleCheckboxChange}
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