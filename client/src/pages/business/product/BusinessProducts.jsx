/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'
import { Button } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';

// import DeleteIcon from '@mui/icons-material/Delete';

import { SuccessNotify, ErrorNotify } from '../../../component/Notification/Notification';
import { ToastContainer } from 'react-toastify';

import Product from '../../../component/Product/Product';


// import ProductModal from '../../../../component/ProductDescription/ProductModal';
const BusinessProducts = () => {
  // /business/all-product/
  const BaseUrl = process.env.REACT_APP_BASEURL;

  const businessId = localStorage.getItem("businessId")
  // console.log(businessId, "businessId product Location")
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)

  const config = {
    headers: {
      "token": localStorage.getItem("token")
    }
  }


  const allProduct = async () => {
    if (businessId !== undefined) {

      const response = await axios.get(`${BaseUrl}/business/all-product/${businessId}`, config)
      console.log("response", response.data)
      if (response.data.status === 200) {
        setLoading(false)
        setProduct(response.data.product)
      }
      if (response.data.status === 400) {
        // window.alert("Error")
      }
    }

  }
  useEffect(() => {
    allProduct()
  }, [0])

  const viewProduct = async (id) => {
    console.log("product Id", id)

  }



  const updateProduct = (id) => {
    console.log("product Id", id)
  }

  return (
    <>
      <div className='add_product'>

        <Button variant="contained" onClick={() => navigate('/business/dashboard/products/add')} > Add Product</Button>
      </div>
      <div className='all_products'>
        <ToastContainer />




        <div className='product_card' >

          {loading ? (<h2>Loading</h2>) : (<>

            {/* <MDBCard> */}
            {product?.map((data, index) => {

              return (
                <div className='product_view'>
                  <Product data ={data}/>
                  

                </div>
              )

            })}
            {/* </MDBCard> */}

          </>)}



        </div>
        {/* {
  isModalOpen &&
  <ProductModal  id={data._id} />
} */}


      </div >
    </>
  )
}

export default BusinessProducts


