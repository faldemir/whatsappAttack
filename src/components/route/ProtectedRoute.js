import React from 'react'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant' 
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {useAuth} from '@clerk/clerk-react'

const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = () => {

	const { isSignedIn } = useAuth()

	const location = useLocation()

	if (!isSignedIn) {
		return <Navigate to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`} replace />;
	}

	return <Outlet />
}

export default ProtectedRoute