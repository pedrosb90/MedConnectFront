"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
export default function Success({ alert, text, success }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      success();
    }, 4000);

    return () => clearTimeout(timer);
  }, [alert]);
  return (
    <>
      {
        <div
          className={alert ? styles.alert : styles.alert_off}
          role="alert"
          onClick={success}
        >
          <p className="font-bold">¡Success!</p>
          <p>{text} </p>
        </div>
      }
    </>
  );
}
