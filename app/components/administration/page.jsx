"use client";
import { useSelector } from "react-redux";
import styles from "./page.module.css";

export default function Administration() {
  const { logStatus } = useSelector((state) => state);

  if (logStatus.logStatus === "admin" || logStatus.logStatus === "master") {
    return (
      <div className={`bg-white ${styles.container}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Administración
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Bienvenido a Administración
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Aquí podrás administrar toda la información de la página web,
              crear médicos, especialidades, modificarlas y ver un registro de
              las citas activas y ya resueltas.
            </p>
          </div>
          {/* Rest of the code */}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No posee los permisos requeridos</h1>
      </div>
    );
  }
}

// export default function Administration(){
//     const {logStatus} = useSelector(state => state)
//     if(logStatus.logStatus === "admin" ){
//         return(
//             <div className={`bg-white   ${styles.container}`} >
//             <div className="mx-auto max-w-7xl px-6 lg:px-8">
//               <div className="mx-auto max-w-2xl lg:text-center">
//                 <h2 className="text-base font-semibold leading-7 text-indigo-600">Administración</h2>
//                 <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Bienvenido a Administración</p>
//                 <p className="mt-6 text-lg leading-8 text-gray-600">Aqui podras administrar toda la informacion de la pagina web, crear medicos, especialidades, modificarlas y ver un registro de las citas activas y ya resueltas.</p>
//               </div>
//               <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-10 lg:max-w-4xl">
//                 <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
//                   <div className="relative pl-16">
//                     <dt className="text-base font-semibold leading-7 text-gray-900">
//                       <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
//                       <svg className="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="5" y="3" width="14" height="18" rx="2" />  <line x1="9" y1="7" x2="15" y2="7" />  <line x1="9" y1="11" x2="15" y2="11" />  <line x1="9" y1="15" x2="13" y2="15" /></svg>
//                       </div>
//                       Total de citas
//                     </dt>
//                     <dd className={styles.citas}>44
//                     <button className={styles.button}>Ver Detalles</button></dd>

// export default function Administration() {const { logStatus } = useSelector((state) => state);

//  if (logStatus.logStatus === "master") {
//     return (
//       <div className={`bg-white ${styles.container}`}>
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:text-center">
//             <h2 className="text-base font-semibold leading-7 text-indigo-600">
//               Administración
//             </h2>
//             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               Bienvenido a Administración
//             </p>
//             <p className="mt-6 text-lg leading-8 text-gray-600">
//               Aqui podras administrar toda la informacion de la pagina web,
//               crear medicos, especialidades, modificarlas y ver un registro de
//               las citas activas y ya resueltas.
//             </p>
//           </div>
//           <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-10 lg:max-w-4xl">
//             <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
//               <div className="relative pl-16">
//                 <dt className="text-base font-semibold leading-7 text-gray-900">
//                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
//                     <svg
//                       className="h-8 w-8 text-white"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       strokeWidth="2"
//                       stroke="currentColor"
//                       fill="none"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       {" "}
//                       <path stroke="none" d="M0 0h24v24H0z" />{" "}
//                       <rect x="5" y="3" width="14" height="18" rx="2" />{" "}
//                       <line x1="9" y1="7" x2="15" y2="7" />{" "}
//                       <line x1="9" y1="11" x2="15" y2="11" />{" "}
//                       <line x1="9" y1="15" x2="13" y2="15" />
//                     </svg>
//                   </div>
//                   Total de citas
//                 </dt>
//                 <dd className={styles.citas}>
//                   44
//                   <button className={styles.button}>Ver Detalles</button>
//                 </dd>
//               </div>
//               <div className="relative pl-16">
//                 <dt className="text-base font-semibold leading-7 text-gray-900">
//                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
//                     <svg
//                       className="h-6 w-6 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       aria-hidden="true"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
//                       />
//                     </svg>
//                   </div>
//                   Citas concluidas
//                 </dt>
//                 <dd className={styles.citas_con}>
//                   10
//                   <button className={styles.button}>Ver Detalles</button>
//                 </dd>
//               </div>
//               <div className="relative pl-16">
//                 <dt className="text-base font-semibold leading-7 text-gray-900">
//                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
//                     <svg
//                       className="h-8 w-8 text-white"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       {" "}
//                       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />{" "}
//                       <polyline points="14 2 14 8 20 8" />{" "}
//                       <line x1="16" y1="13" x2="8" y2="13" />{" "}
//                       <line x1="16" y1="17" x2="8" y2="17" />{" "}
//                       <polyline points="10 9 9 9 8 9" />
//                     </svg>
//                   </div>
//                   Resumen
//                 </dt>
//                 <div className={styles.resumen}>
//                   <dd className={styles.citas_con}>
//                     34
//                     <h2>Citas activas</h2>
//                   </dd>
//                   <dd className={styles.citas_con}>
//                     7<h2>Total de Medicos</h2>
//                   </dd>
//                   <dd className={styles.citas_con}>
//                     5<h2>Total de especialidades</h2>
//                   </dd>
//                 </div>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <h1>No posee los permisos requeridos</h1>
//       </div>

//     );
//   }
// }
