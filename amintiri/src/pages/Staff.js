import React, { useState } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import HeaderTemplate from "../components/Templates/HeaderTemplate";
import UserGear from "../assests/UserGear.svg";
import ChefHat from "../assests/ChefHat.svg";
import AddUser from "../assests/AddUser.svg";
import Apis from "../Utils/APIService/Apis";

const LayoutContainer = styled("div")({
  display: "flex",
  height: "100vh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
    gap: "30px",
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
    marginTop: "-10px",
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
    background: "#FFFFFF",
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
      lineHeight: "24px",
      letterSpacing: "0.05em",
      color: "#06555C",
      pointerEvents: "none",
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
    textAlign: "center",
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

const StaffPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();
  
      const loginData = { email, password };
  
      Apis.loginUser(loginData)
        .then((response) => {
          console.log("Login Success:", response.data);
          localStorage.setItem("token", response.data.token);
          navigate("/mainpage"); 
        })
        .catch((err) => {
          console.error("Login Error:", err);
          setError("Invalid email or password");
        });
    };

  return (
    <LayoutContainer>
        <HeaderContainer>
        <HeaderTemplate/>
      </HeaderContainer>
      <SidebarContainer>
        <SidebarItem onClick={()  => navigate("/login")}>
          <SidebarIcon>
            <img src={UserGear} alt="Admin" style={{width:"50%" }}/>
          </SidebarIcon>
          <SidebarText>ADMIN</SidebarText>
        </SidebarItem>
        <SidebarItem>
          <SidebarIcon>
            <img src={ChefHat} alt="Staff" style={{width:"50%" }}/>
          </SidebarIcon>
          <SidebarText>STAFF</SidebarText>
        </SidebarItem>
        <SidebarItem onClick={() => navigate("/adduser")}>
          <SidebarIcon>
            <img src={AddUser} alt="Add" style={{width:"50%" }}/>
          </SidebarIcon>
          <SidebarText>ADD</SidebarText>
        </SidebarItem>
      </SidebarContainer>
      <MainContainer>
        <FormOuter>
           <FormContainer onSubmit={handleLogin}>
           
            <StyledText >Email</StyledText>
            <InputField placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
             <StyledText>Password</StyledText>
              <InputField placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
          
            <LoginButton type="submit">Login</LoginButton>
          </FormContainer>
        </FormOuter>
      </MainContainer>  
    </LayoutContainer>
  );
};

export default StaffPage;
