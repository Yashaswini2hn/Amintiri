import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD83D',
    },
    secondary: {
      main: '#375A7F',
    },
    neutral:{
      light: '#F4F4F4',
      main: '#FFFFFF',
      dark: '#222222',
      muted: 'rgba(0, 0, 0, 0.6)',
    },
    status:{
      inKitchen: '#E3B21A',
      ready: '#7FB800',
      pending: '#E67E22',
      delivering: '#FFD83D',
      delaying: '#E74C3C',
      delivered: '#375A7F',
    },
    border:{
      primary: '#D8D8D8',
    },
    background:{
      default: '#FFFFFF',
      paper: '#F4F4F4',
    },
    text:{
      primary: '#333333',
      secondary: '#555555',
    },
    action: {
      active: '#FFD83D',
      hover: '#FFEC99',
    },
  },
  typography: {
    fontFamily: 'Karla',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: '#555555',
    },
    caption: {
      fontSize: '0.625rem',
      color: '#888888',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shadows: ['none', '0px 2px 10px rgba(0, 0, 0, 0.1)'],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
        contained: {
          backgroundColor: '#FFD83D',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#FFEC99',
          },
        },
        outlined: {
          borderColor: '#FFD83D',
          color: '#375A7F',
          '&:hover': {
            backgroundColor: 'rgba(255, 216, 61, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: '1px solid #D8D8D8',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          marginBottom: '16px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          color: '#333333',
        },
        caption: {
          color: '#888888',
        },
      },
    },
  },
});

export default theme;
