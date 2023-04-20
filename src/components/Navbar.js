import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="relative" sx={{ height: "9vh" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        {/*<Typography variant="h5" component="div">*/}
        <h2>
          <b>Pusat Informasi Stunting Jawa Timur</b>
        </h2>
        {/*</Typography>*/}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
