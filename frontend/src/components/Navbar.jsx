import React, { useState, useEffect } from 'react';

import { Icon } from '@iconify/react';
import { useCookies } from 'react-cookie';

import LOGO from '/LOGO.png'
import Divider from '../components/Divider'
import Dialog from '../components/Dialog'
import Badge from '../components/Badge'

import { customerAPI } from '/src/api/api'
import { membershipLevel } from '/src/utils/NameChanger'

const Navbar = ({page, setPage}) => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['CustomerID', 'ManageMode'])
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loginName, setLoginName] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [userData, setUserData] = useState({})

  useEffect(() => {
    console.log(cookies.CustomerID)
    if(cookies.CustomerID){
      customerAPI.getCustomerByID(cookies.CustomerID).then(response => {
        setUserData(response)
        console.log(response)
      })
    }
  }, [cookies])

  const handleLogin = () => {
    customerAPI.loginCustomer(loginName, loginPassword)
    .then(userData => {
      console.log(userData)
      setCookie('CustomerID', userData['user data']['CustomerID'])
      setLoginName("")
      setLoginPassword("")
      setPage(1)
      setShowLoginDialog(false)
    })
    .catch(error => {
      if(error.response.status == 401){
        alert("密碼錯誤，請確認密碼後重新輸入")
      }
    })
  }   
  
  const handleRegister = () => {
    customerAPI.registCustomer(loginName, loginPassword)
    .then(userData => {
      console.log(userData)
      setCookie('CustomerID', userData['user data']['CustomerID'])
      setLoginName("")
      setLoginPassword("")
      setPage(1)
      setShowLoginDialog(false)
    })
    .catch(error => {
      if(error.response.status == 400){
        alert("此帳戶名稱不可用，請重新選擇你的帳戶名稱")
      }
    })
  }   

  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    removeCookie('CustomerID')
    setCookie('ManageMode', false)
    setPage(1)
    setUserData({})
    setShowLogoutDialog(false)
  }
  
  return (
    <div className='flex flex-col h-screen min-w-80 w-80 bg-zinc-900 select-none border-r-[1px] border-zinc-600'>
      <img className="py-2 px-5 mt-2" src={LOGO} alt="" />
      <div className="flex-shrink flex-grow mt-8 overflow-y-auto scrollbar">
        <NavbarItem 
          text="首頁" 
          icon="material-symbols:home-outline-rounded" 
          page={page}
          setPage={setPage}
          number={1}/>
        <NavbarItem 
          text="發現" 
          icon="material-symbols:podcasts-rounded" 
          page={page}
          setPage={setPage}
          number={2}/>
        <Divider />
        <p className=" text-h3 mx-6 mb-3 mt-7">我的</p>
        <NavbarItem 
          text="我的借閱" 
          icon="material-symbols:subscriptions-outline-rounded" 
          page={page}
          setPage={setPage}
          number={3}/>
        <NavbarItem 
          text="帳戶" 
          icon="material-symbols:person-outline-rounded" 
          page={page}
          setPage={setPage}
          number={4}/>
        <NavbarItem 
          text="管理電影" 
          icon="material-symbols:database-outline" 
          page={page}
          setPage={setPage}
          number={5} 
          show={!cookies.ManageMode}/>
        <Divider />
        <p className="text-h3 mx-6 mb-3 mt-7">其他</p>
        <NavbarItem 
          text="版權及使用工具" 
          icon="material-symbols:copyright-outline-rounded" 
          page={page}
          setPage={setPage}
          number={6}/>
      </div>
      <UserArea name={userData.NickName} level={userData.MembershipLevel} avatar={userData.Avatar} customerID={cookies.CustomerID} onClick={()=>{setShowLoginDialog(true)}} handleLogout={()=>{setShowLogoutDialog(true)}}/>
      <Dialog title="登入/註冊" show={showLoginDialog}>
        <div className="flex flex-col gap-2 ">
          <p className="text-h4">登入帳號</p>
          <input type="text" value={loginName} onChange={e=>{setLoginName(e.target.value)}} name="loginName" className="input-text"/>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-h4">密碼</p>
          <input type="password" value={loginPassword} onChange={e=>{setLoginPassword(e.target.value)}} name="loginPassword" className="input-text"/>
        </div>
        <div className="flex justify-between text-white mt-2">
          <button 
            className="btn-opacity"
            onClick={()=>{setShowLoginDialog(false)}}>
              取消
          </button>
          <div className="flex gap-4">
            <button 
              className="btn-opacity font-bold"
              onClick={()=>{handleRegister()}}>
                註冊
            </button>
            <button 
              className="btn-dialog"
              onClick={()=>{handleLogin()}}>
                登入
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog title="登出" small show={showLogoutDialog}>
        <p className="text-white">你確定要登出嗎?</p>
        <div className="flex justify-end gap-4 mt-2">
          <button 
            className="btn-opacity"
            onClick={()=>{setShowLogoutDialog(false)}}>
              取消
          </button>
          <button 
            className="btn-dialog"
            onClick={handleLogout}>
              確定
          </button>
        </div>
      </Dialog>
    </div>
  )
}

const NavbarItem = ({text, icon, link, number, page, setPage, show}) => {
  return (
    <a 
      className={`flex h-16 items-center mx-3 pl-2 rounded-xl hover:cursor-pointer ${number===page?'bg-zinc-200':'hover:bg-zinc-800'} ${show?'hidden':''}`}
      onClick={()=>{setPage(number)}}
    >
      <div className="flex items-center justify-center w-16 ">
        <Icon icon={icon} height="1.75rem" color={`${number==page?'#000000':'#FFFFFF'}`}/>  
      </div>
      <p className={`ml-2 font-semibold text-lg ${number==page?'text-black':'text-white'}`}>{text}</p>
    </a>
  )
}

const UserArea = ({name, level, avatar, customerID, onClick, handleLogout}) => {
  return (
    <div className="flex justify-self-end h-20 bg-zinc-700 items-center rounded-t-[2rem]">
      <div className="w-12 h-12 m-2 ml-4 ">
        <div className=" h-full bg-white rounded-full overflow-hidden">
          <img src={avatar} alt="" />
        </div>
      </div>
      {customerID?
      <div className="flex flex-col ml-1 gap-1 flex-grow">
        <p className="text-white font-semibold text-lg">{name}</p>
        <Badge name={membershipLevel(level)} small/>
      </div>
      :
      <div className="flex flex-col ml-1 flex-grow hover:cursor-pointer" onClick={onClick}>
        <p className="text-white font-semibold text-lg">登入</p>
      </div>}

      {customerID && <div className="flex items-center justify-center w-[3.125rem] h-[3.125rem] m-4 rounded-full hover:bg-zinc-800 hover:cursor-pointer" onClick={handleLogout}>
        <Icon icon="material-symbols:logout-rounded" height="1.5rem" color="#FFFFFF"/>  
      </div>}
    </div>
  )
}

export default Navbar