"use client"
import {Button,Form,Input,Radio,Alert,Select} from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicos } from '@/app/redux/reducer';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from "./form.module.css"
const { TextArea } = Input;
import { PhoneOutlined } from '@ant-design/icons';
import Image from 'next/image';

export default function UserLogin() {
  const {logStatus,speciality} = useSelector(state => state)
  const {schedule} = useSelector((state)=>state.cita)
  const [registered,setRegistered] = useState(false)
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()
  console.log(schedule);

    //! logStatus has inside logStatus and userStatus
    //! speciality has inside AllMedicos

  useEffect(()=>{
    axios.get("http://localhost:3001/medics")
    .then((res)=>{
        dispatch(getMedicos(res.data));
    })
},[])

const countries = [
  { name: 'Argentina', code: 'AR', prefix: '+54', flag: './img/argentina.png' },
  { name: 'Venezuela', code: 'VE', prefix: '+58', flag: './img/venezuela.png' },
  { name: 'Peru', code: 'PE', prefix: '+51', flag: './img/peru.png' },
  { name: 'Uruguay', code: 'UY', prefix: '+598', flag: './img/uruguay.png' },
  { name: 'Colombia', code: 'CO', prefix: '+57', flag: './img/colombia.png' },
  { name: 'Brasil', code: 'BR', prefix: '+55', flag: './img/brasil.png' },
  { name: 'Chile', code: 'CL', prefix: '+56', flag: './img/chile.png' },
  // Agrega más países según tus necesidades
];

const obrasSociales = ["particular","IOMA","OSMECON","OSAP","ELEVAR","CENTRO MEDICO PUEYRREDON","OSEIV","APRES","PAMI"]

const [selectedCountry, setSelectedCountry] = useState(countries[0]);
const [selectedObra,setSelectedObra] = useState(null)

const handleCountryChange = (event) => {
  const country = countries.find((c) => c.code === event);
  setSelectedCountry(country);
};

const handleObraChange = (event) => {
  setSelectedObra(event);
};

  const onSubmit = async (values) => {
    console.log(values);
  }

  // if(logStatus.userStatus){
    return (
        <div >
          <Form labelCol={{   span: 3, }} wrapperCol={{   span: 10, }} layout="horizontal" onFinish={(values)=>onSubmit(values)} >
          <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Por favor ingrese su email" },
                  {
                    validator: (_, value) => {
                      return new Promise((resolve, reject) => {
                        if (
                          value &&
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(value)
                        ) {
                          resolve(); // Resuelve la promesa si la contraseña es válida
                        } else {
                          reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                        }
                      });
                    },
                    message: "El email no es válido",
                  },
                ]}
                hasFeedback
              >
                <Input
                  className={style.input}
                  type="text"
                  name="user"
                  placeholder="xxxx@mail.com"
                />
              </Form.Item>

              <Form.Item label={"Pais"}>
                  <Select value={selectedCountry.code} showArrow={true} onChange={handleCountryChange}>
                  {countries.map((country) => (
                    <option
                      value={country.code}
                      key={country.code}
                      style={{
                        backgroundImage: `url(${country.flag})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        paddingLeft: '25px', // Ajusta el espaciado según sea necesario
                      }}
                    >
                      {country.name}
                      {/* <Image width={50} height={50} src={country.flag} alt="" /> */}
                    </option>
                  ))}
                </Select>
              </Form.Item>

                  <Form.Item name="phone" label="Teléfono" 
                  rules={[
                    {required:true,
                    message:"Por favor ingrese su número de teléfono"},
                    {
                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          if (value && /^[0-9]{6,14}$/.test(value)) {
                            resolve(); // Resuelve la promesa si la contraseña es válida
                          } else {
                            reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                          }
                        });
                      },
                      message: "el teléfono es incorrecto"
                    }
                  ]}
                  hasFeedback
                >
                  <Input
                  className={style.input}
                  type="number"
                  name="phone"
                  placeholder="Número de teléfono"
                />
                </Form.Item>

            


              <Form.Item
                name="dni"
                label="dni"
                rules={[
                  { required: true, message: "Por favor ingrese su documento" },
                  {
                    validator: (_, value) => {
                      return new Promise((resolve, reject) => {
                        if (
                          value &&
                          /^\w{8}/.test(value)
                        ) {
                          resolve(); // Resuelve la promesa si la contraseña es válida
                        } else {
                          reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                        }
                      });
                    },
                    message: "El documento no es válido",
                  },
                ]}
                hasFeedback
              >
                <Input
                  className={style.input}
                  type="text"
                  name="dni"
                  placeholder="Número de documento"
                />
              </Form.Item>

              <Form.Item name={"obra"} label={"Obra social"} rules={[{ required: true, message: "Por favor seleccione un campo" }]}>
              <Select value={selectedObra} showArrow={true} onChange={handleObraChange}>
              {obrasSociales.map((obra) => (
                <option
                  value={obra}
                  key={obra}
                >
                  {obra}
                </option>
              ))}
            </Select>
              </Form.Item>

              <Form.Item name={"comments"} label={"Observaciones del paciente"}>
                <TextArea rows={4} placeholder="Observaciones" maxLength={150} />
              </Form.Item>
              
    
              {/* {errors.password && (<span>{errors.password}</span>)} */}
              {registered === "error" ? <Alert
              message="Ocurrió un error al registrarse"
              type="warning"
    /> : !registered && <Button block htmlType='submit' loading={loading}>registrarse</Button>}
            </Form>
        </div>
      );
  //   }else{
  //     return(
  //       <div>
  //           <h1>Debe iniciar sesión para pedir un turno</h1>
  //           {setTimeout(() => {
  //               router.push("/components/forms/UserLogin")
  //           }, 2000)}
  //       </div>
  //   )
  // }

  
}
