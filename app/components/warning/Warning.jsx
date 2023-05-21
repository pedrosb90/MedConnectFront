'use client'
import { useEffect} from "react";
import styles from './page.module.css'
export default function({alert,text,FinishFailed}){
    useEffect(() => {
        const timer = setTimeout(() => {
          FinishFailed;
        }, 4000);
    
        return () => clearTimeout(timer);
      }, [alert]);
    return(
        <>
        {<div className={alert ? styles.alert : styles.alert_off} role="alert" onClick={FinishFailed}>
        <p className="font-bold">¡Advertencia!</p>
        <p>{text} </p>
      </div>}</>
        

    )
}