"use client"
import {Button,Form,Input,Radio} from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FormItem from 'antd/es/form/FormItem';

export default function UserLogin() {
  const {logStatus} = useSelector(state => state)
  const [registered,setRegistered] = useState(false)

  useEffect(()=>{
    console.log(logStatus);
  },[logStatus])

  const onSubmit = async (values) => {
    const {firstName,lastName,phone,userType,email,password} = values
    axios.create({ withCredentials: true }).post("http://localhost:3001/register",{firstName,lastName,phone,userType,email,password})
    .then((res)=>{
        console.log(res.data);
      if(res.data){
        setRegistered(true);
      } 
    })
    .catch((error)=> console.log(error))
    

    //! this info must be send to the backend
  }

  if(!registered){
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
                  {logStatus.logStatus === "master" ?<Radio value="medic">Médico</Radio>:null}
                  {logStatus.logStatus === "master" ?<Radio value="admin">Administrador</Radio>:null}
                </Radio.Group>
            </Form.Item>
            <FormItem name="firstName" label="Nombre" rules={[
                {required:true,
                message:"Por favor ingrese su nombre"
            }
            ]}>
                <Input/>
            </FormItem>
            <FormItem name="lastName" label="Apellido" rules={[
                {required:true,
                message:"Por favor ingrese su apellido"
            }
            ]}>
                <Input/>
            </FormItem>
            <FormItem name="phone" label="Número de telefono" rules={[
                {required:true,
                message:"Por favor ingrese su número de telefono"
            }
            ]}>
                <Input type='number'/>
            </FormItem>
            <Form.Item name="email" label="Correo electrónico"
            rules={[
              {required:true,
                message:"Por favor ingrese su correo electrónico"
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
                message: "El correo no es válido"
              }
            ]}
            hasFeedback>
                <Input 
                type="text"
                name="user"
                placeholder="Correo electronico"
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
    
    
              <Form.Item name="ConfirmedPassword" label="Confirmar contraseña"
              dependencies={["password"]} 
                rules={[
                  {required:true,
                  message:"Por favor ingrese su contraseña"},
                  ({getFieldValue})=>({
                    validator(_,value){
                        if(!value || getFieldValue("password") === value){
                            return Promise.resolve()
                        }
                        return Promise.reject("Las contraseñas no coinciden")
                  }})
                ]}
                hasFeedback
              >
                  <Input.Password
                    
                    name="ConfirmedPassword"
                    placeholder="Confirmar contraseña"/>
              </Form.Item>
              {/* {errors.password && (<span>{errors.password}</span>)} */}
              <Button block htmlType='submit'>boton</Button>
            </Form>
        </div>
        
    
      );
  }else{
    return(
        <div>
            <h1>Usuario registrado con exito</h1>
        </div>
    )
  }

  
}
