import { useState, useEffect } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie';

import Navbar from './components/Navbar'
import { Home, Discover, Subscription, Account, Manage, Copyright } from './pages'

function App() {
  const [page, setPage] = useState(1)
  const [isLogin, setIsLogin] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['ManageMode'])

  const pageList = {
    1: <Home/>, 
    2: <Discover/>, 
    3: <Subscription/>,
    4: <Account/>, 
    5: <Manage/>, 
    6: <Copyright/>
  }

  useEffect(() => {
    if(!cookies.ManageMode){
      setCookie('ManageMode', false)
    }
  }, []);

  return (
    <div className="flex ">
      <CookiesProvider>
        <Navbar setPage={setPage} page={page} manageMode={cookies.ManageMode} />
        <div className="flex-grow flex-shrink h-screen overflow-y-scroll scrollbar bg-zinc-900 ">{pageList[page]}</div>
      </CookiesProvider>
    </div>
  )
}

export default App
