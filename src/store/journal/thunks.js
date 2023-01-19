

import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'

import { FireBaseDB } from '../../fireBase/config'
import { fileUpload, loadNotes } from '../../helpers'
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'

export const startNewNote = ()=>{
    return async( dispatch, getState )=>{
      
        dispatch ( savingNewNote() )

        const { uid } = getState().auth 
       
        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

       const newDoc = doc( collection( FireBaseDB, `${uid}/journal/notes` ))
       await setDoc( newDoc, newNote );
       
       newNote.id = newDoc.id

       // dispatch
       dispatch ( addNewEmptyNote ( newNote ))
       dispatch ( setActiveNote ( newNote ))
       
       

    }
}

export const startLoadingNotes = ()=>{
    return async( dispatch, getState ) =>{
        const { uid } = getState().auth 
        if( !uid ) throw new Error('El UID del usuario no existe')
        
        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ));
    }
}

export const startSaveNote = () =>{
    
    return async( dispatch, getState ) =>{

        dispatch ( setSaving() )
        const { uid } = getState().auth;
        const {active: note } = getState().journal;

        const noteToFirestore = {...note};       
        delete noteToFirestore.id;
       
        const docRef = doc( FireBaseDB,`${ uid }/journal/notes/${ note.id }`)
        await setDoc( docRef, noteToFirestore, { merge: true })
         
        dispatch( updateNote( note ));
               
    }
}

export const startUploadingFiles = (files = []) =>{
    
    return async ( dispatch ) =>{
        dispatch ( setSaving() )

      const fileUploadPromises = [];
      
       for (const file of files) {
        fileUploadPromises.push( fileUpload( file ) );
        }

       const photosUrls = await Promise.all( fileUploadPromises );
    
       dispatch( setPhotosToActiveNote( photosUrls ));
       
    }
}

export const startDeleteNoteById = () =>{
    return async ( dispatch, getState ) =>{
        dispatch ( setSaving() )
        const { uid } = getState().auth;
        const {active: note } = getState().journal;

        const docRef = doc( FireBaseDB,`${ uid }/journal/notes/${ note.id }`)
        await deleteDoc ( docRef )

        dispatch( deleteNoteById ( note.id ) )
 
    }
}