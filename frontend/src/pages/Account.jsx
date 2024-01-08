import React, { useState, useEffect } from 'react';

import { Icon } from '@iconify/react';
import { useCookies } from 'react-cookie';

import Divider from '../components/Divider'

import { customerAPI } from '/src/api/api'

const Account = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['CustomerID'])
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

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[60rem] mx-20 h-screen">
        <div className="mt-24"></div>
        <div className="flex mb-12">
          <div className="w-36 h-36">
            <div className="h-full bg-white rounded-full overflow-hidden">
              <img src={userData.Avatar} alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center ml-10 gap-5 flex-grow">
            <p className="text-h1 text-4xl">{userData.NickName}</p>
            <p className="text-white text-lg">{userData.About}</p>
          </div>
        </div>
        {/* <Divider /> */}
        <div className="flex flex-col"> 
          <MenuItem text="修改暱稱" icon="material-symbols:drive-file-rename-outline-outline-rounded" link="#"/>
          <MenuItem text="修改簽名" icon="material-symbols:ink-pen-outline-rounded" link="#"/>
          <MenuItem text="成為管理者" icon="material-symbols:person-edit-outline-rounded" link="#"/>
          <MenuItem text="刪除帳戶" icon="material-symbols:delete-outline-rounded" link="#"/>
        </div>
      </div>
    </div>
  )
}

const MenuItem = ({text, icon, link}) => {
  return (
    <a 
      className={`flex h-16 items-center rounded-xl hover:cursor-pointer hover:bg-zinc-800`}
      onClick={()=>{}}
    >
      <div className="flex items-center justify-center w-16 ">
        <Icon icon={icon} height="1.75rem" color='#FFFFFF'/>  
      </div>
      <p className={`ml-2 font-semibold text-lg text-white`}>{text}</p>
    </a>
  )
}

export default Account