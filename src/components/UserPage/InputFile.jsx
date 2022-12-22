import styles from './InputFile.module.scss'

const InputFile = ({children, onChange, inputRef, keyId, iuputName}) => {
  return(
    <div className={styles.inputFile}>
      <input
        name={iuputName}
        key={keyId} 
        type="file"
        accept='image/*'
        onChange={(event) => onChange?.(event)}
        ref={inputRef} 
      />

      {children}
    </div>
  )
}

export default InputFile