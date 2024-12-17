import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled(Box)({
  width: '130px',
  height: '924px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '16px',
  paddingTop: '30px', // Adjust this to move options upwards
  gap: '40px', // Adjust gap between options to match the second image
  marginLeft: '0px', // Reduce left margin to align closer to the sidebar
  boxShadow: '0px 1px 4px 0px #00000026',
});

const SidebarOption = styled(Typography)(({ isActive }) => ({
  fontFamily: 'Futura BK BT',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '24px',
  textAlign: 'left',
  textDecoration: isActive ? 'underline' : 'none',
  textUnderlinePosition: 'from-font',
  textDecorationSkipInk: 'none',
  cursor: 'pointer',
  color: isActive ? '#000' : '#383838',
  marginLeft: '10px', // Adjust left margin for consistent alignment
  marginTop: '0px', // Remove additional top margin
}));

const SidebarTemplate = ({ onOptionSelect }) => {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState('');

  const handleOptionClick = (option) => {
    setActiveOption(option);
    if (onOptionSelect) {
      onOptionSelect(option);
    }

    const optionToPathMap = {
      ORDERS: '/mainpage',
      CUSTOMERS: '/customers',
      BATCHES: '/batches',
      GROUPS: '/groups',
      'DELIVERY EXECUTIVES': '/delivery-executives',
      DELIVERY: '/delivery',
    };
    navigate(optionToPathMap[option]);
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
