import React, { useState } from 'react';
import './index.css'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import { ErrorNotify, SuccessNotify } from '../../../component/Notification/Notification';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
const UserVerification = () => {
  const { userId } = useParams()
  console.log("userId", userId)
  const navigate = useNavigate()
  const [otpApply, setOtpApply] = useState(true)
  const [userData, setUserData] = useState({
    mobileNumber: localStorage.getItem("phoneNumber"),
    mobileOtp: "",
    email: localStorage.getItem("emailId"),
    emailOtp: '',
  })
  const role = localStorage.getItem("role")
  const BaseUrl = process.env.REACT_APP_BASEURL;
  const config = {
    headers: {
      "token": localStorage.getItem("token")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })

  }
  const sendOtp = async () => {

    const { mobileNumber, email } = userData
    const otpData = { mobileNumber, email }
    console.log("first", otpData)
    let api
    switch (role) {
      case "customer":
        api = await axios.post(`${BaseUrl}/otp-sending`, otpData, config)
        break;
      case "business":
        api = await axios.post(`${BaseUrl}/business/otp-sending`, otpData, config)
        break;
    }
    console.log(api.data);

    if (api.data.status == 200) {
      SuccessNotify(api.data.response)
      setOtpApply(false)
    }
    if (api.data.status == 400) ErrorNotify(api.data.response)
  }

  const confirmOtp = async () => {


    const { mobileNumber, email, mobileOtp, emailOtp } = userData
    const otpData = { mobileNumber, email, mobileOtp, emailOtp }
    console.log("first", otpData)
    let api
    switch (role) {
      case "customer":
        api = await axios.post(`${BaseUrl}/otp-confirm`, otpData, config)
        break;
      case "business":
        api = await axios.post(`${BaseUrl}/business/otp-confirm`, otpData, config)
        break;
    }
    console.log(api.data);
    localStorage.removeItem("phoneNumber")
    localStorage.removeItem("emailId")
    if (api.data.status == 200) {
      SuccessNotify(api.data.response)
      navigate('/profile')
    }
    if (api.data.status == 400) ErrorNotify(api.data.response)
  }






  return (
    <div>
      <ToastContainer />
      <div className='form_verify'>
        <br />

        <div>
          <div>
            Mobile Number
          </div>
          <div>
            <input type="text" name="mobileNumber" value={userData.mobileNumber} disabled />
          </div>
        </div>

        <br />

        <div>
          <div>
            Mobile otp
          </div>
          <div>
            <input className='' type="text" name='mobileOtp' value={userData.mobileOtp} onChange={handleChange} />
          </div>

        </div>
        <br />

        <div>
          <div>
            Email
          </div>
          <div>
            <input className='' type="text" name='email' value={userData.email} disabled />
          </div>
        </div>

        <br />

        <div>
          <div>
            Email Otp
          </div>
          <div>

            <input className='' type="text" name='emailOtp' value={userData.emailOtp} onChange={handleChange} />
          </div>

        </div>
        <br />
        <div>
          {otpApply ? (<>
            <Button variant='contained' onClick={() => sendOtp()} > Send OTP</Button>
          </>) : (<>
            <Button variant='contained' onClick={() => confirmOtp()}> Verify Otp9</Button>
          </>)}
        </div>
      </div>
    </div >
  )
}

export default UserVerification