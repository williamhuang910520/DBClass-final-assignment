import React from 'react'

const Dialog = ({title, show, small, children}) => {
  return (
    <div className={`h-screen w-screen fixed top-0 left-0 z-20 justify-center items-center cursor-default flex transition ${show?'visible opacity-100':'opacity-0 invisible'}`}>
      <div className={`min-h-[150px] min-w-[400px] glass rounded-2xl p-8 transition`}>
        {!small && title && <p className=" text-center text-h1 mb-10">{title}</p>}
        {small && <p className="text-h3 mb-5">{title}</p>}
        <div className="w-full flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dialog