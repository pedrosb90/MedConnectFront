"use client"
import { useSelector } from 'react-redux'
import styles from './page.module.css'
export default function administration(){
    const {logStatus} = useSelector(state => state)
    console.log("estado",logStatus);
    if(logStatus.logStatus === "master" ){
        return(
            <div className={styles.container}>
                <h1>Esto es administration</h1>
                </div>
        )
    }else{
        return(
            <div>
                <h1>No posee los permisos requeridos</h1>
            </div>
        )
    }

}