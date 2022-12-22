import styles from './Layout.module.scss'

const Tab = ({ tabId, onChangeTab, titles }) => {

  return (
    <div className={styles.tab}>
      {titles.map((title, index) =>
        <p
          key={index}
          className={`${styles.tweets} ${(tabId === index) && styles.active}`}
          onClick={() => onChangeTab?.(index)}
        >
          {title}
        </p>
      )}
    </div>
  )
}

export default Tab