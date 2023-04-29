import React, { useState, useEffect } from "react";
import { Typography, Link, Box } from "@mui/material";
import db from "../services/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const NewsList = ({ loc, year }) => {
  const [newsData, setNewsData] = useState([]);
  const listStyle = (maxLine) => {
    return {
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: maxLine,
    };
  };

  const getNewsFromFirestore = async () => {
    const q = query(
      collection(db, "newsdata"),
      where("published_date", ">=", new Date(year.toString())),
      where("published_date", "<", new Date((year + 1).toString())),
      where("location", "array-contains", loc.toLowerCase()),
      orderBy("published_date", "desc")
    );
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      const tempDoc = doc.data();
      tempDoc.id = doc.id;
      data.push(tempDoc);
    });
    setNewsData(data);
  };

  useEffect(() => {
    getNewsFromFirestore();
  });

  const getNewsList = () => {
    let newsList = [];
    for (const news of newsData) {
      const date = news.published_date.toDate().toLocaleDateString("id-id", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      newsList.push(
        <Box sx={{ py: 1 }} key={news.id}>
          <Typography variant="body2" sx={listStyle(1)} color="green">
            {date} - {news.publisher}
          </Typography>
          <Link
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            title={news.title}
            variant="h6"
            sx={listStyle(2)}
          >
            {news.title}
          </Link>
          <Typography variant="body2" sx={listStyle(3)} gutterBottom>
            {news.text}
          </Typography>
        </Box>
      );
    }
    return newsList;
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        <i>
          Ditemukan {newsData.length} berita program stunting pada tahun {year}
        </i>
      </Typography>
      {getNewsList()}
    </Box>
  );
};

export default NewsList;
