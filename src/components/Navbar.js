import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          height: "9vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" component="div">
            <b>Pusat Informasi Stunting Jawa Timur</b>
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ height: "9vh" }} />
    </div>
  );
};

export default Navbar;
