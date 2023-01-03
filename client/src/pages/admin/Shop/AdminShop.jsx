/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';
import './AdminShop.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { ToastContainer, toast } from 'react-toastify';
import { SuccessNotify, ErrorNotify } from '../../../component/Notification/Notification';
const AdminShop = () => {
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const [shop, setShop] = useState([])
  const [loading, setLoading] = useState(true);


  const getShops = async () => {
    const config =
      { headers: { "token": localStorage.getItem("token") } }

    const response = await axios.get(`${BaseUrl}/admin/all-shop`, config, { body: { businessType: "shop" } })
    console.log("response", response.data.shop)
    // console.log(response)
    setLoading(false);
    setShop(response.data.shop)
    // console.log("first",response.data.shop.userId)
    // setUser(response.data.shop.userId)
  }


  useEffect(() => {
    getShops()
  }, [])


  const DeleteUser = (businessId) => {
    // console.log("businessId", businessId)
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      Buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const config = {
              headers: {
                "token": localStorage.getItem("token")
              }
            }
            const response = await axios.delete(`${BaseUrl}/admin/delete-shop/${businessId}`, config)

            // console.log("response", response)
            if (response.data.status === 200) {
              SuccessNotify(response.data.response)
              getShops()
            }
            if (response.data.status === 400) {
              ErrorNotify(response.data.response)
            }
          }
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
  }



  return (
    <div className='admin-shop' >
      <ToastContainer />

      <Table >
        <thead>
          <tr>
            <th>S No.</th>
            <th>businessName</th>
            <th>shopLogo</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Verification</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {loading ? (<h3>Loading ... </h3>) :

            shop.length === 0 ? (<h4> Oops No data to see</h4>) :
              (
                <>
                  {shop.map((data, index) => {
                    let img = data.shopLogo
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.businessName}</td>
                        <td>
                          <img width={50} height={50} src={img} alt="icons" />
                        </td>
                        <td>{data.address} &nbsp;{data.city} {data.state} {data.pin}</td>
                        <td>{data.mobileNumber}</td>
                        <td>{data.userId.email}</td>
                        {/* <td> "ok" </td> */}

                        <td> {data.active ? (<>
                          <Button variant="contained"
                            color="success">Active</Button>{' '}
                        </>) : (<>
                          <Button variant="contained"
                            color="error">In-active</Button>{' '}
                        </>)}</td>
                        <td>{data.verified ? (<>
                          <Button variant="contained"
                            color="success">Done</Button>{' '}
                        </>) : (<>
                          <Button variant="contained"
                            color="error">Not Done</Button>{' '}
                        </>)}</td>
                        <td>
                          <Button variant="contained"
                            color="warning" onClick={() => DeleteUser(data._id)}> Delete</Button>{' '}
                        </td>

                      </tr>
                    )
                  })}
                </>
              )}

        </tbody>
      </Table>

    </div>
  )
}


export default AdminShop