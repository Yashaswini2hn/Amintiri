import React, { useEffect,useState } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import HeaderTemplate from "../components/Templates/HeaderTemplate";
import UserGear from "../assests/UserGear.svg";
import ChefHat from "../assests/ChefHat.svg";
import AddUser from "../assests/AddUser.svg";
import CaretDown from "../assests/CaretDown.svg";
import Apis from  "../Utils/APIService/Apis";

const LayoutContainer = styled("div")({
  display: "flex",
  height: "100vh",
  flexDirection: "column",
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
  marginTop: "84px",
  marginLeft: "141px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  height: "calc(100vh - 84px)",
});

const FormOuter = styled("div")({
  width: "827px",
  height: "563px",
  boxShadow: "0px 4px 4px 0px #00000040",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
});

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "454px",
});

const FieldWrapper = styled("div")({
  position: "relative",
  width: "454px",
  height: "60px",
  border: "1px solid #E1BD52",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  padding: "0 10px",
});

const StyledText = styled("span")({
  position: "absolute",
  top: "50%",
  left: "12px",
  transform: "translateY(-50%)",
  fontFamily: "Futura Md BT",
  fontSize: "16px",
  fontWeight: "400",
  color: "#06555C",
});

const InputField = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  fontSize: "16px",
  color: "#000000",
  background: "transparent",
  fontFamily: "Futura Md BT",
  paddingLeft: "50px",
});

const SelectFieldWrapper = styled(FieldWrapper)({
  position: "relative",
  cursor: "pointer",
});

const DropdownOptions = styled("div")({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E1BD52",
  borderRadius: "4px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  zIndex: 10,
});

const DropdownItem = styled("div")({
  padding: "10px 12px",
  fontFamily: "Futura Md BT",
  fontSize: "16px",
  color: "#000000",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#F5F5F5",
  },
});

const SelectDropdownIcon = styled("img")({
  width: "16px",
  height: "16px",
  marginLeft: "auto",
});

const LoginButton = styled("button")({
  width: "454px",
  height: "60px",
  fontSize: "20px",
  fontWeight: "400",
  backgroundColor: "#06555C",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

const LandingPage = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState("Select a Store");
  const [stores, setStores] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleDropdownClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
  
    Apis.getStores()
      .then((response) => {
        console.log("Stores fetched:", response.data);
        setStores(response.data); 
      })
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  const handleSelect = (store) => {
    setSelectedStore(store);
    setDropdownVisible(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    const loginData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
  
    Apis.loginUser(loginData)
      .then((response) => {
        console.log("Login Success:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/mainpage");
      })
      .catch((err) => {
        console.error("Login Error:", err);
        alert("Invalid email or password");
      });
  };
  

  const navigate = useNavigate();

  return (
    <LayoutContainer>
      <HeaderContainer>
        <HeaderTemplate />
      </HeaderContainer>
      <SidebarContainer>
        <SidebarItem>
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
        <SidebarItem onClick={()  => navigate("/addUser")}>
          <SidebarIcon>
            <img src={AddUser} alt="Add" style={{ width: "50%" }} />
          </SidebarIcon>
          <SidebarText>ADD</SidebarText>
        </SidebarItem>
      </SidebarContainer>
      <MainContainer>
        <FormOuter>
          <FormContainer onSubmit={handleLogin}>
            <SelectFieldWrapper onClick={handleDropdownClick}>
              <StyledText>{selectedStore}</StyledText>
              <SelectDropdownIcon src={CaretDown} alt="Dropdown Icon" />
              {isDropdownVisible && (
                <DropdownOptions>
                  {stores.map((store,index) => ( <DropdownItem
                      key={index}
                      onClick={() => handleSelect(store.name)} 
                    >
                      {store.name}
                    </DropdownItem>
                  ))}
                  
                </DropdownOptions>
              )}
            </SelectFieldWrapper>
            <FieldWrapper>
              <StyledText>Email</StyledText>
              <InputField id="email" type="email"  onChange={(e) => setEmail(e.target.value)}/>
            </FieldWrapper>
            <FieldWrapper>
              <StyledText>Password</StyledText>
              <InputField id="password" type="password"   onChange={(e) => setPassword(e.target.value)} />
            </FieldWrapper>
            <LoginButton type="submit">Login</LoginButton>
          </FormContainer>
        </FormOuter>
      </MainContainer>
    </LayoutContainer>
  );
};

export default LandingPage;
