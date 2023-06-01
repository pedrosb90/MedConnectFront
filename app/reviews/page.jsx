"use client";
import { useEffect, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import styles from './page.module.css'
import img from './img/logo.jpeg'
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const { Option } = Select;

const ReviewForm = () => {
  const nav = useRouter()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  const [medicos , setMedicos]=useState(false)
  
  const handleSubmit = (values) => {
    setLoading(true);
    const {userId,comment,rating} = values
    const usuario = userLocal.id;
    if (!usuario) {
      message.error('Debes iniciar sesión');
      nav.push('/components/forms/UserLogin')
      
    }else{
      
      axios.get('https://medconnectback-production.up.railway.app/users')
      .then(res=>{
        const response = res.data;
        const filter = response.find(user=>user.id === usuario)
        
        const id = filter.patients[0].id
        
        axios.post('https://medconnectback-production.up.railway.app/reviews/create',{comment,rating,recommend:true,userId,patientId:id})
    .then(()=>{
      setLoading(false);
      form.resetFields();
      message.success("¡La revisión ha sido enviada con éxito!");
      nav.push('/')

    })
    .catch((error)=>{
      message.error('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      
      setLoading(false);
    })
        
        
      })
      .catch(()=>{
        message.error('usuario no encontrado');

      })
      
      
      
    // Simulación de envío de datos a través de una API o almacenamiento en la base de datos
    
     
  }
  };
  const userLocal = useSelector((state) => state.login.userLocal);




useEffect(() => {
  
    axios.get('https://medconnectback-production.up.railway.app/medics')
      .then(res => {
        setMedicos(res.data);
      })
      
  
}, []);
  const medicoFilter = medicos && medicos.map(med => {
    return { name:med.user.first_name + " " + med.user.last_name,userId:med.user.id }
  });
  

  return (
    <div className={styles.container}>
      <Image src={img} className={styles.icono} alt="fondo" ></Image>
      <div>
      <h1 className={styles.title}>Danos tu opinión sobre la cita y déjanos tu calificación:</h1>
      <Form className={styles.form} form={form} onFinish={handleSubmit}>
      <Form.Item
    name="userId"
    label="Seleccione al médico"
    rules={[
      {
        required: true,
        message: "Seleccione al médico",
      },
    ]}
  >
    <Select>
      {medicoFilter &&
        medicoFilter.map((option, index) =>
         (
          
          <Select.Option key={index} value={option.userId}>
            {option.name}
          </Select.Option>
        ))}
    </Select>
  </Form.Item>
        <Form.Item
          className=" text-slate-400"
          name="comment"
          label="Review"
          rules={[{ required: true, message: "Por favor, ingresa tu review." }]}
        >
          <Input.TextArea rows={4} placeholder="Escribe tu review" />
        </Form.Item>
        <Form.Item
          className=" text-slate-400"
          name="rating"
          label="Calificación"
          rules={[
            {
              required: true,
              message: "Por favor, selecciona una calificación.",
            },
          ]}
        >
          <Select placeholder="Selecciona una calificación">
            {[...Array(10)].map((_, index) => (
              <Option key={index + 1} value={index + 1}>
                {index + 1}
              </Option>
            ))}
          </Select>
        </Form.Item>
        
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={styles.button + ' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'}
          >
            Enviar
          </Button>
        
      </Form>

      </div>
      
    </div>
  );
};

export default ReviewForm;
