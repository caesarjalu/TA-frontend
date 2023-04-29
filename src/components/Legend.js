import React, { useState, useCallback } from "react";
import { Box, Paper, Stack, Tab, Slider, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import "./Legend.css";

const Legend = ({ setOptions }) => {
  const marks = [
    {
      value: 2019,
      label: "2019",
    },
    {
      value: 2020,
      label: "2020",
    },
    {
      value: 2021,
      label: "2021",
    },
    {
      value: 2022,
      label: "2022",
    },
    {
      value: 2023,
      label: "2023",
    },
  ];

  const valuetext = (value) => {
    return `${value}`;
  };

  const handleSliderChange = useCallback(
    (e, newValue) => {
      setOptions({ year: newValue });
    },
    [setOptions]
  );

  const [tab, setTab] = useState("prevalence");
  const handleTabChange = useCallback(
    (e, newValue) => {
      setTab(newValue);
      setOptions({ mode: newValue });
    },
    [setOptions]
  );

  return (
    <Box className="legend">
      <Stack spacing={2}>
        <Paper sx={{ paddingX: 5, paddingY: 2 }}>
          <Slider
            aria-label="Custom marks"
            defaultValue={2023}
            getAriaValueText={valuetext}
            min={2019}
            max={2023}
            valueLabelDisplay="auto"
            marks={marks}
            track={false}
            onChange={handleSliderChange}
          />
        </Paper>
        <Paper sx={{ textAlign: "left" }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                aria-label="legend tabs"
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Prevalensi Stunting" value="prevalence" />
                <Tab label="Persebaran Berita" value="news_data" />
              </TabList>
            </Box>
            <TabPanel
              value="prevalence"
              className="legend-description"
              sx={{ padding: 2 }}
            >
              <div style={{ "--color": "#024E1B" }}>
                <Typography>&lt;2.5% : Sangat Rendah</Typography>
              </div>
              <div style={{ "--color": "#006B3E" }}>
                <Typography>2.5-10% : Rendah</Typography>
              </div>
              <div style={{ "--color": "#FFE733" }}>
                <Typography>10-20% : Sedang</Typography>
              </div>
              <div style={{ "--color": "#FF8C01" }}>
                <Typography>20-30% : Tinggi</Typography>
              </div>
              <div style={{ "--color": "#ED2938" }}>
                <Typography>&gt;30% : Sangat Tinggi</Typography>
              </div>
            </TabPanel>
            <TabPanel
              value="news_data"
              className="legend-description"
              sx={{ padding: 2 }}
            >
              <div style={{ "--color": "#DDDDDD" }}>
                <Typography>0 Berita</Typography>
              </div>
              <div style={{ "--color": "#BDD7E7" }}>
                <Typography>1-5 Berita</Typography>
              </div>
              <div style={{ "--color": "#6BAED6" }}>
                <Typography>6-10 Berita</Typography>
              </div>
              <div style={{ "--color": "#3182BD" }}>
                <Typography>11-20 Berita</Typography>
              </div>
              <div style={{ "--color": "#08519C" }}>
                <Typography>&gt;20 Berita</Typography>
              </div>
            </TabPanel>
          </TabContext>
        </Paper>
      </Stack>
    </Box>
  );
};
export default Legend;
