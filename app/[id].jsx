import style from "detail.module.css";

export default function Detail({ data }) {
  return (
    <div className={style.containAll}>
      <img src={data.image} alt="NOT FOUND" width={500} height={300} />
      <h1>{data.name}</h1>
      <h4>{data.description}</h4>
    </div>
  );
}
export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3001/specializations");
    const data = await res.json();
    const paths = data.map(({ id }) => ({ params: { id: `${id}` } }));

    console.log(paths);
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      `http://localhost:3001/specializations/${params.id}`
    );
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
