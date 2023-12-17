import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./css/viewAllTiles.module.css";
import { fetchViewAll } from "./redux/reducers/viewAllAnimePage.js";

function ViewAllTiles() {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

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

  function pageClick(page) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    setParams({ page: page });
  }

  useEffect(() => {
    // console.log(params.get("page"));
    if (path === "/this-season") {
      pageInfo.pageName = "This Season";
      pageInfo.pageNo = params.get("page");

      dispatch(fetchViewAll(pageInfo));
    }
    if (path === "/upcoming-season") {
      pageInfo.pageName = "Upcoming Season";
      pageInfo.pageNo = params.get("page");

      dispatch(fetchViewAll(pageInfo));
    }
    if (path === "/top") {
      pageInfo.pageName = "Top Animes";
      pageInfo.pageNo = params.get("page");

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
  }, [params]);

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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ViewAllTiles;
