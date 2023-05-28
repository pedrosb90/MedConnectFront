export function obtenerHorarios(start_time, end_time, duracion_cita) {
  // Obtener las horas de inicio y fin
  const startHour = parseInt(start_time.slice(0, 2));
  const endHour = parseInt(end_time.slice(0, 2));

  // Calcular el número de horas de trabajo
  const duracion_trabajo = endHour - startHour;

  // Calcular el número de citas posibles en el horario de trabajo
  const citas_posibles = Math.floor((duracion_trabajo * 60) / duracion_cita);

  // Generar los horarios disponibles
  const horarios_disponibles = [];
  let hora = startHour;
  let minutos = 0;
  for (let i = 0; i <= citas_posibles; i++) {
    const horaFormateada = hora.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0') +':00';
    horarios_disponibles.push(horaFormateada);
    
    // Añadir la duración de la cita a la hora actual
    minutos += duracion_cita;
    hora += Math.floor(minutos / 60);
    minutos %= 60;
  }
  
  return horarios_disponibles;
}
  

  
  