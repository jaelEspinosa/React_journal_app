
import { Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"

import { useDispatch, useSelector } from "react-redux"
import { toggleSideBar } from "../../store"

import { SideBarItem } from "./"



export const SideBar = ({ drawerWidth }) => {
   
    const dispatch = useDispatch()
  
    const { displayName } = useSelector(state => state.auth);

    const { sideBar, notes } = useSelector(state => state.journal)


  return (
    <Box 
        onClick={() => dispatch( toggleSideBar() ) }
        className="sideBar-transition"
        component='nav'
        sx={{ width: {sm: drawerWidth},
              flexShrink: { sm: 0 },
              display: {xs: !sideBar ? 'none': 'inherit', sm:'inherit'},
              backgroundColor:'whitesmoke'
         }}
        >
     <Drawer 
            variant = 'permanent' // temporary
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}

            >
        <Toolbar>
            <Typography variant="h7" noWrap component='div'>
                         {displayName}
            </Typography>
        
        </Toolbar>
        <Divider />

        <List>
        {
            notes.map(note =>(
              <SideBarItem key = { note.id } {...note }/>
            ))
        }
        </List>
     </Drawer>
    </Box>
  )
}
