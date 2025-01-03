import React, { useState,useEffect,useRef } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import SearchIcon from '../assests/Search.svg';
import ArrowDropdownIcon from '../assests/arrow_drop_down (1).svg';
import CalendarIcon from '../assests/calender.svg';
import CustomerDetails from '../components/Molecules/CustomerDetails';
import CustomerCard from '../components/Molecules/CustomerCard';
import Apis from '../Utils/APIService/Apis';
import Loader from '../components/Atoms/Loader';
import Calendar from 'react-calendar';
import Pagination from '../components/Molecules/Pagination.js';

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
  overflow: 'hidden', 
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

const ControlContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  padding: '0 10px',
});

const ScrollableContainer = styled('div')({
  flex: 1,
  overflowY: 'auto',
  padding: '10px',
  borderRadius: '8px',
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

const CalendarDropdown = styled('div')(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  position: 'absolute',
  top: '69px',
  left: '360px',
  background: '#FFFFFF',
  border: '1px solid #E1BD52',
  zIndex: 1000,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
  borderRadius: '0px',
  padding: '10px',
  width: '300px', 
}));

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0); 
  const [size, setSize] = useState(10); 
  const [totalCustomers, setTotalCustomers] = useState(0); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCustomers(page, size);
  }, [page, size]);

  const fetchCustomers = (page, size) => {
    setIsLoading(true);
    Apis.getCustomers(page, size)
      .then((response) => {
        const formattedCustomers = response.data.content.map((customer) => ({
          id: customer.id,
          name: customer.name,
          mobile: customer.mobile,
          addresses: customer.addresses,
        }));
        setCustomers(formattedCustomers);
        setTotalCustomers(formattedCustomers.length);
        if (formattedCustomers.length > 0) {
          setSelectedCustomer(formattedCustomers[0]);
        }
      })
      .catch((error) => console.error('Error fetching customers:', error))
      .finally(() => setIsLoading(false));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newSize) => {
    setSize(newSize);
    setPage(0); // Reset to the first page
  };

  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate />
      </SidebarContainer>
      <Loader isLoading={isLoading} />
      <MainContainer>
        <ControlContainer>
          <SearchInputContainer>
            <img src={SearchIcon} alt="Search Icon" style={{ width: '16px' }} />
            <SearchInput
              type="text"
              placeholder="Search by name, phone, or address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInputContainer>
        </ControlContainer>
        <ScrollableContainer>
          {customers.map((customer, index) => (
            <CustomerCard
              key={index}
              customerName={customer.name}
              mobileNumber={customer.mobile}
              deliveryAddress={customer.addresses[0]?.address_line1 || 'No address available'}
              isActive={selectedCustomer?.id === customer.id}
              onClick={() => setSelectedCustomer(customer)}
            />
          ))}
        </ScrollableContainer>
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} orders={orders} />}
      </MainContainer>
      <Pagination
        currentPage={page}
        rowsPerPage={size}
        totalRows={totalCustomers}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </LayoutContainer>
  );
};

export default Customers;