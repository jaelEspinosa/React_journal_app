
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


 
export const ImageGallery = ({ images }) => {

 const showPhotoModal = photo =>{
 
  Swal.fire({
  
    imageWidth:1200,
    imageUrl:  photo,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },    
    confirmButtonText: 'Aceptar'
  })
 } 

  

  return (
    <>
    
    <ImageList sx={{ width: '100%', height: 450 }} cols={5} rowHeight={200}>
    
      {images?.map(( photo, index ) => (
        <ImageListItem key={index}>
          <img
            style={{cursor:'pointer', padding:'3%'}}
            onClick={ () => showPhotoModal( photo )}
            src={`${photo}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='foto'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </>
  );
}

