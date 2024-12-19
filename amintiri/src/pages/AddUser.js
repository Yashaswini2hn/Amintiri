import React, { useState } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import HeaderTemplate from "../components/Templates/HeaderTemplate";
import UserGear from "../assests/UserGear.svg";
import ChefHat from "../assests/ChefHat.svg";
import AddUser from "../assests/AddUser.svg";
import CaretDownIcon from "../assests/CaretDown.svg";
import Apis from "../Utils/APIService/Apis"

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
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  position: "fixed",
  top: "84px",
  left: 0,
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
  fontFamily: "Futura Md BT",
  fontSize: "34px",
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
  padding: "0 10px",
  color: "#06555C",
  "&::placeholder": {
    color: "#06555C",
  },
});

const DropdownContainer = styled("div")({
  position: "relative",
  width: "454px",
  height: "60px",
  border: "1px solid #E1BD52",
  borderRadius: "4px",
  fontFamily: "Futura Md BT",
  fontSize: "20px",
  color: "#06555C",
  backgroundColor: "#FFFFFF",
});

const DropdownHeader = styled("div")({
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
});

const DropdownList = styled("ul")({
  position: "absolute",
  top: "60px",
  left: 0,
  width: "100%",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E1BD52",
  zIndex: 100,
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const DropdownItem = styled("li")(({ isSelected }) => ({
  padding: "10px",
  backgroundColor: isSelected ? "#E1BD52" : "transparent",
  color: isSelected ? "#FFFFFF" : "#06555C",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#E1BD52",
    color: "#FFFFFF",
  },
}));

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
  cursor: "pointer",
  margin: "40px auto 0",
});

const AddUserPage = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const roles = ["ADMIN", "KITCHEN STAFF", "DELIVERY MANAGER", "DISPATCH STAFF"];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  const handleSave = (e) => {
    
    e.preventDefault();

    const userData = {
      name,
      contactNumber,
      email,
      role: selectedRole,
      password,
    };

    Apis.createUser(userData)
      .then(() => {
        console.log("User created successfully");
        navigate("/mainpage");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <LayoutContainer>
      <HeaderContainer>
        <HeaderTemplate />
      </HeaderContainer>
      <SidebarContainer>
        <SidebarItem onClick={() => navigate("/")}>
          <SidebarIcon>
            <img src={UserGear} alt="Admin" style={{ width: "50%" }} />
          </SidebarIcon>
          <SidebarText>ADMIN</SidebarText>
        </SidebarItem>
        <SidebarItem onClick={() => navigate("/staff")}>
          <SidebarIcon>
            <img src={ChefHat} alt="Staff" style={{ width: "50%" }} />
          </SidebarIcon>
          <SidebarText>STAFF</SidebarText>
        </SidebarItem>
        <SidebarItem>
          <SidebarIcon>
            <img src={AddUser} alt="Add" style={{ width: "50%" }} />
          </SidebarIcon>
          <SidebarText>ADD</SidebarText>
        </SidebarItem>
      </SidebarContainer>
      <MainContainer>
        <Title>ADD USER</Title>
        <FormContainer onSubmit={handleSave}>
          <InputField placeholder="Name" onChange={(e) => setName(e.target.value)}/>
          <InputField placeholder="Contact Number" onChange={(e) => setContactNumber(e.target.value)} />
          <InputField placeholder="Email ID"  onChange={(e) => setEmail(e.target.value)}/>
          <DropdownContainer>
            <DropdownHeader onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {selectedRole || "Role"}
              <img src={CaretDownIcon} alt="CaretDown Icon" style={{ width: "24px", height: "24px" }} />
            </DropdownHeader>
            {isDropdownOpen && (
              <DropdownList>
                {roles.map((role) => (
                  <DropdownItem
                    key={role}
                    isSelected={selectedRole === role}
                    onClick={() => handleRoleSelect(role)}
                  >
                    {role}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownContainer>
          <InputField placeholder="Password" onChange={(e) => setPassword(e.target.value)}  />
          <SaveButton type="submit">Save</SaveButton>
        </FormContainer>
      </MainContainer>
    </LayoutContainer>
  );
};

export default AddUserPage;
