
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks'
import { startCreatingUserwithEmailPassword } from '../../store/auth'
import { AuthLayout } from '../layout/AuthLayout'

const formData = {
  displayName:'',
  email:'',
  password:''
}



export const RegisterPage = () => {


const [isSubmited, setIsSubmited] = useState(false)
const [showMessage, setShowMessage] = useState('')
const dispath = useDispatch();


const { errorMessage, status } = useSelector(state => state.auth)

const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
const formValidations = {
  email: [(value) => validEmail.test( value ), 'Formato de Correo no Válido.'],
  password: [(value) => value.length >=6, 'El password debe tener 6 caracteres mínimo.'],
  displayName: [(value) => value.length >= 3 , 'El nombre es obligatorio.'],
  
}

useEffect(() => {
   if(errorMessage){
    setShowMessage('Este usuario parece que ya existe')
   }
 }, [errorMessage])


 

  const { formState, displayName, email, password, onInputChange,  
          displayNameValid, emailValid, passwordValid, isFormValid } = useForm(formData, formValidations)

  const onSubmit = e =>{
        e.preventDefault()
     setIsSubmited(true)
      if(!isFormValid) {        
        setShowMessage('*Revise los campos')
        setTimeout(() => {
          setShowMessage(false)
        }, 3000);
        return
      }
    
     dispath( startCreatingUserwithEmailPassword({email, password, displayName }))
     
    
  }
  return (
  
    <AuthLayout title='Crear Cuenta' >
    <form onSubmit={ onSubmit }
          className = 'animate__animated animate__fadeIn'
          >
          <Grid container>
          <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                    name='displayName'
                    value={displayName}
                    onChange={ onInputChange}
                    label= 'Nombre' 
                    type='text' 
                    placeholder="Nombre Completo"
                    fullWidth
                    error={ !!displayNameValid && isSubmited}
                    helperText = { isSubmited && displayNameValid }
                    
                    />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                    noValidate
                    name='email'
                    value={ email }
                    onChange={ onInputChange}
                    label= 'Correo' 
                    type='email' 
                    placeholder="Email"
                    fullWidth
                    error={ !!emailValid && isSubmited}
                    helperText = {isSubmited &&  emailValid }
                    
                    />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                    name='password'
                    value={password}
                    onChange={ onInputChange }
                    label= 'Contraseña' 
                    type='password' 
                    placeholder="Contraseña"
                    fullWidth
                    error={ !!passwordValid && isSubmited}
                    helperText = {isSubmited && passwordValid }
                    
                    />
            </Grid>
            <Grid container spacing={2} sx={{ mb:2, mt: 2 }}>
              <Grid item xs={ 12 }>
            {showMessage && <Alert  severity='error' >{showMessage}</Alert> }
            
                <Button  disabled={status === 'checking'} type='submit' variant = "outlined" fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            
            </Grid>
            <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 2 }}>¿Ya tienes cuenta?</Typography> 
            <Link  component={ RouterLink } color='inherit' to='/auth/login'>
                Ingresar
            </Link>
            </Grid>
          </Grid>
        </form>


    </AuthLayout>
  )
}
