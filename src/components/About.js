import { Link } from "react-router-dom";

import styles from "./css/about.module.css";
import GithubIcon from "../assets/images/github.svg";
import LinkedInIcon from "../assets/images/linkedIn.svg";
import EmailIcon from "../assets/images/email.svg";

function About() {
  const mailSubject = "LSCountry is Awesome!";
  const mailBody =
    "Great work! I really liked your project and would like to encourage you to keep going. \nGood Luck";
  const mailUrl = `mailto:aman6143kumar6@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  document.body.style.backgroundImage = "";

  return (
    <div className={styles.container}>
      <div className={styles.author}>
        <div className={styles.name}>Aman Kumar</div>
      </div>
      <div className={styles.linkContainer}>
        <Link
          to="https://www.linkedin.com/in/aman-kumar-bb9738171"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={`${styles.link} ${styles.linkedIn}`} data-linkedin>
            <div className={styles.iconContainer}>
              <img src={LinkedInIcon} alt="LinkedIn" className={styles.icon} />
            </div>
            <div className={styles.linkText}>
              <span>LinkedIn</span>
            </div>
          </div>
        </Link>

        <Link
          to="https://github.com/Namchi7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={`${styles.link} ${styles.github}`} data-github>
            <div className={styles.iconContainer}>
              <img src={GithubIcon} alt="Github" className={styles.icon} />
            </div>
            <div className={styles.linkText}>
              <span>Github</span>
            </div>
          </div>
        </Link>

        <Link to={mailUrl} target="_blank" rel="noopener noreferrer">
          <div className={`${styles.link} ${styles.email}`} data-email>
            <div className={styles.iconContainer}>
              <img
                src={EmailIcon}
                alt="Email Address"
                className={styles.icon}
              />
            </div>
            <div className={styles.linkText}>
              <span>Email</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default About;
