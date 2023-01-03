import { Button } from '@mui/material';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import './index.css'

import { ToastContainer } from 'react-toastify';
import { SuccessNotify, ErrorNotify } from '../../../../component/Notification/Notification';

const Add = ({ show, setShow }) => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const navigate = useNavigate()
    const [file, setFile] = useState([])
    const [business, setBusiness] = useState({
        businessName: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target
        setBusiness({ ...business, [name]: value })
    }
    const handleClose = () => setShow(false);



    const submit = async () => {
        const { businessName } = business
        const businessId = localStorage.getItem("businessId")
        let formData = new FormData();

        formData.append("businessName", businessName);
        // formData.append("businessId", businessId);
        formData.append("fileLength", file.length);
        Array.from(file).forEach((item, index) => {
            formData.append(`file${index}`, item);
            // console.log("k", item)
        })
        for (const value of formData.values()) {
            console.log("form value", value);
        }

        // console.log("businessId", businessId)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "token": localStorage.getItem("token")
            }
        }
        const api = await axios.post(`${BaseUrl}/business/create-verification/${businessId}`, formData, config)
        if (api.status === 200) {
            console.log("product-object", api.data);
            SuccessNotify(api.data.response)
            setBusiness({
                businessName: ''
            })
            navigate('/business/dashboard/verification')
        }
        if (api.status === 400) {
            console.log("product-object", api.data.response);
            alert("Error for applying verification");
        }

        console.log("api", api);




    }
    return (
        <div className='add_file'>
            <ToastContainer />
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="mb-3 mr-2">
                            <Form.Group className="mb-3 mr-2" controlId="formGroupEmail">
                                <div className="mb-3 mr-2">

                                    <Form.Label>Business Name</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='businessName' value={business.businessName} onChange={handleInput} />
                                </div>
                                <div>
                                    <Form.Label>please upload your documents</Form.Label>
                                    <Form.Control type="file" multiple name='productImage' onChange={(e) => { setFile(e.target.files) }} />
                                </div>
                                <div>
                                    {Array.from(file).map((item) => {

                                        return (
                                            <span>
                                                <img src={item ? URL.createObjectURL(item) : null} alt="" height="100px" width="100px" srcset="" />
                                            </span>
                                        )
                                    })}
                                </div>
                                <br />


                            </Form.Group>
                        </div>
                        {/* <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>please upload your documents</Form.Label>
                    <Form.Control type="file" multiple />
                </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                    <div>
                        <Button type='reset' onClick={() => submit()}> Submit</Button>
                    </div>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default Add


