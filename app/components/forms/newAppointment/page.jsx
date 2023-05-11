"use client"
import {Button,Cascader,Checkbox,DatePicker,Form,Input,InputNumber,Radio,Select,Switch,TreeSelect,Upload,} from 'antd';
import FormItem from 'antd/es/form/FormItem';

export default function Forms(){

  const onSubmit = (values) => {
    console.log(values);
  }

  return (
    <>
      <Form labelCol={{   span: 6, }} wrapperCol={{   span: 14, }} layout="horizontal" onFinish={(values)=>onSubmit(values)} >
        
        <Form.Item name="fullName" label="Nombre completo" rules={[
          {required:true,
          message:"Por favor ingrese su nombre"},
          {
            validator: (_, value) => {
              return new Promise((resolve, reject) => {
                if (value && /\s(.{3,})/.test(value)) {
                  resolve(); // Resuelve la promesa si la contraseña es válida
                } else {
                  reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                }
              });
            },
            message: "Ingrese su nombre completo"
          }
        ]} hasFeedback>
          <Input name="fullName" />
        </Form.Item>
        <Form.Item label="Edad">
          <Input type='number' />
        </Form.Item>
        <Form.Item label="Especialidades" name="speciality">
          <TreeSelect
            treeData={[
              {
                title: 'Cardiología',
                value: 'Cardiología',
                children: [
                  {
                    title: 'estudio1',
                    value: 'estudio1',
                  },
                ],
              },
              {
                title: 'Ecografía',
                value: 'Ecografía',
                children: [
                  {
                    title: 'estudio2',
                    value: 'estudio2',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <FormItem label="Médico" name="medic">
          <Select>
            
          </Select>
        </FormItem>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        
        <Button block htmlType='submit'>boton</Button>
      </Form>
    </>
  );
}
 