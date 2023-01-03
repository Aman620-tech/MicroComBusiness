/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { MDBCol, MDBRow, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import './index.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {

    const navigate = useNavigate()
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const [image, setImage] = useState([])


    const [form, setForm] = useState({
        productName: "",
        productType: "",
        description: "",
        price: "",
        size: "",
        color: "",
        quantity: "",
        productRating: "",

    })

    const [category, setCategory] = useState([])
    const [subcategory, setSubCategory] = useState([])
    const [subcategoryId, setSubCategoryId] = useState([])
    const [categoryId, setCategoryId] = useState('')
    // const [loading, setLoading] = useState(')
    const allCategory = async () => {

        const api = await axios.get(`${BaseUrl}/all-category`)
        if (api.status === 200) {
            console.log("object", api.data.category);
            setCategory(api.data.category)

        }


    }
    const allSubCategory = async (categoryValue) => {

        // const allSubCategory = async (cat) => {

        const api = await axios.get(`${BaseUrl}/all-sub-category/${categoryValue}`)
        if (api.status === 200) {
            console.log("Sub-object", api.data.subCategory);
            setSubCategory(api.data.subCategory)
        }
        if (api.status === 400) {
            console.log("Sub-object", api.data);
        }
        console.log("api", form.categoryId);


    }
    const postData = (e) => {
        let name = e.target.name;
        // console.log("first", name)
        let value = e.target.value;
        setForm({ ...form, [name]: value })

    }

    const submit = async () => {
        // console.log("form", form)
        // console.log("image", image);
        // console.log("image", image.length);
        let formData = new FormData();
        formData.append("productName", form.productName);
        formData.append("categoryId", categoryId);
        formData.append("subcategoryId", subcategoryId);
        formData.append("productType", form.productType);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("size", form.size);
        formData.append("color", form.color);
        formData.append("productRating", form.productRating);
        formData.append("quantity", form.quantity);
        formData.append("imageLength", image.length);
        for (const value of formData.values()) {
            console.log("form value", value);
        }
        Array.from(image).forEach((item, index) => {
            formData.append(`productImage${index}`, item);
            // console.log("k", item)

        })


        // formData.append("profilePicture", image);
        // for (const value of formData.values()) {
        //     console.log("form data value", value);
        // }

        // /business/add-product/63825624b2dbb85359fe000d
        const businessId = localStorage.getItem("businessId")
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "token": localStorage.getItem("token")
            }
        }
        const api = await axios.post(`${BaseUrl}/business/add-product/${businessId}`, formData, config)
        console.log("product-object", api.data);
        if (api.status === 200) {
            // setSubCategory(api.data.subCategory)
            navigate('/business/dashboard/products')
        }
        if (api.status === 400) {
            console.log("product-object", api.data);
        }
        console.log("api", api);




    }

    const handleCategory = (categoryValue) => {
        console.log("categoryValue", categoryValue)
        setCategoryId(categoryValue)
        allSubCategory(categoryValue)

    }


    useEffect(() => {
        allCategory()
        if (categoryId !== "") {
            allSubCategory()
        }
    }, [0])
    return (
        <div className='add_product_body'>
            <div className='add_product_form'>
                <MDBContainer className="px-4">
                    <MDBRow className="gx-5">
                        <MDBCol >
                            <div className="p-3">

                                <MDBInput type="text" placeholder="Product Name" name="productName" value={form.productName} onChange={postData} />

                                <br />
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example" name="categoryId" value={categoryId} onChange={(e) => handleCategory(e.target.value)}>
                                    <option selected >Open this select Category</option>
                                    {category && category.map((value, index,) => {
                                        return (
                                            <>
                                                <option value={value._id} key={index}>{value.categoryName}</option>
                                            </>)
                                    })}

                                </select>
                                <br />

                                <select class="form-select form-select-sm" aria-label=".form-select-sm example" name="productType" value={form.productType} onChange={postData}>
                                    <option value={"none"} >Select  Product Type</option>
                                    <option value={"men"} >Men</option>
                                    <option value={"women"} >Women</option>
                                    <option value={"child"} >child</option>
                                    <option value={"both"} >Both</option>

                                </select>
                                {/* </div> */}

                                <br />

                                <MDBInput type="text" placeholder="size" name='size' value={form.size} onChange={postData} />

                                <br />

                                <MDBInput type="text" placeholder="color" name='color' value={form.color} onChange={postData} />

                                <br />
                            </div>




                        </MDBCol>

                        <MDBCol>
                            <div className="p-3">

                                <MDBInput type="text" placeholder="Description" name='description' value={form.description} onChange={postData} />

                                <br />
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example" name="categoryId" value={subcategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                                    <option  > select Sub Category</option>
                                    {subcategory?.map((data, index) => { return (<option value={data._id} key={index} >{data.subcategoryName}</option>) })}

                                </select>
                                <br />
                                <MDBInput type="text" placeholder="price" name='price' value={form.price} onChange={postData} />

                                <br />

                                <MDBInput type='text' placeholder="quantity" name='quantity' value={form.quantity} onChange={postData} />

                                <br />

                                <MDBInput type='text' placeholder="Product Rating" name='productRating' value={form.productRating} onChange={postData} />

                                <br />



                                <MDBInput multiple type="file" name='productImage' onChange={(e) => { setImage(e.target.files) }} />


                            </div>
                            <div>
                                {Array.from(image).map((item) => {

                                    return (
                                        <span>
                                            <img src={item ? URL.createObjectURL(item) : null} alt="" height="100px" width="100px" srcset="" />
                                        </span>
                                    )
                                })}
                            </div>

                        </MDBCol>


                        <Button outline variant="contained" onClick={submit}> Add</Button>
                    </MDBRow>
                </MDBContainer>
            </div >
        </div>
    )
}

export default AddProduct