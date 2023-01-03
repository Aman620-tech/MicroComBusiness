import React from 'react'
import './index.css'
import LineChart from '../../../component/Chart/LineChart'

let array = [
    {
        imageUrl: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
        title: "User",


    },
    {
        imageUrl: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
        title: "Home",


    },
    {
        imageUrl: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
        title: "Owners",


    },

    {
        imageUrl: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
        title: "Owners",


    },
]

const AdminHome = () => {
    return (
        <div className='admin_home'>
            <div className='d-flex'>
                {
                    array.map((data) => {
                        return (
                            <div class="col">
                                <div class="p-3 ">
                                    {/* USER */}
                                    <div>
                                        <div
                                            className="card md-10 shadow"
                                            style={{ width: "220px", height: "120px" }}
                                        >
                                            <div className="row g-1 p-2">
                                                <div className="col-6">
                                                    <img
                                                        src={data.imageUrl}
                                                        className="img-fluid rounded-start rounded-end"
                                                        alt="Cart"
                                                        width="100px"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{data.title}</h5>
                                                        {/* <h6 className="card-text" > Home</h6> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='d-flex graph_view'>
                <div className='graph'><LineChart /></div>
                <div className='graph' ><LineChart /></div>
            </div>
        </div>
    )
}

export default AdminHome