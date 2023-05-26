"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./page.module.css";
import { List, Skeleton, Avatar } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { getSpeciality, deleteEsp } from "@/app/redux/reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Registro() {
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const { AllSpecial, deletedEsp } = useSelector((state) => state.speciality);
  const dispatch = useDispatch();

  const request = async () => {
    try {
      const response = await axios.get("http://localhost:3001/specializations");
      dispatch(getSpeciality(response.data));
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

//   const specializations = (value) => {
//     const values = value.map((speciality) => {
//       return speciality.name;
//     });
//     return values.join(" ");
//   };

  const DeleteMedic = (value) => {
    setShowAlert(true);
    axios.delete(`http://localhost:3001/specializations/${value}`).then((res) => {
      dispatch(deleteEsp(res.data.message));
    });
  };

  useEffect(() => {
    request();
    // endpoint para obtener los datos de los médicos
  }, [deletedEsp]);
  if (AllSpecial) {
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
          dataSource={AllSpecial}
          split={true}
          renderItem={(AllSpecial) => (
            console.log("todos los medicos: ",AllSpecial),
            <List.Item
              key={AllSpecial.id}
              actions={[
                <button key="list-loadmore-edit">edit</button>,
                <button
                  key={AllSpecial.id}
                  onClick={() => DeleteMedic(AllSpecial.id)}
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
                      href={`http://localhost:3000/medicos/${AllSpecial.id}`}
                    >{`${AllSpecial.user.first_name} ${AllSpecial.user.last_name}`}</a>
                  }
                  description={specializations(AllSpecial.specializations)}
                />
                <div>
                  <div>
                    <h3>Teléfono: {AllSpecial.phone}</h3>
                    <h3>Dirección:{AllSpecial.direccion}</h3>
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