/* eslint-disable eqeqeq */
import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    // localStorage.clear()
    return (
        <>
            <div className="container">
                <div style={{ minHeight: "85vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

                    {/* <h1 className="mb-3">404 ERROR </h1> */}
                    <h4 className="mb-3">Work On Progress...</h4>


                    {localStorage.getItem("role") == "admin" ? (<>
                        <NavLink to="/admin/dashboard" className="btn btn-primary" style={{ fontSize: 18 }}> Back To Home Page </NavLink>
                    </>) : localStorage.getItem("role") == "business" ? (<>
                        <NavLink to="/business/dashboard" className="btn btn-primary" style={{ fontSize: 18 }}> Back To Home Page </NavLink>
                    </>) : localStorage.getItem("role") == "customer" ? (<>
                        <NavLink to="/" className="btn btn-primary" style={{ fontSize: 18 }}> Back To Home Page </NavLink>
                    </>) : (<></>)}

                </div>
            </div>
        </>
    )
}

export default Error