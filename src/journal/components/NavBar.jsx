import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"

import { useDispatch } from "react-redux"

import { startLogout, clearNotesLogout, toggleSideBar } from "../../store";


export const NavBar = ({ drawerWidth }) => {
    const dispatch = useDispatch();
    
    const handleLogout = ()=>{
      dispatch( startLogout() );
      dispatch( clearNotesLogout() );
    }

    return (
    <AppBar 
            position='fixed'
            sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
            >
    <Toolbar>
        <IconButton
            color= 'inherit'
            edge= 'start'
            sx={{ mr: 2 , display :{sm: 'none'} }}
            onClick={() => dispatch( toggleSideBar() )}
        >
            <MenuOutlined />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography>JournalApp</Typography>
            <IconButton 
                   onClick={ handleLogout }
                   color="error">
                <LogoutOutlined />
            </IconButton>
        </Grid>
    </Toolbar>

    </AppBar>
  )
}
