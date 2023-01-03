/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';
import "./User.css"
import { confirmAlert } from 'react-confirm-alert'; // Import
import { ToastContainer, } from 'react-toastify';
import { SuccessNotify, ErrorNotify } from '../../../component/Notification/Notification';

const User = () => {
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true);
  const [userVerification, setUserVerification] = useState('0');


  const allUser = async () => {
    const config =
      { headers: { "token": localStorage.getItem("token") } }

    const response = await axios.get(`${BaseUrl}/admin/all-user`, config)
    // console.log("response", response)
    // console.log(response)
    setLoading(false);
    setUser(response.data.user)

  }


  useEffect(() => {
    allUser()
  }, [])

  const DeleteUser = (userId) => {
    // console.log("DeleteUser", userId)
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
            const response = await axios.delete(`${BaseUrl}/admin/delete-user/${userId}`, config)
            // console.log("response", response.data)
            if (response.data.status === 200) {
              SuccessNotify(response.data.response)
              allUser()
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

  const StatusChange = async (userId, status) => {

    setUserVerification(status)
    console.log("userId", userId, "status", status);

    console.log("userVerification", userVerification)

    // console.log("DeleteUser", userId)
    // const data =
    // console.log("data", {
    //   active: userVerification
    // });
    const config = {
      headers: {
        "token": localStorage.getItem("token")
      }
    }

    const data = { active: userVerification }
    console.log("first", data)
    const response = await axios.patch(`${BaseUrl}/admin/status-Change/${userId} `, data, config)
    console.log("response", response.data)
    if (response.data.status === 200) {
      SuccessNotify(response.data.response)
      allUser()
    }
    if (response.data.status === 400) {
      ErrorNotify(response.data.response)
    }

  }

  return (
    <div className='user'>
      <ToastContainer />
      <div>
        <Table className='table' >
          <thead>
            <tr>
              <th>S No.</th>
              <th>User Name</th>
              <th>User Image</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Gender</th>

              <th>active</th>
              {/* <th>Owner</th> */}
              <th>verified</th>
              <th>Delete</th>
            </tr>
          </thead>

          {loading ? (<h3>Loading ... </h3>) :
            (<>
              {user.length === 0 ? (<h3>No user available ... </h3>) :

                (
                  <>
                    <tbody>
                      {user.map((data, index) => {
                        // let img = data.image.imagePath
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{data.firstName} {data.lastName}</td>
                            <td>
                              <img width={50} height={50} src={data?.image?.imagePath} alt={data?.image?.imageName} />
                            </td>
                            <td>{data.email}</td>
                            <td>{data.mobileNumber}</td>
                            <td>{data.gender}</td>
                            <td>
                              {data.active ? (<>
                                <Button variant="contained"
                                  color="success" onClick={() => StatusChange(data._id, !data.active)}  >Active</Button>{' '}
                              </>) : (<>
                                <Button variant="contained"
                                  color="error" onClick={() => StatusChange(data._id, !data.active)} >In-active</Button>{' '}
                              </>)}

                            </td>
                            {/* 
      <td> {data.active ? (<>
        <Button variant="success">Active</Button>{' '}
      </>) : (<>
        <Button variant="danger">In-active</Button>{' '}
      </>)}</td> */}
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
                    </tbody>
                  </>
                )
              }
            </>)}

        </Table>
      </div>

    </div>
  )
}

export default User