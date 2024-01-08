import React, { useState, useEffect } from 'react'

import { Icon } from '@iconify/react';

import Movies from '../components/Movies'
import Divider from '../components/Divider'
import Dialog from '../components/Dialog'

import { movieAPI } from '/src/api/api'


const Manange = () => {
  const [finishFetch, setFinishFetch] = useState(false)
  const [movies, setMovies] = useState([])
  const [showAddMovieDialog, setShowAddMovieDialog] = useState(false)
  const [movieInfo, setMovieInfo] = useState({
    "title": "New Test Movie",
    "genre": "Action",
    "actor": "John Doe",
    "release_date": "2023-01-01",
    "rental_price": 500,
    "cover_url": "https://google.com",
    "discription": "This is a discription."
  })
  
  const handleInputChange = e => {
    const { name, value } = e.target;
    setMovieInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if(!showAddMovieDialog){ 
      movieAPI.getAllMovies().then(moviesData => {
        setMovies(moviesData)
        setFinishFetch(true)
      })
    }
  }, [showAddMovieDialog])

  const handleAddMovie = e => {
    movieAPI.addMovie(movieInfo).then(response=>{
      console.log(response)
      setShowAddMovieDialog(false)
    })
  }
  
  return (
    <div className="flex flex-col p-7 box-border h-screen relative">
      <p className="text-h1 h1-m">所有電影</p>
      <Movies movies={movies}/>
      <button 
        className="absolute h-16 w-16 bottom-6 right-6 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600"
        onClick={()=>{setShowAddMovieDialog(true)}}
      >        
        <Icon icon="material-symbols:add-rounded" height="1.75rem" color='#FFFFFF'/>
      </button>
      <Dialog title="新增電影" show={showAddMovieDialog}>
        <div className="grid w-[600px] grid-cols-2 gap-y-6 gap-x-8">
          <div className="flex flex-col gap-2 ">
            <p className="text-h4">名稱</p>
            <input type="text" value={movieInfo.title} onChange={handleInputChange} name="title" className="input-text"/>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-h4">分類</p>
            <input type="text" value={movieInfo.genre} onChange={handleInputChange} name="genre" className="input-text"/>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-h4">導演</p>
            <input type="text" value={movieInfo.actor} onChange={handleInputChange} name="actor" className="input-text"/>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-h4">上映日期</p>
            <input type="text" value={movieInfo.release_date} onChange={handleInputChange} name="release_date" className="input-text"/>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-h4">租借金額</p>
            <input type="text" value={movieInfo.rental_price} onChange={handleInputChange} name="rental_price" className="input-text"/>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-h4">封面url</p>
            <input type="text" value={movieInfo.cover_url} onChange={handleInputChange} name="cover_url" className="input-text"/>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <p className="text-h4">電影描述</p>
            <input type="text" value={movieInfo.discription} onChange={handleInputChange} name="discription" className="input-text"/>
          </div>
        </div>
        
        <div className="flex justify-between text-white mt-2">
          <button 
            className="btn-opacity"
            onClick={()=>{setShowAddMovieDialog(false)}}>
              取消
          </button>
          <button 
            className="btn-dialog"
            onClick={handleAddMovie}>
              新增
          </button>
            
        </div>
      </Dialog>
    </div>
  )
}

export default Manange