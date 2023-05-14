"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./page.module.css";
import { List,Skeleton,Avatar } from "antd";

export default function Registro() {
  const [medicos, setMedicos] = useState([]);
  const [array,setArray] = useState([])

  const test = async () => {
    await axios.get("http://localhost:3001/medics")
    .then((res)=>{
      res.data?.map(async(obj)=>{
        setArray(...array,obj)
      })
    })
  }

  useEffect(() => {
    test()
    console.log(array);
     // endpoint para obtener los datos de los médicos
  }, []);

  
  if(array.length){
    return (
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={array}
        renderItem={(array) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={"item.loading"} active>
              <List.Item.Meta
                avatar={<Avatar  />}
                title={<a href="https://ant.design">{array.specializations.name}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              {console.log("array",array)}
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
  
  
}


