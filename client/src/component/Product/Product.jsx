import React, { useState } from 'react';
import './index.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SuccessNotify, ErrorNotify } from '../Notification/Notification'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const Product = ({ data }) => {
    const navigate = useNavigate()
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const { categoryId, subcategoryId, color, description, image, price, productName, productType, quantity, _id } = data
    // console.log("data", data)

    const config = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }

    const addToCart = async (productId) => {

        // console.log("productId", productId)

        const body = {
            productId: productId
        }
        const api = await axios.post(`${BaseUrl}/add-product-to-cart`, body, config)
        if (api.data.status === 200) {
            SuccessNotify(api.data.response)
            // window.alert("")
        }
        if (api.data.status === 400) {
            ErrorNotify(api.data.response)

        }
    }

    const deleteProduct = async (productId) => {
        // console.log("deleteProduct", productId)
        const businessId = localStorage.getItem("businessId")

        const api = await axios.delete(`${BaseUrl}/business/delete-product/${businessId}/${productId}`, config)

        if (api.data.status == 200) {
            SuccessNotify(api.data.response)
            navigate('/business/dashboard/products')


        } if (api.data.status == 400) {
            ErrorNotify(api.data.response)
        }
    }


    return (
        <div>

            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                <div className="card" style={{ width: "250px", height: "250px" }}>
                    <img style={{ width: "249px", height: "150px" }} src={image[0].imagePath} alt={image[0].imageName} />
                    <div className="card-body">
                        <h6 className="card-title text-center">Name:{productName}</h6>
                        <p className="card-text"> Description:{description} {color}
                            <h6>Price:<span>&#8377;</span>{price}</h6>

                        </p>

                    </div>
                    <div className="btn_button">

                        {localStorage.getItem("role") == "business" ? (<>
                            <div>
                                <Button variant='contained' onClick={() => navigate(`/business/dashboard/product/${_id}`)}>See Product</Button>

                            </div>

                            <div>

                                <Button variant='contained'>Update Product</Button>
                            </div>

                            <div>

                                <Button variant='contained' onClick={() => deleteProduct(_id)}>Delete Product</Button>
                            </div>


                        </>) : (<>
                            <div>
                                <Button variant='contained' onClick={() => navigate(`/products/${_id}`)}>See Product</Button>
                                {/* <Button variant='contained' onClick={() => navigate(`/products/${categoryId}/${_id}`)}>See Product</Button> */}
                            </div>

                            <div>

                                <Button variant='contained' onClick={() => addToCart(_id)}>Add to Cart </Button>
                            </div>

                            <div>

                                <Button variant='contained'>Purchase Now</Button>
                            </div>


                        </>)

                        }

                    </div>
                </div>

            </div>






        </div>


    )
}

export default Product