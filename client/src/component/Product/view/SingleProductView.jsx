import React, { useState, useEffect } from 'react'
// import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './Service.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import './index.css'
import '../../../../src/images/about.jpg'
import { SuccessNotify, ErrorNotify } from '../../Notification/Notification';
import { loadStripe } from "@stripe/stripe-js";

const SingleProductView = () => {
  const BaseUrl = process.env.REACT_APP_BASEURL;

  const { productId } = useParams()
  // console.log("object", productId);
  let role = localStorage.getItem("role")
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState({})
  const config = {
    headers: {
      "token": localStorage.getItem("token")
    }
  }

  const seeProduct = async () => {

    const api = await axios.get(`${BaseUrl}/product/${productId}`, config)
    // console.log("first,api", api)
    if (api.data.status === 200) {
      // SuccessNotify(api.data.response)
      setProduct(api.data.product)
      // window.alert("")
    }
    if (api.data.status === 400) {
      ErrorNotify(api.data.response)

    }
  }


  const purchaseNow = async (businessId, id, price, productName) => {

    // console.log("product detail", businessId, "product detail", id, "product detail", price, "product detail", quality)

    const data = {
      businessId, productId: id,
      deliveryCharge: 60,
      productCharge: price, quantity, productName
    }

    // console.log("object", data);
    // const stripe = await loadStripe(`${process.env.STRIPE_PUBLISH_KEY}`)
    // console.log("first", BaseUrl)

    const api = await axios.post(`${BaseUrl}/payment-create`, data, config)
    // /payment-create

    // console.log("api", api.data);
    localStorage.setItem("paymentId", api.data.payment._id)
    // const result = await stripe.redirectToCheckout({
    //   sessionId: api.data.sessionId,
    // });
    window.location.replace(`${api.data.sessionUrl}`);
    // console.log("error", result)
    // if (result.error) {
    //   console.log(result.error);
    // }
  }


  useEffect(() => {
    seeProduct()
  }, [0])

  return (
    <div className="product">
      <h4>Product Details</h4>
      <div className='product_log '>
        <div className="product_logo_1">
          <div className='item'>
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                {product?.image?.map((data) => {
                  // console.log("data", data);
                  // let img = data?.imagePath
                  return (
                    <>
                      <div style={{ width: "165px", height: "250px" }} class="carousel-item active">
                        <img src={data?.imagePath} class="image" alt="..." />
                      </div>
                    </>
                  )
                })}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span style={{ backgroundColor: "#ffc107" }} class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span style={{ backgroundColor: "#ffc107" }} class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>

            <Button variant="warning" style={{ width: '20vw', margin: '15px' }} onClick={() => purchaseNow(product.businessId, product._id, product.price, product.productName)}>Purchase Now</Button>

          </div>
          <div className='item' style={{ padding: '12px' }}>
            {product.description}
            <h6 style={{ color: "#1976d2", marginTop: "10px" }}> Name: {product.productName}</h6>
            <h6 style={{ color: "green" }}> Price: ₹{product.price}  +₹60 (Delivery charge) </h6>
          </div>


        </div>
      </div>


    </div>



  )
}



export default SingleProductView;