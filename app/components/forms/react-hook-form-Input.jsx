import {useForm} from 'react-hook-form';
import {useState} from 'react';

export default function InputForm({type,placeholder,name}){
    const {handleSubmit, register, formState: {errors}} = useForm();
    const [registered, setRegistered] = useState(false);

    const onSubmit = (values, event) => {
        event.preventDefault(); // Evitar que el formulario recargue la página
        console.log(values);
        setRegistered(!registered);
    // Código para procesar los datos del formulario
  };
  switch (name) {
    case "user":
        return(
            <div>
                <label htmlFor={name}>{placeholder}</label>
                <input
                type={type}
                name={name}
                placeholder={placeholder}
                  {...register(name, {
                    required: `El ${name} es obligatorio`,
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/,
                      message: `El ${name} es invalido`,
                    },
                  })}
                />
                {errors.user && <span>{errors.user.message}</span>}
            </div>
          )
    case "password":
        return(
            <div>
                <label htmlFor={name}>{placeholder}</label>
                <input
                type={type}
                name={name}
                placeholder={placeholder}
                {...register(name, {
                required:`La ${name} es obligatoria`,
                    pattern: {
                    value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                    message:`La ${name} debe tener entre 8 y 20 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número`
                    }
                })}
                />
                {errors.password && (
                <span>{errors.password.message}</span>
                )}
            </div>
        )
          
    default:
        break;
  }

  
}