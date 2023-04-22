import React from "react";
import { Typography, Link, Box } from "@mui/material";
import newsData from "../data/data-berita-dummy.json";

const NewsList = ({ loc, year }) => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar eros ut dignissim scelerisque. Integer vitae scelerisque justo. Nam sollicitudin volutpat mi, sed commodo ante lacinia ut. Pellentesque sem odio, faucibus id laoreet sed, convallis a lacus. Etiam sed ullamcorper lorem. Suspendisse tristique vulputate metus vitae sagittis. Praesent ac malesuada nisl. Morbi hendrerit, nisl quis convallis euismod, turpis sem bibendum sem, vitae accumsan ante urna a nisi. Morbi rhoncus neque lectus, in gravida sem semper vel. Maecenas scelerisque tincidunt ante, quis facilisis neque sodales ut. Morbi vehicula vitae arcu et eleifend. Phasellus iaculis posuere euismod. Etiam at arcu in dui consectetur aliquet elementum nec ex. Etiam mollis diam est, non luctus lectus molestie sit amet. Phasellus interdum efficitur malesuada.";
  const listStyle = (maxLine) => {
    return {
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: maxLine,
    };
  };

  const setNewsCount = () => {
    return newsData[year][loc];
  };

  const getNewsList = () => {
    let newsList = [];
    for (let i = 0; i < setNewsCount(); i++) {
      newsList.push(
        <Box sx={{ py: 1 }}>
          <Typography variant="body2" sx={listStyle(1)} color="green">
            1 Jan {year} - berita.com
          </Typography>
          <Link href="#" variant="h6" sx={listStyle(2)}>
            Judul Berita Yang Panjang Sekali dari {loc} Dan Dibuat Sampe 2
            Baris, Kalo 3 Baris Apakah Bisa?
          </Link>
          <Typography variant="body2" sx={listStyle(3)} gutterBottom>
            {loremIpsum}
          </Typography>
        </Box>
      );
    }
    return newsList;
  };

  return <Box>{getNewsList()}</Box>;
};

export default NewsList;
