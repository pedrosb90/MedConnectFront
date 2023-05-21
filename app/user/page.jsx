import Table from './Tables/Table'
import UserCard from './Cards/UserCard'
import styles from './page.module.css'
import Link from 'next/link'



export default function User(){

    return(
        <div className={styles.container}>
            <UserCard></UserCard>
            <Table></Table>
            <Link href="/" as="/">
        <button
          type="button"
          className={`btn_return text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.btn_return}`}
        >
          Regresar
        </button>
      </Link>
</div>
    )
}