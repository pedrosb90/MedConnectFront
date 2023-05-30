import { useSelector, useDispatch } from "react-redux";
import styles from "../../turnos/CardEdit.module.css";

const SideCard = () => {
  const { info, citas } = useSelector((state) => state.cita);

  return (
    <div className={styles.resumen}>
      <h1 className={styles.resumenTitle}>Resumen de orden</h1>
      <br />
      <div className={styles.resumenText}>
        <p>Especialidad: {info.especialidad}</p>
        {"render info"}
        <p className={styles.costo}>Costo final: </p>
      </div>
    </div>
  );
};

export default SideCard;
