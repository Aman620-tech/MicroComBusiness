import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './index.css'
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import Add from './add/Add';



const Verification = () => {

  const [verification, setVerification] = useState([])
  const [loading, setLoading] = useState(true)
  const BaseUrl = process.env.REACT_APP_BASEURL;

  const [show, setShow] = useState(false);

  const allVerify = async () => {
    const businessId = localStorage.getItem("businessId")

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        "token": localStorage.getItem("token")
      }
    }
    // /view-verification/:businessId

    const api = await axios.get(`${BaseUrl}/business/view-verification/${businessId}`, config)
    // const api = await axios.get(`http://localhost:3001/api/business/view-verification/${businessId}`, config)
    console.log("verify", api)
    if (api.status === 200) {
      console.log("product-object", api.data.verification);
      setVerification(api.data.verification)
      setLoading(false)
    }
    if (api.status === 400) {
      console.log("product-object", api.data.response);
      alert("Error ");
    }
  }

  useEffect(() => {
    allVerify()
  }, [0])




  return (
    <div className='verification' >
      <div className='apply_verification_btn'>


        <Button variant="contained"
          onClick={() => setShow(!show)}
        >Apply For Verification</Button>
      </div>


      <div className='table-size'>
        {loading ? (<h4>Loading</h4>) : (<div>
          <div>
            <Table bordered hover >
              <thead>

                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>files</th>
                  <th>Status</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {/* <div> */}
                {verification && verification?.map((data, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data?.businessName}</td>
                      <td>{data?.files?.map((fileData) => <a className='download_button' href={fileData?.filePath} download ><DownloadIcon /> </a>)}</td>
                      <td>
                        {/* {data?.status ? ()} */}
                        {data?.status}

                      </td>
                      <td>{data?.message ? (<>{data?.message}</>) : (<>"None"</>)}</td>
                    </tr>
                  )

                })}

              </tbody>
            </Table>
          </div>

        </div>)
        }

      </div >
      {
        show &&
        <Add show={show} setShow={setShow} />
      }


    </div>
  )
}

export default Verification