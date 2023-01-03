import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Accordion } from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import VerifiedIcon from '@mui/icons-material/Verified';
import PreviewIcon from '@mui/icons-material/Preview';
import './Index.css'
import { useNavigate } from 'react-router-dom';
import { SuccessNotify, ErrorNotify } from '../../../component/Notification/Notification';
const Verification = () => {
    const BaseUrl = process.env.REACT_APP_BASEURL;

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    const [verificationData, setVerificationData] = useState([])


    const getVerification = async () => {
        const config =
            { headers: { "token": localStorage.getItem("token") } }

        const response = await axios.get(`${BaseUrl}/admin/all-business-verification-file`, config)
        if (response.data.status == 200) {

            setLoading(false);
            setVerificationData(response.data.verification)

        }
        if (response.data.status == 400) {
            console.log("response", response.data)
            console.log(response)
            ErrorNotify(response.data.response)
        }

    }
    useEffect(() => {
        getVerification()
    }, [])

    return (
        <>

            <div className='verification_view'>

                <Table >
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Business</th>
                            <th>See Document</th>

                        </tr>
                    </thead>
                    {loading ? (<h4>Loading...</h4>) : (
                        <>
                            <tbody>
                                {verificationData?.map((data, index) => {


                                    return (<tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Accordion >
                                                <Accordion.Item >
                                                    {data.BusinessData.map((newData, item) => {

                                                        return (
                                                            <>
                                                                <Accordion.Header>{newData.businessName}</Accordion.Header>
                                                                <Accordion.Body>
                                                                    <Table striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>
                                                                                    {/* <div className='detail_view pt-3' > */}
                                                                                    BusinessType: {newData.businessType}
                                                                                    {/* </div> */}
                                                                                </th>
                                                                                <th>
                                                                                    GST NO: {newData.gstNo}
                                                                                </th>
                                                                                <th>
                                                                                    PAN NO: {newData.panNo}
                                                                                </th>
                                                                                <th>
                                                                                    <Fab variant=" " size='small' >{newData.verified ? (<VerifiedIcon color="primary" />) : (<>  <VerifiedIcon color="disabled" /></>)}</Fab>
                                                                                </th>

                                                                                <th>
                                                                                    Shop Status :  {newData.active ? (
                                                                                        <Fab size='small' variant="contained" color="success" >

                                                                                        </Fab>
                                                                                    ) : (<Fab variant=" " size='small' color="error" >
                                                                                        {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                                                                                    </Fab>)}
                                                                                </th>
                                                                                <th>
                                                                                    Verification Applied: {data.VerificationData.length}
                                                                                </th>

                                                                            </tr>
                                                                        </thead>
                                                                    </Table>

                                                                </Accordion.Body>
                                                            </>
                                                        )

                                                    })

                                                    }

                                                </Accordion.Item>

                                            </Accordion>
                                        </td>
                                        <td> <Fab color="warning" variant="contained" onClick={() => navigate(`/admin/dashboard/verification/${data._id}`)}>
                                            <PreviewIcon />
                                        </Fab></td>

                                    </tr>)
                                })}


                            </tbody>
                        </>)}

                </Table>



            </div>
        </>
    )
}

export default Verification