import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./css/filter.module.css";
import { fetchFilteredAnime } from "./redux/reducers/filterAnimePage.js";

import Dropdown from "../assets/images/dropdown.svg";
import Genres from "../assets/json/genres.json";

const filterOptions = {
  type: ["tv", "movie", "ova", "special", "ona", "music"],
  status: ["airing", "complete", "upcoming"],
  rating: [
    {
      enum: "g",
      name: "G - All Pages",
    },
    {
      enum: "pg",
      name: "PG - Children",
    },
    {
      enum: "pg13",
      name: "PG - Teens 13 or older",
    },
    {
      enum: "r17",
      name: "R - 17+ (violence and profanity)",
    },
    {
      enum: "r",
      name: "R+ - Mild Nudity",
    },
    {
      enum: "rx",
      name: "Rx - Hentai",
    },
  ],
  orderBy: [
    {
      enum: "title",
      name: "Title",
    },
    {
      enum: "type",
      name: "Type",
    },
    {
      enum: "rating",
      name: "Rating",
    },
    {
      enum: "start_date",
      name: "Start Date",
    },
    {
      enum: "end_date",
      name: "End Date",
    },
    {
      enum: "score",
      name: "Score",
    },
    {
      enum: "popularity",
      name: "Popularity",
    },
  ],
  sort: [
    {
      enum: "desc",
      name: "Descending",
    },
    {
      enum: "asc",
      name: "Ascending",
    },
  ],
};

