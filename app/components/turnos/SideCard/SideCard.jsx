import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "../../turnos/CardEdit.module.css";

const SideCard = () => {
  const info = useSelector((state) => state.cita.info);
  const schedule = useSelector((state) => state.cita.schedule);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(postSchedule([]));
  // }, []);

  return (
    <div className={styles.resumen}>
      <h3 className={styles.resumenTitle}>¡Tu cita esta casi agendada!</h3>
      <div className={styles.resumenText}>
        <h3 className={styles.espec} key={info.id}>
          {info.especialidad}
        </h3>
        <p>Medico:</p>
        <p className={styles.valueText} key={info.id}>
          {info.first_name && info.last_name
            ? `${info.first_name} ${info.last_name}`
            : "Elija medico.."}
        </p>
        <p>Horario:</p>
        <p className={styles.valueText}>
          {schedule && schedule.scheduledTime
            ? `${schedule.scheduledTime}`
            : "Seleccione horario de atencion.."}
        </p>
        <p>Dia:</p>
        <p className={styles.valueText}>
          {schedule && schedule.scheduledDate
            ? new Date(schedule.scheduledDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Seleccione un dia.."}
        </p>

        <p>Lugar:</p>
        <p className={styles.valueText}>Medicina y Salud Berazategui</p>
        <br />
        <p className={styles.costo}>Costo final: $ 500,0</p>
      </div>
    </div>
  );
};

export default SideCard;
