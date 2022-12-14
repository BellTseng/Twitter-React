import styles from './AdminUserItem.module.scss'

const AdminUserItem = () => {
  return(
    <div className={styles.userItem}>
      <img 
        className={styles.background}
        src="https://stickershop.line-scdn.net/stickershop/v1/product/10825585/LINEStorePC/main.png" alt="background" 
      />

      <img 
        className={styles.avatar}
        src="https://yt3.googleusercontent.com/ytc/AMLnZu8DV_AUQyPkL9oVUdBIEoIpyKuut4H3VAn9H6iHEQ=s900-c-k-c0x00ffffff-no-rj" 
        alt="avatar" 
      />

      <div className={styles.userTag}>
        <p className={styles.userName}>Jas</p>
        <p className={styles.userAccount}>@ allen789</p>
      </div>
      
      
    </div>
  )
}

export default AdminUserItem