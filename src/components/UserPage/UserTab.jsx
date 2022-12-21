import styles from './UserTab.module.scss'

const UserTab = ({ tabId, onChangeTab }) => {
  return (
    <div className={styles.userTab}>
      <p
        className={`${styles.tweets}  ${(tabId === 1) && styles.active}`}
        onClick={() => onChangeTab?.(1)}
      >
        推文
      </p>
      <p
        className={`${styles.replies} ${(tabId === 2) && styles.active}`}
        onClick={() => onChangeTab?.(2)}
      >
        回覆
      </p>
      <p
        className={`${styles.favorites} ${(tabId === 3) && styles.active}`}
        onClick={() => onChangeTab?.(3)}
      >
        喜歡的內容
      </p>
    </div>
  )
}

export default UserTab