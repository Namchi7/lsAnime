import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useEffect } from "react";

import "./App.css";
import { fetchPreview } from "./components/redux/reducers/landingPage.js";

import Header from "./components/Header.js";
import Home from "./components/Home.js";
import Filter from "./components/Filter.js";
import About from "./components/About.js";
import ViewAllTiles from "./components/ViewAllTiles.js";
import Anime from "./components/Anime.js";
import Search from "./components/Search.js";
import Recommendations from "./components/Recommendations.js";
import Api from "./components/API.js";
import NotFound from "./components/NotFound.js";
import Footer from "./components/Footer.js";

function App() {
  const dispatch = useDispatch();
  dispatch(fetchPreview());

  // const path = window.location.pathname;

  // function toTheTop() {
  //   window.scroll({ top: 0, behavior: "smooth" });
  //   // document.body.scrollTop = 0;
  //   // document.documentElement.scrollTop = 0;
  // }

  // useEffect(() => {
  // }, []);

  return (
    <div className="App">
      <div className="appTop">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/filter" element={<Filter />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/this-season" element={<ViewAllTiles />} />
          <Route path="/upcoming-season" element={<ViewAllTiles />} />
          <Route path="/top" element={<ViewAllTiles />} />
          <Route path="/anime/:id" element={<Anime />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/api" element={<Api />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* <div className="goToTop" onClick={toTheTop}>
        Top
      </div> */}

      <Footer />
    </div>
  );
}

export default App;
