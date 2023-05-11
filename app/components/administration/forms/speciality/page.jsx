"use client"
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import styles from './page.module.css'

export default function SpecialtyForm() {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [registered, setRegistered] = useState(false);
  

  const onSubmit = (values, event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página
    console.log(values);
    setRegistered(!registered);
    // Código para procesar los datos del formulario
  };
  

  return (
    <div className={styles.global_box}>
      <form className={styles.form_box} onSubmit={handleSubmit(onSubmit)}>
        
        <label htmlFor="name">Nombre: </label>
        <input
        id='name'
        type="text"
        name="name"
        placeholder="nombre..."
          {...register("name", {
            required: "El usuario es obligatorio",
            
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
        <label htmlFor="image">Imagen: </label>
        <input
        id='image'
        type="text"
        name="image"
        placeholder="imagen..."
          {...register("image", {
          required:"La imagen es obligatoria",
           
          })}
        />
        {errors.image && (
          <span>{errors.image.message}</span>
        )}
        <label htmlFor="summary">Resumen: </label>
        <textarea className={styles.text_area}
        id='summary'
        name='summary'
        placeholder='resumen...'
        {...register('summary',{
          required:'El resumen es obligatorio',
          
        })}
        />
        {errors.summary && (
          <span>{errors.summary.message}</span>
        )}
        <button>Registrar</button>
        
        
    </form>
    </div>

  );
}
