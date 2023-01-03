/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { MDBCol, MDBRow, MDBContainer } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import './Cart.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ToastContainer, } from 'react-toastify';
import { SuccessNotify, ErrorNotify } from '../../../component/Notification/Notification';
import {
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';




const theme = createTheme();

// =========================

const Cart = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;
  // const [cartCheck, setCartCheck] = useState({})
  const [cart, setCart] = useState({})
  // const [cartAmount, setCartAmount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState([])

  // console.log("cart", cartCheck)
  // const ErrorNotify = (message) => toast.error(message);
  // const SuccessNotify = (message) => toast.success(message);

  // const theme = useTheme();

  const createCart = async () => {

    const config = {
      headers: {
        "token": localStorage.getItem("token")
      }
    }
    const api = await axios.post(`${BaseUrl}/cart`, config)
    if (api.data.status === 200) {
      setCart(api.data.cart);
      // setProduct(api.data.cart.product);
      console.log(api.data);
      CartView()
      // console.log(api?.data?.cart?.product);

    }
    if (api.data.status === 400) {
      // setCartCheck(api.data);
      // CartView()
      alert(api.data.response)
      console.log(api.data);

    }
    console.log(api.data);

  }

  const CartView = async () => {
    const config = {
      headers: {
        "token": localStorage.getItem("token")
      }
    }
    const api = await axios.get(`${BaseUrl}/cart-check`, config)
    if (api.data.status === 200) {
      // setCartCheck(api.data.cart);
      setCart(api.data.cart);
      setProduct(api.data.cart.product);
      console.log(api.data.cart);
      // console.log(api?.data?.cart?.product);

    }
    if (api.data.status === 400) {
      // setCartCheck(api.data);
      console.log(api.data);

    }

  }
  useEffect(() => {
    CartView()
  }, [])


  const removeItem = async (productId) => {
    const config = {
      headers: {
        "token": localStorage.getItem("token")
      }
    }
    console.log("productId", productId)

    const body = {
      productId: productId
    }

    const api = await axios.patch(`${BaseUrl}/remove-product-from-cart`, body, config)
    if (api.data.status === 200) {

      SuccessNotify(api.data.response)
      CartView()
      // console.log(api?.data?.cart?.product);

    }
    if (api.data.status === 400) {
      ErrorNotify(api.data.response)

    }

  }


  // console.log("cart", product);

  return (

    <div>

      <div>

        {/* {cartCheck.status === 400 ? (<Button>{cartCheck.response}</Button>) :

          ( */}
        <>

          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  pt: 8,
                  pb: 6,
                }}
              >
                <Container maxWidth="sm">
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    Cart Products
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Total Amount of Products : <CurrencyRupeeIcon />
                    {cart.totalAmount} { }

                  </Typography>
                  <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  >
                    <Button variant="contained">Buy All</Button>
                  </Stack>
                </Container>
              </Box>

              <div className='cartBody' >
                {product.length === 0 ? (<h4>Oops No Items in Your Cart</h4>) : product && product.map((data, index) => {
                  return (
                    <div className='cardBody'>
                      <Card style={{ width: '18rem' }}>
                        <img className='img-size' src={data?.image[0]?.imagePath} alt={data?.image[0]?.imageName} />
                        <MDBCardBody>
                          <MDBCardTitle>{data.productName}</MDBCardTitle>
                          <MDBCardText >
                            Price: <CurrencyRupeeIcon />{data.price}
                            <div className='quantity'>

                              <Button className='btn quantity-btn' onClick={() => { setQuantity(quantity + 1) }}><AddIcon /> </Button>
                              {quantity}
                              <Button className='btn quantity-btn' onClick={() => { setQuantity(quantity - 1) }}><RemoveIcon /></Button>

                            </div>
                          </MDBCardText>
                        </MDBCardBody>
                        <CardActions>
                          <Button size="small">View</Button>
                          <Button size="small">Edit</Button>
                          <Button size="small" onClick={() => { removeItem(data._id) }} >Remove Item</Button>
                        </CardActions>
                      </Card>

                    </div>
                  )
                })}
              </div>

            </main>
          </ThemeProvider>
        </>

        {/* )} */}


        <ToastContainer />

      </div>

    </div>
  )
}

export default Cart