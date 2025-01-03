import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Orders from './pages/Orders';
import LandingPage from './pages/LandingPage';
import StaffPage from './pages/Staff';
import AddUserPage from './pages/AddUser';
import Customers from './pages/Customers';
import Batches from './pages/Batches';
import Groups from './pages/GroupsPage';
import DeliveryExecutives from './pages/DeliveryExecutives';
import DeliveryPage from './pages/Delivery';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/adduser" element={<AddUserPage />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/batches" element={<Batches />} /> 
          <Route path="/groups" element={<Groups />} />
          <Route path="/delivery-executives" element={<DeliveryExecutives />} /> 
          <Route path="/delivery" element={<DeliveryPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
