/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './AccountSetting.css'
import axios from 'axios';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
   

} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ToastContainer, toast } from 'react-toastify';

const AccountSetting = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const [business, setBusiness] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    // const [basicModal, setBasicModal] = useState(false);

    // const toggleClose = () => setBasicModal(false);
    // const toggleShow = () => setBasicModal(true)


    const singleBusiness = async () => {
        const config = {
            headers: {
                "token": localStorage.getItem("token")
            }
        }
        const response = await axios.get(`${BaseUrl}/business`, config)
        if (response.data.status === 200) {
            setBusiness(response.data.business)
            setLoading(false)

        }
        if (response.data.status === 400) {
            window.alert(response.data.response)

        }
    }
    useEffect(() => {
        singleBusiness()
    }, [])


    const renderTooltip = (props) => (
        <Tooltip id="Button-tooltip" {...props}>
            Click To apply for Verification
        </Tooltip>
    );

    return (
        <div className='account-setting'> <section style={{ backgroundColor: '#eee' }}>
            <ToastContainer />

            <MDBContainer className="py-5">
                {loading ? (<h3>Loading...</h3>) : (<MDBRow>
                    <MDBCol lg="4">
                        {/* {business.user.lastLogin} */}
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage

                                    src={business.shopLogo}
                                    alt="Business Logo"
                                    className="rounded-circle"
                                    style={{ width: '190px', borderRadius: '39px', height: '203px-' }}
                                    fluid />
                                {/* <p className="text-muted mb-1" >{business.name}</p>
                        <p className="text-muted mb-1">{business.mobileNumber}</p>
                        <p className="text-muted mb-4">{business.address} {}</p> */}
                                <br />
                                <div className="d-flex justify-content-center mb-2">
                                    <Button>Change</Button>
                                    <Button outline className="ms-1">Message</Button>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        {/* <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                        <MDBListGroup flush className="rounded-3">
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fas icon="globe fa-lg text-warning" />
                                <MDBCardText>https://mdbootstrap.com</MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                <MDBCardText>mdbootstrap</MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                                <MDBCardText>@mdbootstrap</MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                                <MDBCardText>mdbootstrap</MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                                <MDBCardText>mdbootstrap</MDBCardText>
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCardBody>
                </MDBCard> */}
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Business Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {business.businessName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{business.userId.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Mobile</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{business.mobileNumber}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                {/* <MDBRow>
                            <MDBCol sm="3">
                                <MDBCardText>Mobile</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                                <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                            </MDBCol>
                        </MDBRow>
                        <hr /> */}
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{business.address} {business.city} {business.state} {business.country}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>GST</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{business.gstNo}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Pan Number</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{business.panNo}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Verifed </MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {/* <MDBCardText className="text-muted">{business.verified ? (
                                            <Button variant="contained"
                                                color="success">
                                                verified
                                            </Button>
                                        ) : (
                                            <OverlayTrigger
                                                placement="right"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip}
                                                productName             >

                                                <Button variant="contained"
                                                    color="error">
                                                    Not Verified
                                                </Button>
                                            </OverlayTrigger>)}</MDBCardText> */}
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Update Data</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {/* <Button outline className="ms-1" onClick={"updateData"}>update</Button>&nbsp;&nbsp;&nbsp; */}
                                        {/* <MDBBtn outline className="ms-1" onClick={"passwordChange"}>Password Change</MDBBtn> */}

                                        {/* <MDBCardText className="text-muted">{business.lastLogin}</MDBCardText> */}
                                    </MDBCol>
                                </MDBRow>

                            </MDBCardBody>
                        </MDBCard>
                        <div>
                            {/* <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn> */}
                            {/* <MDBModal show={"basicModal"} setShow={"setBasicModal"} tabIndex='-1'>
                                <MDBModalDialog>
                                    <MDBModalContent>
                                        <MDBModalHeader>
                                            <MDBModalTitle>Modal title</MDBModalTitle>
                                            <MDBBtn className='btn-close' color='none' onClick={toggleClose}></MDBBtn>
                                        </MDBModalHeader>
                                        <MDBModalBody>

                                            <MDBInput label='Current Password' id='typeText' type='text' name='currentPassword' value={password.currentPassword} onChange={handleInput} />
                                            <br />
                                            <MDBInput label='New Password' id='typeText' type='text' name='newPassword' value={password.newPassword} onChange={handleInput} />
                                            <br />
                                            <MDBInput label='Confirm Password' id='typeText' type='text' name='confirmPassword' value={password.confirmPassword} onChange={handleInput} />
                                            <br />


                                        </MDBModalBody>

                                        <MDBModalFooter>
                                            <MDBBtn color='secondary' onClick={toggleClose}>
                                                Close
                                            </MDBBtn>
                                            <MDBBtn onClick={"savePassword"} >Save changes</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModalContent>
                                </MDBModalDialog>
                            </MDBModal> */}
                        </div>
                        {/* =========== assignment bar ============================== */}
                        {/* <MDBRow>
                    <MDBCol md="6">
                        <MDBCard className="mb-4 mb-md-0">
                            <MDBCardBody>
                                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                </MDBProgress>

                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                </MDBProgress>

                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                </MDBProgress>

                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                </MDBProgress>

                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                </MDBProgress>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/*  =================  Bar ================================ */}
                        {/* <MDBCol md="6">
                        <MDBCard className="mb-4 mb-md-0">
                            <MDBCardBody>
                                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                </MDBProgress>

                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                </MDBProgress>

                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                </MDBProgress>

                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                </MDBProgress>

                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                <MDBProgress className="rounded">
                                    <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                </MDBProgress>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol> 
                </MDBRow> */}
                    </MDBCol>
                </MDBRow>)

                }

            </MDBContainer>

        </section></div>
    )
}

export default AccountSetting