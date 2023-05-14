"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./page.module.css";
import { List,Skeleton,Avatar } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { getMedicos } from "@/app/redux/reducer";
import { useSelector,useDispatch } from "react-redux";

export default function Registro() {
  const [medicos, setMedicos] = useState([]);
  const [loading,setLoading] = useState(true)
  const {AllMedicos} = useSelector(state => state.speciality)
  const dispatch = useDispatch()

  const request = async () => {
    try {
      await axios.get("http://localhost:3001/medics")
    .then((res)=>{
      dispatch(getMedicos(res.data))
      setLoading(false);
    })
    } catch (error) {
      alert(error)
    }
     
  }
  console.log(AllMedicos);

  const specializations = (value) => {
    const values = value.map((speciality)=>{
      console.log(speciality);
      return speciality
    })
    return values.join(" ")
  }

  useEffect(() => {
    request()
     // endpoint para obtener los datos de los médicos
  }, []);

  
  if(AllMedicos){
    return (
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={AllMedicos}
        split={true}
        renderItem={(AllMedicos) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">more</a>, <a key="list-loadmore-more"><DeleteOutlined /></a>]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar  />}
                title={<a href="https://ant.design">{`${AllMedicos.first_name} ${AllMedicos.last_name}`}</a>}
                description={specializations(AllMedicos.specializations)}
              />
              <div>
                <div>
                  <h3>Teléfono: {AllMedicos.phone}</h3>
                  <h3>Dirección:{AllMedicos.direccion}</h3>
                </div>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
  
  
}


