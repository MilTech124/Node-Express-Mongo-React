import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import { useAuthStatus } from '../pages/hooks/useAuthStatus'
import Spiner from './Spiner'

const PrivateRoute = () => {
    const {loggedIn,checkingStatus} = useAuthStatus()

    if(checkingStatus){
        return <Spiner/>
    }
  return loggedIn ? <Outlet/> : <Navigate to='/login'/>

}

export default PrivateRoute