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

  let currentPage,
    lastPage,
    pageNo = 1;

  if (!loading) {
    currentPage = pagination?.current_page;
    lastPage = pagination?.last_visible_page;
  }

  // console.log(loading, pairs);

  const firstRef = useRef("");
  const backRef = useRef("");
  const currPageM2 = useRef("");
  const currPageM1 = useRef("");
  const currPage = useRef("");
  const currPageP1 = useRef("");
  const currPageP2 = useRef("");
  const nextRef = useRef("");
  const lastRef = useRef("");

  function pageClick(refName) {
    let page;
    switch (refName) {
      case "firstRef": {
        page = firstRef.current?.innerHTML;
        break;
      }
      case "backRef": {
        page = backRef.current.innerHTML;
        break;
      }
      case "currPageM2": {
        page = currPageM2.current.innerHTML;
        break;
      }
      case "currPageM1": {
        page = currPageM1.current.innerHTML;
        break;
      }
      case "currPage": {
        page = currPage.current.innerHTML;
        break;
      }
      case "currPageP1": {
        page = currPageP1.current.innerHTML;
        break;
      }
      case "currPageP2": {
        page = currPageP2.current.innerHTML;
        break;
      }
      case "nextRef": {
        page = nextRef.current.innerHTML;
        break;
      }
      case "lastRef": {
        page = lastRef.current.innerHTML;
        break;
      }
    }

    console.log(page);

    switch (page) {
      case "Next": {
        console.log("Go to next page", currentPage + 1);
        pageNo = currentPage + 1;
        // console.log(pageNo);
        dispatch(fetchRecommendations(pageNo));
        break;
      }
      case "Back": {
        console.log("Go to previous page", currentPage - 1);
        if (currentPage !== 1) {
          pageNo = currentPage - 1;
          // console.log(pageNo);
          dispatch(fetchRecommendations(pageNo));
        }
        break;
      }
      case "First": {
        console.log("Go to first page", 1);
        if (currentPage !== 1) {
          pageNo = 1;
          // console.log(pageNo);
          dispatch(fetchRecommendations(pageNo));
        }
        break;
      }
      case "Last": {
        console.log("Go to last page", lastPage);
        if (currentPage !== lastPage) {
          pageNo = lastPage;
          // console.log(pageNo);
          dispatch(fetchRecommendations(pageNo));
        }
        break;
      }
      default: {
        pageNo = parseInt(page);
        // console.log(pageNo);
        dispatch(fetchRecommendations(pageNo));
        break;
      }
    }
  }

  useEffect(() => {
    const page = params.get("page");

    console.log(page);

    dispatch(fetchRecommendations(1));
  }, []);

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
                  <img
                    src={pair.entry[0].images.jpg.large_image_url}
                    alt={pair.entry[0].title}
                    className={styles.animePoster}
                  />
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
                  <img
                    src={pair.entry[1].images.jpg.large_image_url}
                    alt={pair.entry[1].title}
                    className={styles.animePoster}
                  />
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
                  ref={firstRef}
                  onClick={() => pageClick("firstRef")}
                  data-page-btns
                >
                  First
                </div>
                <div
                  className={styles.prevBtn}
                  ref={backRef}
                  onClick={() => pageClick("backRef")}
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
                    ref={currPageM1}
                    onClick={() => pageClick("currPageM1")}
                    data-page-btns
                  >
                    {currentPage - 1}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.endpointPages}
                    ref={currPageM2}
                    onClick={() => pageClick("currPageM2")}
                    data-page-btns
                  >
                    {currentPage - 2}
                  </div>
                  <div
                    className={styles.endpointPages}
                    ref={currPageM1}
                    onClick={() => pageClick("currPageM1")}
                    data-page-btns
                  >
                    {currentPage - 1}
                  </div>
                </>
              )}

              <div
                className={styles.currentPage}
                ref={currPage}
                onClick={() => pageClick("currPage")}
                data-page-btns
              >
                {currentPage}
              </div>

              {(currentPage >= 2 && lastPage - currentPage === 0) ||
              (currentPage === 1 && lastPage === 1) ? (
                ""
              ) : lastPage - currentPage === 1 ? (
                <>
                  <div
                    className={styles.endpointPages}
                    ref={currPageP1}
                    onClick={() => pageClick("currPageP1")}
                    data-page-btns
                  >
                    {currentPage + 1}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.endpointPages}
                    ref={currPageP1}
                    onClick={() => pageClick("currPageP1")}
                    data-page-btns
                  >
                    {currentPage + 1}
                  </div>
                  <div
                    className={styles.endpointPages}
                    ref={currPageP2}
                    onClick={() => pageClick("currPageP2")}
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
                  ref={nextRef}
                  onClick={() => pageClick("nextRef")}
                  data-page-btns
                >
                  Next
                </div>
                <div
                  className={styles.lastBtn}
                  ref={lastRef}
                  onClick={() => pageClick("lastRef")}
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
