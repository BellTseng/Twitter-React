import { Outlet } from "react-router-dom";
import AdminSideBar from '../sidebar/AdminSideBar';
import styles from './AdminLayout.module.scss'


const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <div className={styles.siderBar}>
        <AdminSideBar />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout