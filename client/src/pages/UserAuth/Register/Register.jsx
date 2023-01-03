/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import { Country, State, City }  from 'country-state-city';

import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import yourhandle from 'countrycitystatejson'
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const Register = () => {

    // console.log(getCountries())
    const history = useNavigate()
    const BaseUrl = process.env.REACT_APP_BASEURL;
    // ==================================================
    const ErrorNotify = (message) => toast.error(message);
    const SuccessNotify = (message) => toast.success(message);
    const InfoNotify = (message) => toast.info(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })

    // ======================================

    const [getCountry, setGetCountry] = useState([])
    const [country, setCountry] = useState([])
    const [getState, setGetState] = useState([])
    const [state, setState] = useState([])
    const [getCity, setGetCity] = useState([])
    const [city, setCity] = useState([])


    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
        address: "",
        gender: "",
        role: "",
        city: "",
    })

    const [userInfo, setUserInfo] = useState({
        file: [],
        // filePreview: null,
    });

    const handleInputChange = (event) => {
        setUserInfo({
            ...userInfo,
            file: event.target.files[0],
            // filePreview: URL.createObjectURL(event.target.files[0]),
        });
    };

    const handleInput = (e) => {
        const { name, value } = e.target
        console.log("name", name, "value", value);
        setValues({ ...values, [name]: value })

    }

    const submitData = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("mobileNumber", values.mobileNumber);
        formData.append("address", values.address);
        formData.append("country", country);
        formData.append("state", state);
        formData.append("city", values.city);
        formData.append("gender", values.gender);
        formData.append("role", values.role);

        formData.append("image", userInfo.file);

        for (const value of formData.values()) {
            console.log(value);
        }
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        const api = await axios.post(`${BaseUrl}/register`, formData, config)
        console.log(api.data)
        if (api.data.status === 200) {
            SuccessNotify(api.data.response)


            if (api.data.user.role == "customer") {
                localStorage.setItem("token", api.data.token)
                localStorage.setItem("role", api.data.user.role)
                history('/')
            }
            if (api.data.user.role == "business") {
                localStorage.setItem("token", api.data.token)
                history('/business/register')

            }


        }
        if (api.data.status === 400) {
            ErrorNotify(api.data.response)
        }



    }


    const allCountry = async () => {

        const allCountry = await yourhandle.getCountries()
        await setGetCountry(allCountry)

        // console.log("allCountry", allCountry)

    }

    const allState = async (countryIso) => {
        var requestOptions = {
            headers: { "X-CSCAPI-KEY": "SzlVNmpTVlJmVEJuYnVOajFOUVVTNEhkanpvNVFxckdMUGcwZXhvMQ==" },
            redirect: 'follow'
        };

        //     const state = await axios.get("https://api.countrystatecity.in/v1/states", requestOptions)
        const states = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`, requestOptions)

        console.log("states", states.data)

        await setGetState(states.data)
        // await allCities(countryIso)

        // await allCities(countryIso, state)
        //     setState(state.data)

        // }
    }
    // const allCities = async (iso) => {


    // }
    const handleState = async (sta) => {

        const city = await getState.filter((e) => { return e.name === sta })
        console.log("country", sta)


        // const country = await states.filter((e) => { return e.name  })

        // const data = await yourhandle.getCities(iso, state)
        console.log("city", city[0].iso2);

    }

    // console.log("getState", getState);
    const handleCountry = async (val) => {
        // console.log("e", val);
        // const country = await getCountry.find((e) => console.log("object", e.name === val))
        const country = await getCountry.filter((e) => { return e.name === val })
        console.log("country", country[0].shortName);
        // const countryState = await yourhandle.getCountryByShort(country[0].shortName)
        await allState(country[0].shortName)

    }
    // const allState = async () => {
    //     var requestOptions = {
    //         headers: { "X-CSCAPI-KEY": "SzlVNmpTVlJmVEJuYnVOajFOUVVTNEhkanpvNVFxckdMUGcwZXhvMQ==" },
    //         redirect: 'follow'
    //     };

    //     const state = await axios.get("https://api.countrystatecity.in/v1/states", requestOptions)
    // fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)

    //     setState(state.data)

    // }
    useEffect(() => {
        allCountry()
        // allState()
    }, [])

    return (
        <>
            <div className='mt-5'>
                <ToastContainer />

                <div class="container px-4">
                    <form>
                        <div class="p-3 border bg-light">

                            <div class="row mt-4">
                                <div class="col">
                                    {/* <div class="row mt-1">
                                        <div class="col"> */}
                                    <div>

                                        <InputLabel >First Name</InputLabel>
                                    </div>
                                    <div>

                                        <TextField fullWidth name="firstName" value={values.firstName} onChange={handleInput} />
                                    </div>

                                    {/* <input type="text" class="form-control" placeholder="Name" aria-label="Name" name="name" value={values.name} onChange={handleInput} /> */}
                                </div>
                                <div class="col">
                                    <div>

                                        <InputLabel >Last Name</InputLabel>
                                    </div>
                                    <div>

                                        <TextField fullWidth name="lastName" value={values.lastName} onChange={handleInput} />
                                    </div>

                                    {/* <input type="email" class="form-control" placeholder="Email" aria-label="Name" name="email" value={values.email} onChange={handleInput} /> */}
                                </div>
                                {/* </div> */}

                            </div>
                            <div class="row mt-4">
                                <div class="col">
                                    <div>

                                        <InputLabel >Email</InputLabel>
                                    </div>
                                    <div>

                                        <TextField fullWidth type="email" name="email" value={values.email} onChange={handleInput} />
                                    </div>

                                    {/* <input type="password" class="form-control" placeholder="Password" name="password" value={values.password} onChange={handleInput} /> */}
                                </div>
                                <div class="col">
                                    <div>

                                        <InputLabel >Mobile Number</InputLabel>
                                    </div>
                                    <div>

                                        <TextField fullWidth type="tel" name="mobileNumber" value={values.mobileNumber} onChange={handleInput} />
                                    </div>

                                    {/* <input type="text" class="form-control" placeholder="Mobile Number" name="mobileNumber" value={values.mobileNumber} onChange={handleInput} /> */}
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col">
                                    <div>

                                        <InputLabel >Password</InputLabel>
                                    </div>
                                    <div>

                                        <TextField fullWidth type="password" name="password" value={values.password} onChange={handleInput} />
                                    </div>

                                    {/* <input type="password" class="form-control" placeholder="Password" name="password" value={values.password} onChange={handleInput} /> */}
                                </div>
                                <div class="col">
                                    <div>

                                        <InputLabel >Address</InputLabel>
                                    </div>
                                    <TextField fullWidth name="address" value={values.address} onChange={handleInput} />

                                    {/* <TextField fullWidth label="Email " id="fullWidth" type="text" name="mobileNumber" value={values.mobileNumber} onChange={handleInput}/> */}

                                    {/* <input type="text" class="form-control" placeholder="Mobile Number" name="mobileNumber" value={values.mobileNumber} onChange={handleInput} /> */}
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col">
                                    <div>

                                        <InputLabel >Gender</InputLabel>
                                    </div>
                                    <div>

                                        <Select fullWidth
                                            labelId="Open this select Gender"
                                            id="demo-multiple-name"
                                            name='gender'
                                            value={values.gender}
                                            onChange={handleInput}
                                        >
                                            <MenuItem value={"male"} > Male </MenuItem>
                                            <MenuItem value={"female"} >Female </MenuItem>
                                            <MenuItem value={"transgender"} > Other </MenuItem>
                                        </Select>
                                    </div>
                                    {/* <textarea class="form-control" placeholder="Address" name="address" value={values.address} onChange={handleInput} /> */}
                                    {/* <TextField fullWidth label="Mobile Number" id="fullWidth" name="mobileNumber" value={values.mobileNumber} onChange={handleInput} /> */}

                                </div>
                                <div class="col">

                                    <div>

                                        <InputLabel >City</InputLabel>
                                    </div>
                                    <div>

                                        <TextField fullWidth name="City" value={values.City} onChange={handleInput} />
                                    </div>

                                    {/* <input type="text" class="form-control" placeholder="Mobile Number" name="city" value={values.city} onChange={handleInput} /> */}


                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col">

                                    <div>
                                        <InputLabel >Select Country</InputLabel>

                                    </div>
                                    <div>
                                        <Select fullWidth label="Country" id="demo-multiple-name" name="country" value={country} onChange={(e) => handleCountry(e.target.value)}>
                                            {getCountry?.map((data) => {
                                                return (
                                                    <MenuItem value={data.name} >{data.name} </MenuItem>
                                                )
                                            })}
                                            {/* <MenuItem value={"female"} >Female </MenuItem>
                                        <MenuItem value={"transgender"} > Other </MenuItem> */}
                                        </Select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div>

                                        <InputLabel >State</InputLabel>
                                    </div>

                                    <div>

                                        <Select fullWidth id="demo-multiple-name" name="state" value={state} onChange={(e) => handleState(e.target.value)}>
                                            {getState?.map((data) => {
                                                return (
                                                    <MenuItem value={data.name} >{data.name} </MenuItem>
                                                )
                                            })}
                                            {/* <MenuItem value={"female"} >Female </MenuItem> <MenuItem value={"transgender"} > Other </MenuItem> */}
                                        </Select>
                                    </div>
                                </div>


                            </div>
                            <div class="row mt-4">

                                <div class="col">

                                    <div>

                                        <InputLabel >User Type</InputLabel>
                                    </div>
                                    <div>

                                        <Select fullWidth type='select'
                                            labelId="Open this select Gender"
                                            id="demo-multiple-name"
                                            name="role" value={values.role} onChange={handleInput}
                                        >
                                            <MenuItem value={"None"} > None </MenuItem>
                                            <MenuItem value={"customer"} > Customer </MenuItem>
                                            <MenuItem value={"business"} > Business </MenuItem>
                                        </Select>
                                    </div>

                                </div>
                                <div class="col">
                                    <div>

                                        <InputLabel >User Image</InputLabel>
                                    </div>
                                    <div>

                                        <TextField fullWidth type="file" id="fullWidth" name="profilePicture" onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4 ml-5">
                                <div class="col">
                                    <Button variant="contained"
                                        color='info'  type="submit" onClick={submitData} >Submit</Button>
                                </div>
                                <div class="col">
                                    <Button variant="contained"
                                        color='info' class=" " type="reset">Reset</Button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div >



        </>
    );
};
export default Register;
