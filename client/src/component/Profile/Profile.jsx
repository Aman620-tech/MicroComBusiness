/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import ClearIcon from '@mui/icons-material/Clear';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    // Button,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBInput,
    MDBModalFooter
} from 'mdb-react-ui-kit';
import './Profile.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, } from '@mui/material';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
// import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
// import UserVerification from '../../pages/dashboard/verification/UserVerification';
import { SuccessNotify, ErrorNotify } from '../Notification/Notification';

const Profile = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [password, setPasswordChange] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()
    const [basicModal, setBasicModal] = useState(false);

    const toggleClose = () => setBasicModal(false);
    const toggleShow = () => setBasicModal(true)


    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const { businessId } = useParams()
    // const businessId = localStorage.getItem("businessId")
    // http://localhost:3004/api/user

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
                // console.log("response", api)
                if (api.data.status === 200) {
                    setUser(api.data.user)
                    setLoading(false)

                }
                if (api.data.status === 400) {
                    ErrorNotify(api.data.response)

                }



                break;
            case "business":
                api = await axios.get(`${BaseUrl}/business/user`, config)
                if (api.data.status === 200) {
                    setUser(api.data.user)
                    setLoading(false)

                }
                if (api.data.status === 400) {
                    ErrorNotify(api.data.response)

                }
                break;
            case "customer":
                api = await axios.get(`${BaseUrl}/user`, config)
                // console.log("first", api.data)
                if (api.data.status === 200) {

                    setUser(api.data.user)
                    setLoading(false)

                }
                if (api.data.status === 400) {
                    ErrorNotify(api.data.response)
                }
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        userData()
    }, [])

    const renderTooltip = (props) => (
        <Tooltip id="Button-tooltip" {...props}>
            Click To apply for Verification
        </Tooltip>
    );
    // =====================================
    // const errorMessage = (message) => toast.error(message, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    // });

    // const successMessage = (message) => toast.success(message, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    // });



    // ===============================-
    const handleInput = (e) => {
        const { name, value } = e.target
        setPasswordChange({ ...password, [name]: value })
    }
    const passwordChange = async () => {
        toggleShow()
    }
    const savePassword = async () => {
        // const role = localStorage.getItem("role")

        const {
            currentPassword, newPassword, confirmPassword
        } = password

        const newData = {
            currentPassword, newPassword, confirmPassword
        }

        let api
        switch (role) {
            case "admin":
                api = await axios.patch(`${BaseUrl}/admin/password-change`, newData, config)
                break;
            case "business":
                api = await axios.patch(`${BaseUrl}/business/password-change`, newData, config)
                break;
            case "customer":
                api = await axios.patch(`${BaseUrl}/password-change`, newData, config)
                break;
            default:
                break;
        }
        if (api.data.status === 200) {
            // setUser(response.data.user)
            SuccessNotify(api.data.response)
            await toggleClose()
            localStorage.clear('token')
            setTimeout(() => {

                navigate('/login')
            }, 3000)                // userData()

        }
        if (api.data.status === 400) {
            ErrorNotify(api.data.response)
        }
    }

    // if ()


    const DeleteUser = (userId) => {
        // console.log("userId", userId)
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            Buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const newData = {
                            active: false
                        }
                        const config = {
                            headers: {
                                "token": localStorage.getItem("token")
                            }
                        }
                        // console.log("userId", userId)
                        let api
                        switch (role) {
                            case "business":
                                api = await axios.patch(`${BaseUrl}/business/delete-user`, newData, config)
                                break;
                            case "customer":
                                api = await axios.patch(`${BaseUrl}/delete-user`, newData, config)
                                break;

                            default:
                                break;
                        }

                        console.log("response", api.data)
                        if (api.data.status === 200) {
                            SuccessNotify(api.data.response)
                            // await toggleClose()
                            localStorage.clear('token')
                            setTimeout(() => {
                                navigate('/login')
                            }, 3000)
                        }
                        if (api.data.status === 400) {
                            ErrorNotify(api.data.response)
                            // window.alert(response.data.response)
                        }
                    }

                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };

    const verificationPage = async (userId, phoneNumber, emailId) => {

        localStorage.setItem("phoneNumber", phoneNumber)
        localStorage.setItem("emailId", emailId)
        {
            if (role == "customer") navigate(`/verification/${user._id}`)

            if (role == "business") navigate(`/business/dashboard/profile/${user._id}`)
        }
    }


    return (
        <div className='profile m-5 ml-1'>
            <section style={{ backgroundColor: '#eee' }}>
                <ToastContainer />

                {loading ? (<h2>Loading .... </h2>) :
                    (
                        <MDBContainer className="py-5">

                            <MDBRow>
                                <MDBCol lg="4">
                                    <MDBCard className="mb-4">
                                        <MDBCardBody className="text-center">

                                            {user?.image?.imagePath ? (<MDBCardImage

                                                src={user.image.imagePath}
                                                alt=""
                                                className="rounded-circle"
                                                style={{ width: '190px', borderRadius: '39px', height: '203px-' }}
                                                fluid />) : (<></>)

                                            }


                                            <br />
                                            <div className="d-flex justify-content-center mb-2">
                                                <Button>Change</Button>
                                                {user.verified ? (
                                                    <></>
                                                ) : (
                                                    <OverlayTrigger
                                                        placement="right"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderTooltip}
                                                        productName             >

                                                        <Button variant="contained"
                                                            color="error"
                                                            onClick={() => {
                                                                if (role == "customer") {

                                                                    navigate(`/verification/document/${user?._id}`, user?.mobileNumber, user?.email)
                                                                } else {
                                                                    navigate(`/business/verification/document/${user?._id}`, user?.mobileNumber, user?.email)

                                                                }
                                                            }
                                                            }

                                                        >
                                                            Not Verified
                                                        </Button>
                                                    </OverlayTrigger>)}

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
                                                    <MDBCardText>Full Name</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user.firstName} {user.lastName}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Email</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user?.email}  {user?.emailVerified ? (<>
                                                        <Button variant="contained" size='small' color="success">
                                                            <ThumbUpOffAltIcon />
                                                        </Button> </>) : (<>

                                                            <Button variant="contained" size='small' color="error"
                                                                onClick={() => verificationPage(user?._id, user?.mobileNumber, user?.email)}
                                                            >
                                                                Not verified
                                                            </Button>

                                                        </>)}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Mobile</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user?.mobileNumber} {user?.mobileVerified ? (<>
                                                        <Button variant="contained" size='small' color="success">
                                                            <ThumbUpOffAltIcon />
                                                        </Button> </>) : (<><Button variant="contained" size='small' color="error"
                                                            onClick={() => verificationPage(user?._id, user?.mobileNumber, user?.email)}
                                                        >
                                                            Not verified
                                                        </Button> </>)}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />

                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Address</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user.address} {user.city} {user.state} {user.country}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            {role == "customer" ? (<>
                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText>Orders</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <MDBCardText className="text-muted"><Button onClick={() => navigate(`/payments/:${user._id}`)} >See All orders</Button></MDBCardText>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr /></>) : (<></>)}


                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Gender</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user.gender}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />

                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Kyc </MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">
                                                        {user?.kyc ? (<>
                                                            <Button variant="contained" size='small' color="success">
                                                                <ThumbUpOffAltIcon />
                                                            </Button> </>) : (<><Button variant="contained" size='small' color="error"
                                                                onClick={() => navigate(`/verification/document/${user._id}`)}
                                                            >
                                                                Not verified
                                                            </Button> </>)}
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />

                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Update Data</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <Button outline variant="contained" onClick={() => { navigate(`/profile/${user._id}`) }}>update</Button> &nbsp;&nbsp;&nbsp;
                                                    <Button outline variant="contained" onClick={passwordChange}>Password Change</Button>&nbsp;&nbsp;&nbsp;
                                                    {localStorage.getItem("role") == "admin" ? (<></>) : (<>
                                                        <Button outline variant="contained" color='error' onClick={() => DeleteUser(user._id)}>Delete</Button>

                                                    </>)}
                                                    {/* <MDBCardText className="text-muted">{user.lastLogin}</MDBCardText> */}
                                                </MDBCol>
                                            </MDBRow>

                                        </MDBCardBody>
                                    </MDBCard>
                                    <div>
                                        {/* <Button onClick={toggleShow}>LAUNCH DEMO MODAL</Button> */}
                                        <MDBModal className='p-5' show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                                            <MDBModalDialog>
                                                <MDBModalContent>
                                                    <MDBModalHeader>
                                                        <MDBModalTitle>Password Change </MDBModalTitle>
                                                        {/* <Button className='btn-close' color='none' onClick={toggleClose}></Button> */}
                                                    </MDBModalHeader>
                                                    <MDBModalBody>

                                                        <MDBInput label='Current Password' id='typeText' type='text' name='currentPassword' value={password.currentPassword} onChange={handleInput} required />
                                                        <br />
                                                        <MDBInput label='New Password' id='typeText' type='text' name='newPassword' value={password.newPassword} onChange={handleInput} required />
                                                        <br />
                                                        <MDBInput label='Confirm Password' id='typeText' type='text' name='confirmPassword' value={password.confirmPassword} onChange={handleInput} required />
                                                        <br />


                                                    </MDBModalBody>

                                                    <MDBModalFooter>
                                                        {/* <button> ok </button> */}
                                                        <Button variant="contained"
                                                            color='info' onClick={toggleClose}>
                                                            Close
                                                        </Button>
                                                        <Button variant="contained"
                                                            color='info' onClick={() => savePassword()} >Save changes</Button>
                                                    </MDBModalFooter>
                                                </MDBModalContent>
                                            </MDBModalDialog>
                                        </MDBModal>
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
                            </MDBRow>
                        </MDBContainer>
                    )

                }


            </section>

        </div >
    );
}

export default Profile
