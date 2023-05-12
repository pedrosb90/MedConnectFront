"use client"
import {Button,Form,Input,Radio} from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getLogStatus } from "../../../redux/reducer";
import { useEffect } from 'react';

export default function UserLogin() {
  // const {AllSpecial} = useSelector(state => state)

  // useEffect(()=>{
  //   console.log(AllSpecial);
  // },[AllSpecial])

  const onSubmit = async (values) => {
    const {userType,email,password} = values
    axios.post("http://localhost:3001/login",{userType,email,password})
    .then((res)=>{
      console.log(res.data);
      if(res.data){
        axios.get("http://localhost:3001/").then((res)=>console.log(res))
      } 
    })
    .catch((error)=> console.log(error.response.data))
    

    //! this info must be send to the backend
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
        <Form.Item name="email" label="Usuario"
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
            message: "El usuario no es válido"
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
