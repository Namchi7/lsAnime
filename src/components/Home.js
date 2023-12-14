import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./css/home.module.css";

function Home() {
  const previewData = useSelector((state) => state.previewData);
  const loading = previewData.isLoading;

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

  return (
    <div className={styles.container}>
      <div className={styles.topicContainer}>
        <div className={styles.topicHeader}>
          <div className={styles.topic}>This Season</div>
          <Link to="/this-season" className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.previewTiles}>
          {!loading ? (
            thisSeason.map(
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
                      className={styles.animeName}
                      data-anime-name={item.titles[0].title}
                    >
                      {item.titles[0].title}
                    </div>
                  </Link>
                )
            )
          ) : (
            <div>Loading</div>
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
            upcomingSeason.map(
              (item, index) =>
                index < 5 && (
                  <Link
                    to={`/anime/${item.mal_id}`}
                    className={styles.animeTile}
                    key={index}
                  >
                    <img
                      src={item.images.jpg.large_image_url}
                      alt={item.title_english}
                      className={styles.animePoster}
                    />
                    <div
                      className={styles.animeName}
                      data-anime-name={item.titles[0].title}
                    >
                      {item.titles[0].title}
                    </div>
                  </Link>
                )
            )
          ) : (
            <div>Loading</div>
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
            top.map(
              (item, index) =>
                index < 5 && (
                  <Link
                    to={`/anime/${item.mal_id}`}
                    className={styles.animeTile}
                    key={index}
                  >
                    <img
                      src={item.images.jpg.large_image_url}
                      alt={item.title_english}
                      className={styles.animePoster}
                    />
                    <div
                      className={styles.animeName}
                      data-anime-name={item.titles[0].title}
                    >
                      {item.titles[0].title}
                    </div>
                  </Link>
                )
            )
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
