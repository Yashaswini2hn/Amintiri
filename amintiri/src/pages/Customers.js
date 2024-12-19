import React, { useState } from 'react';
import { styled } from '@mui/system';
import HeaderTemplate from '../components/Templates/HeaderTemplate';
import SidebarTemplate from '../components/Templates/SidebarTemplate';
import SearchIcon from '../assests/Search.svg';
import ArrowDropdownIcon from '../assests/arrow_drop_down (1).svg';
import CalendarIcon from '../assests/calender.svg';
import CustomerDetails from '../components/Molecules/CustomerDetails';
import CustomerCard from '../components/Molecules/CustomerCard';

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
  position: 'relative', // Ensures absolute positioning for CustomerDetails
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
  const [customers] = useState([
    {
      customerName: 'Ramesh Yadav',
      mobileNumber: '9145687994',
      address: '#51, 2nd Cross, Kuvempu Nagar, Bengaluru',
      items: [
        { itemName: 'Classic Black Forest Cake', productWeight: '500 gms' },
        { itemName: 'Saffron Rasmalai Cake (Eggless)', productWeight: '1 Kg' },
        { itemName: 'Tres Leches Dapper', productWeight: '500 gms' },
      ],
    },
    {
      customerName: 'Preetham H G',
      mobileNumber: '7463264711',
      address: '#08, 1st Stage, 3rd Cross, Giri Nagar, Bengaluru',
      items: [
        { itemName: 'Tiramisu Cake', productWeight: '500 gms' },
        { itemName: 'Classic Black Forest Cake', productWeight: '500 gms' },
      ],
    },
    {
      customerName: 'Jithendra Patel',
      mobileNumber: '8752468472',
      address: '#01, 2nd main road, Shivaji Nagar, Bengaluru',
      items: [
        { itemName: 'Saffron Rasmalai Cake (Eggless)', productWeight: '1 Kg' },
      ],
    },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]); // Default to first customer

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
            <img src={ArrowDropdownIcon} alt="Dropdown Icon" />
          </Button>
          <Button>
            <img src={CalendarIcon} alt="Calendar Icon" />
            12-11-2024
          </Button>
        </TopBarContainer>

        {customers.map((customer, index) => (
          <CustomerCard
            key={index}
            customerName={customer.customerName}
            mobileNumber={customer.mobileNumber}
            deliveryAddress={customer.address}
            isActive={selectedCustomer.customerName === customer.customerName}
            onClick={() => setSelectedCustomer(customer)}
          />
        ))}

        {selectedCustomer && (
          <CustomerDetails customer={selectedCustomer} />
        )}
      </MainContainer>
    </LayoutContainer>
  );
};

export default Customers;
