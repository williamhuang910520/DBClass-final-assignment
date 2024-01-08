import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import Movies from '../components/Movies'
import Divider from '../components/Divider'

import { movieAPI, rentalAPI } from '/src/api/api'

const Subscription = () => {

  const [cookies, setCookie] = useCookies(['CustomerID'])
  const [rentalMovies, setRentalMovies] = useState([])
  const [rentalHistory, setRentalHistory] = useState([])
  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    rentalAPI.getRental(cookies.CustomerID, false).then(response=>{
      setRentalMovies(response)
      console.log(response)
    })
    rentalAPI.getRental(cookies.CustomerID, true).then(response=>{
      setRentalHistory(response)
      console.log(response)
    })
  }, [reRender]);

  const reRenderAction = () => {
    setReRender(!reRender)
  }


  return (
    <div className="p-7 box-border">
      <p className="text-h1 h1-m">租借中</p>
      <Movies movies={rentalMovies} reRender={reRenderAction}/>
      <Divider />
      <p className="text-h1 h1-m">租借歷史</p>
      <Movies movies={rentalHistory} reRender={reRenderAction}/>
    </div>
  )
}

export default Subscription