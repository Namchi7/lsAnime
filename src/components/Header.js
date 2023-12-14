import styles from "./css/header.module.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import mainLogo from "../assets/images/mainlogo.svg";
import searchIcon from "../assets/images/search.svg";
import filterIcon from "../assets/images/filter.svg";
import moonIcon from "../assets/images/moon.svg";
import sunIcon from "../assets/images/sun.svg";

function allEventListeners() {
  const toggleBG = document.querySelector("[data-theme-toggle]");
  const toggleCircleBG = document.querySelector("[data-toggle-circlebg]");

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBG.style.backgroundColor = "#6A2782";

    toggleCircleBG.style.backgroundColor = "#CCBD3B";

    toggleCircleBG.style.left = "50%";
  } else {
    toggleBG.style.backgroundColor = "#CCBD3B";

    toggleCircleBG.style.backgroundColor = "#6A2782";

    toggleCircleBG.style.left = "0";
  }
}

function Header() {
  const handleClick = () => {
    allEventListeners();
  };

  // Dark Theme detector: https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.logo}>
          <img src={mainLogo} alt="lsAnime" className={styles.logoImg} />
        </Link>
        <nav className={styles.links}>
          <Link to="/search" className={styles.search} data-search>
            <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.searchIcon}
              />
            </div>
          </Link>

          <Link to="/filter" className={styles.filter}>
            <span>Filter</span>
            <img src={filterIcon} alt="Filter" className={styles.filterIcon} />
          </Link>

          <div
            className={styles.themeToggle}
            data-theme-toggle
            onClick={handleClick}
          >
            <img src={sunIcon} alt="Light" className={styles.sunIcon} />
            <img src={moonIcon} alt="Dark" className={styles.moonIcon} />
            <div className={styles.toggleCircleBG} data-toggle-circlebg />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
