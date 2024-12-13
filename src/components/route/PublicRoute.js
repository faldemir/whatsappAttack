import React  from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import appConfig from 'configs/app.config'
import {useAuth} from '@clerk/clerk-react'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {

    const { isSignedIn } = useAuth()
  
	return isSignedIn ? <Navigate to={authenticatedEntryPath} /> : <Outlet/>
}

export default PublicRoute