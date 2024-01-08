import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import Dialog from '../components/Dialog'
import Badge from '../components/Badge'

import { rentalAPI } from '/src/api/api'
import { movieRentalStatus } from '/src/utils/NameChanger'


const Movies = ({movies, manage, reRender}) => {
  return (
    <div className="box-border flex pb-7 px-7 mx-[-1.75rem] gap-7 overflow-y-auto scrollbar ">
      {movies==0?
        <div className="flex justify-center items-center text-h3 w-full h-[20rem] ">尚無資料</div>
        :
        <>{movies.map((movie) => <MovieItem
          title={movie.Title} 
          actor={movie.Actor} 
          genre={movie.Genre}
          price={movie.RentalPrice} 
          discription={movie.Discription} 
          imageUrl={movie.CoverUrl}
          rentalID={movie.RentalID}
          returnDate={movie.ReturnDate}
          rentalStatus={movie.RentalStatus}
          key={movie.MovieID+movie.RentalID} 
          reRender={reRender}
        />)}</>
      }
      
    </div>
  )
}

const MovieItem = ({title, actor, price, discription, genre, imageUrl, rentalID, returnDate, rentalStatus, reRender}) =>{

  const [cookies, setCookie] = useCookies(['CustomerID'])

  const [valueReturnDate, setValueReturnDate] = useState(returnDate)

  const [showDialogMovieInfo, setShowDialogMovieInfo] = useState(false)
  const handleTurnoffMovieInfo = e => {
    setShowDialogMovieInfo(false)
    console.log("hahaha")
  }

  const [showDialogEditRental, setShowDialogEditRental] = useState(false)
  const handleEditRental = e => {
    console.log(cookies.CustomerID);
    rentalAPI.updateRental(rentalID, valueReturnDate, rentalStatus).then((response) => {
      console.log(response)
      setShowDialogEditRental(false)
      reRender()
    })
  }

  const [showDialogCancelRental, setShowDialogCancelRental] = useState(false)
  const handleCancelRental = e => {
    console.log(cookies.CustomerID);
    rentalAPI.updateRental(rentalID, valueReturnDate, "Canceled").then((response) => {
      console.log(response)
      setShowDialogCancelRental(false)
      reRender()
    })
  }
  return (
    <div>
      <div className="flex flex-col gap-2 cursor-pointer" onClick={()=>{setShowDialogMovieInfo(true)}}>
        <div className="h-[24rem] w-[16rem]  rounded-2xl flex bg-white overflow-hidden">
          <img src={imageUrl} className="w-full object-cover" />
        </div>
        <div>
          <p className="text-h2">{title}</p>
          {rentalStatus=='Borrowing' && <div className="flex flex-col gap-4">
            <p className="text-white mt-2">歸還日期：{returnDate}</p>
            <div className="flex gap-4">
              <button 
                className="btn"
                onClick={()=>{setShowDialogEditRental(true)}}>
                  修改借閱
              </button>
              <button 
                className="btn"
                onClick={()=>{setShowDialogCancelRental(true)}}>
                  取消借閱
              </button>
            </div>
            <Dialog title="修改你的借閱" small show={showDialogEditRental}>
              {/* <p className="text-white">修改歸還日期</p> */}
              <div className="flex flex-col gap-2 ">
                <p className="text-h4">歸還日期</p>
                <input type="text" value={valueReturnDate} onChange={e=>{setValueReturnDate(e.target.value)}} name="returnDate" className="input-text"/>
              </div>
              <div className="flex justify-end gap-4 text-white mt-2">
                <button 
                  className="btn-opacity"
                  onClick={()=>{setShowDialogEditRental(false)}}>
                    取消
                </button>
                <button 
                  className="btn-dialog"
                  onClick={handleEditRental}>
                    確定
                </button>
              </div>
            </Dialog>
            <Dialog title="取消借閱" small show={showDialogCancelRental}>
              <p className="text-white">你確定要取消借閱嗎?</p>
              <div className="flex justify-end gap-4 text-white mt-2">
                <button 
                  className="btn-opacity"
                  onClick={()=>{setShowDialogCancelRental(false)}}>
                    我再想想
                </button>
                <button 
                  className="btn-dialog"
                  onClick={handleCancelRental}>
                    我要取消
                </button>
              </div>
            </Dialog>
          </div>}
          {rentalStatus && rentalStatus!='Borrowing' && <div className="flex flex-col mt-2 gap-3">
              <p className="text-white">歸還日期：{returnDate}</p>
              <Badge name={movieRentalStatus(rentalStatus)} />
            </div>
          }
          {!rentalStatus && <div className="flex flex-col mt-2 gap-4">
            <div className="flex justify-between items-end">
              <p className="text-white">{actor}</p>
              <Badge name={genre} />
            </div>
            <p className="text-h3">$<span className="text-h1">{price}</span></p>
          </div>
          }
        </div>
      </div>
      <Dialog show={showDialogMovieInfo}>
        <div className="flex gap-12">
          <div className="h-[21rem] w-[14rem]  rounded-2xl flex bg-white overflow-hidden">
            <img src={imageUrl} className="w-full object-cover" />
          </div>
          <div className="flex flex-col w-[24rem] mt-4">
            <div className="flex flex-col gap-4 flex-grow ">
              <p className="text-h1">{title}</p>
              <p className="text-h3">{actor}</p>
              <p className="text-white mt-4">{discription}</p>
              <Badge name={genre} />
            </div>
            <div className="flex justify-end gap-4">
              <button 
                className="btn-opacity"
                onClick={()=>{setShowDialogMovieInfo(false)}}>
                  關閉
              </button>
              <button 
                className="btn-dialog"
                onClick={()=>{setShowDialogMovieInfo(false)}}>
                  我要借閱
              </button>
            </div>
          </div>
          
        </div>
      </Dialog>
    </div>
  )
}

export default Movies