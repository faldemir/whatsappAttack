import { useSelector, useDispatch } from 'react-redux'
//import { signInSuccess, signOutSuccess, useAppSelector, useAppDispatch } from '../../store'

import { useUser } from '@clerk/clerk-react'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignOut, apiSignUp , apiSignIn} from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess, setToken } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
	const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)
    const { isSignedIn, user, isLoaded } = useUser()
    const signIn = async (values) => {
        const tokenClerk = values.password;
        //const response = await apiSignIn(values);
        dispatch(onSignInSuccess(tokenClerk)) // token clerk
        dispatch(setToken(tokenClerk)) // token clerk
        if(isSignedIn) {
            dispatch(setUser({ 
                avatar: user.imageUrl, 
                userName: user.fullName, 
                authority: ['admin'], 
                email: ''
            }))
        }

        const redirectUrl = query.get(REDIRECT_URL_KEY)
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)

        return {
            status: 'success',
            message: ''
        }
    }

	const signUp = async (values) => {
        try {
			const resp = await apiSignUp(values)
			if (resp.data) {
				const { token } = resp.data
				dispatch(onSignInSuccess(token))
				if(resp.data.user) {
					dispatch(setUser(resp.data.user || { 
						avatar: '', 
						userName: 'anonymus', 
						authority: ['USER'], 
						email: ''
					}))
				}
				const redirectUrl = query.get(REDIRECT_URL_KEY)
				navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
                return {
                    status: 'success',
                    message: ''
                }
			}
		} catch (errors) {
			return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString()
            }
		}
    }

    const handleSignOut = ()  => {
		dispatch(onSignOutSuccess())
		dispatch(setUser(initialState))
		navigate(appConfig.unAuthenticatedEntryPath)

	}

    const signOut = async () => {
		await apiSignOut()
		handleSignOut()
	}
    
    return {
        authenticated: token && signedIn,
        signIn,
		signUp,
        signOut
    }
}

export default useAuth