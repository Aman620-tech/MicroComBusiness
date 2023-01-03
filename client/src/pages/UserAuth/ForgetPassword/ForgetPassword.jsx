
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { SuccessNotify, ErrorNotify,InfoNotify } from '../../../component/Notification/Notification';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const ForgetPassword = () => {
  // ===============
  // const SuccessNotify = (message) => toast.success(message, {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "colored",
  // });
  // const ErrorNotify = (message) => toast.error(message, {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  // });

  // ==========================
  const BaseUrl = process.env.REACT_APP_BASEURL;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),

    });
  };
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });
  const postdata = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setloginInfo({ ...loginInfo, [name]: value })
  }
  const saveData = async (e) => {
    e.preventDefault();

    const { email } = loginInfo;
    const apiData = { email }
    // http://localhost:3004/api/forget-password
    const response = await axios.post(`${BaseUrl}/forget-password`, apiData)
    // fetch login api
    console.log(response.data)


    if (response.data.status === 200) {
      SuccessNotify(response.data.response)
    }
    if (response.data.status === 400) {
      ErrorNotify(response.data.response);
    }

  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email" value={loginInfo.email} onChange={postdata}
              label="Email Address"
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"

              onClick={saveData}
              sx={{ mt: 3, mb: 2 }}
            >
              Forget password link
            </Button>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <ToastContainer />

    </ThemeProvider>
  );
}


export default ForgetPassword
