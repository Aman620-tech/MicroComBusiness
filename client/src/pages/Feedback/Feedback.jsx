/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Feedback = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;

  const [feedback, setFeedback] = useState([])

  const allFeedback = async () => {
    const response = await axios.get(`${BaseUrl}/feedback`)
    if (response.data.status === 200) {
      console.log("response.data", response.data);
      // setFeedback(response.data.user)

    }
  }

  useEffect(() => {
    allFeedback()
  }, [])


  // feedback
  return (
    <div>
      <div className='heading'>
        <div>

          {/* <h3>Categories</h3> */}
          {/* style={{display:"flex"}}  */}
          <div className='category '   >

            {/* <Row>
                    <Col>1 of 3</Col> */}
            {feedback && feedback.map((data) => {
              let img = data.categoryImage
              return (
                <div className='category-card' >
                  <Card raised className="card category-card" sx={{ maxWidth: 345 }} >
                    {/* raised for  shadowing */}
                    <CardActionArea>
                      <CardMedia
                        className='category-image'
                        component="img"
                        height="140"
                        image={img}
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

          
        </div>
      </div>




    </div>
  )
}

export default Feedback