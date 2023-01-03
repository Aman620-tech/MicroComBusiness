/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminProtected(props) {
  let Cmp = props.cmp;

  const [authorized, SetAuthorized] = useState(false)

  const navigate = useNavigate();

  const check = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      // console.log("hello");
    }
    if (localStorage.getItem('role') !== "admin") {
      alert("Sorry you are not Admin ")
      localStorage.clear()
      navigate('/login')
    }
    else {
      SetAuthorized(true);
    }
  }

  useEffect(() => {
    check()

  }, [0])

  return (

    (authorized && <Cmp />)
  )
}

export function BusinessProtected(props) {
  let Cmp = props.cmp;
  // console.log(props);
  // console.log(Cmp);
  const [authorized, SetAuthorized] = useState(false)

  const navigate = useNavigate();

  const check = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      // console.log("hello");
    }
    if (localStorage.getItem('role') !== "business") {
      alert("Sorry you are not Business Member ")
      localStorage.clear()
      navigate('/login')
    }

    else {
      SetAuthorized(true);
      // console.log("world");
    }


  }

  useEffect(() => {
    check()
  }, [0])

  return (

    (authorized && <Cmp />)
  )
}
export function UserProtected(props) {
  let Cmp = props.cmp;
  // console.log(props);
  // console.log(Cmp);
  const [authorized, SetAuthorized] = useState(false)

  const navigate = useNavigate();
  const check = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      // console.log("hello");
    }
    if (localStorage.getItem('role') !== "customer") {
      localStorage.clear()
      alert("Sorry you need to login first ")
      navigate('/login')
    }

    else {
      SetAuthorized(true);
      // console.log("world");
    }

  }

  useEffect(() => {
    check()

  }, [0])

  return (

    (authorized && <Cmp />)
  )
}
