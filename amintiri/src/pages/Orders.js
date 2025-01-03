import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate.js';
import SidebarTemplate from '../components/Templates/SidebarTemplate.js';
import CalendarIcon from '../assests/calender.svg';
import DeliveryIcon from '../assests/delivery.svg';
import DropdownIcon from '../assests/arrow_drop_down (1).svg';
import SortByIcon from '../assests/SortBy.svg';
import SearchIcon from '../assests/Search.svg';
import OrderCard from '../components/Molecules/OrderCard.js';
import OrderDetails from '../components/Molecules/OrderDetails.js';
// import { ordersData } from '../components/Molecules/OrdersData';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Apis from '../Utils/APIService/Apis.js';
import Loader from '../components/Atoms/Loader.js';
import Pagination from '../components/Molecules/Pagination.js'

const LayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%', // Ensures the container spans the full width
  height: '100vh',
  overflowX: 'hidden',
  '@media (max-width:1200px)': {
    flexDirection: 'column',
  },
});

const SidebarContainer = styled('div')({
  width: '130px',
  backgroundColor: '#FFFFFF',
  position: 'fixed',
  top: '84px',
  bottom: 0,
  left: 0,
  overflow: 'hidden',
  boxShadow: "0px 1px 4px 0px #00000026",
  '@media (max-width:1200px)': {
    width: '100%',
    position: 'relative',
  },
});

const MainContainer = styled('div')({
  flexGrow: 1,
  marginTop: '84px',
  marginLeft: '178px',
  padding: '20px',
  overflowY: 'scroll',
  overflowX: 'hidden',
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
  display: "flex",
  flexDirection: "column",
  width: '100%',
  height: '100%'
});

const OrderDetailsContainer = styled('div')({
  width: '390px',
  '@media (max-width:1200px)': {
    width: '100%',
    marginTop: '20px',
  },
});

const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '15px',
  margin: '20px',
  justifyContent: 'flex-start',
  marginTop: '0px',

  // position: 'relative',
});

// const OrdersButton = styled('button')({
//   fontFamily: 'Futura Bk BT',
//   fontSize: '14px',
//   fontWeight: 400,
//   lineHeight: '18px',
//   letterSpacing: '0.05em',
//   textAlign: 'center',
//   color: '#06555C',
//   backgroundColor: 'transparent',
//   border: '1px solid #E1BD52',
//   borderRadius: '0px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   cursor: 'pointer',
//   width: '130px',
//   transition: 'border-color 0.3s ease',
//   '&:hover': {
//     borderColor: '#a24463',
//     borderWidth: '2px'
//   },
// });

const SearchBar = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '19.2px',
  letterSpacing: '0.05em',
  color: '#383838',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '40px',
  padding: '0 10px',
  border: 'none',
  borderRadius: '4px',
  marginLeft: '-20px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  gap: '5px',
  marginTop: '3px',
});

const StatusBar = styled('div')({
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '19.2px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  color: '#383838',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginLeft: '20px',
  gap: '8px',
});

const StatusDropdownIcon = styled('img')({
  width: '16px',
  height: '16px',
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
  marginTop: '1px'
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
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '18px',
  letterSpacing: '0.05em',
  textAlign: 'center',
  color: '#06555C',
  backgroundColor: 'transparent',
  border: '1px solid #E1BD52',
  padding: '10px 20px',
  borderRadius: '0px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  width: '185px',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: '#a24463',
    borderWidth: '2px'
  },
});

const DeliveryButton = styled('button')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '18px',
  letterSpacing: '0.05em',
  textAlign: 'center',
  color: '#06555C',
  backgroundColor: 'transparent',
  border: '1px solid #E1BD52',
  padding: '10px 20px',
  borderRadius: '0px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  width: '230px',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: '#a24463',
    borderWidth: '2px'
  },
});

const DeliveryDropdownOuter = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  width: '215px',
  height: '380px',
  top: '44px',
  left: '0',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px 0px #00000040',
  zIndex: 1000,
  marginTop: '2px',
}));

