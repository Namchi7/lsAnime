import { Link } from "react-router-dom";

import styles from "./css/headerMenu.module.css";

import menu from "../assets/images/menu.svg";
import close from "../assets/images/cross.svg";
// anilist.co navigation by hamburger menu style

function HeaderMenu() {
  function handleMenuOpen() {
    const menuOpen = document.querySelector("[data-menu-open]");
    const menuBurger = document.querySelector("[data-menu-burger]");

    menuOpen.style.display = "flex";
    menuBurger.style.display = "none";
  }

  function handleMenuClose() {
    const menuOpen = document.querySelector("[data-menu-open]");
    const menuBurger = document.querySelector("[data-menu-burger]");

    menuOpen.style.display = "none";
    menuBurger.style.display = "flex";
  }

  return (
    <div className={styles.container}>
      <div
        style={{ display: "none" }}
        className={styles.menuOpen}
        data-menu-open
      >
        <nav className={styles.navLinks}>
          <Link
            to="/recommendations"
            className={styles.navLink}
            onClick={() => handleMenuClose()}
          >
            Recommendations
          </Link>

          <Link
            to="/about"
            className={styles.navLink}
            onClick={() => handleMenuClose()}
          >
            About
          </Link>

          <Link
            to="/"
            className={styles.navLink}
            onClick={() => handleMenuClose()}
          >
            Home
          </Link>
        </nav>

        <hr />

        <div className={styles.close}>
          <img
            src={close}
            alt="Close Menu"
            className={styles.closeIcon}
            onClick={() => handleMenuClose()}
          />
        </div>
      </div>

      <div
        style={{ display: "flex" }}
        className={styles.menuBurger}
        data-menu-burger
        onClick={() => handleMenuOpen()}
      >
        <img src={menu} alt="Open Menu" className={styles.menuIcon} />
      </div>
    </div>
  );
}

export default HeaderMenu;
