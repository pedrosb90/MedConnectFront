"use client"
import {useState} from 'react';
import {Button,Form,Input,Radio} from 'antd';

export default function UserLogin() {
  const [data,setData] = useState({
    user:null,
    password:null
  })
 
  const onSubmit = (values) => {
    const {userType,user,password} = values
    //! this info must be send to the backend
    console.log({userType,user,password});
  }

  return (
    <div >
      <Form labelCol={{   span: 4, }} wrapperCol={{   span: 14, }} layout="horizontal" onFinish={(values)=>onSubmit(values)} >
        <Form.Item name="userType" label="Usuario" 
        rules={[
          {required:true,
          message:"Por favor seleccione una opción"}
        ]}>
          <Radio.Group >
              <Radio value="pacient" defaultChecked>Paciente</Radio>
              <Radio value="medic">Médico</Radio>
              <Radio value="admin">Administrador</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item name="user" label="Usuario"
        rules={[
          {required:true,
            message:"Por favor ingrese su usuario"
          },
          {
            validator: (_, value) => {
              return new Promise((resolve, reject) => {
                if (value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(value)) {
                  resolve(); // Resuelve la promesa si la contraseña es válida
                } else {
                  reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                }
              });
            },
            message: "El email no es válido"
          }
        ]}
        hasFeedback>
            <Input 
            type="text"
            name="user"
            placeholder="Usuario"
            />
          {/* {errors.user && (<span>{errors.user}</span>)} */}
          </Form.Item>
          <Form.Item name="password" label="Contraseña" 
            rules={[
              {required:true,
              message:"Por favor ingrese su contraseña"},
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    if (value && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value)) {
                      resolve(); // Resuelve la promesa si la contraseña es válida
                    } else {
                      reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                    }
                  });
                },
                message: "La contraseña no es válida"
              }
            ]}
            hasFeedback
          >
              <Input.Password
                
                name="password"
                placeholder="Contraseña"/>
          </Form.Item>
          {/* {errors.password && (<span>{errors.password}</span>)} */}
          <Button block htmlType='submit'>boton</Button>
        </Form>
    </div>
    

  );
}
