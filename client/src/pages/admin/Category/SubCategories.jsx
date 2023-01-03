import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './AdminCategory.css'
import { Fab, Table } from '@mui/material';
import { useParams } from 'react-router-dom';
// import VerifiedIcon from '@mui/icons-material/Verified';

const SubCategories = () => {
    const params = useParams()
    const { categoryId } = params
    const BaseUrl = process.env.REACT_APP_BASEURL;

    const [subCategory, setSubCategory] = useState([])
    const config =
        { headers: { "token": localStorage.getItem("token") } }


    const allSubCategory = async () => {
        const response = await axios.get(`${BaseUrl}/admin/all-sub-category/${categoryId}`, config)
        console.log("response", response.data)
        if (response.data.status == 200) {

            setSubCategory(response.data.subCategory)

        }
        if (response.data.status == 400) {
            console.log("response", response.data)
            console.log(response)
            window.alert(response.data.response)
        }
    }


    useEffect(() => {
        allSubCategory()
    }, [0])


    return (
        <div className='subcategory_data'>


            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Sub Category Name</th>
                        <th>Sub Category Image</th>
                        <th>Category Name</th>
                        <th>Status</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>


                    {subCategory?.map((data, index) => {

                        return (
                            <tr>
                                <td>
                                    {index + 1}
                                </td>


                                <td>
                                    {data?.subcategoryName}
                                </td>
                                <td>
                                    <img src={data?.subcategoryImage} alt="" width="50px" height="50px" srcset="" />
                                </td>
                                <td>
                                    {data?.categoryId?.categoryName}
                                </td>


                                <td>
                                    {data.active ? (
                                        <Fab size='small' variant="contained" color="success" >

                                        </Fab>
                                    ) : (<Fab variant=" " size='small' color="error" >
                                        {/* <NavigationIcon sx={{ mr: 1 }} /> */}
                                    </Fab>)}
                                </td>

                                <td>
                                    <Fab size='small' variant="contained" color="error" >

                                    </Fab>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div >
    )
}

export default SubCategories