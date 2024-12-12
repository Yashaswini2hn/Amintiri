import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import { customersData } from '../components/Molecules/CustomersData';
import SearchIcon from '../assests/Search.svg';
import ArrowDropdownIcon from '../assests/arrow_drop_down (1).svg';
import CalendarIcon from '../assests/calender.svg';
import MapIcon from '../assests/Map.svg';
import CustomerDetails from '../components/Molecules/CustomerDetails';

const LayoutContainer = styled('div')({
  display:'flex',
  height:'100vh',
});

const SidebarContainer = styled('div')({
  width:'178px',
  backgroundColor:'#FFFFFF',
  position:'fixed',
  top:'84px',
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
  flexDirection: 'column',
  gap: '20px',
});

const CardContainer = styled('div')({
  width:'950px',
  backgroundColor:'#FFFFFF',
  marginBottom:'15px',
  display:'flex',
  padding:'20px',
  borderRadius: '8px',
  boxShadow: '0px 1px 4px 0px #00000040',
  position: 'relative',
  marginLeft: '-10px',
  cursor: 'pointer', // To indicate it's clickable
});

const CheckboxContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '20px',
});

const Checkbox = styled('input')({
  appearance: 'none',
  position: 'absolute',
  top: '-15px',
  left: '15px',
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

const AddressContent = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  color: '#000000',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  lineHeight: '1.5',
  marginLeft: '-10px',
});

const MapViewLink = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: '#06555C',
  fontFamily: 'Futura Bk BT',
  fontSize: '16px',
  cursor: 'pointer',
});

const TopBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  marginBottom: '20px',
  marginLeft: '300px',
});

const CustomerDetailsContainer = styled('div')({
  width: '390px',
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
  marginLeft: '-220px',
});

const SearchInput = styled('input')({
  flex: 1,
  height: '100%',
  border: 'none',
  outline: 'none',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  fontWeight: '400',
  color: '#06555C',
  '::placeholder': {
    color: '#06555C',
  },
});

const SearchIconImage = styled('img')({
  width: '20px',
  height: '20px',
  marginRight: '10px',
});

const CollectionButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  border: '1px solid #E1BD52',
  width: '177px',
  height: '44px',
  cursor: 'pointer',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  color: '#06555C',
  gap: '10px',
});

const DateButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  border: '1px solid #E1BD52',
  width: '177px',
  height: '44px',
  cursor: 'pointer',
  fontFamily: 'Futura Bk BT',
  fontSize: '18px',
  color: '#06555C',
  gap: '10px',
});

const Customers = () => {
  const [activeOption, setActiveOption] = useState('CUSTOMERS');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    if (activeOption === 'CUSTOMERS') {
      setCustomers(customersData);
    }
  }, [activeOption]);

  useEffect(() => {
    const fetchCustomers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCustomers(customersData);
      setSelectedCustomer(customersData[0]); // Default first customer
    };
    fetchCustomers();
  }, []);

  return (
    <LayoutContainer>
      <HeaderTemplate />
      <SidebarContainer>
        <SidebarTemplate onOptionSelect={setActiveOption} />
      </SidebarContainer>
      <MainContainer>
        <TopBarContainer>
          <SearchInputContainer>
            <SearchIconImage src={SearchIcon} alt="Search Icon" />
            <SearchInput placeholder="Search" />
          </SearchInputContainer>
          <CollectionButton>
            Collections
            <img src={ArrowDropdownIcon} alt="Dropdown Icon" />
          </CollectionButton>
          <DateButton>
            <img src={CalendarIcon} alt="Calendar Icon" />
            12-11-2024
          </DateButton>
        </TopBarContainer>
        {customers.map((customer) => (
          <CardContainer
            key={customer.orderId}
            onClick={() => setSelectedCustomer(customer)}
          >
            <CheckboxContainer>
              <Checkbox type="checkbox" />
            </CheckboxContainer>
            <AddressContent>
              <div>{customer.customerName}</div>
              <div>Phone: {customer.mobileNumber}</div>
              <div>Address: {customer.deliveryAddress}</div>
            </AddressContent>
            <MapViewLink>
              <img src={MapIcon} alt="Map Icon" />
              Map View
            </MapViewLink>
          </CardContainer>
        ))}
        {selectedCustomer && (
          <CustomerDetailsContainer>
            <CustomerDetails customer={selectedCustomer} />
          </CustomerDetailsContainer>
        )}
      </MainContainer>
    </LayoutContainer>
  );
};

export default Customers;
