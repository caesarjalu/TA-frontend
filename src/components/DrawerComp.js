import React from "react";
import { Drawer, IconButton, Typography, AppBar, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewsList from "./NewsList";

const DrawerComp = ({ state, setState, year, stuntingData }) => {
  const stuntYear = stuntingData[year] ? year : year - 1;
  const prevalence = stuntingData[stuntYear][state.location.toLowerCase()];

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
      PaperProps={{ sx: { width: "30%" } }}
    >
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          backgroundColor: "white",
          height: "9vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pr: 2,
        }}
      >
        <IconButton
          aria-label="close"
          sx={{ alignSelf: "flex-end" }}
          onClick={handleClose}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </AppBar>
      <Box sx={{ py: 4, px: 2 }}>
        <Typography variant="h4">{state.location}</Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Prevalensi Stunting: {prevalence}% ({stuntYear})<br />
        </Typography>
        <NewsList loc={state.location} year={year} />
      </Box>
    </Drawer>
  );
};

export default DrawerComp;
