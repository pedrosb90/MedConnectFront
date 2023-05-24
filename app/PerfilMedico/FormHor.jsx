import {Button,Form,Input,Radio,Alert, Select, TimePicker} from 'antd';
import style from "./Forms.module.css"
import FormItem from 'antd/es/form/FormItem';

export default function FormHor() {
  const { RangePicker } = TimePicker;
  return (
    <div className={style.container} >
          <h1 className={style.title}>Horario de Atencion</h1>
          <Form labelCol={{   span: 0, }} wrapperCol={{   span: 14, }} layout="horizontal" onFinish={(values)=>onSubmit(values)} >
          
            <FormItem name="time" label="Time">
              <RangePicker></RangePicker>
            </FormItem>
            <FormItem name="date" label="Fecha" >
                <Input />
            </FormItem>
            
              
    
    
            
            </Form>
        </div>
  )
}
