import axios from "axios";

export const fileUpload = async ( file )=>{
    if(!file) throw new Error('No hay ningún archivo para subir');

    const cloudUrl = import.meta.env.VITE_URL_CLAUDINARY;

    const formData = new FormData();

    formData.append('upload_preset','react-journal')
    formData.append('file', file )



    try {

        const {data} = await axios.post(cloudUrl, formData )

      /*  const resp = await fetch( cloudUrl, {
        method: 'POST',
        body: formData
       });

       const cloudResp = await resp.json()
      
       return cloudResp.secure_url */
      // console.log('data desde helper', data )
       return data.secure_url
        
    } catch (error) {
        console.log(error);
        /* throw new Error(error.message) */
    }
}