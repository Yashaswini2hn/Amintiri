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
  padding: '14px',
  paddingTop: '30px',
  gap: '40px',
  marginLeft: '0px',
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
  textDecorationColor: '#000000',
  textDecorationSkipInk: 'none',
  cursor: 'pointer',
  color: isActive ? '#E1BD52' : '#383838', 
  marginLeft: '10px',
  marginTop: '0px',
  transition: 'color 0.3s ease', 
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
          isActive={activeOption === option} // Pass active state
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </SidebarOption>
      ))}
    </SidebarContainer>
  );
};

export default SidebarTemplate;
