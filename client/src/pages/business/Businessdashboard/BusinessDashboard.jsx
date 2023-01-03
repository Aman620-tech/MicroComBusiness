/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import PaymentsIcon from '@mui/icons-material/Payments';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ErrorNotify } from '../../../component/Notification/Notification'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
const drawerWidth = 240;
const BusinessDashboard = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const navigate = useNavigate()

    const businessId = localStorage.getItem("businessId")

    const [business, setBusiness] = useState({})
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState({})
    // let userName
    const singleBusiness = async () => {
        const config = {
            headers: {
                "token": localStorage.getItem("token")
            }
        }
        const response = await axios.get(`${BaseUrl}/business/${businessId}`, config)
        if (response.data.status === 200) {
            setLoading(false)
            setBusiness(response.data.business);
            console.log("Business Data", response.data.business);
        }
        if (response.data.status === 400) {
            ErrorNotify(response.data.response)
        }
    }

    useEffect(() => {
        singleBusiness()
    }, [0])

    // -----------------------------------------------


    const Logout = () => {
        localStorage.clear()
        navigate('/login')
    }


    return (
        <div>
            {/* <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                   
                </AppBar>
            </Box> */}
            {/* {!localStorage.getItem("businessId") ? (<></>) : (<> */}
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        {/* <Typography variant="h6" noWrap component="div">
                        <Button variant=""> Micro-Com</Button>
                        </Typography> */}
                        <Typography variant="h6" noWrap component="div">
                            Micro-Com
                        </Typography>

                        <Typography variant="h6" color="inherit" noWrap>

                            <Button variant="" onClick={() => navigate('/about-us ')}>About Us</Button>


                        </Typography>

                        <Typography variant="h6" color="inherit" noWrap>

                            <Button variant="" onClick={() => navigate('/developer')}>Developers</Button>


                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {loading ? (<h5>
                                Loading ...
                            </h5>) : (<>
                                {business.businessName}

                            </>)}
                        </Typography>
                        <Button color="inherit" onClick={() => navigate('/business/dashboard/profile')} >
                            <Avatar alt="Remy Sharp" src={user.profilePicture} />
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {/* =========== Home ========== */}
                            <ListItem key={"Home"} disablePadding>
                                <ListItemButton onClick={() => navigate(`/business/dashboard/home`)}>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Home"} />
                                </ListItemButton>
                            </ListItem>
                            {/* </List>
                        <List> */}
                            {/* =========== Employee ========== */}
                            <ListItem key={"Employee"} disablePadding>
                                <ListItemButton onClick={() => navigate(`/business/dashboard/employee`)} >
                                    <ListItemIcon>
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Employee"} />
                                </ListItemButton>
                            </ListItem>
                            {/* </List>
                        <List> */}

                            {/* =========== Product ========== */}
                            <ListItem key={"Product"} disablePadding>
                                <ListItemButton onClick={() => navigate(`/business/dashboard/products`)}>
                                    <ListItemIcon>
                                        <LayersIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Product"} />
                                </ListItemButton>
                            </ListItem>
                            {/* </List>
                        <List> */}

                            {/* =========== Verification ========== */}
                            <ListItem key={"Verification"} disablePadding>
                                <ListItemButton onClick={() => navigate(`/business/dashboard/verification`)}>
                                    <ListItemIcon>
                                        <VerifiedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Verification"} />
                                </ListItemButton>
                            </ListItem>
                            {/* </List>
                        <List> */}

                            {/* =========== Payment ========== */}
                            <ListItem key={"Payment"} disablePadding>
                                <ListItemButton onClick={() => navigate(`/business/dashboard/payment`)} >
                                    <ListItemIcon>
                                        <PaymentsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Payment"} />
                                </ListItemButton>
                            </ListItem>
                            {/* </List>
                        <List> */}
                            {/* =========== Order ========== */}
                            <ListItem key={"Order"} disablePadding>
                                <ListItemButton onClick={() => navigate(`/business/dashboard/order`)} >
                                    <ListItemIcon>
                                        <ShoppingCartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Order"} />
                                </ListItemButton>
                            </ListItem>
                            {/* </List>
                        <List> */}

                            {/* =========== PROFILE ========== */}
                            <ListItem key={"Profile"} disablePadding>
                                <ListItemButton onClick={() => navigate(`/business/dashboard/profile`)} >
                                    <ListItemIcon>
                                        <AccountCircleRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Profile"} />
                                </ListItemButton>
                            </ListItem>
                            {/* </List>
                        <List> */}
                            {/* =========== Setting ========== */}

                            <ListItem key={"Setting"} disablePadding>
                                <ListItemButton onClick={() => navigate(`/business/dashboard/account-setting`)} >
                                    <ListItemIcon>
                                        <ManageAccountsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Account Setting"} />
                                </ListItemButton>
                            </ListItem>
                            {/* =====  lOGOUT   ===== */}

                            <ListItem key={"Logout"} disablePadding>
                                <ListItemButton onClick={Logout}>
                                    <ListItemIcon>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Logout"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {/* <Typography paragraph>
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
                    </Typography> */}
                </Box>
            </Box>
            {/* </> )  } */}



        </div>
    );
}
export default BusinessDashboard;
