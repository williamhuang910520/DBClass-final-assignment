import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import Movies from '../components/Movies'
import Divider from '../components/Divider'

import { movieAPI } from '/src/api/api'

const Discover = () => {
  const [finishFetch, setFinishFetch] = useState(false)
  const [movies, setMovies] = useState([])
  const [cookies, setCookies] = useCookies(['CustomerID'])

  useEffect(() => {
    movieAPI.getAllMovies().then(moviesData => {
      console.log(moviesData)
      setMovies(moviesData)
      setFinishFetch(true)
    })

  }, [])

  return (
    <div className="p-7 box-border">
      <div className="flex flex-col relative h-[25rem] mb-6 rounded-3xl justify-center items-center overflow-hidden">
        <div className="flex flex-col items-center z-10">
          <p className="text-h1 text-6xl">最近熱門竄升的電影</p>
          <p className="text-h1 mt-5">想跟風就看這邊</p>
        </div>
        <div className="h-full w-full absolute bg-zinc-900 bg-opacity-35 z-[2]"></div>
        <img className="h-full w-full absolute object-cover " src="https://daimaostory.com/wp-content/uploads/2023/12/%E6%97%BA%E5%8D%A1%E6%B5%B7%E5%A0%B1.jpg" alt="" />
      </div>
      
      <p className="text-h1 h1-m">大家都在看</p>
      {finishFetch && <Movies movies={movies}/>}
      <Divider />
      <p className="text-h1 h1-m">最新電影</p>
      {finishFetch && <Movies movies={movies}/>}
    </div>
  )
}

export default Discover