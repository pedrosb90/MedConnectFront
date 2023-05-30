import { Divider, Table } from 'antd';

const columns = [
    {
      title: 'Dias de la Semana',
      dataIndex: 'day_of_week',
    },
    {
      title: 'Inicio de Turno',
      dataIndex: 'start_time',
    },
    {
      title: 'Fin de Turno',
      dataIndex: 'end_time',
    },
  ];

export default function TableHorarios({filtroHorarios}) {
    console.log(filtroHorarios);
  return (
    <div>
        <Divider style={{color:'white'}} >Horarios Seleccionados</Divider>
        <Table  columns={columns} dataSource={filtroHorarios} size="small" />
    </div>
  )
}