const DeliveryDropdownInner = styled('div')({
  position: 'absolute',
  width: '200px',
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
  textAlign: 'left',
  padding: '10px',
  cursor: 'pointer',
  color: isSelected ? '#FFFFFF' : '#0A6169',
  backgroundColor: isSelected ? '#0A6169' : 'transparent',
  '&:hover': {
    backgroundColor: '#0A6169',
    color: '#FFFFFF',
  },
}));

const SortByButton = styled('button')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '18px',
  letterSpacing: '0.05em',
  textAlign: 'center',
  color: '#06555C',
  backgroundColor: 'transparent',
  border: '1px solid #E1BD52',
  padding: '10px 40px',
  borderRadius: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: '130px',
  gap: '20px',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: '#a24463',
    borderWidth: '2px'
  },
});

const SortByDropdownOuter = styled('div')(({ isVisible }) => ({
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

const SortByDropdownInner = styled('div')({
  position: 'absolute',
  width: '116px',
  height: '106px',
  top: '8px',
  left: '8px',
  border: '0.8px solid #E1BD52',
  backgroundColor: '#FFFFFF',
});

const SortByDropdownItem = styled('div')(({ isSelected }) => ({
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

const StatusDropdownOuter = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  width: '130px',
  height: '120px',
  top: '40px',
  left: '0',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px 0px #00000040',
  zIndex: 1000,
  marginTop: '0px',
  marginLeft: '230px'
}));

const StatusDropdownInner = styled('div')({
  position: 'absolute',
  width: '116px',
  height: '106px',
  top: '8px',
  left: '8px',
  // border: '0.8px solid #E1BD52',
  backgroundColor: '#FFFFFF',
});

const StatusDropdownItem = styled('div')(({ isSelected }) => ({
  fontFamily: 'Futura Lt BT',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '16.8px',
  alignItems: 'center',
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
  width: '108px',
  height: '39px',
  backgroundColor: isDisabled ? '#0A616940' : '#06555C',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '18px',
  textAlign: 'center',
  // margintop:'50px',
  marginLeft: '530px',
  color: isDisabled ? '#FFFFFF' : '#FFFFFF',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: isDisabled ? '#0A616940' : '#054E50',
  },
}));

const CalendarDropdown = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  // position: 'relative',
  top: '45px',
  left: '200px',
  background: '#FFFFFF',
  border: '1px solid #E1BD52',
  zIndex: 1000,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '0px',
  padding: '10px',
  width: '300px',
}));

const OrderDateButton = styled('button')({
  width: '243px',
  height: '40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  margin: '0',
  marginRight: '10px', // Ensure spacing between adjacent elements
  border: '1.5px solid #E1BD52',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '16.8px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
  color: '#E1BD52',
  // position: 'relative', // Important for proper positioning
  top: '-20px', // Adjust alignment to move closer to the desired location
  right: '-652px', // Horizontal adjustment
  '&:hover': {
    borderColor: '#A24463',
  },
});

const VerticalLine = styled('div')({
  width: '1.5px',
  height: '40px',
  backgroundColor: '#E1BD52',
  alignSelf: 'center',
});

