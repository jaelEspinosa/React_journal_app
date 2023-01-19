

import { loginWithemailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../fireBase/providers"
import { checkingCredentials, login, logout } from "./"




export const startGoogleSingIn = () => {
    return async ( dispatch )=>{
        dispatch ( checkingCredentials())
        
        const result = await singInWithGoogle()
        if(!result.ok ) return dispatch( logout(result.errorMessage))
                
        return  dispatch( login( result ))
    }
}

export const startCreatingUserwithEmailPassword = ({email, password, displayName})=>{
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

      const {ok, uid, photoURL, errorMessage} =  await registerUserWithEmailPassword( {email, password, displayName} )
      
      if(!ok) return dispatch( logout({ errorMessage }) )

      dispatch ( login( {email, photoURL, displayName, uid}))
    }
}

export const startLoginwithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {
        dispatch ( checkingCredentials())
        
        const {ok, resp, errorMessage} = await loginWithemailPassword ({ email, password })
         

        if(!ok) return dispatch( logout ({ errorMessage }) );
        
        const{ uid, displayName } = resp.user
        dispatch( login({ email, displayName, uid }))
    }
}

export const startLogout = () =>{
    return async ( dispatch ) => {
       await logoutFirebase() 

       dispatch( logout() )
    }
}

