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
      {cookies.CustomerID ? 
        <div>
          <p className="text-h1 h1-m">租借中</p>
          <Movies movies={rentalMovies} reRender={reRenderAction}/>
          <Divider />
          <p className="text-h1 h1-m">租借歷史</p>
          <Movies movies={rentalHistory} reRender={reRenderAction}/>
        </div>
        :
        <div className="w-full h-screen -my-7 flex flex-col justify-center items-center gap-4">
          <p className="text-h1">尚未登入</p>
          <p className="text-h3">請登入或註冊帳號</p>
        </div>
      }
    </div>
  )
}

export default Subscription