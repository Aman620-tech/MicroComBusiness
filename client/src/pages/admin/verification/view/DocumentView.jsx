import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fab from '@mui/material/Fab';
import { Table, Modal } from 'react-bootstrap';
import './index.css'
// import Modal from 'react-bootstrap/Modal';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';
// ButtonBase
// import { Button } from 'antd';
import { Button } from '@mui/material';
const DocumentView = () => {
    const { businessId } = useParams()
    const navigate = useNavigate()

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const config = { headers: { "token": localStorage.getItem("token") } }

    const [verificationData, setVerificationData] = useState([])
    const [getVerificationId, setGetVerificationId] = useState('')
    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const allDocs = async () => {
        const api = await axios.get(`${BaseUrl}/admin/all-business-verification-file/${businessId}`, config)
        console.log("response", api.data)

        if (api.data.status == 200) {
            setLoading(false);
            setVerificationData(api.data.verification)

        }
        if (api.data.status == 400) {
            console.log("response", api.data)
            console.log(api)
            window.alert(api.data.response)
        }
    }
    let Id
    const changeVerificationStatus = (verificationId) => {
        console.log("verificationId", verificationId)
        Id = verificationId


        setGetVerificationId(verificationId);
        console.log("getVerificationId", getVerificationId)


    }
    console.log("Id", Id)
    // /verification-Status-change/

    useEffect(() => {
        allDocs()
    }, [0])
    return (
        <div className='verification_view'>
            <div>
                <Fab color="success" variant="contained" onClick={() => navigate(`/admin/dashboard/verification`)}>
                    <ArrowBackIcon />
                </Fab>

            </div>
            <div className='see_verification_docs'>
                <div>

                    Number of times applied:    {verificationData.length}
                </div>
                {/* <div>{verificationData.verification}</div> */}
            </div>
            <div className='see_verification_docs'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>status</th>
                            <th>Files/Documents</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>{
                        verificationData?.map((data, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data?.status === "pending" ? (<><Button color='warning' variant='contained' onClick={() => { changeVerificationStatus(data._id); handleShow(); }}>{data?.status}</Button> </>)
                                            : data?.status === "rejected" ? (<><Button color='error' variant='contained' onClick={() => changeVerificationStatus(data._id)} > {data?.status}</Button> </>) :
                                                (<><Button color='success' variant='contained' onClick={() => changeVerificationStatus(data._id)} > {data?.status}</Button></>)
                                        }</td>
                                        <td>{data.files.map((fileData) => {
                                            return (
                                                <>  <a className='download_button' href={fileData?.filePath} download > <InsertDriveFileIcon /> </a>
                                                </>
                                            )
                                        })}</td>
                                        <td>{data?.message}</td>
                                    </tr>
                                    <Modal centered show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Modal heading</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>

                            )
                        })}


                    </tbody>
                </Table>

            </div >
        </div >
    )
}

export default DocumentView