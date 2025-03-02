import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import Notification from '../components/Notification';
import  logo  from '../images/logo-white.svg';

/** Widths for the open vs. closed states */
const drawerWidthOpen = 215;
const drawerWidthClosed = 72;

/** Reusable transition for open/close */
const openedMixin = (theme) => ({
  width: drawerWidthOpen,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: drawerWidthClosed,
  [theme.breakpoints.up('sm')]: {
    width: drawerWidthClosed,
  },
});

/** Styled Drawer */
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: open ? drawerWidthOpen : drawerWidthClosed,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'flex-start',
  }));

/** Main content container */
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidthClosed}px`,
    // ...(open && {
    //   marginLeft: `${drawerWidthOpen}px`,
    //   transition: theme.transitions.create('margin', {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    // }),
  })
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

//   Event Handlers
  const handleLogout = () => {
    logout();
    setNotification('Logout successful!')
    navigate('/login');
    };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ 
        display: 'flex' }}>
      <CssBaseline />
      {/* Conditionally rendering toggle button Icon/Spacing */}
      {open ? (
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        edge="start"
        sx={{
          mb: 'auto',
          zIndex: 1300,
          top: 11,
          left: `calc(${drawerWidthOpen}px + 27px)`,
          transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        position: 'fixed',
        color: '#fff',
        background: 'linear-gradient(205deg, rgba(21,212,209,1) 5%, rgba(14,195,250,1) 16%, rgba(26,124,228,1) 80%);',
        filter: 'drop-shadow(1px 1px 3px rgb(96, 131, 201));'
        }}
      >
        {open ? <ChevronLeftIcon sx={{fontSize:'1.9rem'}}/> : <MenuIcon sx={{fontSize:'1.9rem'}} />}
      </IconButton>
      ) : (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              mb: 'auto',
              zIndex: 1300,
              top: 11,
              left: `calc(${drawerWidthClosed}px + 27px)`,
              transition: theme.transitions.create('left', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            position: 'fixed',
            color: '#fff',
            background: 'linear-gradient(205deg, rgba(21,212,209,1) 5%, rgba(14,195,250,1) 16%, rgba(26,124,228,1) 80%);',
            filter: 'drop-shadow(1px 1px 3px rgb(96, 131, 201));'
            }}
          >
            {open ? <ChevronLeftIcon sx={{fontSize:'1.9rem'}}/> : <MenuIcon sx={{fontSize:'1.9rem'}} />}
          </IconButton>
      )}
      {/* --------------Navbar starts here----------------- */}
      <Drawer variant="permanent" open={open}
        PaperProps={{
          sx: {
            background: 'linear-gradient(-95deg, rgba(21,212,209,1) 0%, rgba(14,195,250,1) 6%, rgba(26,124,228,1) 70%);',
            color: '#fff',
            filter: 'drop-shadow(2px 0px 3px #8594b2);',
            border: 'none;'
          },
        }}
      >
        {/* ----------------Navbar Header--------------- */}
        <DrawerHeader sx={{padding: 1}}>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                {/* Logo and App title goes here  */}
                {open ? (
                    <><img src={logo} alt="Logo white" style={{ width: '50px', marginRight: '8px' }} /><h3 className="fredoka-heavy" style={{ lineHeight: '.68' }}>NIMBUS</h3></>
                ) : (
                    <img src={logo} alt="Logo white" style={{ width: '50px'}} />
                )}
            </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {/* ---------------Home link------------------ */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.25rem'
                }}
              >
                <HomeIcon 
                sx={{
                    fontSize: '1.75rem'
                }} />
              </ListItemIcon>
              {open && <ListItemText 
              primary="Home" 
              disableTypography={true} 
              sx={{ color: '#fff', 
                    fontFamily: '"Montserrat",serif', 
                    letterSpacing: .5,  
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    lineHeight: '.9'
                }} />}
            </ListItemButton>
          </ListItem>

          {/* ----------------Products link --------------*/}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to="/products"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.25rem'
                }}
              >
                <ShoppingCartIcon  
                sx={{
                    fontSize: '1.75rem'
                }}/>
              </ListItemIcon>
              {open && <ListItemText 
              primary="Products" 
              disableTypography={true}
              sx={{ color: '#fff',
                    fontFamily: '"Montserrat",serif', 
                    letterSpacing: .5, 
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    lineHeight: '.9'
               }} />}
            </ListItemButton>
          </ListItem>

          {/* ---------------Add Product link--------------- */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to="/add-product"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem'
                }}
              >
                <AddBoxIcon 
                sx={{
                    fontSize: '1.75rem'
                }} />
              </ListItemIcon>
              {open && <ListItemText 
              primary="Add Product" 
              disableTypography={true}
              sx={{ color: '#fff',
                    fontFamily: '"Montserrat",serif', 
                    letterSpacing: .5, 
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    lineHeight: '.9'
               }} />}
            </ListItemButton>
          </ListItem>
          {/*------------------Login/Logout Link---------------*/}
          <ListItem disablePadding sx={{ display: 'block' }}>
            {/* If there is a user logged in, display Logout Link */}
            {token ? (
                <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: '#fff'
                  }}
                >
                  <LogoutIcon 
                  sx={{
                      fontSize: '1.75rem'
                  }}/>
                </ListItemIcon>
                {open && <ListItemText 
                primary="Logout" 
                disableTypography={true}
                sx={{ color: '#fff',
                      fontFamily: '"Montserrat",serif', 
                      letterSpacing: .5, 
                      fontWeight: 500,
                      fontSize: '1.15rem',
                    lineHeight: '.9'
                 }} />}
              </ListItemButton>
            ) : (
                // If there is no user logged in, display login link
                <ListItemButton
              component={Link}
              to="/login"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <LoginIcon 
                sx={{
                    fontSize: '1.75rem'
                }}/>
              </ListItemIcon>
              {open && <ListItemText 
              primary="Login" 
              disableTypography={true}
              sx={{ color: '#fff',
                    fontFamily: '"Montserrat",serif', 
                    letterSpacing: .5, 
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    lineHeight: '.9'
               }} />}
            </ListItemButton>
            )}  
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
      <Notification message={notification} clearMessage={() => setNotification('')} />
        <Outlet />
      </Main>
    </Box>
  );
}