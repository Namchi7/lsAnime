import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./css/anime.module.css";
import { fetchCurrentAnimeData } from "./redux/reducers/currentAnimePage.js";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function resolveData(data) {
  const getFullDate = (fullDate) => {
    if (fullDate === null) return "?";
    const date = fullDate.getDate();
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();

    const result = `${date} ${months[month]} ${year}`;
    return result;
  };
  const fromDate = new Date(data.aired.from);
  const toDate = new Date(data.aired.to);

  const aired = {
    from: getFullDate(fromDate),
    to: getFullDate(toDate),
  };

  return {
    aired: aired,
  };
}

function Anime() {
  const dispatch = useDispatch();

  window.scroll({ top: 0, behavior: "smooth" });

  const loading = useSelector((state) => state.currentAnime.isLoading);
  const currentAnimeData = useSelector((state) => state.currentAnime);
  let data, currentAnime, bgImgUrl, resolvedData;
  if (!loading) {
    currentAnime = currentAnimeData.data;
    data = currentAnime.data;
    resolvedData = resolveData(data);
    bgImgUrl = data.images.jpg.large_image_url;
    setBodyBGImg(bgImgUrl);
  }

  const fullPath = window.location.pathname;
  const path = fullPath.split("/")[2];

  function setBodyBGImg(bgImgUrl) {
    const body = document.body;
    body.style.backgroundImage = `url(${bgImgUrl})`;
  }

  function handleSynopsis() {
    const synopsis = document.querySelector("[data-synopsis]");
    synopsis.style.overflow = "scroll";
  }

  useEffect(() => {
    dispatch(fetchCurrentAnimeData(path));
  }, [dispatch, path]);

  return (
    <div className={styles.container}>
      {!loading ? (
        <>
          <div className={styles.backgroundCover} />
          <div className={styles.basicInfoContainer}>
            <img
              src={data.images.jpg.large_image_url}
              alt={data.title}
              className={styles.animePoster}
            />
            <div className={styles.basicInfo}>
              <h1>{data.title}</h1>
              {/* <h1>Anime Name</h1> */}
              <div className={styles.animeNameSynonyms}>
                <span>{data.title_japanese}</span>
                {/* <span>Anime Name Native</span> */}
                <span>{data.title_english}</span>
                {/* <span>Anime Name English</span> */}
              </div>
              <div
                className={styles.synopsis}
                onClick={(e) => handleSynopsis()}
                data-synopsis
              >
                {data.synopsis === null
                  ? "Synopsis not available."
                  : data.synopsis}
              </div>
            </div>
          </div>

          <div className={styles.otherInfoContainer}>
            <div className={styles.row1}>
              <div className={styles.row1Cols}>
                <div className={styles.topics}>Format</div>
                <div className={styles.row1Content}>
                  {data.type !== null ? data.type : "?"}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>Episodes</div>
                <div className={styles.row1Content}>
                  {data.episodes !== null ? data.episodes : "?"}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>Episodes Duration</div>
                <div className={styles.row1Content}>
                  {data.duration !== null ? data.duration : "?"}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>Status</div>
                <div className={styles.row1Content}>
                  {data.status !== null ? data.status : "?"}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>Start Date</div>
                <div className={styles.row1Content}>
                  {resolvedData.aired.from}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>End Date</div>
                <div className={styles.row1Content}>
                  {resolvedData.aired.to}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>Season</div>
                <div className={styles.row1Content}>
                  {data.season !== null ? data.season : "?"}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>Score</div>
                <div className={styles.row1Content}>
                  {data.score !== null ? data.score : "?"}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>Scored By</div>
                <div className={styles.row1Content}>
                  {data.scored_by !== null ? data.scored_by : "?"}
                </div>
              </div>

              <div className={styles.row1Cols}>
                <div className={styles.topics}>Source</div>
                <div className={styles.row1Content}>
                  {data.source !== null ? data.source : "?"}
                </div>
              </div>
            </div>

            <div className={styles.otherRows}>
              <div className={styles.topics}>Genre: </div>
              <div className={styles.genreList}>
                {" "}
                {data.genres.length === 0
                  ? "?"
                  : data.genres.map((item, index) => (
                      <div className={styles.genre} key={index}>
                        {item.name}
                      </div>
                    ))}
              </div>
            </div>

            <div className={styles.otherRows}>
              <div className={styles.topics}>Themes: </div>
              <div className={styles.genreList}>
                {" "}
                {data.themes.length === 0
                  ? "?"
                  : data.themes.map((item, index) => (
                      <div className={styles.genre} key={index}>
                        {item.name}
                      </div>
                    ))}
              </div>
            </div>

            <div className={styles.otherRows}>
              <div className={styles.topics}>Rating: </div>
              <div className={styles.rating}>{data.rating}</div>
            </div>

            <div className={`${styles.otherRows} ${styles.synonymRow}`}>
              <div className={styles.topics}>Title Synonyms: </div>
              <div className={styles.titleSynonyms}>
                {data.titles.map((item, index) => (
                  <div className={styles.synonym} key={index}>
                    {item.type === "Default"
                      ? "Romanji"
                      : item.type === "Synonym"
                      ? "Other Synonym"
                      : item.type}
                    : {item.title}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.otherRows}>
              <div className={styles.topics}>Producers: </div>
              <div className={styles.producers}>
                <span key="0">
                  {data.producers === null ? data.producers[0].name : "?"}
                </span>
                {data.producers.map((item, index) =>
                  index > 0 ? <span key={index}>, {item.name}</span> : ""
                )}
              </div>
            </div>

            <div className={styles.otherRows}>
              <div className={styles.topics}>Studios: </div>
              <div className={styles.studios}>
                <span key="0">
                  {data.studios === null ? data?.studios[0]?.name : "?"}
                </span>
                {data.studios.map((item, index) =>
                  index > 0 ? <span key={index}>, {item.name}</span> : ""
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Anime;
