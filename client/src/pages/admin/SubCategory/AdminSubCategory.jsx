/* eslint-disable jsx-a11y/scope */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { Button, Fab } from '@mui/material'
import axios from 'axios'
import { SuccessNotify, ErrorNotify } from '../../../component/Notification/Notification'
import './index.css'
import { ToastContainer } from 'react-toastify'
const BaseUrl = process.env.REACT_APP_BASEURL;


const AdminSubCategory = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState({
        categoryId: "",
        subcategoryName: "",
        subcategoryImage: "",

    })


    const allCategory = async () => {

        const config =
            { headers: { "token": localStorage.getItem("token") } }

        const response = await axios.get(`${BaseUrl}/admin/all-category`, config)
        console.log(response.data.category)
        setCategory(response.data.category)


    }
    useEffect(() => {
        allCategory()
    }, [])
    const [userInfo, setUserInfo] = useState({
        file: [],
    });
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "token": localStorage.getItem("token")
        }
    }

    const handleInputChange = (event) => {
        setUserInfo({
            ...userInfo,
            file: event.target.files[0],
        });
    };

    const handleInput = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    const submitSubCategoryData = async (e) => {
        e.preventDefault()
        try {
            let formData = new FormData();
            formData.append("categoryId", values.categoryId);
            formData.append("subcategoryName", values.subcategoryName);
            formData.append("subcategoryImage", userInfo.file);

            const api = await axios.post(`${BaseUrl}/admin/sub-category-create`, formData, config)
            if (api.data.status === 200) {
                handleClose()
                allSubCategory()
                setValues({
                    categoryId: "",
                    subcategoryName: "",
                    subcategoryImage: "",

                })
                SuccessNotify(api.data.response)

            } else {
                ErrorNotify(`Oops error ${api.data.response}`)
                // window.alert("Oops error while Entering Your Sub Category")
            }

            // history('/login')
        } catch (err) {
            ErrorNotify(err.message)

            // window.alert(err.message)
        }
    }

    const allSubCategory = async () => {


        const response = await axios.get(`${BaseUrl}/admin/all-sub-category`, config)
        // console.log("first", response.data.subCategory)
        if (response.data.status === 200) {
            setSubCategory(response.data.subCategory)
            setLoading(false)
            // allSubCategory()


        } else {
            window.alert("Oops error while Entering Your Sub Category")
            // allSubCategory()

        }
    }

    useEffect(() => {
        allSubCategory()
    }, [])

    const statusChange = async (subCategoryId, active) => {
        // console.log("Id", subCategoryId, "active", active)
        const config =
            { header: { "token": localStorage.getItem("token") } }

        console.log("first", config)
        const data = { active: !active }
        console.log("data", data)
        const api = await axios.patch(`${BaseUrl}/admin/sub-category-status-change/${subCategoryId}`, config)
        console.log("api", api);
        if (api.data.status === 200) {
            SuccessNotify(api.data.response)

            allSubCategory()

        } else {
            ErrorNotify(`Oops error ${api.data.response}`)

        }
    }

    const Delete = async (subCategoryId) => {
        // console.log("Id", subCategoryId)
        // /delete-sub-category/

        const api = await axios.delete(`${BaseUrl}/admin/delete-sub-category/${subCategoryId}`, config)
        if (api.data.status === 200) {
            SuccessNotify(api.data.response)
            allSubCategory()

        } else {
            ErrorNotify(`Oops error ${api.data.response}`)

        }
    }


    return (

        <div className='sub_category'>
            <ToastContainer />

            <div class="table" >
                <div class="">
                    <div>

                        <Button variant="contained" onClick={handleShow} > Add Sub-Category</Button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                            <Modal centered show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Sub Category</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>

                                        <div class="row mt-2">
                                            <div class="col">
                                                <input type="text" class="form-control" placeholder="Sub-Category Name" name="subcategoryName" value={values.subcategoryName} onChange={handleInput} />
                                            </div>
                                            <div class="col">
                                                <select class="form-select form-select-sm" aria-label=".form-select-sm example" name="categoryId" value={values.categoryId} onChange={handleInput}>
                                                    <option selected >Open this select Category</option>
                                                    {category && category.map((value, index,) => {
                                                        return (
                                                            <>
                                                                <option value={value?._id} key={index}>{value?.categoryName}</option>
                                                            </>)
                                                    })}

                                                </select>
                                            </div>
                                        </div>

                                        <div class="row mt-4">
                                            <div class="col">
                                                <input type="file" class="form-control" placeholder=" choose image" name="subcategoryImage" onChange={handleInputChange} />
                                            </div>

                                        </div>

                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="contained" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="contained" onClick={submitSubCategoryData} >
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div>

                        </div>

                    </div>

                    <div>
                        <div class="F">
                            <table class="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">Index</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">SubCategory Name</th>
                                        <th scope="col">SubCategory Image</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Update</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (<h3>Loading ...</h3>) : (subCategory?.map((data, index) => {
                                        return (
                                            <tr class="">
                                                <td scope="row">{index + 1}</td>
                                                <td>{data?.categoryId?.categoryName}</td>
                                                <td>{data?.subcategoryName}</td>
                                                <td><img width={50} height={50} src={data?.subcategoryImage} alt="image" /></td>

                                                <td>{data?.active ? (<><Fab size='small' color='success' onClick={() => statusChange(data?._id, data?.active)}></Fab></>) : (<><Fab size='small' color='danger' onClick={() => statusChange(data._id, data?.active)}>Active</Fab></>)}</td>
                                                <td><Button variant="contained" >update</Button></td>
                                                <td><Button variant="contained" color="error" onClick={() => Delete(data._id)} >Delete</Button></td>
                                            </tr>
                                        )

                                    }))}

                                </tbody>
                            </table>
                        </div>

                        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                    <Table className='table' columns={columns} dataSource={subCategory} />
                                </Box> */}
                    </div>
                </div>
            </div>
            {/* </Box>
            </Box> */}
        </div>

    )
}

export default AdminSubCategory