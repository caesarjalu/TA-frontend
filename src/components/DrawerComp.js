import React from "react";
import { Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import stuntingData from "../data/data-stunting.json";

const DrawerComp = ({ state, setState, year }) => {
  let stuntYear = year;

  if (!stuntingData[year]) {
    stuntYear = year - 1;
  }
  const prevalence = stuntingData[stuntYear][state.location];

  const handleClose = () => {
    setState((curr) => {
      return { ...curr, isOpen: false };
    });
  };

  return (
    <Drawer
      anchor="right"
      variant="persistent"
      open={state.isOpen}
      PaperProps={{ sx: { width: "25%", marginTop: "9vh", padding: 1 } }}
    >
      <IconButton
        aria-label="close"
        sx={{ alignSelf: "flex-end" }}
        onClick={handleClose}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
      <Typography variant="h4">{state.location}</Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        Prevalensi Stunting: {prevalence}% ({stuntYear})
      </Typography>
      {/*<Typography variant="h5">Berita Program Stunting</Typography>*/}
    </Drawer>
  );
};

export default DrawerComp;
