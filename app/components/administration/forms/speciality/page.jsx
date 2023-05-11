"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
export default function SpecialtyForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [registered, setRegistered] = useState(false);

  const onSubmit = (values, event) => {
    console.log(values);
    event.preventDefault(); // Evitar que el formulario recargue la página
    setRegistered(!registered);

    const formData = new FormData();

    // Iterar sobre los valores del objeto values y agregarlos al formData
    // Object.entries(values).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    formData.append("name", values.name);
    formData.append("image", values.image[0]);
    formData.append("description", values.description);

    axios
      .post("http://localhost:3001/specializations", formData)
      .then((response) => {
        // Código para manejar la respuesta en caso de éxito
        alert("Registro exitoso");
      })
      .catch((error) => {
        // Código para manejar la respuesta en caso de error
        alert("Error al registrar:", error);
      });
  };

return (
    <div className={styles.global_box}>
      <form className={styles.form_box} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Añadir Especialidad</h1>
        <label htmlFor="name">Nombre: </label>
        <input
          id="name"
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
          id="url"
          type="file"
          name="image"
          accept="image/*"
          placeholder="imagen..."
          {...register("image", {
            required: "La imagen es obligatoria",
          })}
        />
        {errors.url && <span>{errors.url.message}</span>}
        <label htmlFor="description">Descripción: </label>
        <textarea
          className={styles.text_area}
          id="description"
          name="description"
          placeholder="description..."
          {...register("description", {
            required: "El resumen es obligatorio",
          })}
        />
        {errors.description && <span>{errors.description.message}</span>}
        <button>Registrar</button>
      </form>
    </div>
  );
}
