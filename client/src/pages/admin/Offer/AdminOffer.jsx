import React from 'react'
import {Tab , Tabs }from 'react-bootstrap';
import './AdminOffer.css'

import AddOffer from './AddOffer/AddOffer';
import ViewOffer from './ViewOffer/ViewOffer';
const AdminOffer = () => {
  return (
    <div className='offer-page'>   
       <Tabs
      defaultActiveKey="view offer"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="view offer" title="view offer">
        <ViewOffer />
      </Tab>
      <Tab eventKey="Add-Offer" title="Add-Offer">
        <AddOffer />
      </Tab>
      {/* <Tab eventKey="contact" title="Contact" disabled> */}
        {/* <Sonnet /> */}
      {/* </Tab> */}
    </Tabs>
    </div>
  )
}

export default AdminOffer