import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./css/viewAllTiles.module.css";
import { fetchViewAll } from "./redux/reducers/viewAllAnimePage.js";

function ViewAllTiles() {
  const dispatch = useDispatch();

  document.body.style.backgroundImage = "";

  const loading = useSelector((state) => state.viewAllData.isLoading);
  const allData = useSelector((state) => state.viewAllData.data);
  let pageData = null;
  let currentPage;
  let lastPage,
    rowItemCount = 5;

  if (allData?.pagination?.current_page) {
    currentPage = allData.pagination.current_page;
  }

  if (!loading) {
    lastPage = allData?.pagination?.last_visible_page;
    pageData = allData?.data;
  }

  const firstRef = useRef("");
  const backRef = useRef("");
  const currPageM2 = useRef("");
  const currPageM1 = useRef("");
  const currPage = useRef("");
  const currPageP1 = useRef("");
  const currPageP2 = useRef("");
  const nextRef = useRef("");
  const lastRef = useRef("");

  let pageInfo = {
    pageName: "",
    pageNo: null,
  };

  const path = window.location.pathname;

  if (path === "/this-season") {
    pageInfo.pageName = "This Season";
  }
  if (path === "/upcoming-season") {
    pageInfo.pageName = "Upcoming Season";
  }
  if (path === "/top") {
    pageInfo.pageName = "Top Animes";
  }

  function pageClick(refName) {
    window.scroll({ top: 0, behavior: "smooth" });

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
        pageInfo.pageNo = currentPage + 1;
        console.log(pageInfo.pageNo);
        dispatch(fetchViewAll(pageInfo));
        break;
      }
      case "Back": {
        console.log("Go to previous page", currentPage - 1);
        if (currentPage !== 1) {
          pageInfo.pageNo = currentPage - 1;
          console.log(pageInfo.pageNo);
          dispatch(fetchViewAll(pageInfo));
        }
        break;
      }
      case "First": {
        console.log("Go to first page", 1);
        if (currentPage !== 1) {
          pageInfo.pageNo = 1;
          console.log(pageInfo.pageNo);
          dispatch(fetchViewAll(pageInfo));
        }
        break;
      }
      case "Last": {
        console.log("Go to last page", lastPage);
        if (currentPage !== lastPage) {
          pageInfo.pageNo = lastPage;
          console.log(pageInfo.pageNo);
          dispatch(fetchViewAll(pageInfo));
        }
        break;
      }
      default: {
        pageInfo.pageNo = parseInt(page);
        console.log(pageInfo.pageNo);
        dispatch(fetchViewAll(pageInfo));
        break;
      }
    }
  }

  useEffect(() => {
    if (path === "/this-season") {
      pageInfo.pageName = "This Season";
      dispatch(fetchViewAll(pageInfo));
    }
    if (path === "/upcoming-season") {
      pageInfo.pageName = "Upcoming Season";
      dispatch(fetchViewAll(pageInfo));
    }
    if (path === "/top") {
      pageInfo.pageName = "Top Animes";
      dispatch(fetchViewAll(pageInfo));
    }

    function determineRowCount() {
      // > 945 : 5, > 750 : 4, > 555 : 3, > 370 : 2

      const viewportWidth = window.innerWidth;

      if (viewportWidth > 945) {
        rowItemCount = 5;
      } else if (viewportWidth > 750) {
        rowItemCount = 4;
      } else if (viewportWidth > 555) {
        rowItemCount = 3;
      } else {
        rowItemCount = 2;
      }

      // console.log(itemLimit);
    }

    window.addEventListener("resize", determineRowCount);
    determineRowCount();

    return () => {
      window.removeEventListener("resize", determineRowCount);
    };
  }, []);

  return (
    <div className={styles.container}>
      {!loading && pageData ? (
        <>
          <h1 className={styles.pageName}>{pageInfo.pageName}</h1>
          <div className={styles.allAnimeTiles}>
            {pageData.map((item, index) => (
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
            ))}
            {Array.from(
              {
                length:
                  rowItemCount -
                  (allData.pagination.items.count % rowItemCount) / 1,
              },
              (_, i) => (
                <div className={styles.animeTile} key={i}></div>
              )
            )}
          </div>
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

                {(currentPage > 2 && lastPage - currentPage === 0) ||
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
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default ViewAllTiles;
