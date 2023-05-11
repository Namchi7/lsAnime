import { Link } from "react-router-dom";

import styles from "./css/notFound.module.css";

function NotFound() {
  document.body.style.backgroundImage = "";

  return (
    <div className={styles.container}>
      <div className={styles.notFountText}>404 - Page Not Found</div>

      <Link to="/" className={styles.goToHomepageBtn}>
        <div>Go To Homepage</div>
      </Link>
    </div>
  );
}

export default NotFound;
