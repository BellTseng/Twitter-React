import { Outlet } from "react-router-dom";
import AdminSideBar from '../sidebar/AdminSideBar';


const AdminLayout = () => {
  return (
    <div>
      <AdminSideBar />
      <Outlet />
    </div>
  )
}

export default AdminLayout