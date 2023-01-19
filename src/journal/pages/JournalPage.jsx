import { AddOutlined, MailOutline } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { startNewNote } from "../../store/journal/thunks";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {

  const dispatch = useDispatch()
  const{ isSaving, active } = useSelector(state => state.journal);
 
  
  const onClickNewNote = ()=>{
    dispatch( startNewNote() )
  }
  return (
    <JournalLayout>

    {
     (!!active)  //con esta sintaxis transformamos en valor buleano, ya que si tiene datos seria un objeto.
     ? <NoteView /> 
     : <NothingSelectedView />
    }

      <IconButton
        onClick={ onClickNewNote }
        disabled = { isSaving }
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.7 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>
  );
};
