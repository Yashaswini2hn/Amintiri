import React from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import HeaderTemplate from "../components/Templates/HeaderTemplate";
import UserGear from "../assests/UserGear.svg";
import ChefHat from "../assests/ChefHat.svg";
import AddUser from "../assests/AddUser.svg";
import CaretDown from "../assests/CaretDown.svg";

const LayoutContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#FFFFFF",
});

const HeaderContainer = styled("div")({
  position: "fixed",
  top: 0,
  width: "100%",
  height: "84px",
  zIndex: 100,
  backgroundColor: "#FFFFFF",
  borderBottom: "1px solid #E1BD52",
});

const SidebarContainer = styled("div")({
  width: "141px",
  height: "calc(100vh - 84px)",
  background: "#FFFFFF",
  border: "none",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  position: "fixed",
  top: "84px",
  left: 0,
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  paddingTop: "20px",
});

const SidebarItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
});

const SidebarIcon = styled("div")({
  width: "80px",
  height: "80px",
  border: "1px solid #E1BD52",
  backgroundColor: "#E1BD52",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SidebarText = styled("span")({
  fontSize: "16px",
  color: "#06555C",
  textAlign: "center",
  fontFamily: "Futura Md BT",
});

const MainContainer = styled("div")({
  flexGrow: 1,
  marginLeft: "141px",
  paddingTop: "142px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
});

const Title = styled("h1")({
  width: "165px",
  height: "41px",
  fontFamily: "Futura Md BT",
  fontSize: "34px",
  fontWeight: "400",
  lineHeight: "40.8px",
  color: "#06555C",
  marginBottom: "30px",
});

const FormContainer = styled("form")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  justifyContent: "center",
});

const InputField = styled("input")({
  width: "454px",
  height: "60px",
  border: "1px solid #E1BD52",
  borderRadius: "4px",
  fontFamily: "Futura Md BT",
  fontSize: "20px",
  fontWeight: "400",
  lineHeight: "24px",
  letterSpacing: "0.05em",
  padding: "0 10px",
  outline: "none",
  color: "#06555C",
  "&::placeholder": {
    color: "#06555C", // Ensure placeholder color matches the text
  },
});

const SelectField = styled("select")({
  width: "454px",
  height: "60px",
  border: "1px solid #E1BD52",
  borderRadius: "4px",
  fontFamily: "Futura Md BT",
  fontSize: "20px",
  fontWeight: "400",
  lineHeight: "24px",
  letterSpacing: "0.05em",
  padding: "0 10px",
  outline: "none",
  color: "#06555C",
  appearance: "none",
  backgroundImage: `url(${CaretDown})`, // Add the CaretDown icon
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  backgroundSize: "16px",
});

const SaveButton = styled("button")({
  gridColumn: "1 / 3",
  width: "454px",
  height: "60px",
  backgroundColor: "#06555C",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "4px",
  fontFamily: "Futura Md BT",
  fontSize: "24px",
  fontWeight: "400",
  lineHeight: "28.8px",
  cursor: "pointer",
  textAlign: "center",
  margin: "40px auto 0",
});

const AddUserPage = () => {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    console.log("User information saved.");
    navigate("/mainpage"); 
  };

  return (
    <LayoutContainer>
      <HeaderContainer>
        <HeaderTemplate/>
      </HeaderContainer>
      <SidebarContainer>
        <SidebarItem onClick={() => navigate("/admin")}>
          <SidebarIcon>
            <img src={UserGear} alt="Admin" style={{ width: "50%"}}/>
          </SidebarIcon>
          <SidebarText>ADMIN</SidebarText>
        </SidebarItem>
        <SidebarItem onClick={() => navigate("/staff")}>
          <SidebarIcon>
            <img src={ChefHat} alt="Staff" style={{ width: "50%"}}/>
          </SidebarIcon>
          <SidebarText>STAFF</SidebarText>
        </SidebarItem>
        <SidebarItem>
          <SidebarIcon>
            <img src={AddUser} alt="Add" style={{ width: "50%"}}/>
          </SidebarIcon>
          <SidebarText>ADD</SidebarText>
        </SidebarItem>
      </SidebarContainer>
      <MainContainer>
        <Title>ADD USER</Title>
        <FormContainer onSubmit={handleSave}>
          <InputField placeholder="Name" />
          <InputField placeholder="Contact Number" />
          <InputField placeholder="Email ID" />
          <SelectField>
            <option value="">Role</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </SelectField>
          <InputField placeholder="Password" />
          <SaveButton type="submit">Save</SaveButton>
        </FormContainer>
      </MainContainer>
    </LayoutContainer>
  );
};

export default AddUserPage;
