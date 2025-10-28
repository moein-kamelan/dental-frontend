import React from 'react'
import { Outlet } from 'react-router-dom'
import Breadcrumb from '../../components/modules/Main/Breadcrumb/Breadcrumb'

function Auth() {
  return (
    <div>
      <Breadcrumb/>

        <Outlet/>
        
    </div>
  )
}

export default Auth