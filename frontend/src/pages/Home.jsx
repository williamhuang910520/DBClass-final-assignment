import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

import Movies from '../components/Movies'
import Divider from '../components/Divider'

import { movieAPI } from '/src/api/api'


const Home = () => {
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
          <p className="text-h1 text-6xl">最新強檔，不再錯過</p>
          <p className="text-h1 mt-5">錯過再等100年</p>
        </div>
        <div className="h-full w-full absolute bg-zinc-900 bg-opacity-35 z-[2]"></div>
        <img className="h-full w-full absolute object-cover " src="https://image.tmdb.org/t/p/w1280/uYOFKk3JXDuqmGHKUuRhkFhutJR.jpg" alt="" />
      </div>
      <p className="text-h1 h1-m">最新電影</p>
      {finishFetch && <Movies movies={movies}/>}
      <Divider />
      <p className="text-h1 h1-m">熱門電影</p>
      {finishFetch && <Movies movies={movies}/>}
    </div>
  )
}

export default Home