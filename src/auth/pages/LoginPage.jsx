
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



import {Link as RouterLink, useNavigate} from 'react-router-dom'

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { useForm } from "../../hooks";
import {  startGoogleSingIn, startLoginwithEmailPassword } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";

const formData ={
  email: '',
  password: ''
}

export const LoginPage = () => {

  const dispatch = useDispatch();
  const [messageToShow, setMessageToShow] = useState('')
  const { status, errorMessage } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const{email, password, onInputChange, onResetForm } = useForm( formData )


  useEffect(() => {
     if (errorMessage) {
      setMessageToShow('Usuario o contraseña incorrectos')
      setTimeout(() => {
      setMessageToShow('')
      onResetForm()
      }, 3000);
      
      navigate('/auth/login',{
        replace:true
      })
     }
     
   
  }, [errorMessage])
  

const isAuthenticating = useMemo( ()=> status === 'checking', [status])

const onSubmit = e =>{
  e.preventDefault()

  dispatch( startLoginwithEmailPassword({ email, password })) 
                    
}

const onGoogleSignIn = ()=>{
    dispatch ( startGoogleSingIn() )
}
    
  return (
    
    <AuthLayout title="Login"  >
     <form onSubmit={ onSubmit }
           className = 'animate__animated animate__fadeIn'
     >
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                    disabled={ isAuthenticating  }
                    label= 'Correo' 
                    type='email' 
                    name='email' 
                    placeholder="Email"
                    fullWidth
                    value={ email }
                    onChange={ onInputChange }
                    />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                    disabled={ isAuthenticating  }
                    label= 'Contraseña' 
                    type='password' 
                    name='password' 
                    placeholder="Contraseña"
                    fullWidth
                    value={ password }
                    onChange={ onInputChange }
                    />
            </Grid>
            {
              messageToShow &&
               (
                <Grid container>
                <Grid item  xs = { 12 } sx={{mt:1}}>
                      <Alert severity="error">{messageToShow}</Alert>
                </Grid>  
                </Grid>
                )
            }

            <Grid container spacing={2} sx={{ mb:2, mt: 2 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                      disabled = { isAuthenticating }
                      type="submit"
                      variant = "outlined" 
                      fullWidth
                      >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                    sx={{display: {xs: 'none', sm:'flex'} }}
                    disabled = { isAuthenticating }
                    onClick={ onGoogleSignIn }
                    variant = "outlined" 
                    fullWidth>
                  <Google/>
                    <Typography sx={{ ml: 1 }}>Google</Typography>                
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='space-between'>
            
            {!isAuthenticating && <Link  component={ RouterLink } color='inherit' to='/auth/register'>
               Crear una Cuenta
            </Link>}
           
            </Grid>
          </Grid>
        </form>

    </AuthLayout>
       
     
  );
};
