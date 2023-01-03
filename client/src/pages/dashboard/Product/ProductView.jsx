/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import { useTheme } from '@mui/material/styles';

import './index.css'
import Product from '../../../component/Product/Product';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


const ProductView = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    // const theme = useTheme();

    const [allProduct, setAllProduct] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    const categoryProduct = async (categoryId) => {
        const config = {
            headers: {
                "token": localStorage.getItem("token")
            }
        }
        const response = await axios.get(`${BaseUrl}/category-product/${categoryId}`, config)
        setAllProduct(response.data.product);
        console.log(response.data);
        setLoading(false)
    }

    const getAllProduct = async () => {

        const response = await axios.get(`${BaseUrl}/all-product`)
        setAllProduct(response.data.product);
        console.log(response.data);
        setLoading(false)

    }

    useEffect(() => {
        if (categoryId !== undefined) {
            console.log("categoryId", categoryId)
            categoryProduct(categoryId)
        }
        if (!categoryId) {
            getAllProduct()
        }
    }, [0])



    // clg
    return (
        <div className='products'>
            {/* <Card sx={{ display: 'flex' }}> */}
            {loading ? (<h2>Loading ...</h2>) :

                allProduct.length === 0 ? (<h4>Sorry No products available ...  </h4>) :

                    allProduct && allProduct.map((value, index) => {
                        let img = `${value?.image[0]?.imagePath}`
                        console.log("img", img);
                        return (
                            <div className='products'>
                                <Product data={value} />
                            </div>
                        )
                    })}
            <ToastContainer />

        </div >
    )
}

export default ProductView
