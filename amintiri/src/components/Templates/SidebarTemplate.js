import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SidebarContainer = styled(Box)({
  width: '178px',
  height: '924px',
  position: 'relative',
  top: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '16px',
  gap: '50px',
  marginLeft: '10px',
  marginTop: '-50px',
});

const SidebarOption = styled(Typography)(({ isActive }) => ({
  fontFamily: 'Futura BK BT',
  fontSize: '20px',
  fontWeight: 400,
  lineHeight: '24px',
  textAlign: 'left',
  textDecoration: isActive ? 'underline' : 'none', // Apply underline only when active
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
  cursor: 'pointer',
  color: isActive ? '#000' : '#383838', // Change color for active state if needed
}));

const SidebarTemplate = () => {
  const [activeOption, setActiveOption] = useState(''); // State to store active option

  const handleOptionClick = (option) => {
    setActiveOption(option); // Set clicked option as active
  };

  return (
    <SidebarContainer>
      {['ORDERS', 'CUSTOMERS', 'BATCHES', 'GROUPS', 'DELIVERY EXECUTIVES', 'DELIVERY'].map((option) => (
        <SidebarOption
          key={option}
          isActive={activeOption === option}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </SidebarOption>
      ))}
    </SidebarContainer>
  );
};

export default SidebarTemplate;
