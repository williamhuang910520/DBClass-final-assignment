import React, { useState, useEffect } from 'react';

import { Icon } from '@iconify/react';
import { useCookies } from 'react-cookie';

import Divider from '../components/Divider'
import Dialog from '../components/Dialog'

import { customerAPI } from '/src/api/api'

const Account = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['CustomerID', 'ManageMode'])
  const [userData, setUserData] = useState({
    "NickName": "NickName", 
    "About": "About"
  })

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(cookies.CustomerID)
    if(cookies.CustomerID){
      customerAPI.getCustomerByID(cookies.CustomerID).then(response => {
        setUserData(response)
        console.log(response)
      })
    }
  }, [cookies])

  const [showDialogEditNickName, setShowDialogEditNickName] = useState(false)
  const [showDialogEditAbout, setShowDialogEditAbout] = useState(false)
  const [showDialogDeleteAccount, setShowDialogDeleteAccount] = useState(false)
  const [showDialogBecomeManager, setShowDialogBecomeManager] = useState(false)

  const handleEditNickName = e => {
    customerAPI.updateCustomer(cookies.CustomerID, userData).then(response => {
      console.log(response)
      setShowDialogEditNickName(false)
    })
  }
  const handleEditAbout = e => {   
    customerAPI.updateCustomer(cookies.CustomerID, userData).then(response => {
      console.log(response)
      setShowDialogEditAbout(false)
    })
  }
  const handleBecomeManager = e => {
    setCookie('ManageMode', true)
    setShowDialogBecomeManager(true)
  }
  const handleDeleteAccount = e => {
    customerAPI.deleteCustomer(cookies.CustomerID).then(response => {
      console.log(response)
      removeCookie('CustomerID')
      setShowDialogDeleteAccount(false)
    })
  }


  return (
    <div className="flex justify-center">
      {cookies.CustomerID ? 
        <div className="w-full max-w-[60rem] mx-20 h-screen">
          <div className="mt-24"></div>
          <div className="flex gap-16 mb-12">
            <div className="w-36 h-36">
              <div className="h-full bg-white rounded-full overflow-hidden">
                <img src={userData.Avatar} alt="" />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-5 flex-grow">
              <p className="text-h1 text-4xl">{userData.NickName}</p>
              <p className="text-white text-lg">{userData.About}</p>
            </div>
          </div>
          <div className="flex flex-col"> 
            <MenuItem 
              text="修改暱稱" 
              icon="material-symbols:drive-file-rename-outline-outline-rounded" 
              onClick={()=>{setShowDialogEditNickName(true)}}/>
            <MenuItem 
              text="修改簽名" 
              icon="material-symbols:ink-pen-outline-rounded" 
              onClick={()=>{setShowDialogEditAbout(true)}}/>
            <MenuItem 
              text="成為管理者" 
              icon="material-symbols:person-edit-outline-rounded" 
              onClick={handleBecomeManager}/>
            <MenuItem 
              text="刪除帳戶" 
              icon="material-symbols:delete-outline-rounded" 
              onClick={()=>{setShowDialogDeleteAccount(true)}}/>
          </div>
        </div>
      :
        
      <div className="w-full max-w-[60rem] mx-20 h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-h1">尚未登入</p>
        <p className="text-h3">請登入或註冊帳號</p>
      </div>
      }
      <Dialog title="修改你的暱稱" small show={showDialogEditNickName}>
        <div className="flex flex-col gap-2 ">
          <p className="text-h4">你的暱稱</p>
          <input type="text" value={userData.NickName} onChange={handleInputChange} name="NickName" className="input-text"/>
        </div>
        <div className="flex justify-end gap-4 text-white mt-2">
          <button 
            className="btn-opacity"
            onClick={()=>{setShowDialogEditNickName(false)}}>
              取消
          </button>
          <button 
            className="btn-dialog"
            onClick={handleEditNickName}>
              確定
          </button>
        </div>
      </Dialog>
      <Dialog title="修改關於我" small show={showDialogEditAbout}>
        <div className="flex flex-col gap-2 ">
          <p className="text-h4">關於我</p>
          <input type="text" value={userData.About} onChange={handleInputChange} name="About" className="input-text"/>
        </div>
        <div className="flex justify-end gap-4 text-white mt-2">
          <button 
            className="btn-opacity"
            onClick={()=>{setShowDialogEditAbout(false)}}>
              取消
          </button>
          <button 
            className="btn-dialog"
            onClick={handleEditAbout}>
              確定
          </button>
        </div>
      </Dialog>
      <Dialog title="已成為管理者" small show={showDialogBecomeManager}>
        <p className="text-white">你可以在"管理電影"中新增電影</p>
        <div className="flex justify-end gap-4 text-white mt-2">
          <button 
            className="btn-dialog"
            onClick={()=>{setShowDialogBecomeManager(false)}}>
              確定
          </button>
        </div>
      </Dialog>
      <Dialog title="你即將刪除帳戶" small show={showDialogDeleteAccount}>
        <p className="text-white">你的所有資料將被清除，確定刪除帳戶嗎? </p>
        <div className="flex justify-end gap-4 text-white mt-2">
          <button 
            className="btn-opacity"
            onClick={()=>{setShowDialogDeleteAccount(false)}}>
              取消
          </button>
          <button 
            className="btn-dialog"
            onClick={handleDeleteAccount}>
              確定
          </button>
        </div>
      </Dialog>
    </div>
  )
}

const MenuItem = ({text, icon, onClick}) => {
  return (
    <a 
      className={`flex h-16 items-center rounded-xl hover:cursor-pointer hover:bg-zinc-800`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-16 ">
        <Icon icon={icon} height="1.75rem" color='#FFFFFF'/>  
      </div>
      <p className={`ml-2 font-semibold text-lg text-white`}>{text}</p>
    </a>
  )
}

export default Account