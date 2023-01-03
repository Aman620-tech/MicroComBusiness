import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';

const AdminFeedback = () => {

  // /admin/all-feedback
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const allFeedback = async () => {

    const config =
      { headers: { "token": localStorage.getItem("token") } }

    const response = await axios.get(`${BaseUrl}/admin/all-feedback`, config)
    console.log(response.data)

    setFeedback(response.data.feedback)
    setLoading(false)
  }

  useEffect(() => {
    allFeedback()
  }, [])

  return (
    <>
      <div>


        <div className='verification_view'>
          <Table >
            <thead>
              <tr>
                <th>S No.</th>
                <th>Business Name</th>
                <th>Owner Name</th>
                <th>files</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (<h3> Loading ... </h3>) : feedback?.map((data) => {
                return (<tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>)
              })
              }


            </tbody>
          </Table>
        </div>





      </div >
    </>
  )
}

export default AdminFeedback