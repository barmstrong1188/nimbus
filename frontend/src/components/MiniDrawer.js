import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
import logo from '../images/logo-white.svg';

const drawerWidthOpen = 215;
const drawerWidthClosed = 72;

/** A simple main container with no margin shifts **/
const Main = styled('main')(() => ({
  flexGrow: 1,
  padding: '1rem',
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:725px)');
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  // Toggle open/close
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* -----------------Toggle Button ------------------*/}
      { !isSmallScreen ? (
        <IconButton
        aria-label={open ? "Close Navbar" : "Open Navbar"}
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        sx={{
          position: 'fixed',
          top: 11,
          left: open
            ? `${drawerWidthOpen + 20}px`
            : `${drawerWidthClosed + 20}px`,
          zIndex: 9999,
          color: '#fff',
          background:
            'linear-gradient(205deg, rgba(21,212,209,1) 5%, rgba(14,195,250,1) 16%, rgba(26,124,228,1) 80%)',
          transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* if navbar is open, show chevron icon, if navbar is closed show menu icon */}
        {open ? (
          <ChevronLeftIcon sx={{ fontSize: '1.9rem' }} />
        ) : (
          <MenuIcon sx={{ fontSize: '1.9rem' }} />
        )}
      </IconButton>
      ) : (
        <IconButton
        aria-label={open ? "Close Navbar" : "Open Navbar"}
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        sx={{
          position: 'fixed',
          top: 11,
          left: open
            ? `${drawerWidthOpen + 20}px`
            : '20px',
          zIndex: 9999,
          color: '#fff',
          background:
            'linear-gradient(205deg, rgba(21,212,209,1) 5%, rgba(14,195,250,1) 16%, rgba(26,124,228,1) 80%)',
          transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {open ? (
          <ChevronLeftIcon sx={{ fontSize: '1.9rem' }} />
        ) : (
          <MenuIcon sx={{ fontSize: '1.9rem' }} />
        )}
      </IconButton>
      ) }
      {/* *********************Navbar starts here *****************/}
      <Drawer
        variant="permanent"
        open={open} 
        PaperProps={{
          sx: {
            position: 'fixed',
            zIndex: 9998,
            top: 0,
            left: 0,
            height: '100%',
            /** Animate width between open & closed. **/
            width: open ? drawerWidthOpen : drawerWidthClosed,
            display: isSmallScreen && !open ? 'none' : 'block',
            whiteSpace: 'nowrap',
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen * 1.2,
            }),
            background:
              'linear-gradient(-95deg, rgba(21,212,209,1) 0%, rgba(14,195,250,1) 6%, rgba(26,124,228,1) 70%)',
            color: '#fff',
            border: 'none',
            filter: 'drop-shadow(2px 0px 3px #8594b2)',
          },
        }}
      >
        {/*------------------ Drawer Header--------------------- */}
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
          {open ? (
            <>
              <img
                src={logo}
                alt="Logo white"
                height="50px"
                width="50px"
                style={{ marginRight: '8px' }}
              />
              <h3
                className="fredoka-heavy"
                style={{ lineHeight: '.68', margin: 0 }}
              >
                NIMBUS
              </h3>
            </>
          ) : (
            <img src={logo} alt="Logo white" style={{ width: '50px' }} />
          )}
        </Box>
        <Divider />

        <List>
          {/* ------------------------Home -----------------------*/}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              aria-label="Link to Home Page"
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
                }}
              >
                <HomeIcon sx={{ fontSize: '1.75rem' }} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Home"
                  disableTypography
                  sx={{
                    color: '#fff',
                    fontFamily: '"Montserrat",serif',
                    letterSpacing: 0.5,
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    lineHeight: '.9',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>

          {/* ----------------------Products --------------------*/}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              aria-label="Link to Products Page"
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
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: '1.75rem' }} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Products"
                  disableTypography
                  sx={{
                    color: '#fff',
                    fontFamily: '"Montserrat",serif',
                    letterSpacing: 0.5,
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    lineHeight: '.9',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>

          {/* ---------------------Add Product------------------ */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              aria-label="Link to add product page"
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
                }}
              >
                <AddBoxIcon sx={{ fontSize: '1.75rem' }} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Add Product"
                  disableTypography
                  sx={{
                    color: '#fff',
                    fontFamily: '"Montserrat",serif',
                    letterSpacing: 0.5,
                    fontWeight: 500,
                    fontSize: '1.15rem',
                    lineHeight: '.9',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>

          {/* -----------------------Login / Logout --------------*/}
          <ListItem disablePadding sx={{ display: 'block' }} aria-label="logout">
            {/* if there's a user token, give them the option to logout */}
            {token ? (
              <ListItemButton
                onClick={() => {
                  logout();
                  setNotification('Logout successful!');
                  navigate('/login');
                }}
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
                  }}
                >
                  <LogoutIcon sx={{ fontSize: '1.75rem' }} />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Logout"
                    disableTypography
                    sx={{
                      color: '#fff',
                      fontFamily: '"Montserrat",serif',
                      letterSpacing: 0.5,
                      fontWeight: 500,
                      fontSize: '1.15rem',
                      lineHeight: '.9',
                    }}
                  />
                )}
              </ListItemButton>
            ) : (
              // if no user token give them the option to login
              <ListItemButton
                component={Link}
                aria-label="login"
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
                    color: '#fff',
                  }}
                >
                  <LoginIcon sx={{ fontSize: '1.75rem' }} />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Login"
                    disableTypography
                    sx={{
                      color: '#fff',
                      fontFamily: '"Montserrat",serif',
                      letterSpacing: 0.5,
                      fontWeight: 500,
                      fontSize: '1.15rem',
                      lineHeight: '.9',
                    }}
                  />
                )}
              </ListItemButton>
            )}
          </ListItem>
        </List>
      </Drawer>

      <Main>
        <Notification
          message={notification}
          clearMessage={() => setNotification('')}
        />
        <Outlet />
      </Main>
    </Box>
  );
}
