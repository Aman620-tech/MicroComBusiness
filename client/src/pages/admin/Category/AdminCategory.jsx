/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Table, TableBody, Button, TableCell, Fab, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import AdminDashboard from '../Dashboard/AdminDashboard'
import { Box } from '@mui/system';
// import Fab from '@mui/material/Fab';
import './AdminCategory.css'
const AdminCategory = () => {
  const navigate = useNavigate();

  const BaseUrl = process.env.REACT_APP_BASEURL;
  // let [active,setActive] =useState()
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [values, setValues] = useState({
    categoryName: ""
  })
  const [userInfo, setUserInfo] = useState({
    file: [],
  });

  const handleInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      file: event.target.files[0],
    });
  };
  const handleInput = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const submitBusinessData = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData();
      formData.append("categoryName", values.categoryName);
      formData.append("categoryImage", userInfo.file);
      // for (const value of formData.values()) {
      //   console.log(value);
      // }
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          "token": localStorage.getItem("token")
        }
      }
      const response = await axios.post(`${BaseUrl}/admin/category-create`, formData, config)
      // console.log("first", response.data)
      if (response.data.status === 200) {
        handleClose()
        allCategory()
        // setValues()
        // setUserInfo()
        // history(`/business/dashboard/${response.data.shop._id}`)


      }
    } catch (err) {

    }
  }
  const allCategory = async () => {
    const config =
      { headers: { "token": localStorage.getItem("token") } }

    const response = await axios.get(`${BaseUrl}/admin/all-category`, config)
    // console.log(response.data.category)
    setCategory(response.data.category)
    setLoading(false)
  }

  useEffect(() => {
    allCategory()
  }, [])


  const deleteCategory = async (categoryId) => {
    const config =
      { headers: { "token": localStorage.getItem("token") } }

    const response = await axios.delete(`${BaseUrl}/admin/delete-category/${categoryId}`, config)
    await allCategory()

  }

  const allSubCategory = async (categoryId) => {
    const config =
      { headers: { "token": localStorage.getItem("token") } }

    // const response = await axios.delete(`${BaseUrl}/admin/delete-category/${categoryId}`, config)
    await allCategory()

  }
  return (
    <div className='category-table'>
      <Box>
        <div class="container overflow-hidden">

          <Button variant="contained" onClick={handleShow}>
            Add Category
          </Button>

          <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>   <form>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label" >Category Name</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="inputEmail3" name="categoryName" value={values.categoryName} onChange={handleInput} />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label" >Category Image</label>
                <div class="col-sm-10">
                  <input type="file" class="form-control" id="inputPassword3" onChange={handleInputChange} />
                </div>
              </div>

            </form></Modal.Body>
            <Modal.Footer>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" onClick={submitBusinessData}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Add Model End */}

          <div class="table-responsive ">
            <div class="table-responsive">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">S No.</TableCell>
                      <TableCell align="right">Category Image</TableCell>
                      <TableCell align="right">Category Name</TableCell>
                      {/* <TableCell align="right">Update</TableCell> */}
                      <TableCell align="right">Delete</TableCell>
                      <TableCell align="right">Active</TableCell>
                      <TableCell align="right">Sub Categories</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {loading ? (<h3>Loading ...</h3>) : category && category.map((value, index) => {
                      let img = `${value.categoryImage}`
                      // let state = `${value.active}`
                      // console.log("State",state)
                      // setActive(state)

                      return (
                        <TableRow key={value.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                          <TableCell align="right">{index + 1}</TableCell>
                          <TableCell align="right"><img src={img} alt="img" width="155" height="80" /></TableCell>
                          <TableCell align="right">{value.categoryName}</TableCell>
                          {/* <TableCell align="right"><Fab variant="contained" color="info" onClick={() => { updateCategory(value._id) }}>Update</Fab></TableCell> */}
                          <TableCell align="right"><Fab variant="contained" color="error" onClick={() => { deleteCategory(value._id) }}>Delete</Fab></TableCell>
                          <TableCell align="right">
                            {value.active ? (<>
                              {/* <Fab  variant="extended"> */}
                              {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                              <Fab color="success" variant="contained">
                                {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                                Active
                              </Fab></>
                            ) : (<><Fab color="error" variant="contained">
                              {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                              In-Active
                            </Fab></>)}
                          </TableCell>
                          <TableCell align="right"><Fab variant="contained" color="secondary" onClick={() => navigate(`/admin/dashboard/category/${value._id}`)}>See</Fab></TableCell>

                        </TableRow>)
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

            </div >

          </div>
        </div >
      </Box >
    </div >
  )
}

export default AdminCategory