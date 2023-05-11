import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { fetchSearchResultData } from "./redux/reducers/searchResultPage.js";

import styles from "./css/search.module.css";
import searchIcon from "../assets/images/search.svg";

function Search() {
  const dispatch = useDispatch();

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

  const firstRef = useRef("");
  const backRef = useRef("");
  const currPageM2 = useRef("");
  const currPageM1 = useRef("");
  const currPage = useRef("");
  const currPageP1 = useRef("");
  const currPageP2 = useRef("");
  const nextRef = useRef("");
  const lastRef = useRef("");

  const searchHeaders = {
    type: "",
    query: "",
    pageNo: 1,
  };

  function searchClick() {
    const searchInput = document.querySelector("[data-search-field]");

    // console.log(searchInput.value);

    searchHeaders.query = searchInput.value;
    searchHeaders.type = "full";

    dispatch(fetchSearchResultData(searchHeaders));
  }

  function pageClick(refName) {
    window.scroll({ top: 0, behavior: "smooth" });

    const searchInput = document.querySelector("[data-search-field]");
    searchHeaders.query = searchInput.value;
    searchHeaders.type = "full";

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
    // const page = currPage.current.innerHTML;
    console.log(page);

    switch (page) {
      case "Next": {
        console.log("Go to next page", currentPage + 1);
        searchHeaders.pageNo = currentPage + 1;
        console.log(searchHeaders.pageNo);
        dispatch(fetchSearchResultData(searchHeaders));
        break;
      }
      case "Back": {
        console.log("Go to previous page", currentPage - 1);
        if (currentPage !== 1) {
          searchHeaders.pageNo = currentPage - 1;
          console.log(searchHeaders.pageNo);
          dispatch(fetchSearchResultData(searchHeaders));
        }
        break;
      }
      case "First": {
        console.log("Go to first page", 1);
        if (currentPage !== 1) {
          searchHeaders.pageNo = 1;
          console.log(searchHeaders.pageNo);
          dispatch(fetchSearchResultData(searchHeaders));
        }
        break;
      }
      case "Last": {
        console.log("Go to last page", lastPage);
        if (currentPage !== lastPage) {
          searchHeaders.pageNo = lastPage;
          console.log(searchHeaders.pageNo);
          dispatch(fetchSearchResultData(searchHeaders));
        }
        break;
      }
      default: {
        searchHeaders.pageNo = parseInt(page);
        console.log(searchHeaders.pageNo);
        dispatch(fetchSearchResultData(searchHeaders));
        break;
      }
    }
  }

  document.body.style.backgroundImage = "";

  useEffect(() => {}, []);

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
          {!searchLoading && searchData?.data.length === 0
            ? "No Results"
            : searchData?.data.map((item, index) => (
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
                (searchData?.pagination.items.count % rowItemCount) / 1,
            },
            (_, i) => (
              <div className={styles.animeTile} key={i}></div>
            )
          )}
        </div>
        {currentPage && searchData?.data.length !== 0 && (
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
      </div>
    </div>
  );
}

export default Search;
