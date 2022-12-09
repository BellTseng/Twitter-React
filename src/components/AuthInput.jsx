import './../style/AuthInput.scss'

const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return(
    <div className="authInputContainer">
      <label>{label}</label>
      <input 
        type={ type || "text"} 
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)} 
      />
    </div>
  )
}

export default AuthInput