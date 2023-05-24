import {Button,Form,Input,Radio,Alert, Select, TimePicker} from 'antd';
import style from "./Forms.module.css"
import FormItem from 'antd/es/form/FormItem';

export default function FormCal() {
  return (
    <div className={style.container} >
          <h1 className={style.title}>Experiencia</h1>
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
            <FormItem name="academic_degree" label="Titulo Academico" >
              <Input placeholder="" />
            </FormItem>
            <FormItem name="years_of_experience" label="Años de experiencia" rules={[
                {required:true,
                message:"Por favor ingrese sus años de experiencia"
            }
            ]} >
                <Input type='number'/>
            </FormItem>
            <FormItem name="certifications" label="Certificados" rules={[
                {required:true,
                message:"Por favor ingrese su número de telefono"
            }
            ]}>
                <Input />
            </FormItem>
           
            <Form.Item name='research' label="Investigacion">
          <Radio.Group>
            <Radio value="true"> Si </Radio>
            <Radio value="false"> No </Radio>
          </Radio.Group>
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
