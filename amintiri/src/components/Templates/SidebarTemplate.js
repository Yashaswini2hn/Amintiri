import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarContainer = styled(Box)({
  width: "130px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "14px",
  paddingTop: "30px",
  gap: "40px",
  marginLeft: "0px",
  boxShadow: "0px 1px 4px 0px #00000026",

  '@media (min-width: 1200px)': {
    width: '130px',
    height: '100vh',
    right:'20px',
    gap:'60px'
  },
});

const SidebarOption = styled(Typography)(({ isActive }) => ({
  fontFamily: "Futura BK BT",
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: "24px",
  textAlign: "left",
  textDecoration: isActive ? "underline" : "none",
  textUnderlinePosition: "from-font",
  textDecorationColor: isActive ? "#06555C" : "transparent",
  textDecorationThickness: "2px",
  textDecorationSkipInk: "none",
  cursor: "pointer",
  color: isActive ? "#E1BD52" : "#383838",
  marginLeft: "10px",
  marginTop: "0px",
  transition: "color 0.3s ease",
}));

const SidebarTemplate = ({ onOptionSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeOption, setActiveOption] = useState("");

  const optionToPathMap = {
    ORDERS: "/mainpage",
    CUSTOMERS: "/customers",
    BATCHES: "/batches",
    GROUPS: "/groups",
    "DELIVERY EXECUTIVES": "/delivery-executives",
    DELIVERY: "/delivery",
  };

  useEffect(() => {
    const currentOption = Object.keys(optionToPathMap).find(
      (key) => optionToPathMap[key] === location.pathname
    );
    setActiveOption(currentOption || "");
  }, [location.pathname]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    if (onOptionSelect) onOptionSelect(option);
    navigate(optionToPathMap[option]);
  };

  return (
    <SidebarContainer>
      {Object.keys(optionToPathMap).map((option) => (
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
