/* eslint-disable eqeqeq */
import React from 'react'
import './index.css'
import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';

import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import "./Home.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminDashboard from '../pages/admin/Dashboard/AdminDashboard';
import BusinessDashboard from '../pages/business/Businessdashboard/BusinessDashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const theme = createTheme()

const Header = () => {

    let role = localStorage.getItem("role")
    // console.log("role", role);

    const navigate = useNavigate();

    const login = () => {
        navigate('/login')
    }

    const Home = () => {
        navigate('/')
    }
    const Aboutus = () => {
        navigate('/about-us')
    }
    const Developer = () => {
        navigate('/developer')
    }
    // const Feedback = () => {
    //     navigate('/feedback')
    // }
    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }
    const profile = () => {
        navigate('/profile')
    }

    return (
        <div>
            {(() => {
                switch (role) {

                    case 'admin':
                        return (<>  <AdminDashboard /></>);

                    case 'business':
                        return (<> <BusinessDashboard /> </>);

                    default:
                        return (<>

                            <div>
                                <ThemeProvider theme={theme}>
                                    <CssBaseline />
                                    <AppBar position="static">
                                        <Toolbar>
                                            {/* <CameraIcon sx={{ mr: 2 }} /> */}

                                            <Typography variant="h6" color="inherit" noWrap>

                                                <Button variant="" onClick={Home}>Micro-Com</Button>


                                            </Typography>
                                            <Typography variant="h6" color="inherit" noWrap>

                                                <Button variant="" onClick={Aboutus}>About Us </Button>


                                            </Typography>
                                            <Typography variant="h6" color="inherit" noWrap>

                                                <Button variant="" onClick={Developer}>Developers</Button>


                                            </Typography>
                                            {/* <Typography variant="h6" color="inherit" noWrap>
            
                                            <Button variant="contained"onClick={Feedback}>Feedback</Button>
            
            
                                        </Typography> */}

                                            <Typography variant="h6" color="inherit" noWrap>

                                                <Button variant="" className='login' onClick={() => { navigate('/products') }}>Products</Button>

                                            </Typography>

                                            {
                                                localStorage.getItem('token') ?
                                                    (
                                                        <div className='d-flex navbar_icon'>
                                                            <div className='d-flex'>

                                                                <div>
                                                                    <Typography variant="h6" color="inherit" noWrap>

                                                                        <Button variant="" onClick={profile}>Profile</Button>

                                                                    </Typography>
                                                                </div>
                                                                <div>
                                                                    <Typography variant="h6" color="inherit" noWrap>

                                                                        <Button variant="" className='login' onClick={() => { navigate('/feedback') }}>Feedback</Button>

                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <div className='d-flex slight_left'>

                                                                <div>
                                                                    <Typography variant="h6" color="inherit" noWrap>

                                                                        <Button variant="" className='login' onClick={logout}>Logout</Button>


                                                                    </Typography>
                                                                </div>
                                                                <div>
                                                                    <Typography variant="h6" color="inherit" noWrap>

                                                                        <Button variant="" className='login' onClick={() => { navigate('/cart') }}><ShoppingCartIcon /></Button>


                                                                    </Typography>
                                                                </div>
                                                            </div>


                                                        </div>

                                                    )
                                                    :
                                                    (<>

                                                        <Typography variant="h6" color="inherit" noWrap>

                                                            <Button variant="contained" className='login' onClick={login}>Login</Button>

                                                        </Typography>

                                                        <Typography variant="h6" color="inherit" noWrap>

                                                            <Button variant="contained" className='login' onClick={() => { navigate('/register'); }}>Register</Button>


                                                        </Typography>
                                                    </>)}
                                        </Toolbar>

                                    </AppBar>
                                </ThemeProvider >
                            </div>
                        </>);
                }
            })
                ()}


        </div>


    );
}

export default Header