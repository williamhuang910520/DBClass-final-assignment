import { useState } from 'react'
import { CookiesProvider } from 'react-cookie';

import Navbar from './components/Navbar'
import { Home, Discover, Subscription, Account, Manange, Copyright } from './pages'

function App() {
  const [page, setPage] = useState(1)
  const [isLogin, setIsLogin] = useState(false)

  const pageList = {
    1: <Home/>, 
    2: <Discover/>, 
    3: <Subscription/>,
    4: <Account/>, 
    5: <Manange/>, 
    6: <Copyright/>
  }

  return (
    <div className="flex ">
      <CookiesProvider>
        <Navbar setPage={setPage} page={page}/>
        <div className="flex-grow flex-shrink h-screen overflow-y-scroll scrollbar bg-zinc-900 ">{pageList[page]}</div>
      </CookiesProvider>
    </div>
  )
}

export default App
