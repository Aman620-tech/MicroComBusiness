import React, { useState, useEffectF, useEffect } from 'react'
import './index.css'
import LineChart from '../../../component/Chart/LineChart'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
const BusinessPayment = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const [payment, setPayment] = useState([])
    const [feedback, setFeedback] = useState([])

    console.log("Baseurl", BaseUrl);
    const allPayments = async () => {
        const config = {
            headers: {
                "token": localStorage.getItem("token")
            },
        }
        const businessId = await localStorage.getItem("businessId")
        const api = await axios.get(`${BaseUrl}/business/all-payments/${businessId}`, config)
        if (api.status === 200) {
            console.log("object", api.data);
            setPayment(api.data.payment)
        }


    }
    useEffect(() => {
        allPayments()
    }, [0])

    return (
        <div >
            <div className='d-flex payment_group'>
                <div class="col">
                    <div class="p-3 ">
                        {/* USER */}
                        <div>
                            <div
                                className="card md-10 shadow"
                                style={{ width: "220px", height: "120px" }}
                            >
                                <div className="row g-1 p-2">
                                    <div className="col-6">
                                        <img
                                            // src={data.imageUrl}
                                            className="img-fluid rounded-start rounded-end"
                                            alt="Cart"
                                            width="100px"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">Total Amount:</h5>
                                            {/* <h6 className="card-text" > Home</h6> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <div class="col" >

                    <div className='d-flex '>
                        {/* <div className='graph'><LineChart /></div> */}
                        <div className='graph'><LineChart /></div>
                        {/* <div className='graph' ><LineChart /></div> */}
                    </div>
                </div>
            </div>

            <div className='table_body'>
                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Product</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Payment Status</th>
                            {/* <th scope='col'>Pament Detail</th> */}
                            {/* <th scope='col'>Actions</th> */}
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {payment?.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src={data?.productId?.image[0].imagePath}
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{data?.productId?.productName}</p>
                                                {/* <p className='text-muted mb-0'>john.doe@gmail.com</p> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{data.price}</p>
                                        {/* <p className='text-muted mb-0'>IT department</p> */}
                                    </td>
                                    <td>
                                        {data.paymentStatus == "pending" ? (<>  <MDBBadge color='warning' pill>
                                            Pending
                                        </MDBBadge></>) : data.paymentStatus == "paid" ? (<> <MDBBadge color='success' pill>
                                            Paid
                                        </MDBBadge></>) : (<><MDBBadge color='error' pill>
                                            Cancel
                                        </MDBBadge></>)

                                        }

                                    </td>
                                    {/* <td>Senior</td>
                                    <td>
                                        <MDBBtn color='link' rounded size='sm'>
                                            Edit
                                        </MDBBtn>
                                    </td> */}
                                </tr>
                            )
                        })}

                        {/* <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>Alex Ray</p>
                                        <p className='text-muted mb-0'>alex.ray@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Consultant</p>
                                <p className='text-muted mb-0'>Finance</p>
                            </td>
                            <td>
                                <MDBBadge color='primary' pill>
                                    Onboarding
                                </MDBBadge>
                            </td>
                            <td>Junior</td>
                            <td>
                                <MDBBtn color='link' rounded size='sm'>
                                    Edit
                                </MDBBtn>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>Kate Hunington</p>
                                        <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Designer</p>
                                <p className='text-muted mb-0'>UI/UX</p>
                            </td>
                            <td>
                                <MDBBadge color='warning' pill>
                                    Awaiting
                                </MDBBadge>
                            </td>
                            <td>Senior</td>
                            <td>
                                <MDBBtn color='link' rounded size='sm'>
                                    Edit
                                </MDBBtn>
                            </td>
                        </tr> */}
                    </MDBTableBody>
                </MDBTable>
            </div>



        </div>
    )
}

export default BusinessPayment