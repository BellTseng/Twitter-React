import styles from './UserModalIntroduction.module.scss'

const UserModalIntroduction = ({ label, value, placeholder, onChange, wordCount, active }) => {
  return (
    <div className={styles.userModalIntroduction}>
      <div className={styles.area}>
        <label>{label}</label>
        <textarea
          className={`${styles.inputName} ${(value.trim().length > wordCount) && styles.wrong}`}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
        >
        </textarea>
      </div>
      

      <div
        className={styles.inputFooter}
      >
        {(value.trim().length > wordCount) &&
          <span
            className={styles.wrongTitle}
          >
            字數超出上限！
          </span>}
        {active &&
          <span
            className={styles.count}
          >
            {value.trim().length}/{wordCount}
          </span>
        }
      </div>

    </div>
  )
}

export default UserModalIntroduction