import React, { useState,useEffect } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import SearchIcon from '../assests/Search.svg';
import ArrowDropdownIcon from '../assests/arrow_drop_down (1).svg';
import CalendarIcon from '../assests/calender.svg';
import CustomerDetails from '../components/Molecules/CustomerDetails';
import CustomerCard from '../components/Molecules/CustomerCard';
import Apis from '../Utils/APIService/Apis';



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
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflowY: 'auto',
  position: 'relative', 
});

const TopBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  marginBottom: '20px',
});

const SearchInputContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '371px',
  height: '44px',
  border: '1px solid #E1BD52',
  paddingLeft: '10px',
  backgroundColor: '#FFFFFF',
  transition: 'border-color 0.3s ease', 
  '&:hover': {
    borderColor: '#a24463',
    borderWidth:'2px'
  },
});

const SearchInput = styled('input')({
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  color: '#06555C',
  '::placeholder': {
    color: '#06555C',
  },
});

const Button = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '177px',
  height: '44px',
  border: '1px solid #E1BD52',
  cursor: 'pointer',
  fontSize: '16px',
  color: '#06555C',
  gap: '10px',
  transition: 'border-color 0.3s ease', 
  '&:hover': {
    borderColor: '#a24463',
    borderWidth:'2px'
  },
});


const Customers = () => {
  const [customers, setCustomers] = useState([]); 
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Apis.getCustomers()
      .then((response) => {
        const customerData = response.data;
        const formattedCustomers = customerData.map((customer) => ({
          id: customer.id,
          name: customer.name,
          mobile: customer.mobile,
          addresses: customer.addresses,
        }));
        setCustomers(formattedCustomers);
        if (formattedCustomers.length > 0) {
          const firstCustomer = formattedCustomers[0];
          setSelectedCustomer(firstCustomer);
          fetchOrders(firstCustomer.id);
        }
      })
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  const fetchOrders = (customerId) => {
    Apis.getOrders(customerId)
      .then((response) => {
        const formattedOrders = response.data.map((order) => ({
          orderDate: new Date(order.order_date).toLocaleDateString(),
          items: order.items.map((item) => ({
            itemName: item.name,
            productWeight: item.size,
          })),
        }));
        setOrders(formattedOrders);
      })
      .catch((error) => console.error('Error fetching orders:', error));
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    fetchOrders(customer.id); // Fetch orders for the selected customer
  };

  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate />
      </SidebarContainer>
      <MainContainer>
        <TopBarContainer>
          <SearchInputContainer>
            <img src={SearchIcon} alt="Search Icon" style={{ width: '16px' }} />
            <SearchInput placeholder="Search" />
          </SearchInputContainer>
          <Button>
            Collections
            <img src={ArrowDropdownIcon} alt="Dropdown Icon"/>
          </Button>
          <Button>
            <img src={CalendarIcon} alt="Calendar Icon"/>
            12-11-2024
          </Button>
        </TopBarContainer>
         
        {customers.map((customer, index) => (
          <CustomerCard
            key={index}
            customerName={customer.name}
            mobileNumber={customer.mobile}
            deliveryAddress={customer.addresses[0]?.address_line1 || 'No address available'}
            isActive={selectedCustomer?.id === customer.id}
            onClick={() => handleCustomerClick(customer)}
          />
        ))}

        {selectedCustomer && <CustomerDetails customer={selectedCustomer} orders={orders} />}
      </MainContainer>
    </LayoutContainer>
  );
};

export default Customers;
