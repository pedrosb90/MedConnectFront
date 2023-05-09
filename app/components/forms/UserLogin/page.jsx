"use client"
import {useForm} from 'react-hook-form';
import {useState} from 'react';

export default function Detail() {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [registered, setRegistered] = useState(false);

  const onSubmit = (values, event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página
    console.log(values);
    setRegistered(!registered);
    // Código para procesar los datos del formulario
  };
  

  return (
    <div className="h-screen bg-slate-800">
      <form class='flex flex-col h-3/4' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="user">Usuario</label>
        <input
        type="text"
        name="user"
        placeholder="Usuario"
          {...register("user", {
            required: "El usuario es obligatorio",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/,
              message: "El usuario es inválido",
            },
          })}
        />
        {errors.user && <span>{errors.user.message}</span>}
        <label htmlFor="password">Contraseña</label>
        <input
        type="password"
        name="password"
        placeholder="Contraseña"
          {...register("password", {
          required:"La contraseña es obligatoria",
            pattern: {
              value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
              message:"La contraseña debe tener entre 8 y 20 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número"
            }
          })}
        />
        {errors.password && (
          <span>{errors.password.message}</span>
        )}
        <button type="submit">Registrarse</button>
    </form>
    </div>

  );
}
