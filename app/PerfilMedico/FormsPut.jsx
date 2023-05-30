"use client"
import style from './Forms.module.css'
import {Button,Form,Input,Radio,Alert, Select} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux"
import axios from "axios"
import { getSpeciality, getCities } from "../redux/reducer";
import { Option } from 'antd/es/mentions';
const local = "http://localhost:3001/specializations";
const localCites = "http://localhost:3001/cities";



export default function Forms({userLocal, medico}) {
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);
  const globalCities = useSelector((state)=>state.speciality.cities)


  
  const filtro = data.filter(e=>e.deletedAt===null)

  async function fetchData() {
    try {
      const response = await axios.get(local);
      const resCities = await axios.get(localCites)

      dispatch(getSpeciality(response.data));
      dispatch(getCities(resCities.data))
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(()=>{
    fetchData()
    
  },[])

  useEffect(() => {
    setCities(globalCities)
    setData(especialidades);
  }, [especialidades , globalCities]);


const valoresSubmit = async (values)=>{
    const localMedic = `http://localhost:3001/medics/${medico[0].id}`
    
const {first_name, last_name, ...a} = values;

const body = {...a}

const res= await axios.put(localMedic, body);




}

  return (
    <div className={style.container + " top-1/3 "} >
          <h1 className={style.title}>Actualiza tu informacion</h1>
          <Form labelCol={{   span: 0, }} wrapperCol={{   span: 14, }} layout="horizontal" onFinish={(values)=>valoresSubmit(values)} >
           
            <FormItem  name="first_name" label="Nombre" >
              <Input placeholder={userLocal.first_name} disabled={true}/>
            </FormItem>
            <FormItem  name="last_name" label="Apellido" >
                <Input placeholder={userLocal.last_name} disabled={true}/>
            </FormItem>
            <FormItem name="phone" label="Número de telefono" initialValue={medico[0].phone}>
                <Input type='number' defaultValue={medico[0].phone}/>
            </FormItem>
            <FormItem name="specializations" label="Especialidades" rules={[
              {required:true,
              message:"Escoge una o mas Especialidades"}
            ]}>
              <Select name="specializations" placeholder="Selecciona tus especialidades" showSearch optionFilterProp='children' mode='multiple' >
              {filtro.map((e, index)=>{
                return (
                  <Option key={index} value={e.id}>{e.name}</Option>
                )
              })}
              </Select>
            </FormItem>
            <FormItem name="cityId" label="Ciudad" rules={[
              {required:true,
              message:"Escoge una Ciudad"}
            ]}>
              <Select name="cityId" placeholder="Selecciona tu ciudad" showSearch optionFilterProp='children' >
              {cities.map((e, index)=>{

                return (
                  <Option key={index} value={e.id}>{e.name}</Option>
                )
              })}
              </Select>
              
            </FormItem>
            <Form.Item name="direccion" label="Direccion" initialValue={medico[0].direccion} >
            <Input type='string' defaultValue={medico[0].direccion}/>
              {/* {errors.user && (<span>{errors.user}</span>)} */}
              </Form.Item>
              <Button  htmlType='submit' className={style.Button}>Enviar</Button>
            </Form>
        </div>
  )
}