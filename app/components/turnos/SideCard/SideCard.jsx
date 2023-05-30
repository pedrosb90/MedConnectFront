import { useSelector, useDispatch } from "react-redux";
import styles from "../../turnos/CardEdit.module.css";

const SideCard = () => {
  return (
    <div className={styles.resumen}>
      <h1 className={styles.resumenText}>Resumen de orden</h1>
    </div>
  );
};

export default SideCard;
