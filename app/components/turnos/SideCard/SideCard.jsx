import { useSelector, useDispatch } from "react-redux";
import styles from "../../turnos/CardEdit.module.css";

const SideCard = () => {
  const { info, citas } = useSelector((state) => state.cita);

  return (
    <div className={styles.resumen}>
      <h1 className={styles.resumenTitle}>¡Tu cita esta casi agendada!</h1>
      <br />
      <h3 className={styles.resumenTitle}>Resumen de las Citas</h3>
      <div className={styles.resumenText}>
        <p>Especialidad: </p>
        <p className={styles.valueText}>{info.especialidad}</p>
        <br />
        <p>Medico: </p>
        <p className={styles.valueText}>info medico</p>
        <p className={styles.costo}>Costo final: $ 0,0</p>
        <br />
        <button className={styles.button}>
          <h2 className={styles.buttonText}>Pagar</h2>
        </button>
      </div>
    </div>
  );
};

export default SideCard;
