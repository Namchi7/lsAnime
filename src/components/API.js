import { Link } from "react-router-dom";

import styles from "./css/api.module.css";

function API() {
  document.body.style.backgroundImage = "";

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <div className={styles.tableRows}>
          <div className={styles.api}>API</div>
          <div className={styles.about}>About</div>
        </div>
        <div className={styles.tableRows}>
          <div className={styles.apiName}>
            <Link
              to="https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.apiLink}
            >
              getAnimeSearch
            </Link>
          </div>
          <div className={styles.info}>
            <div className={styles.pageNames}>
              Used on pages: <Link to="/filter">Filter</Link>,{" "}
              <Link to="/search">Search</Link>
            </div>
            <div className={styles.description}>
              Fetches a list of animes based on provided query parameters.
            </div>
          </div>
        </div>
        <div className={styles.tableRows}>
          <div className={styles.apiName}>
            <Link
              to="https://docs.api.jikan.moe/#tag/anime/operation/getSeasonNow"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.apiLink}
            >
              getSeasonNow
            </Link>
          </div>
          <div className={styles.info}>
            <div className={styles.pageNames}>
              Used on pages: <Link to="/this-season">This Season</Link>,{" "}
              <Link to="/">Homepage</Link>
            </div>
            <div className={styles.description}>
              Fetches a list of animes airing this season.
            </div>
          </div>
        </div>
        <div className={styles.tableRows}>
          <div className={styles.apiName}>
            <Link
              to="https://docs.api.jikan.moe/#tag/anime/operation/getSeasonUpcoming"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.apiLink}
            >
              getSeasonUpcoming
            </Link>
          </div>
          <div className={styles.info}>
            <div className={styles.pageNames}>
              Used on pages: <Link to="/upcoming-season">Upcoming Season</Link>,{" "}
              <Link to="/">Homepage</Link>
            </div>
            <div className={styles.description}>
              Fetches a list of animes scheduled/confirmed to air in the next
              season or the near future.
            </div>
          </div>
        </div>
        <div className={styles.tableRows}>
          <div className={styles.apiName}>
            <Link
              to="https://docs.api.jikan.moe/#tag/anime/operation/getTopAnime"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.apiLink}
            >
              getTopAnime
            </Link>
          </div>
          <div className={styles.info}>
            <div className={styles.pageNames}>
              Used on pages: <Link to="/top">Top Anime</Link>,{" "}
              <Link to="/">Homepage</Link>
            </div>
            <div className={styles.description}>
              Fetches a list of animes which are all-time top.
            </div>
          </div>
        </div>
        <div className={styles.lastRow}>
          API by{" "}
          <Link
            to="https://jikan.moe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jikan.moe
          </Link>
          : (
          <Link
            to="https://docs.api.jikan.moe"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Link
          </Link>
          )
        </div>
      </div>
      {/* <table className={styles.table} cellSpacing="15">
        <thead>
          <tr>
            <th className={styles.first}>Api Name</th>
            <th className={styles.second}>Used on Pages</th>
            <th className={styles.third}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.first}>
              <Link
                to="https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch"
                target="_blank"
                rel="noopener noreferrer"
              >
                getAnimeSearch
              </Link>
            </td>
            <td className={styles.second}>
              <Link to="/filter">Filter</Link>, <Link to="/search">Search</Link>
            </td>
            <td className={styles.third}>
              Fetches a list of animes based on provided query parameters.
            </td>
          </tr>
          <tr>
            <td className={styles.first}>
              <Link
                to="https://docs.api.jikan.moe/#tag/anime/operation/getSeasonNow"
                target="_blank"
                rel="noopener noreferrer"
              >
                getSeasonNow
              </Link>
            </td>
            <td className={styles.second}>
              <Link to="/this-season">This Season</Link>,{" "}
              <Link to="/">Homepage</Link>
            </td>
            <td className={styles.third}>
              Fetches a list of animes airing this season.
            </td>
          </tr>
          <tr>
            <td className={styles.first}>
              <Link
                to="https://docs.api.jikan.moe/#tag/anime/operation/getSeasonUpcoming"
                target="_blank"
                rel="noopener noreferrer"
              >
                getSeasonUpcoming
              </Link>
            </td>
            <td className={styles.second}>
              <Link to="/upcoming-season">Upcoming Season</Link>,{" "}
              <Link to="/">Homepage</Link>
            </td>
            <td className={styles.third}>
              Fetches a list of animes scheduled/confirmed to air in the next
              season or the near future.
            </td>
          </tr>
          <tr>
            <td className={styles.first}>
              <Link
                to="https://docs.api.jikan.moe/#tag/anime/operation/getTopAnime"
                target="_blank"
                rel="noopener noreferrer"
              >
                getTopAnime
              </Link>
            </td>
            <td className={styles.second}>
              <Link to="/top">Top Anime</Link>, <Link to="/">Homepage</Link>
            </td>
            <td className={styles.third}>
              Fetches a list of animes which are all-time top.
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className={styles.footRow}>
            <td colSpan="4">
              API by{" "}
              <Link
                to="https://jikan.moe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jikan.moe
              </Link>
              : (
              <Link
                to="https://docs.api.jikan.moe"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Link
              </Link>
              )
            </td>
          </tr>
        </tfoot>
      </table> */}
    </div>
  );
}

export default API;
