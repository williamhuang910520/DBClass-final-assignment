import React from 'react'

const Badge = ({name, small}) => {
  return (
    <div className="flex">
      <p className={`badge ${small?"px-2 py-0":""} `}>{name}</p>
    </div>
  )
}

export default Badge
