import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ToastContainer } from 'react-toastify';
import { SuccessNotify, ErrorNotify, InfoNotify } from '../../../component/Notification/Notification'


const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const theme = createTheme();
    const BaseUrl = process.env.REACT_APP_BASEURL;

    const [loginInfo, setloginInfo] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate()


    const postdata = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setloginInfo({ ...loginInfo, [name]: value })
    }



    const saveData = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;
        const apiData = { email, password }
        const response = await axios.post(`${BaseUrl}/login`, apiData)
        // fetch login api
        console.log(response.data)
        localStorage.setItem("role", response.data.user.role)
        localStorage.setItem("token", response.data.token)

        if (response.data.status === 200) {
            SuccessNotify(response.data.response);

            switch (response.data.user.role) {
                case "admin":
                    setTimeout(() => {
                        navigate(`/admin/dashboard/home`)
                    }, 3000)
                    break;
                case "business":
                    const config = {
                        headers: {
                            "token": localStorage.getItem("token")
                        }
                    }
                    const businessData = await axios.get(`${BaseUrl}/business`, config)
                    console.log("first", businessData.data)
                    if (businessData.data.business === null) {
                        InfoNotify("Business Not Registered please register It");
                        setTimeout(() => {
                            navigate(`/business/register`)
                        }, 3000)
                    }
                    if (businessData.data.business !== null) {
                        localStorage.setItem("businessId", businessData.data.business._id)
                        setTimeout(() => {
                            navigate(`/business/dashboard/home`)
                        }, 3000)
                    }
                    break;
                case "customer":
                    localStorage.setItem("userId", response.data.user._id)
                    setTimeout(() => {
                        navigate(`/`)
                    }, 3000)
                    break;
            }

            if (response.data.status === 400) {
                ErrorNotify(response.data.response);
            }
        }
    }

    return (

        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email" value={loginInfo.email} onChange={postdata}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name='password' value={loginInfo.password} onChange={postdata}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color='info'
                                onClick={saveData}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={() => { navigate('/forget-password') }} >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link onClick={() => { navigate('/register') }}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {/* <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}


export default Login