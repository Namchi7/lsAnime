import { Link } from "react-router-dom";

import styles from "./css/footer.module.css";
import LogoIcon from "../assets/images/logo.svg";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.footerLinksBG} data-footer-bg>
          <div className={styles.footerLinks}>
            <Link to="/about">About</Link>
            <Link to="/recommendations">Recommendations</Link>
            <Link to="/api">API</Link>
          </div>
        </div>
        <Link to="/" className={styles.siteLogo}>
          <img src={LogoIcon} alt="LSAnime" className={styles.logo} />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
