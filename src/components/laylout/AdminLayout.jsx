import { Outlet } from "react-router-dom";
import AdminSideBar from '../sidebar/AdminSideBar';
import styles from './AdminLayout.module.scss'


const AppLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <AdminSideBar />
      <Outlet />
    </div>
  )
}

export default AppLayout