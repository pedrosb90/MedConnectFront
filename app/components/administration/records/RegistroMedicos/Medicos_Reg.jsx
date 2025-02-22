"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./page.module.css";
import { List, Skeleton, Avatar } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { getMedicos, deleteMedic } from "@/app/redux/reducer";
import { useSelector, useDispatch } from "react-redux";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const medicsURL = `${backendURL}/medics`;

export default function Registro() {
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const { AllMedicos, deletedMedic } = useSelector((state) => state.speciality);
  const dispatch = useDispatch();

  const request = async () => {
    try {
      const response = await axios.get(medicsURL);
      dispatch(getMedicos(response.data));
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const specializations = (value) => {
    const values = value.map((speciality) => {
      return speciality.name;
    });
    return values.join(" ");
  };

  const DeleteMedic = (value) => {
    setShowAlert(true);
    axios.delete(`https://medconnectback-production.up.railway.app/medics/${value}`).then((res) => {
      dispatch(deleteMedic(res.data.message));
    });
  };

  useEffect(() => {
    request();
    // endpoint para obtener los datos de los médicos
  }, [deletedMedic]);

  if (AllMedicos) {
    return (
      <div>
        {showAlert && (
          <button
            onClick={() => setShowAlert(!showAlert)}
            className="absolute top-40 right-36  flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Alert!</span> haz borrado un medico, dar
              click para quitar la alerta.
            </div>
          </button>
        )}
        <List
          className={style.container + " demo-loadmore-list"}
          loading={loading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={AllMedicos}
          split={true}
          renderItem={(AllMedicos) => (
            <List.Item
              key={AllMedicos.id}
              actions={[
                <button key="list-loadmore-edit">edit</button>,
                <button
                  key={AllMedicos.id}
                  onClick={() => DeleteMedic(AllMedicos.id)}
                >
                  <DeleteOutlined />
                </button>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<UserOutlined />}
                  title={
                    <a
                      href={`http://localhost:3000/medicos/${AllMedicos.id}`}
                    >{`${AllMedicos.first_name} ${AllMedicos.last_name}`}</a>
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
      </div>
    );
  }
}
