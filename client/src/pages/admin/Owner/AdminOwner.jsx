/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { ToastContainer, toast } from 'react-toastify';
import './index.css'
const AdminOwner = () => {
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const [owner, setOwner] = useState([])
  const [loading, setLoading] = useState(true);


  const allBusinessOwner = async () => {
    const config =
      { headers: { "token": localStorage.getItem("token") } }

    const response = await axios.get(`${BaseUrl}/admin/all-business-user`, config)
    // console.log("response", response.data?.user)
    // console.log(response)
    setLoading(false);
    setOwner(response.data?.user)
    // console.log("first",response.data?.shop.userId)
    // setUser(response.data?.shop.userId)
  }


  useEffect(() => {
    allBusinessOwner()
  }, [])


  // user Delete
  const errorMessage = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const successMessage = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });


  const DeleteUser = (userId) => {
    console.log("DeleteUser", userId)
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
            // console.log("response", response)
            if (response.data?.status === 200) {
              successMessage(response.data?.response)
              allBusinessOwner()
            }
            if (response.data?.status === 400) {
              errorMessage(response.data?.response)
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
    <div className='owner_table'>
      <ToastContainer />

      <Table style={{ marginTop: "20px" }} >
        <thead>
          <tr>
            <th>S No.</th>
            <th>User Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>gender</th>
            <th>status</th>
            {/* <th>verified</th> */}
            <th>Verification</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {loading ? (<h3>Loading ... </h3>) : (
            <>
              {owner.map((data, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data?.firstName} {data?.lastName}</td>
                    <td>
                      <img width={50} height={50} src={data?.image?.imagePath} alt={data?.image?.imageName} />
                    </td>
                    <td>{data?.email}</td>
                    <td>{data?.mobileNumber}</td>
                    <td>{data?.gender}</td>

                    <td> {data?.active ? (<>
                      <Button variant="contained"
                        color="success">Active</Button>{' '}
                    </>) : (<>
                      <Button variant="contained"
                        color="error">In-active</Button>{' '}
                    </>)}</td>
                    <td>{data?.verified ? (<>
                      <Button variant="contained"
                        color="success">Done</Button>{' '}
                    </>) : (<>
                      <Button variant="contained"
                        color="error">Not Done</Button>{' '}
                    </>)}</td>
                    <td>
                      <Button variant="contained"
                        color="warning" onClick={() => DeleteUser(data?._id)}> Delete</Button>{' '}

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

export default AdminOwner