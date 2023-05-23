"use client"
import style from './Forms.module.css'
import {Button,Form,Input,Radio,Alert} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import {useSelector} from "react-redux"

export default function Forms() {
  
  const especialidades = useSelector(state=>state.speciality.AllSpecial)
  
  console.log(especialidades);




  return (
    <div className={style.container} >
          <h1 className={style.title}>Actualiza tu informacion</h1>
          <Form labelCol={{   span: 0, }} wrapperCol={{   span: 14, }} layout="horizontal" onFinish={(values)=>onSubmit(values)} >
            {/* <Form.Item name="userType" label="Usuario" 
            rules={[
              {required:true,
              message:"Por favor seleccione una opción"}
            ]}>
              <Radio.Group >
                  <Radio value="pacient" defaultChecked>Paciente</Radio>
                  {logStatus.logStatus === "master" ?<Radio value="medic">Médico</Radio>:null}
                  {logStatus.logStatus === "master" ?<Radio value="admin">Administrador</Radio>:null}
                </Radio.Group>
            </Form.Item> */}
            <FormItem name="first_name" label="Nombre" rules={[
                {required:true,
                message:"Por favor ingrese su nombre"
            }
            ]}>
                <Input/>
            </FormItem>
            <FormItem name="last_name" label="Apellido" rules={[
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
                    message: "La contraseña debe contener 1 mayúscula, 1 minúscula y un número"
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
              {/* {registered === "error" ? <Alert
              message="Ocurrió un error al registrarse"
              type="warning"
    /> : !registered && <Button className={style.Button} htmlType='submit' loading={loading}>registrar</Button>} */}
            </Form>
        </div>
  )
}