const OrderDateText = styled('span')({
  fontFamily: 'Futura Bk BT',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '16.8px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
  color: '#06555C',
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
  const [activeOption, setActiveOption] = useState('ORDERS');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDeliveryTimeDropdownVisible, setIsDeliveryTimeDropdownVisible] = useState(false);
  const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);
  const [isSortByDropdownVisible, setIsSortByDropdownVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCalendar1Visible, setIsCalendar1Visible] = useState(false); // State for the first calendar
  const [isCalendar2Visible, setIsCalendar2Visible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
  );

  const calendarRef = useRef(null);

  const [orderFilters, setOrderFilters] = useState({
    // date: new Date().toISOString().split('T')[0] + "T00:00:00"
  });

  const statusOptions = ['Pending', 'In Kitchen', 'Ready'];
  const sortByOptions = ['OrderID', 'Delivery Date', 'Order Date'];


  const [selectedCards, setSelectedCards] = useState([]);


  const userId = localStorage.getItem('userid');
  const authToken = localStorage.getItem('token');

  // const OrdersStatus = [{ label: 'New Orders', value: 'PENDING' },
  // { label: 'Completed Orders', value: 'BATCHED' }, { label: 'Cancelled Orders', value: 'CANCELLED' }]


  const handleOutsideClick = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsCalendarVisible(false);
    }
  };

  useEffect(() => {
    setIsLoading(true); // Start loading
    const today = new Date().toISOString().split('T')[0];
    fetchOrdersByDate(today);
  }, []);

  const fetchOrdersByDate = (orderDate, currentPage = page, currentSize = size) => {
    setIsLoading(true);

    const userId = localStorage.getItem("userid");
    const authToken = localStorage.getItem("token");

    console.log("UserId:", userId);
    console.log("AuthToken:", authToken);

    Apis.getOrdersByDate(orderDate, currentPage, currentSize)
      .then((response) => {
        const mappedOrders = response.data.map((order) => ({
          orderId: order.orderId || 'N/A',
          orderName: order.orderName || 'N/A',
          orderTime: new Date(order.orderDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          orderDate: new Date(order.orderDateTime).toLocaleDateString(),
          status: order.orderStatus?.status || 'Unknown',
          items: order.items.map((item) => ({
            itemName: item.productName || 'Unnamed Product',
            productWeight: item.productSize || 'Unknown Size',
            quantity: item.quantity || 0,
            status: item.itemStatus?.status || 'Pending',
            customizationNotes: item.customizationNotes || 'No Notes',
          })),
          deliveryTime: new Date(order.deliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          customerName: order.customerName || 'Unknown Customer',
          deliveryAddress: order.deliveryAddress || 'No Address Provided',
        }));

        setOrders(mappedOrders);

        // Set the first order as the default selectedOrder
        if (mappedOrders.length > 0) {
          setSelectedOrder(mappedOrders[0]);
        }
      })
      .catch((error) => console.error('Error fetching orders by date:', error))
      .finally(() => setIsLoading(false));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchOrdersByDate(selectedDate, newPage, size);
  };

  const handleDateChange = (date) => {
    if (!date) return;
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setSelectedDate(formattedDate); // Update state with only the date
    setIsCalendarVisible(false); // Close calendar after selection
    fetchOrdersByDate(formattedDate); // Fetch orders for the selected date
  };

  const handleCheckboxChange = (orderId, isChecked) => {
    console.log("order id .....", orderId)
    setSelectedCards((prevSelected) =>
      isChecked
        ? [...prevSelected, orderId]
        : prevSelected.filter((id) => id !== orderId)
    );
  };

  const handleStatusSelect = (status) => {
    setActiveDropdown(status); // Set the selected status
    handlestatusChange(status.toUpperCase()); // Update the state with the selected status
    setIsStatusDropdownVisible(false); // Close the dropdown after selection
  };


  const handleDeliveryTimeSelect = (time) => {
    const convertTo24HourFormat = (time) => {
      const [timePart, modifier] = time.split(" "); // Split time and AM/PM
      let [hours, minutes] = timePart.split(":").map(Number); // Extract hours and minutes

      if (modifier === "PM" && hours !== 12) {
        hours += 12; // Convert PM hours (except 12 PM)
      } else if (modifier === "AM" && hours === 12) {
        hours = 0; // Convert 12 AM to 00
      }

      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    const formatDate = (date) => {
      return date.toISOString().slice(0, 19); // Remove the milliseconds and 'Z' from the ISO string
    };

    setOrderFilters((prevFilters) => {
      const formattedTime = convertTo24HourFormat(time);
      const datePart = prevFilters?.date ? prevFilters.date.split("T")[0] : new Date().toISOString().split("T")[0];
      const deliveryTimeStart = new Date(`${datePart}T${formattedTime}`);
      const deliveryTimeEnd = new Date(deliveryTimeStart.getTime() + 2 * 60 * 60 * 1000);

      return {
        ...prevFilters,
        deliveryTimeStart: formatDate(deliveryTimeStart),
        deliveryTimeEnd: formatDate(deliveryTimeEnd),
      };
    });
  };

  useEffect(() => {
    fetchFilterdOrders();
  }, [orderFilters]);


  const fetchFilterdOrders = () => {

    console.log("Filter .......", orderFilters)

    setIsLoading(true); // Start loading
  }


  // Function to handle status change
  const handlestatusChange = (orderType) => {
    setOrderFilters((prevFilters) => ({
      ...prevFilters, // Keep the existing filters
      status: orderType, // Add or update the status key
    }));
  };
  // fetchOrdersBySelectedStatus

  const toggleCalendar1 = () => {
    setIsCalendar1Visible((prev) => !prev);
    setIsCalendar2Visible(false);
  };

  const toggleCalendar2 = () => {
    setIsCalendar2Visible((prev) => !prev);
    setIsCalendar1Visible(false);
  };

  const handleRowsPerPageChange = (newSize) => {
    setSize(newSize);
    setPage(0); // Reset to the first page
  };


  const handleSearchByOrderName = () => {
    if (!searchInput.trim()) {
      alert("Please enter an Order Name.");
      return;
    }
  
    setIsLoading(true); // Start loading
  
    Apis.searchOrdersByOrderName(searchInput)
      .then((response) => {
        const order = response.data; // Assuming the response contains a single order or an array
  
        if (order) {
          const mappedOrder = {
            orderId: order.orderId || "N/A",
            orderName: order.orderName || "N/A",
            orderTime: new Date(order.orderDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            orderDate: new Date(order.orderDateTime).toLocaleDateString(),
            status: order.orderStatus?.status || "Unknown",
            items: order.items.map((item) => ({
              itemName: item.productName || "Unnamed Product",
              productWeight: item.productSize || "Unknown Size",
              quantity: item.quantity || 0,
              status: item.itemStatus?.status || "Pending",
              customizationNotes: item.customizationNotes || "No Notes",
            })),
            deliveryTime: new Date(order.deliveryTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            customerName: order.customerName || "Unknown Customer",
            deliveryAddress: order.deliveryAddress || "No Address Provided",
          };
  
          setOrders([mappedOrder]); // Update orders with the fetched order
          setSelectedOrder(mappedOrder); // Set the selected order for details view
        } else {
          alert("No orders found with this Order Name.");
        }
      })
      .catch((error) => {
        console.error("Error searching order by Order Name:", error);
        alert("Error occurred while searching. Please try again.");
      })
      .finally(() => setIsLoading(false)); // Stop loading
  };
  

  const handleBatchOrders = () => {
    if (selectedCards.length >= 3) {
      Apis.batchOrders(selectedCards)
        .then((response) => {
          alert("Batched successfully!");
          setSelectedCards([]);
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
      <Loader isLoading={isLoading} />
      <MainContainer>
        {!isLoading && activeOption === 'ORDERS' && (
          <>
            <OrderListContainer
              style={{ background: '#06555C' }}
            >

              <ButtonGroup
                style={{ background: '', padding: '10px', }}
              >


                <BatchButton
                  isDisabled={selectedCards.length < 3}
                  disabled={selectedCards.length < 3}
                  onClick={handleBatchOrders}>
                  Batch
                </BatchButton>

                <OrderDateButton onClick={toggleCalendar1}>
                  <span style={{ color: '#E1BD52' }}>Order Date</span>
                  <VerticalLine />
                  {/* <OrderDateText>12-11-2024</OrderDateText> */}
                  <img
                    src={CalendarIcon}
                    alt="Calendar Icon"
                    style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                  {selectedDate || "Select Date"} {/* Display only the formatted date */}
                </OrderDateButton>
                <CalendarDropdown isVisible={isCalendar1Visible}>
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate ? new Date(selectedDate) : new Date()} />
                </CalendarDropdown>

              </ButtonGroup>


              <ButtonGroup style={{ background: 'orange' }} >
                <SearchBar>
                  <img
                    src={SearchIcon}
                    alt="Search Icon"
                    style={{ width: '16px', height: '16px', marginRight: '8px', cursor: 'pointer' }}
                    onClick={handleSearch} // Call API on click
                  />
                  <input
                    type="text"
                    placeholder="Enter OrderId (e.g., 261760)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} // Update searchInput state
                    style={{
                      border: "none",
                      outline: "none",
                      width: "200px",
                      fontFamily: "Futura Bk BT",
                      fontSize: "14px",
                    }}
                  />
                </SearchBar>
                <StatusBar onMouseEnter={() => setIsStatusDropdownVisible(true)}
                  onMouseLeave={() => setIsStatusDropdownVisible(false)}
                  style={{ position: 'relative' }}>
                  STATUS
                  <StatusDropdownIcon src={DropdownIcon} alt="Dropdown Icon" />
                </StatusBar>

                {isStatusDropdownVisible && (
                  <StatusDropdownOuter isVisible={isStatusDropdownVisible}
                    onMouseEnter={() => setIsStatusDropdownVisible(true)}
                    onMouseLeave={() => setIsStatusDropdownVisible(false)}>
                    <StatusDropdownInner>
                      {statusOptions.map((status, index) => (
                        <StatusDropdownItem
                          key={index}
                          onClick={() => handleStatusSelect(status)}
                        >
                          {status}
                        </StatusDropdownItem>
                      ))}
                    </StatusDropdownInner>

                  </StatusDropdownOuter>
                )}
                <DateButton onClick={toggleCalendar2} style={{ marginLeft: '20px' }}>
                  <img
                    src={CalendarIcon}
                    alt="Calendar Icon"
                    style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                  {selectedDate || "Select Date"}
                </DateButton>
                <CalendarDropdown isVisible={isCalendar2Visible}>
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate ? new Date(selectedDate) : new Date()} />
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
                            onClick={() => handleDeliveryTimeSelect(time)}
                          >
                            {time}
                          </DeliveryDropdownItem>
                        ))}
                      </DeliveryDropdownInner>

                    </DeliveryDropdownOuter>
                  )}
                </DeliveryButton>

                <SortByButton
                  onMouseEnter={() => setIsSortByDropdownVisible(true)} // Open dropdown on hover
                  onMouseLeave={() => setIsSortByDropdownVisible(false)} // Close dropdown when leaving

                >
                  SortBy
                  <img
                    src={SortByIcon}
                    alt="SortBy Icon"
                    style={{ width: '16px', height: '16px', marginLeft: '8px' }}
                  />
                  {isSortByDropdownVisible && (
                    <SortByDropdownOuter
                    // onMouseEnter={() => setIsSortByDropdownVisible(true)} // Keep open when hovering over dropdown
                    // onMouseLeave={() => setIsSortByDropdownVisible(false)} // Close when cursor leaves dropdown
                    >
                      <SortByDropdownInner>
                        {sortByOptions.map((option, index) => (
                          <SortByDropdownItem
                            key={index}
                            onClick={() => {
                              setActiveDropdown(option); // Update selected option
                              handlestatusChange(option.toUpperCase()); // Trigger state change
                            }}
                          >
                            {option}
                          </SortByDropdownItem>
                        ))}
                      </SortByDropdownInner>
                    </SortByDropdownOuter>
                  )}
                </SortByButton>

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
                    isActive={selectedOrder?.orderId === order.orderId}
                  />
                ))}


            


            </OrderListContainer>

            {selectedOrder && (
              <OrderDetailsContainer style={{ background: 'pink' }}>
                <OrderDetails order={selectedOrder} />
              </OrderDetailsContainer>
            )}
          </>
        )}
      </MainContainer>
      {/* <Pagination
        currentPage={page}
        rowsPerPage={size}
        totalRows={totalOrders}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      /> */}

    </LayoutContainer>
  );
};
export default MainPage; 