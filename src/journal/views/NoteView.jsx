import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveNote, startDeleteNoteById, startSaveNote, startUploadingFiles } from "../../store/journal";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks";
import { ImageGallery } from "../components";


export const NoteView = () => {
  const dispatch = useDispatch()
 
  const{ active: note, messageSaved, isSaving } = useSelector(state => state.journal)

  const {body, title, date, onInputChange, formState} = useForm( note )
 
  const dateString = useMemo(()=>{
    const newDate = new Date( date );
    return newDate.toUTCString()
  },[date])

  const fileInputRef = useRef()

  useEffect(() => {
   
  dispatch( setActiveNote(formState))
   
  }, [formState])

  useEffect(() => {
   if (messageSaved.length === 0 ) return
  
   showModal()
  
   setTimeout(() => {
       dispatch ( setActiveNote ( null ))
   }, 1500);
  
  }, [messageSaved])
  

  const onSaveNote = ()=>{

    
   
    dispatch( startSaveNote ( ))
        
  }
  const onDeleteNote = ()=>{

    Swal.fire({
      title: '¿Estas Seguro?',
      text: "La Nota va se borrará definitivamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( startDeleteNoteById ( ))
        Swal.fire(
          'Borrado!',
          'La nota ha sido eliminada',
          'success'
        )
      }
    })
   
   
        
  }

 const showModal = ()=>{
  Swal.fire({
    title: 'Hecho!',
    text:  messageSaved ,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  })
 }
const onFileInputChange = ({ target }) => {
       if (target.files === 0) return;
   
       dispatch( startUploadingFiles( target.files ) )
}
  
  return (
    <Grid container direction = 'row' justifyContent = 'space-between' sx={{ mb: 1 }}>
       <Grid item>
         <Typography fontSize={ 39 } fontWeight= 'ligth' >{ dateString }</Typography>
       </Grid>
       <Grid item >

       <input 
            ref={ fileInputRef }
            type='file' 
            multiple 
            onChange={ onFileInputChange }
            style={{ display:'none'}}
            />

        

       <IconButton 
             color="primary" 
             disabled = { isSaving }
             onClick = { ()=> fileInputRef.current.click()}
             >
        <UploadOutlined />
       </IconButton>
      

        <Button  
               disabled = { isSaving }
               color="primary" 
               sx={{padding: 2 }}
               onClick={ onSaveNote }
               >
            <SaveOutlined sx={{ fontSize:30 , mr: 1 }} />
            Guardar
        </Button>
      
       </Grid>
       <Grid container>
        <TextField 
           
           type='text'
           variant="filled"
           fullWidth
           placeholder="Ingrese titulo"
           label="Título"
           sx={{ border: 'none', mb: 1 }}
           name="title"
           value= { title }
           onChange={ onInputChange }
        />
         <TextField 
         
           type='text'
           variant="filled"
           fullWidth
           multiline
           placeholder="¿Qué sucedió en el día de hoy?"
           minRows={ 5 }
           name='body'
           value={ body }
           onChange={ onInputChange }
         
        />

        <Grid container justifyContent='end'>
        <Button  
               disabled = { isSaving }
               color="error" 
               sx={{padding: 2 }}
               onClick={ onDeleteNote }
               >
            <DeleteOutline sx={{ fontSize:30 , mr: 1 }} />
           Borrar 
        </Button>

        </Grid>
       </Grid>
      <ImageGallery images = { note.imageUrls }/>
    </Grid>
  )
}
