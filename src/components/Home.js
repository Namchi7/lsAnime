import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./css/home.module.css";
import { useState } from "react";

function Home() {
  const previewData = useSelector((state) => state.previewData);
  const loading = previewData.isLoading;

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverData, setHoverData] = useState("");

  document.body.style.backgroundImage = "";
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  let thisSeason;
  let upcomingSeason;
  let top;

  if (!loading) {
    thisSeason = previewData?.data?.thisSeason.data;
    upcomingSeason = previewData?.data?.upcomingSeason.data;
    top = previewData?.data?.top.data;
    // console.log(previewData);
  }

  // window.addEventListener("resize", () => {
  //   console.log(window.innerWidth);
  // });

  const hoverStyle = {
    left: mousePosition.x,
    top: mousePosition.y,
  };

  function handleMouseEnter(data) {
    setIsHovered(true);
    setHoverData(data);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setHoverData("");
  }

  function handleMouseMove(e) {
    // setMousePosition({ x: e.clientX, y: e.clientY });
    // console.log(mousePosition);
    const targetElem = e.target;

    const rect = targetElem.getBoundingClientRect();
    const parentRect = targetElem.parentElement.getBoundingClientRect();
    const parentPRect = targetElem
      .closest(`.${styles.container}`)
      .getBoundingClientRect();

    // console.log(rect, parentRect);

    const y = rect.y - parentPRect.y;
    const x = e.clientX - parentPRect.x;
    console.log(e.clientY, rect.y - parentPRect.y);

    // setMousePosition({ x: e.clientX, y: y });
    // setMousePosition({ x: x, y: rect.y - parentPRect.y });
    // setMousePosition({ x: 0, y: 0 });
  }

  function handleMouseOver(e) {
    const targetElem = e.target;

    const rect = targetElem.getBoundingClientRect();
    const parentPRect = targetElem
      .closest(`.${styles.container}`)
      .getBoundingClientRect();

    // console.log(rect, parentRect);

    const y = rect.y - parentPRect.y + 25;
    const x = rect.x - parentPRect.x;

    setMousePosition({ x: x, y: y });
  }

  // if (isHovered) {
  //   // Calculate the dynamic div position to stay within the viewport
  //   const dynamicDivLeft = Math.min(mousePosition.x, window.innerWidth - 170);

  //   // const dynamicDivTop = Math.min(
  //   //   mousePosition.y + 20,
  //   //   window.innerHeight - 170
  //   // );

  //   hoverStyle.left = `${dynamicDivLeft}px`;
  //   // hoverStyle.top = `${dynamicDivTop}px`;
  //   // set the top so that it give the position inside the .container not the viewport
  // }

  return (
    <div className={styles.container}>
      {isHovered && (
        <div className="hoverShow" style={hoverStyle} data-home-hover>
          {hoverData}
          {/* {`${hoverStyle.left} ${hoverStyle.top}`} */}
        </div>
      )}

      <div className={styles.topicContainer}>
        <div className={styles.topicHeader}>
          <div className={styles.topic}>This Season</div>
          <Link to="/this-season" className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.previewTiles}>
          {!loading ? (
            thisSeason?.map(
              (item, index) =>
                index < 5 && (
                  <Link
                    to={`/anime/${item.mal_id}`}
                    className={styles.animeTile}
                    key={index}
                  >
                    <div
                      className={styles.animePosterDiv}
                      style={{
                        backgroundImage: `url(${item.images.jpg.small_image_url})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        src={item.images.jpg.large_image_url}
                        alt={item.title_english}
                        className={styles.animePoster}
                      />
                    </div>
                    <div
                      onMouseEnter={() =>
                        handleMouseEnter(item.titles[0].title)
                      }
                      onMouseLeave={() => handleMouseLeave()}
                      // onMouseMove={(e) => handleMouseMove(e)}
                      onMouseOver={(e) => handleMouseOver(e)}
                      className={styles.animeName}
                      data-anime-name={item.titles[0].title}
                    >
                      {item.titles[0].title}
                    </div>
                  </Link>
                )
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      <div className={styles.topicContainer}>
        <div className={styles.topicHeader}>
          <div className={styles.topic}>Upcoming Season</div>
          <Link to="/upcoming-season" className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.previewTiles}>
          {!loading ? (
            upcomingSeason?.map(
              (item, index) =>
                index < 5 && (
                  <Link
                    to={`/anime/${item.mal_id}`}
                    className={styles.animeTile}
                    key={index}
                  >
                    <div
                      className={styles.animePosterDiv}
                      style={{
                        backgroundImage: `url(${item.images.jpg.small_image_url})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        src={item.images.jpg.large_image_url}
                        alt={item.title_english}
                        className={styles.animePoster}
                      />
                    </div>
                    <div
                      onMouseEnter={() =>
                        handleMouseEnter(item.titles[0].title)
                      }
                      onMouseLeave={() => handleMouseLeave()}
                      // onMouseMove={(e) => handleMouseMove(e)}
                      onMouseOver={(e) => handleMouseOver(e)}
                      className={styles.animeName}
                      data-anime-name={item.titles[0].title}
                    >
                      {item.titles[0].title}
                    </div>
                  </Link>
                )
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      <div className={styles.topicContainer}>
        <div className={styles.topicHeader}>
          <div className={styles.topic}>Top Animes</div>
          <Link to="/top" className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.previewTiles}>
          {!loading ? (
            top?.map(
              (item, index) =>
                index < 5 && (
                  <Link
                    to={`/anime/${item.mal_id}`}
                    className={styles.animeTile}
                    key={index}
                  >
                    <div
                      className={styles.animePosterDiv}
                      style={{
                        backgroundImage: `url(${item.images.jpg.small_image_url})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <img
                        src={item.images.jpg.large_image_url}
                        alt={item.title_english}
                        className={styles.animePoster}
                      />
                    </div>
                    <div
                      onMouseEnter={() =>
                        handleMouseEnter(item.titles[0].title)
                      }
                      onMouseLeave={() => handleMouseLeave()}
                      // onMouseMove={(e) => handleMouseMove(e)}
                      onMouseOver={(e) => handleMouseOver(e)}
                      className={styles.animeName}
                      data-anime-name={item.titles[0].title}
                    >
                      {item.titles[0].title}
                    </div>
                  </Link>
                )
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
