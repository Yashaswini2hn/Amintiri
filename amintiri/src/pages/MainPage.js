import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import CalendarIcon from '../assests/calender.svg';
import DeliveryIcon from '../assests/delivery.svg';
import DropdownIcon from '../assests/arrow_drop_down (1).svg';
import OrderCard from '../components/Molecules/OrderCard';
import OrderDetails from '../components/Molecules/OrderDetails';
// import { ordersData } from '../components/Molecules/OrdersData';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Apis from '../Utils/APIService/Apis';
import Loader from '../components/Atoms/Loader'

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
  height: '128px',
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
  height: '112px',
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
  top: '44px',
  left: '90px',
  background: '#FFFFFF',
  border: '1px solid #E1BD52',
  zIndex: 1000,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
  borderRadius: '0px',
  padding: '10px',
  width: '300px', 
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0] + "T00:00:00"
  );


  const [selectedCards, setSelectedCards] = useState([]); 


  const userId = localStorage.getItem('userid');
  const authToken = localStorage.getItem('token');

  

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     const sortedOrders = [...ordersData].sort(
  //       (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
  //     );
  //     setOrders(sortedOrders);
  //     setSelectedOrder(sortedOrders[0]);
  //   };
  //   if (activeOption === 'ORDERS') {
  //     fetchOrders();
  //   }
  // }, [activeOption]);

  // useEffect(() => {
  //   Apis.getAllOrders()
  //   .then((response) => {
  //     console.log("Stores fetched:", response.data);
  //     setOrders(response.data);
      
  //     // setStores(response.data); 
  //   })
  //   .catch((error) => console.error("Error fetching stores:", error));

  // }, [activeOption]);
 
  useEffect(() => {
    setIsLoading(true); // Start loading
    Apis.getAllOrders()
      .then((response) => {
        console.log('Orders fetched:', response.data);

        const mappedOrders = response.data.map((order) => ({
          orderId: order.orderId || 'N/A',
          orderName: order.orderName || 'N/A',
          orderTime: new Date(order.orderDateTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          orderDate: new Date(order.orderDateTime).toLocaleDateString(),
          status: order.orderStatus?.status || 'Unknown',
          items: order.items.map((item) => ({
            itemName: item.productName || 'Unnamed Product',
            productWeight: item.productSize || 'Unknown Size',
            quantity: item.quantity || 0,
            status: item.itemStatus?.status || 'Pending',
            customizationNotes: item.customizationNotes || 'No Notes',
          })),
          deliveryTime: new Date(order.deliveryTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          customerName: order.customerName || 'Unknown Customer',
          mobileNumber: order.customerMobile || 'No Mobile Number',
          deliveryAddress: order.deliveryAddress || 'No Address Provided',
        }));

        setOrders(mappedOrders);
        setSelectedOrder(mappedOrders[0]);
      })
      .catch((error) => console.error('Error fetching orders:', error))
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  }, [activeOption]);

  const handleCheckboxChange = (orderId, isChecked) => {
    console.log("order id ....." ,orderId )
    setSelectedCards((prevSelected) =>
      isChecked
        ? [...prevSelected, orderId]
        : prevSelected.filter((id) => id !== orderId)
    );
  };
  
  const fetchOrdersByStatus = (status) => {
    Apis.getAllOrders()
      .then((response) => {
        const mappedOrders = response.data.map((order) => ({
          orderId: order.orderId || "N/A",
          orderName: order.orderName || "N/A",
          orderTime: new Date(order.orderDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          orderDate: new Date(order.orderDateTime).toLocaleDateString(),
          status: order.orderStatus?.status || "Unknown",
          items: order.items.map((item) => ({
            itemName: item.productName || "Unnamed Product",
            productWeight: item.productSize || "Unknown Size",
            quantity: item.quantity || 0,
            status: item.itemStatus?.status || "Pending",
            customizationNotes: item.customizationNotes || "No Notes",
          })),
          deliveryTime: new Date(order.deliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          customerName: order.customerName || "Unknown Customer",
          deliveryAddress: order.deliveryAddress || "No Address Provided",
        }));
  
        const filteredOrders = mappedOrders.filter(
          (order) => order.status === status
        );
  
        setOrders(filteredOrders);
      })
      .catch((error) => console.error("Error fetching orders by status:", error));
  };
  
  
  const handleDropdownSelect = (orderType) => {
    setActiveDropdown(orderType);
  
    const statusMap = {
      "New Orders": "PENDING",
      "Completed Orders": "BATCHED",
      "Cancelled Orders": "CANCELLED",
    };
  
    const selectedStatus = statusMap[orderType];
    if (selectedStatus) {
      fetchOrdersByStatus(selectedStatus);
    }
  };

  const fetchOrdersByDate = (formattedDate) => {
    console.log("Fetching orders for date:", formattedDate); 
  
    Apis.getOrdersByDate(formattedDate)
      .then((response) => {
        const mappedOrders = response.data.map((order) => ({
          orderId: order.orderId || "N/A",
          orderName: order.orderName || "N/A",
          orderTime: new Date(order.orderDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          orderDate: new Date(order.orderDateTime).toLocaleDateString(),
          status: order.orderStatus?.status || "Unknown",
          items: order.items.map((item) => ({
            itemName: item.productName || "Unnamed Product",
            productWeight: item.productSize || "Unknown Size",
            quantity: item.quantity || 0,
            status: item.itemStatus?.status || "Pending",
            customizationNotes: item.customizationNotes || "No Notes",
          })),
          deliveryTime: new Date(order.deliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          customerName: order.customerName || "Unknown Customer",
          deliveryAddress: order.deliveryAddress || "No Address Provided",
        }));
        setOrders(mappedOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders by date:", error.response || error.message);
      });
  };
  
  const handleDateChange = (date) => {
    console.log("Selected Date from Calendar:", date);
    const formattedDate = date.toISOString().split('T')[0] + "T00:00:00";
    console.log("Formatted Date:", formattedDate); 
    setSelectedDate(formattedDate); 
    setIsCalendarVisible(false); 
    fetchOrdersByDate(formattedDate); 
  };

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const fetchOrdersBySelectedStatus = (status) => {
    Apis.fetchOrdersBySelectedStatusAPI(status)
      .then((response) => {
        const mappedOrders = response.data
          .filter((order) => order.orderStatus?.status === status)
          .map((order) => ({
            orderId: order.orderId || "N/A",
            orderName: order.orderName || "N/A",
            orderTime: new Date(order.orderDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            orderDate: new Date(order.orderDateTime).toLocaleDateString(),
            status: order.orderStatus?.status || "Unknown",
            items: order.items.map((item) => ({
              itemName: item.productName || "Unnamed Product",
              productWeight: item.productSize || "Unknown Size",
              quantity: item.quantity || 0,
              status: item.itemStatus?.status || "Pending",
              customizationNotes: item.customizationNotes || "No Notes",
            })),
            deliveryTime: new Date(order.deliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            customerName: order.customerName || "Unknown Customer",
            deliveryAddress: order.deliveryAddress || "No Address Provided",
          }));
  
        setOrders(mappedOrders); 
      })
      .catch((error) => console.error("Error fetching orders by selected status:", error));
  };

  const handleBatchOrders = () => {
    if (selectedCards.length >= 3) {
      Apis.batchOrders(selectedCards) 
        .then((response) => {
          alert("Batched successfully!");
          setSelectedCards([]);
          // fetchOrdersBySelectedStatus(activeDropdown);
        })
        .catch((error) => {
          console.error("Error batching orders:", error);
          alert("Failed to batch orders. Please try again.");
        });
    } else {
      alert("Select at least 3 orders to batch.");
    }
  };
  
  
  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate onOptionSelect={setActiveOption} />
      </SidebarContainer>
      <Loader isLoading={isLoading} /> {/* Show loader */}
      <MainContainer>
        {!isLoading && activeOption === 'ORDERS' && ( // Ensure proper condition check
          <>
            <BatchButton
              isDisabled={selectedCards.length < 3}
              disabled={selectedCards.length < 3}
              onClick={handleBatchOrders}
            >
              Batch
            </BatchButton>
  
            <OrderListContainer>
              <ButtonGroup>
                <OrdersButton
                  onMouseEnter={() => setIsOrdersDropdownVisible(true)}
                  onMouseLeave={() => setIsOrdersDropdownVisible(false)}
                  style={{ position: 'relative' }}
                >
                  All Orders
                  <img
                    src={DropdownIcon}
                    alt="Dropdown Icon"
                    style={{ width: '16px', height: '16px', marginLeft: '8px' }}
                  />
                  {isOrdersDropdownVisible && (
                    <OrdersDropdownOuter
                      isVisible={isOrdersDropdownVisible}
                      onMouseEnter={() => setIsOrdersDropdownVisible(true)}
                      onMouseLeave={() => setIsOrdersDropdownVisible(false)}
                    >
                      <OrdersDropdownInner>
                        {['New Orders', 'Completed Orders', 'Cancelled Orders'].map(
                          (orderType, index) => (
                            <OrdersDropdownItem
                              key={index}
                              isSelected={activeDropdown === orderType}
                              onClick={() => handleDropdownSelect(orderType)}
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
                  <img
                    src={CalendarIcon}
                    alt="Calendar Icon"
                    style={{ width: '24px', height: '24px', marginRight: '10px' }}
                  />
                  {selectedDate ? selectedDate.split('T')[0] : 'Select Date'}
                </DateButton>
                <CalendarDropdown isVisible={isCalendarVisible}>
                  <Calendar onChange={handleDateChange} value={new Date(selectedDate)} />
                </CalendarDropdown>
              </ButtonGroup>
  
              {orders.map((order) => (
                <OrderCard
                  key={order.orderId}
                  orderNumber={order.orderName}
                  orderTime={order.orderTime}
                  orderDate={order.orderDate}
                  status={order.status}
                  items={order.items}
                  deliveryTime={order.deliveryTime}
                  customerName={order.customerName}
                  address={order.deliveryAddress}
                  onSelect={(selectedOrder) => setSelectedOrder(selectedOrder)}
                  onCheckboxChange={(isChecked) =>
                    handleCheckboxChange(order.orderId, isChecked)
                  }
                />
              ))}
            </OrderListContainer>
  
            {selectedOrder && (
              <OrderDetailsContainer>
                <OrderDetails order={selectedOrder} />
              </OrderDetailsContainer>
            )}
          </>
        )}
      </MainContainer>
    </LayoutContainer>
  );
  
};
export default MainPage; 