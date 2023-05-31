import { Divider, Table, Button } from "antd";
import axios from "axios";

export default function TableHorarios({
  filtroHorarios,
  setSuccessDelete,
  setErrorDelete,
  successDelete,
  errorDelete,
}) {
  const handleEliminar = (e) => {
    const id = e.id;
    const url = `http://localhost:3001/schedule/`;
    axios
      .delete(`${url}${id}`)
      .then(() => {
        // Código para manejar la respuesta en caso de éxito
        setSuccessDelete({ ...successDelete, alert: true });
      })
      .catch(() => {
        // Código para manejar la respuesta en caso de error
        setErrorDelete({ ...errorDelete, alert: true });
      });
  };
  const columns = [
    {
      title: "Dias de la Semana",
      dataIndex: "day_of_week",
    },
    {
      title: "Inicio de Turno",
      dataIndex: "start_time",
    },
    {
      title: "Fin de Turno",
      dataIndex: "end_time",
    },
    {
      title: "Eliminar",
      render: (_, record) => (
        <Button onClick={() => handleEliminar(record)} type="dashed">
          x
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Divider style={{ color: "white" }}>Horarios Seleccionados</Divider>
      <Table columns={columns} dataSource={filtroHorarios} size="small" />
    </div>
  );
}
