import styles from './AdminUserList.module.scss'
import AdminUserItem from './AdminUserItem'

const AdminUserList = ({ userList }) => {
  return (
    <div className={styles.adminUsers}>
      <div className={styles.title}>
        <h4>推文清單</h4>
      </div>
      <div className={`${styles.usersList} ${styles.scrollbar}`}>
        {
          userList.map((user) => {
            return(
              <AdminUserItem
                key={user.id}
                user={user}
              />
            )
          })
        }
        
      </div>
    </div>
  )
}

export default AdminUserList