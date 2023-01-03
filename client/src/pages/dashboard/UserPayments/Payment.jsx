import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './index.css'
import Payments from '@mui/icons-material/Payments'
import axios from 'axios';
import { Button } from '@mui/material';
const Payment = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const config = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }
    const [payment, setPayment] = useState([])
    const [loading, setLoading] = useState(true)

    const allPayment = async () => {
        const paymentId = localStorage.getItem("paymentId")
        const paymentUpdate = await axios.get(`${BaseUrl}/payment/${paymentId}`, config)
        console.log("paymentUpdate", paymentUpdate.data);
        localStorage.removeItem("paymentId")
        const api = await axios.get(`${BaseUrl}/payments`, config)
        setPayment(api.data.payment)
        console.log(api.data);
        setLoading(false)
    }

    useEffect(() => {
        allPayment()
    }, [0])
    return (
        <div>
            <div className='payment_table'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>S no.</th>
                            <th>Product Image</th>
                            <th>Price</th>
                            <th>quantity</th>
                            <th>payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (<h4> Loading ....</h4>) : payment.map((data, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td><img src={data.productId.image[0].imagePath} alt={data.productId.image[0].imageName} srcset="" width="50px" height="50px" />  </ td>
                                        <td>{data.price}</td>
                                        <td>{data.quantity}</td>
                                        <td> {data.paymentStatus === "paid" ? (<> <Button variant='contained' color='success'> {data.paymentStatus}</Button></>) : data.paymentStatus === "pending" ? (<> <Button variant='contained' color='warning'> Pending</Button></>) : (<><Button variant='contained' color='error'> Failed</Button> </>)}  </td>
                                    </tr>

                                </>
                            )
                        })}


                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Payment