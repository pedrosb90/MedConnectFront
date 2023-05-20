"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import style from "./page.module.css";
import { List, Skeleton, Avatar } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { getMedicos, deleteMedic } from "@/app/redux/reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Registro() {
  const [loading, setLoading] = useState(true);
  const { AllMedicos, deletedMedic } = useSelector((state) => state.speciality);
  const dispatch = useDispatch();

  const request = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/medics", {
        withCredentials: true,
        credentials: "include",
      });
      dispatch(getMedicos(response.data));
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }, [dispatch]);

  const specializations = (value) => {
    const values = value.map((speciality) => {
      console.log(speciality);
      return speciality.name;
    });
    return values.join(" ");
  };

  const DeleteMedic = (value) => {
    axios.delete(`http://localhost:3001/medics/${value}`).then((res) => {
      console.log(res.data.message);
      dispatch(deleteMedic(res.data.message));
    });
  };

  useEffect(() => {
    request();
    // endpoint para obtener los datos de los médicos
  }, [deletedMedic, request]);

  if (AllMedicos) {
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
            key={AllMedicos.id}
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key={AllMedicos.id} onClick={() => DeleteMedic(AllMedicos.id)}>
                <DeleteOutlined />
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<UserOutlined />}
                title={
                  <a href={`http://localhost:3000/medicos/${AllMedicos.id}`}>
                    {`${AllMedicos.first_name} ${AllMedicos.last_name}`}
                  </a>
                }
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
