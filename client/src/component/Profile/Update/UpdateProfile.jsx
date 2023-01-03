import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import './Index.css'
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import { SuccessNotify, ErrorNotify } from '../../Notification/Notification';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: '',
        state: ''
    })
    // const [data, setData] = useState({

    // })
    const [loading, setLoading] = useState(true)


    const role = localStorage.getItem("role")
    const config = {
        headers: {
            "token": localStorage.getItem("token")
        }
    }
    const userData = async () => {


        let api
        switch (role) {
            case "admin":
                api = await axios.get(`${BaseUrl}/admin/user`, config)
                // console.log("admin-get", api.data)
                break;
            case "business":

                api = await axios.get(`${BaseUrl}/business/user`, config)
                // console.log("business-get ", api.data)
                setUser(api.data.user)
                break;
            case "customer":
                api = await axios.get(`${BaseUrl}/user`, config)
                // console.log("customer-get", api.data)
                setUser(api.data.user)
                break;

            default:
                break;
        }
        if (api.data.status === 200) {
            setUser(api.data.user)
            // console.log("first", api.data.user)
            setLoading(false)

        }
        if (api.data.status === 400) {
            window.alert(api.data.response)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

    }
    const updateData = async () => {

        // console.log("data", user)
        const config = {
            headers: {
                "token": localStorage.getItem("token")
            }
        }
        let api
        switch (role) {
            case "admin":
                api = await axios.patch(`${BaseUrl}/admin/update-user`, user, config)
                // console.log("admin-update", api.data)
                navigate('/admin/dashboard/profile')
                break;
            case "business":

                api = await axios.patch(`${BaseUrl}/business/update-user`, user, config)
                // console.log("business-update ", api.data)
                // setUser(api.data.user)
                navigate('/business/dashboard/profile')

                break;
            case "customer":
                api = await axios.patch(`${BaseUrl}/update-user`, user, config)
                // console.log("customer-update", api.data)
                // setUser(api.data.user)
                navigate('/profile')

                break;

            default:
                break;
        }
        if (api.data.status === 200) {
            // setUser(api.data.user)
            SuccessNotify(api.data.response)
            // console.log("first", api.data.user)
            setLoading(false)

        }
        if (api.data.status === 400) {
            // window.alert(api.data.api)
            ErrorNotify(api.data.response)

        }
    }




    useEffect(() => {
        userData()
    }, [0])
    return (
        <div className='page_size'>
            <div>
                <form>

                    {/* <MDBRow className='mb-4'> */}
                    <div className=''>
                        <div className='form_field'>

                            <div>
                                <div>First Name</div>
                                {/* <div> */}
                                <MDBCol>
                                    <MDBInput id='form6Example1'
                                        name='firstName'
                                        value={user.firstName}
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                                {/* </div> */}

                            </div>

                            <div>Last Name</div>
                            <div>
                                <MDBCol>
                                    <MDBInput id='form6Example1'
                                        name='lastName'
                                        value={user.lastName}
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </div>

                            {/* </div> */}
                            {/* <div>

                                <MDBCol>
                                    <MDBInput id='form6Example2' label='Last name' />
                                </MDBCol>
                            </div> */}
                            {/* </MDBRow> */}
                            {/* <div className='form_field'> */}

                            {/* <div>

                            </div>
                                 */}

                            <div>Address</div>
                            <div>
                                <MDBCol>
                                    <MDBInput id='form6Example1'
                                        name='country'
                                        value={user.address}
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </div>
                            {/* </div>
                        <div className='form_field'> */}
                            <div>Country</div>
                            <div>
                                <MDBCol>
                                    <MDBInput id='form6Example1'
                                        name='country'
                                        value={user.country}
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </div>
                            <div>
                                <div>State</div>
                                <div>
                                    <MDBCol>
                                        <MDBInput
                                            id='form6Example1'
                                            name='state'
                                            value={user.state}
                                            onChange={handleChange}
                                        />
                                    </MDBCol>
                                </div>
                            </div>



                            {/* </div>
                        <div className='form_field'> */}
                            <div>City</div>
                            <div>
                                <MDBCol>
                                    <MDBInput id='form6Example1'
                                        name='city'
                                        value={user.city}
                                        onChange={handleChange}
                                    />
                                </MDBCol>
                            </div>
                            {/* <div>
                                <div>ImageChange</div>
                                <div>
                                    <MDBCol>
                                        <MDBInput
                                            id='form6Example1'
                                            name='state'
                                            value={user.state}
                                            onChange={handleChange}
                                        />
                                    </MDBCol>
                                </div>
                            </div> */}



                        </div>

                    </div>

                    <div>
                        <Button variant="contained"
                            color="warning"
                            onClick={() => updateData()}
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default UpdateProfile