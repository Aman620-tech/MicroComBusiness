/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FeedbackIcon from '@mui/icons-material/Feedback';
// import Graph from './Graph';
import { useNavigate } from 'react-router-dom';
import Home from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SubjectIcon from '@mui/icons-material/Subject';
import LogoutIcon from '@mui/icons-material/Logout';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';





const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
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
  }),
);

const AdminDashboard = () => {
  const navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    localStorage.clear()
    navigate("/login")
  }
  // useEffect(() => {
  //   setOpen1(true)
  // }, [])

  // const Category = ()=>{
  //   AdminCategory()
  // }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Micro-Com
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          {/* ========================== Home ============================= */}

          {/* <ListItem key={"text"} disablePadding sx={{ display: 'block' }}> */}
          <ListItemButton
            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}
            onClick={() => {
              navigate('/admin/dashboard/home')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            ><Home />

            </ListItemIcon>
            <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* </ListItem> */}



          {/* ========================== User ============================= */}

          {/* <ListItem key={"text"} disablePadding sx={{ display: 'block' }}> */}
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/user')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >< PersonOutlineSharpIcon />
            </ListItemIcon>
            <ListItemText primary={"User"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* </ListItem> */}



          {/* ========================== Owner ============================= */}

          {/* <ListItem key={"text"} disablePadding sx={{ display: 'block' }}> */}
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/owner')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            ><BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={"Business Owner"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* </ListItem> */}


          {/* ========================== Shop ============================= */}

          {/* <ListItem key={"text"} disablePadding sx={{ display: 'block' }}> */}
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/shop')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            ><AddBusinessIcon />
            </ListItemIcon>
            <ListItemText primary={"Shop"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* </ListItem> */}

          {/* ========================== Delivery ============================= */}

          {/* <ListItem key={"text"} disablePadding sx={{ display: 'block' }}> */}
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/delivery')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            ><LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary={"Delivery"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* </ListItem> */}
          {/* ========================== Verification ============================= */}

          {/* <ListItem key={"text"} disablePadding sx={{ display: 'block' }}> */}
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/verification')
              setOpen(true)
            }}

          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            ><DomainVerificationIcon />
            </ListItemIcon>
            <ListItemText primary={"Verification"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* </ListItem> */}



          {/* ========================== Category ============================= */}

          {/* <ListItem key={"text"} disablePadding sx={{ display: 'block' }}> */}
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/category')
              setOpen(true)
            }}

          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            ><CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Category"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* </ListItem> */}
          {/* ========================== Sub Category ============================= */}


          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/sub-category')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <SubjectIcon />
            </ListItemIcon>

            <ListItemText primary={"Sub-Category"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* ================================================= */}

          {/* ========================== Offer ============================= */}


          {/* <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}

            onClick={() => {
              navigate('/admin/dashboard/offer')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LocalOfferIcon />
            </ListItemIcon>

            <ListItemText primary={"Offer"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton> */}


          {/* ========================== Feedback ============================= */}


          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/feedback')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <FeedbackIcon />
            </ListItemIcon>

            <ListItemText primary={"Feedback"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          {/* ====================== Setting =========================== */}

          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              navigate('/admin/dashboard/profile')
              setOpen(true)
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <AccountBoxIcon />
            </ListItemIcon>

            <ListItemText primary={"Profile"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>

          {/* ========================== Logout ============================= */}


          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={Logout}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box> */}



    </Box>
  );
}

export default AdminDashboard
