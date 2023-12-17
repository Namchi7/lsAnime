import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./css/recommendations.module.css";

import { fetchRecommendations } from "./redux/reducers/recommendationsPage.js";

function Recommendations() {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  document.body.style.backgroundImage = "";
  window.scroll({ top: 0, behavior: "smooth" });

  const loading = useSelector((state) => state.recommendations.isLoading);
  const pairs = useSelector((state) => state.recommendations?.data?.data);
  const pagination = useSelector(
    (state) => state.recommendations?.data?.pagination
  );

  let currentPage, lastPage;

  if (!loading) {
    currentPage = parseInt(pagination?.current_page);
    lastPage = pagination?.last_visible_page;
  }

  function pageClick(page) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    // console.log(page);
    setParams({ page: page });
  }

  useEffect(() => {
    const page =
      params.get("page") !== null &&
      params.get("page") !== "null" &&
      params.get("page") !== ""
        ? params.get("page")
        : 1;

    // console.log(page);

    dispatch(fetchRecommendations(page));
  }, [params]);

  return (
    <div className={styles.container}>
      <div className={styles.headingText}>Anime Recommendations</div>
      <div className={styles.pairTiles}>
        {!loading ? (
          pairs?.map((pair, index) => (
            <div className={styles.pairs} key={index}>
              <div className={styles.animeData}>
                <div className={styles.animeTile}>
                  <div className={styles.pairHead}>If you liked</div>
                  <Link
                    to={`/anime/${pair.entry[0].mal_id}`}
                    className={styles.animePosterDiv}
                    style={{
                      backgroundImage: `url(${pair.entry[0].images.jpg.small_image_url})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <img
                      src={pair.entry[0].images.jpg.large_image_url}
                      alt={pair.entry[0].title}
                      className={styles.animePoster}
                    />
                  </Link>
                  <Link
                    to={`/anime/${pair.entry[0].mal_id}`}
                    className={styles.animeName}
                    data-anime-title={pair.entry[0].title}
                  >
                    {pair.entry[0].title}
                  </Link>
                </div>
                <div className={styles.animeTile}>
                  <div className={styles.pairHead}>You might like</div>
                  <Link
                    to={`/anime/${pair.entry[1].mal_id}`}
                    className={styles.animePosterDiv}
                    style={{
                      backgroundImage: `url(${pair.entry[1].images.jpg.small_image_url})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <img
                      src={pair.entry[1].images.jpg.large_image_url}
                      alt={pair.entry[1].title}
                      className={styles.animePoster}
                    />
                  </Link>
                  <Link
                    to={`/anime/${pair.entry[1].mal_id}`}
                    className={styles.animeName}
                    data-anime-title={pair.entry[1].title}
                  >
                    {pair.entry[1].title}
                  </Link>
                </div>
              </div>
              <div className={styles.content} data-content={pair.content}>
                {pair.content}
              </div>
            </div>
          ))
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>Loading...</div>
        )}
        {/* <div className={styles.pairs}>
          <div className={styles.animeData}>
            <div className={styles.animeTile}>
              <div className={styles.pairHead}>If you liked</div>
              <img
                src={pair.entry[0].images.jpg.large_image_url}
                alt={pair.entry[0].title}
                className={styles.animePoster}
              />
              <div className={styles.animeName}>{pair.entry[0].title}</div>
            </div>
            <div className={styles.animeTile}>
              <div className={styles.pairHead}>You might like</div>
              <img
                src={pair.entry[1].images.jpg.large_image_url}
                alt={pair.entry[1].title}
                className={styles.animePoster}
              />
              <div className={styles.animeName}>{pair.entry[1].title}</div>
            </div>
          </div>
          <div className={styles.content} data-content={pair.content}>
            {pair.content}
          </div>
        </div>
        <div className={styles.pairs}>
          <div className={styles.animeData}>
            <div className={styles.animeTile}>
              <div className={styles.pairHead}>If you liked</div>
              <img
                src={pair.entry[0].images.jpg.large_image_url}
                alt={pair.entry[0].title}
                className={styles.animePoster}
              />
              <div className={styles.animeName}>{pair.entry[0].title}</div>
            </div>
            <div className={styles.animeTile}>
              <div className={styles.pairHead}>You might like</div>
              <img
                src={pair.entry[1].images.jpg.large_image_url}
                alt={pair.entry[1].title}
                className={styles.animePoster}
              />
              <div className={styles.animeName}>{pair.entry[1].title}</div>
            </div>
          </div>
          <div className={styles.content} data-content={pair.content}>
            {pair.content}
          </div>
        </div>
        <div className={styles.pairs}>
          <div className={styles.animeData}>
            <div className={styles.animeTile}>
              <div className={styles.pairHead}>If you liked</div>
              <img
                src={pair.entry[0].images.jpg.large_image_url}
                alt={pair.entry[0].title}
                className={styles.animePoster}
              />
              <div className={styles.animeName}>{pair.entry[0].title}</div>
            </div>
            <div className={styles.animeTile}>
              <div className={styles.pairHead}>You might like</div>
              <img
                src={pair.entry[1].images.jpg.large_image_url}
                alt={pair.entry[1].title}
                className={styles.animePoster}
              />
              <div className={styles.animeName}>{pair.entry[1].title}</div>
            </div>
          </div>
          <div className={styles.content} data-content={pair.content}>
            {pair.content}
          </div>
        </div> */}
        {currentPage && (
          <div className={styles.pageBtns}>
            {currentPage === 1 ? (
              ""
            ) : (
              <>
                <div
                  className={styles.firstBtn}
                  onClick={() => pageClick(1)}
                  data-page-btns
                >
                  First
                </div>
                <div
                  className={styles.prevBtn}
                  onClick={() => pageClick(currentPage - 1)}
                  data-page-btns
                >
                  Back
                </div>
              </>
            )}

            <div className={styles.pageNos} data-page-no>
              {currentPage === 1 ? (
                ""
              ) : currentPage === 2 ? (
                <>
                  <div
                    className={styles.endpointPages}
                    onClick={() => pageClick(currentPage - 1)}
                    data-page-btns
                  >
                    {currentPage - 1}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.endpointPages}
                    onClick={() => pageClick(currentPage - 2)}
                    data-page-btns
                  >
                    {currentPage - 2}
                  </div>
                  <div
                    className={styles.endpointPages}
                    onClick={() => pageClick(currentPage - 1)}
                    data-page-btns
                  >
                    {currentPage - 1}
                  </div>
                </>
              )}

              <div className={styles.currentPage} data-page-btns>
                {currentPage}
              </div>

              {(currentPage >= 2 && lastPage - currentPage === 0) ||
              (currentPage === 1 && lastPage === 1) ? (
                ""
              ) : lastPage - currentPage === 1 ? (
                <>
                  <div
                    className={styles.endpointPages}
                    onClick={() => pageClick(currentPage + 1)}
                    data-page-btns
                  >
                    {currentPage + 1}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.endpointPages}
                    onClick={() => pageClick(currentPage + 1)}
                    data-page-btns
                  >
                    {currentPage + 1}
                  </div>
                  <div
                    className={styles.endpointPages}
                    onClick={() => pageClick(currentPage + 2)}
                    data-page-btns
                  >
                    {currentPage + 2}
                  </div>
                </>
              )}
            </div>

            {currentPage === lastPage ? (
              ""
            ) : (
              <>
                <div
                  className={styles.nextBtn}
                  onClick={() => pageClick(currentPage + 1)}
                  data-page-btns
                >
                  Next
                </div>
                <div
                  className={styles.lastBtn}
                  onClick={() => pageClick(lastPage)}
                  data-page-btns
                >
                  Last
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendations;