function Filter() {
  document.body.style.backgroundImage = "";

  const currentYear = new Date().getFullYear();

  const dispatch = useDispatch();

  let rowItemCount = 5;

  const filterLoading = useSelector((state) => state.filterData.isLoading);
  const filtered = useSelector((state) => state.filterData.data);
  let currentPage, lastPage, resultCount;
  if (!filterLoading) {
    currentPage = filtered?.pagination.current_page;
    lastPage = filtered?.pagination.last_visible_page;
    resultCount = filtered?.pagination.items.total;
  }

  const filterClickRef = useRef("");

  const filterQueries = {
    genres: [],
    genreIDs: [],
    startDate: "",
    endDate: "",
    minScore: null,
    rating: "",
    status: "",
    type: "",
    orderBy: "",
    sortBy: "",
    page: "1",
  };

  function setSelectedOptions(label, value) {
    if (label.includes("Type")) {
      filterQueries.type = value.toLowerCase();
    }
    if (label.includes("Rating")) {
      filterOptions.rating.filter((item) => {
        if (item.name === value) {
          value = item.enum;
          console.log(item.enum);
        }
      });
      filterQueries.rating = value;
    }
    if (label.includes("Start Year")) {
      filterQueries.startDate = value;
    }
    if (label.includes("End Year")) {
      filterQueries.endDate = value;
    }
    if (label.includes("Minimum Score")) {
      filterQueries.minScore = value;
    }
    if (label.includes("Status")) {
      filterQueries.status = value.toLowerCase();
    }
    if (label.includes("Order By")) {
      filterOptions.orderBy.filter((item) => {
        if (item.name === value) {
          value = item.enum;
        }
      });
      filterQueries.orderBy = value;
    }
    if (label.includes("Sort")) {
      filterOptions.sort.filter((item) => {
        if (item.name === value) {
          value = item.enum;
        }
      });
      filterQueries.sortBy = value;
    }
    if (label.includes("Genres")) {
      filterQueries.genres = value;
    }

    // console.log(filterQueries);
  }

  function handleEventListeners() {
    // Dropdown click event listener
    const dropdowns = document.querySelectorAll("[data-input-div]");

    // console.log(dropdowns);

    dropdowns.forEach((item) => {
      item.addEventListener("click", () => {
        const filterDropdown = item.parentElement.children[1];

        // console.log(filterDropdown);

        if (filterDropdown.style.display === "none") {
          item.children[1].style.transform = "rotate(180deg)";
          filterDropdown.style.display = "flex";
        } else {
          item.children[1].style.transform = "rotate(0deg)";
          filterDropdown.style.display = "none";
        }
      });
    });

    // filterDropdown focusout event listener

    const filterDropdown = document.querySelectorAll("[data-filter-dropdown]");
    let currentFilterDropdown = null;

    filterDropdown.forEach((dropdown) => {
      const dArrow = dropdown.parentElement.children[0].children[1];
      // console.log(dArrow.parentElement);

      dArrow.parentElement.addEventListener("click", (event) => {
        event.stopPropagation();

        if (currentFilterDropdown && currentFilterDropdown !== dropdown) {
          // Close previously opened filterDropdown
          currentFilterDropdown.style.display = "none";
          const prevDArrow =
            currentFilterDropdown.parentElement.children[0].children[1];
          prevDArrow.style.transform = "rotate(0deg)";
        }

        // Open the clicked filterDropdown
        dropdown.style.display = "flex";
        dArrow.style.transform = "rotate(180deg)";
        currentFilterDropdown = dropdown;
      });

      // if (dropdown.style.display === "flex")
      window.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
          dropdown.style.display = "none";
          dArrow.style.transform = "rotate(0deg)";
        }
      });
    });

    // Selected option click event listener

    const optionSelected = document.querySelectorAll("[data-option]");

    optionSelected.forEach((option) => {
      option.addEventListener("click", () => {
        const input =
          option.parentElement.parentElement.parentElement.children[0]
            .children[0];
        // console.log(option.innerHTML, input);
        input.innerHTML = option.innerHTML;
        option.parentElement.parentElement.style.display = "none";
        input.parentElement.children[1].style.transform = "rotate(0deg)";
        const label =
          input.parentElement.parentElement.parentElement.children[0].innerHTML;
        // console.log(label);
        const value = option.innerHTML === "Any" ? "" : option.innerHTML;
        setSelectedOptions(label, value);
      });
    });

    // Selected genre click event listener

    const genres = document.querySelectorAll("[data-genre]");
    let selected = filterQueries.genres;
    let selectedIDs = filterQueries.genreIDs;

    genres.forEach((genre) => {
      genre.addEventListener("click", () => {
        // genre.classList.toggle(styles.genreSelected);
        const genreID = Genres.data.filter(
          (item) => item.name === genre.innerHTML
        )[0].mal_id;

        if (!selected.includes(genre.innerHTML)) {
          selected.push(genre.innerHTML);
          selectedIDs.push(genreID);
          genre.classList.add(styles.genreSelected);
        } else {
          selected.pop(genre.innerHTML);
          selectedIDs.pop(genreID);
          genre.classList.remove(styles.genreSelected);
        }

        setSelectedOptions("Genres", selectedIDs);
      });
    });

    // Filter button onClick event
    const filterBtn = document.querySelector("[data-filter-btn]");

    filterBtn.addEventListener("click", () => {
      // console.log("Filtered");
      dispatch(fetchFilteredAnime(filterQueries));

      // fetchFilteredAnime(filterQueries);
    });

    if (!filterLoading && filtered.data)
      document.querySelector("[data-result-count]").innerHTML = resultCount;

    // Filter pagination btn click event
    const pageBtns = document.querySelectorAll("[data-page-btn]");

    pageBtns.forEach((pageBtn) => {
      pageBtn.addEventListener("click", () => {
        const page = pageBtn.innerHTML;

        switch (page) {
          case "Next": {
            console.log("Go to next page", currentPage + 1);
            console.log(filterQueries.page);
            filterQueries.page = currentPage + 1;
            console.log(filterQueries.page);
            dispatch(fetchFilteredAnime(filterQueries));
            break;
          }
          case "Back": {
            console.log("Go to previous page", currentPage - 1);
            if (currentPage !== 1) {
              filterQueries.page = currentPage - 1;
              console.log(filterQueries.page);
              dispatch(fetchFilteredAnime(filterQueries));
            }
            break;
          }
          case "First": {
            console.log("Go to first page", 1);
            if (currentPage !== 1) {
              filterQueries.page = 1;
              console.log(filterQueries.page);
              dispatch(fetchFilteredAnime(filterQueries));
            }
            break;
          }
          case "Last": {
            console.log("Go to last page", lastPage);
            if (currentPage !== lastPage) {
              filterQueries.page = lastPage;
              console.log(filterQueries.page);
              dispatch(fetchFilteredAnime(filterQueries));
            }
            break;
          }
          default: {
            // console.log(parseInt(page), filtered.pagination.current_page);
            filterQueries.page = parseInt(page);
            console.log(filterQueries.page);
            dispatch(fetchFilteredAnime(filterQueries));
            break;
          }
        }
      });
    });
  }

  useEffect(() => {
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

    handleEventListeners();

    return () => {
      window.removeEventListener("resize", determineRowCount);
    };
  }, [filtered, filterLoading]);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageHeader}>Filter</h1>
      <div className={styles.allFilterContainer}>
        <div className={styles.filterRow}>
          <div className={styles.filter}>
            <div className={styles.filterLabel}>Type:</div>
            <div className={styles.filterSelect}>
              <div className={styles.inputDiv} data-input-div>
                <div className={styles.filterInput}>Any</div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className={styles.dropdownArrow}
                  id="dropdownArrow"
                  data-dropdown-img
                />
              </div>

              <div
                className={styles.filterDropdown}
                id="filterDropdown"
                data-filter-dropdown
                style={{ display: "none" }}
              >
                <ul>
                  <li data-option>Any</li>
                  {filterOptions.type.map((item, index) => (
                    <li data-option className={styles.capitalize} key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.filter}>
            <div className={styles.filterLabel} data-name="rating">
              Rating:
            </div>
            <div className={styles.filterSelect}>
              <div className={styles.inputDiv} data-input-div>
                <div className={styles.filterInput}>Any</div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className={styles.dropdownArrow}
                  id="dropdownArrow"
                  data-dropdown-img
                />
              </div>

              <div
                className={styles.filterDropdown}
                id="filterDropdown"
                data-filter-dropdown
                style={{ display: "none" }}
              >
                <ul>
                  <li data-option>Any</li>
                  {filterOptions.rating.map((item) => (
                    <li data-option key={item.enum}>
                      {item.name}
                    </li>
                  ))}
                  {/* <li data-option>Option 1</li>
                  <li data-option>Option 2</li>
                  <li data-option>Option 3</li>
                  <li data-option>Option 4</li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.filter}>
            <div className={styles.filterLabel}>Start Year:</div>
            <div className={styles.filterSelect}>
              <div className={styles.inputDiv} data-input-div>
                <div className={styles.filterInput}>Any</div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className={styles.dropdownArrow}
                  id="dropdownArrow"
                  data-dropdown-img
                />
              </div>

              <div
                className={styles.filterDropdown}
                id="filterDropdown"
                data-filter-dropdown
                style={{ display: "none" }}
              >
                <ul>
                  <li data-option>Any</li>
                  {Array.from(
                    { length: currentYear - 1964 + 1 / 1 },
                    (_, i) => (
                      <li data-option key={2023 - i}>
                        {2023 - i}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.filter}>
            <div className={styles.filterLabel}>End Year:</div>
            <div className={styles.filterSelect}>
              <div className={styles.inputDiv} data-input-div>
                <div className={styles.filterInput}>Any</div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className={styles.dropdownArrow}
                  id="dropdownArrow"
                  data-dropdown-img
                />
              </div>

              <div
                className={styles.filterDropdown}
                id="filterDropdown"
                data-filter-dropdown
                style={{ display: "none" }}
              >
                <ul>
                  <li data-option>Any</li>
                  {Array.from(
                    { length: currentYear - 1964 + 1 / 1 },
                    (_, i) => (
                      <li data-option key={2023 - i}>
                        {2023 - i}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filter}>
            <div className={styles.filterLabel}>Minimum Score:</div>
            <div className={styles.filterSelect}>
              <div className={styles.inputDiv} data-input-div>
                <div className={styles.filterInput}>Any</div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className={styles.dropdownArrow}
                  id="dropdownArrow"
                  data-dropdown-img
                />
              </div>

              <div
                className={styles.filterDropdown}
                id="filterDropdown"
                data-filter-dropdown
                style={{ display: "none" }}
              >
                <ul>
                  <li data-option>Any</li>
                  {Array.from({ length: 11 / 1 }, (_, i) => (
                    <li data-option key={10 - i}>
                      {10 - i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.filter}>
            <div className={styles.filterLabel}>Status:</div>
            <div className={styles.filterSelect}>
              <div className={styles.inputDiv} data-input-div>
                <div className={styles.filterInput}>Any</div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className={styles.dropdownArrow}
                  id="dropdownArrow"
                  data-dropdown-img
                />
              </div>

              <div
                className={styles.filterDropdown}
                id="filterDropdown"
                data-filter-dropdown
                style={{ display: "none" }}
              >
                <ul>
                  <li data-option>Any</li>
                  {filterOptions.status.map((item, index) => (
                    <li data-option className={styles.capitalize} key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.filter}>
            <div className={styles.filterLabel}>Order By:</div>
            <div className={styles.filterSelect}>
              <div className={styles.inputDiv} data-input-div>
                <div className={styles.filterInput}>Any</div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className={styles.dropdownArrow}
                  id="dropdownArrow"
                  data-dropdown-img
                />
              </div>

              <div
                className={styles.filterDropdown}
                id="filterDropdown"
                data-filter-dropdown
                style={{ display: "none" }}
              >
                <ul>
                  <li data-option>Any</li>
                  {filterOptions.orderBy.map((item) => (
                    <li data-option key={item.enum}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.filter}>
            <div className={styles.filterLabel}>Sort:</div>
            <div className={styles.filterSelect}>
              <div className={styles.inputDiv} data-input-div>
                <div className={styles.filterInput}>Any</div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className={styles.dropdownArrow}
                  id="dropdownArrow"
                  data-dropdown-img
                />
              </div>

              <div
                className={styles.filterDropdown}
                id="filterDropdown"
                data-filter-dropdown
                style={{ display: "none" }}
              >
                <ul>
                  <li data-option>Any</li>
                  {filterOptions.sort.map((item) => (
                    <li data-option key={item.enum}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.filterGenre}>
          <div className={styles.genreHeader}>Genre:</div>
          <div className={styles.genreList}>
            {Genres.data.map((genre) => (
              <div
                className={styles.genres}
                id="genres"
                data-genre
                key={genre.mal_id}
              >
                {genre.name}
              </div>
            ))}{" "}
          </div>
        </div>
        <div ref={filterClickRef} className={styles.filterBtn} data-filter-btn>
          Filter
        </div>
      </div>

      {!filterLoading && filtered.data && (
        <div className={styles.filterResults}>
          <div className={styles.resultTitle}>
            Results:{" "}
            <span className={styles.resultCount} data-result-count>
              ?
            </span>
          </div>

          <div className={styles.allAnimeTiles}>
            {!filterLoading &&
              filtered.data &&
              filtered.data.map((item, index) => (
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
                  (filtered.pagination.items.count % rowItemCount) / 1,
              },
              (_, i) => (
                <div className={styles.animeTile} key={i}></div>
              )
            )}
          </div>
          <div className={styles.pageBtns}>
            {currentPage === 1 ? (
              ""
            ) : (
              <>
                <div className={styles.firstBtn} data-page-btn>
                  First
                </div>
                <div className={styles.prevBtn} data-page-btn>
                  Back
                </div>
              </>
            )}

            <div className={styles.pageNos} data-page-no>
              {currentPage === 1 ? (
                ""
              ) : currentPage === 2 ? (
                <>
                  <div className={styles.endpointPages} data-page-btns>
                    {currentPage - 1}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.endpointPages} data-page-btns>
                    {currentPage - 2}
                  </div>
                  <div className={styles.endpointPages} data-page-btns>
                    {currentPage - 1}
                  </div>
                </>
              )}

              <div className={styles.currentPage} data-page-btns>
                {currentPage}
              </div>

              {(currentPage > 2 && lastPage - currentPage === 0) ||
              (currentPage === 1 && lastPage === 1) ? (
                ""
              ) : lastPage - currentPage === 1 ? (
                <>
                  <div className={styles.endpointPages} data-page-btns>
                    {currentPage + 1}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.endpointPages} data-page-btns>
                    {currentPage + 1}
                  </div>
                  <div className={styles.endpointPages} data-page-btns>
                    {currentPage + 2}
                  </div>
                </>
              )}
            </div>

            {currentPage === lastPage ? (
              ""
            ) : (
              <>
                <div className={styles.nextBtn} data-page-btn>
                  Next
                </div>
                <div className={styles.lastBtn} data-page-btn>
                  Last
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
