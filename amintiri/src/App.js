import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MainPage from './pages/MainPage';
import LandingPage from './pages/LandingPage';
import StaffPage from './pages/Staff';
import AddUserPage from './pages/AddUser';
import Customers from './pages/Customers';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/adduser" element={<AddUserPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
