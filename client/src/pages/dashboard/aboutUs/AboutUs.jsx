import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import Image from '../../../image/about.jpg'

const AboutUs = () => {
    return (
        <div>
            {/* <h2 style={{textAlign:"center"}}>Overview</h2>
            <div>
            <h6>Mico-Commerce is a one-stop supermarket chain that aims to offer customers a wide range of basic home and personal products under one application. Each Micro-Comm store stocks home utility products - including Mobile,Vehicle, Electronics, beauty products, Grocery, Fashion, , home appliances and more - available at competitive prices that our customers appreciate. Our core objective is to offer customers good products at great value.


           </h6> */}
            {/* </div> */}

            <Container>
                <Row>
                    <Col sm={6} style={{ paddingTop: '50px' }}><img src="https://images.unsplash.com/photo-1587141121200-3cdb4c1b78a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAyfHxzaG9wcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt='' style={{ height: "70%" }} /></Col>
                    <Col sm={6} >
                        <div><h2 style={{ paddingTop: '50px' }}>Overview</h2></div>
                        {/* <h2 style={{textAlign:"center"}}>Overview</h2> */}
                        <h6 style={{ paddingTop: '70px' }}>Mico-Commerce is a one-stop supermarket chain that aims to offer customers
                            a wide range of basic home and personal products under one application. Each Micro-Comm store stocks
                            home utility products - including Mobile,Vehicle, Electronics, beauty products, Grocery, Fashion, home
                            appliances and more - available at competitive prices that our customers appreciate. Our core objective is
                            to offer customers good products at great value.</h6>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default AboutUs