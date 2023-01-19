import { CircularProgress, Grid } from "@mui/material";
import React from "react";

const CheckingAuth = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: "primary.main",
          Padding: 4,
        }}
      >
        <Grid container
          direction="row"
          justifyContent="center"
         sx={{ width: { sm: 450 } }}
        >

         <CircularProgress color="warning"/>

        </Grid>
      </Grid>
    </>
  );
};

export default CheckingAuth;
