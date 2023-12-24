import { useEffect } from "react";
import { BrowserView, isBrowser } from "react-device-detect";

import styles from "./css/gridBG.module.css";

function GridBG() {
  const zoomOrig = window.devicePixelRatio;

  function gridFunction() {
    const zoomCur = window.devicePixelRatio;
    const zoomMul = Math.ceil(zoomOrig / zoomCur);
    const gw = Math.ceil(window.innerWidth / 20);
    const gh = Math.ceil(window.innerHeight / 20);
    const gt = gw * gh * zoomMul;

    const gridCont = document.querySelector("[data-grid-cont]");

    for (let i = 0; i < gt; i++) {
      const box = document.createElement("div");
      box.classList.add(styles.box);
      gridCont.appendChild(box);
    }

    if (isBrowser) {
      let ball = document.querySelector("[data-light]");

      document.addEventListener("mousemove", function (e) {
        ball.style.left = `${e.clientX - ball.clientWidth / 2}px`;
        ball.style.top = `${e.clientY - ball.clientWidth / 2}px`;
      });
    }
  }

  useEffect(() => {
    gridFunction();
    // document.addEventListener("DOMContentLoaded", () => gridFunction());
    window.addEventListener("resize", () => {
      gridFunction();
    });
  }, []);

  return (
    <div className={styles.container}>
      <BrowserView>
        <div className={styles.light} data-light></div>
      </BrowserView>

      <div className={styles.gridParent}>
        <div className={styles.gridCont} data-grid-cont></div>
      </div>
    </div>
  );
}

export default GridBG;
