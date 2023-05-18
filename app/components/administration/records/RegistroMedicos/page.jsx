import Medicos_Reg from './Medicos_Reg'
import  style  from './page.module.css'
export default function Reg_Medicos(){
  return(
    <>
    <h1 className={style.title + ' mb-8 text-4xl font-sans leading-none tracking-tighter text-black-600 md:text-7xl lg:text-5xl'}>Registro de medicos</h1>
    <Medicos_Reg></Medicos_Reg>
    </>
  )
}


