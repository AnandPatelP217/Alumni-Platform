import React from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import NewsFeed from "../components/NewsFeed/NewsFeed";

const NewsFeedPage = () => {
  return (
    <>
      <Header />
      <NewsFeed />
      <Footer />
    </>
  );
};

export default NewsFeedPage;
