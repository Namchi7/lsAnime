import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { fetchSearchResultData } from "./redux/reducers/searchResultPage.js";

import styles from "./css/search.module.css";
import searchIcon from "../assets/images/search.svg";

function Search() {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();

  const searchLoading = useSelector((state) => state.searchData?.isLoading);
  const searchData = useSelector((state) => state.searchData?.data);
  // console.log(searchData);

  let currentPage, lastPage, pageData;
  let rowItemCount = 5;

  if (!searchLoading) {
    currentPage = searchData?.pagination?.current_page;
    lastPage = searchData?.pagination?.last_visible_page;
    pageData = searchData?.data;
  }

  // const firstRef = useRef("");
  // const backRef = useRef("");
  // const currPageM2 = useRef("");
  // const currPageM1 = useRef("");
  // const currPage = useRef("");
  // const currPageP1 = useRef("");
  // const currPageP2 = useRef("");
  // const nextRef = useRef("");
  // const lastRef = useRef("");

  const searchHeaders = {
    type: "full",
    query: "",
    pageNo: 1,
  };

  function searchClick() {
    const searchInput = document.querySelector("[data-search-field]");

    searchHeaders.query = searchInput.value;

    const query = searchHeaders.query;

    if (query !== null && query !== "null" && query !== "") {
      setParams({ query: searchHeaders.query, page: 1 });
      dispatch(fetchSearchResultData(searchHeaders));
    }
  }

  function pageClick(page) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    console.log(page);

    const query = params.get("query");

    setParams({ query: query, page: page });
  }

  document.body.style.backgroundImage = "";

  useEffect(() => {
    if (params.size !== 0) {
      const query = params.get("query");
      const page = params.get("page");

      if (query !== null || query !== "" || query !== "null") {
        searchHeaders.query = query;
        searchHeaders.pageNo = page;
        console.log(searchHeaders);
        dispatch(fetchSearchResultData(searchHeaders));
      }
    }
  }, [params]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search Anime..."
          data-search-field
          className={styles.searchInput}
        />
        <div
          className={styles.searchIconContainer}
          onClick={searchClick}
          data-search-btn
        >
          <img
            src={searchIcon}
            alt="Search Icon"
            className={styles.searchIcon}
          />
        </div>
      </div>

      <div className={styles.showResults}>
        <div className={styles.allAnimeTiles}>
          {!searchLoading && searchData?.data?.length === 0
            ? "No Results"
            : params.get("query") === null ||
              params.get("query") === "null" ||
              params.get("query") === ""
            ? ""
            : searchData?.data?.map((item, index) => (
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
                (searchData?.pagination?.items.count % rowItemCount) / 1,
            },
            (_, i) => (
              <div className={styles.animeTile} key={i}></div>
            )
          )}
        </div>
        {currentPage &&
          searchData?.data.length !== 0 &&
          params.get("query") !== null &&
          params.get("query") !== "null" &&
          params.get("query") !== "" && (
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

                <div
                  className={styles.currentPage}
                  onClick={() => pageClick(currentPage)}
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

export default Search;
