import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import './ResetPassword.css';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const ResetPassword = () => {

  const { userId,token } = useParams()
  // console.log("userId", userId)
  const navigate = useNavigate()
  const BaseUrl = process.env.REACT_APP_BASEURL;

  // ====================================
  const SuccessNotify = (message) => toast.success(message);
  const ErrorNotify = (message) => toast.error(message);

  // =====================

  const [values, setValues] = useState({
    password: "",
    confirmPassword: ""
  })

  const inputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault()
    const { password, confirmPassword } = values
    const formData = { password, confirmPassword }
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const api = await axios.post(`${BaseUrl}/reset-password/${userId}/${token}`, formData, config)
    console.log("object", api.data);
    if (api.data.status === 200) {
      console.log("api.data.response", api.data)
      SuccessNotify(api.data.response)
      setTimeout(() => {

        navigate('/login')
      }, 2000)
    }
    if (api.data.status === 400) {
      console.log("api.data.response", api.data)
      ErrorNotify(api.data.response)

    }

  }



  return (
    <div className='reset-password'>
      <ToastContainer />
      <Container>
        <Row>
          <Col></Col>
          <Col xs={5}>
            <div className='input-fields'>

              <TextField
                id="standard-search"
                label="Password"
                type="text" variant="standard"
                name='password'
                value={values.password}
                onChange={inputChange}
              />

              <TextField
                id="standard-search"
                label="Confirm Password"
                type="text" variant="standard"
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={inputChange}
              />
              {/* <br/> */}
              <br />
              <Button   
                                   variant="contained"
 onClick={submit}>Contained</Button>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>

    </div >
  )
}

export default ResetPassword