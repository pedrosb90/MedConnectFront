"use client"
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import styles from './page.module.css'

export default function MedForm() {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [registered, setRegistered] = useState(false);
  
  const onSubmit = (values, event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página
    
    setRegistered(!registered);

    // Código para procesar los datos del formulario
  };
  useEffect({})
  

  return (
    <div className={styles.global_box}>
      <form className={styles.form_box} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Añadir Medico</h1>
        <label htmlFor="first_name">Nombre: </label>
        <input
        id='first_name'
        type="text"
        name="first_name"
        placeholder="nombre..."
          {...register("first_name", {
            required: "El Nombre es obligatorio",
            pattern: {
                value: /^[A-Za-z]+$/,
                message: "No debe contener numeros"
            }
          })}
        />
        {errors.first_name && <span className={styles.error}>{errors.first_name.message}</span>}
        <label htmlFor="last_name">Apellido: </label>
        <input
        id='last_name'
        type="text"
        name="last_name"
        placeholder="apellido..."
          {...register("last_name", {
          required:"El Apellido es obligatorio",
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "No debe contener numeros"
        }
          })}
        />
        {errors.last_name && (
          <span className={styles.error}>{errors.last_name.message}</span>
        )}
        <label htmlFor="phone">Telefono: </label>
        <input className={styles.text_area}
        id='phone'
        name='phone'
        placeholder='555-555-555...'
        {...register('phone',{
          required:'El numero de telefono es obligatorio',
          pattern: {
            value: /^[0-9]+$/,
            message: 'El número de teléfono no es válido'
          }
          })}
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
        <label htmlFor="direccion">Dirección: </label>
        <input className={styles.text_area}
        id='direccion'
        name='direccion'
        placeholder='direccion...'
        {...register('direccion',{
          required:'La direccion es obligatorio',
          
          })}
        />
        {errors.direccion && (
          <span className={styles.error}>{errors.direccion.message}</span>
        )}
        <button>Registrar</button>
        
        
    </form>
    </div>

  );
}
// first_name	last_name	phone	direccion	officeId	cityId