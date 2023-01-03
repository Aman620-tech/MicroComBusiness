/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./Home.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;
    const [category, setCategory] = useState([])
    const [feedback, setFeedback] = useState([])
    const navigate = useNavigate()

    console.log("Baseurl", BaseUrl);
    const allCategory = async () => {
        const config = {
            headers: {

                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        }

        const api = await axios.get(`${BaseUrl}/all-category`, config)
        if (api.status === 200) {
            console.log("object", api.data.category);
            setCategory(api.data.category)
        }


    }
    const allFeedback = async () => {
        try {

            const api = await axios.get(`${BaseUrl}/feedback`)
            if (api.status === 200) {
                console.log("object", api.data);
                // setFeedback(api.data.category)
            }
        } catch (err) {
            console.log(err.message)

        }


    }



    useEffect(() => {
        allCategory()
        allFeedback()
    }, [0])


    return (
        <div>
            {/* <div className='heading'> */}
            {/* <div> */}

            {/* <h3>Categories</h3> */}
            {/* style={{display:"flex"}}  */}
            <div className='category '   >

                {category && category.map((data) => {
                    // let img = data.image.map(()=>{

                    return (
                        <div className='category-card' >
                            <Card raised className="card category-card" sx={{ maxWidth: 345 }} onClick={() => { navigate(`/category/product/${data._id}`) }}>
                                {/* raised for  shadowing */}
                                <CardActionArea>
                                    <CardMedia
                                        className='category-image'
                                        component="img"
                                        height="140"
                                        image={data.categoryImage}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {data.categoryName}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>

                    )
                })}
            </div>
            {/* </div> */}
            {/* </div> */}




        </div>


    );
}

export default Home