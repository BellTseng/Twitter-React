import styles from './../style/AuthInput.module.scss'

const AuthInput = ({ 
  type, 
  label, 
  value, 
  placeholder, 
  onChange, 
  wordCount, 
  active, 
  iuputName, 
  blankStatus }) => {
  return (
    <div className={styles.authInputContainer}>
      <label>{label}</label>
      <input
        className={`${styles.inputName} ${(value.trim().length > wordCount) ? (styles.wrong) : ('')}`}
        type={type || "text"}
        name={iuputName}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />

      <div
        className={styles.inputFooter}
      >
        {((value.trim().length === 0) && blankStatus)&&
          <span
            className={styles.wrongTitle}
          >
            不得空白！
          </span>}
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

export default AuthInput