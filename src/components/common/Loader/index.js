import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import "./style.css"

function Loader() {
  return (
    <div className='loader-cont'><CircularProgress /></div>
  )
}

export default Loader