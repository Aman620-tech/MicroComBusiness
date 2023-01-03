/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import './index.css'
const Developers = () => {
  const BaseUrl = process.env.REACT_APP_BASEURL;

  const [developer, setDeveloper] = useState([])

  const allDeveloper = async () => {

    const api = await axios.get(`${BaseUrl}/all-developer`)
    // const developerData = await api.data
    if (api.data.status === 200) {
      console.log("first", api.data.developer)
      setDeveloper(api.data.developer)

    } else {
      window.alert(api.data.response)
    }
  }
  useEffect(() => {
    allDeveloper()
  }, [])

  return (
    <div className='profile_card'>
      {developer?.map((value, index) => {
        let img = `${value.image}`
        return (
          <Card sx={{ maxWidth: 250 }}>

            <CardMedia
              component="img"
              height="194"
              image={img}
              alt="Paella dish"
              style={{ width: 199, height: 188, borderRadius: 200 }}

            />
            <CardContent>
              <h4 variant="body2" color="text.secondary">
                {value.name}
              </h4>
              <Typography variant="body2" color="text.secondary">
                {value.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="Instagram Id" href={value.instagram} target="_blank" >
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="linkedIn" href={value.linkedIn} target="_blank">
                {/* onClick={()=>{value.linkedIn}} */}
                <LinkedInIcon />
              </IconButton>
            </CardActions>

          </Card>)
      })}
    </div>
  );
}
export default Developers;