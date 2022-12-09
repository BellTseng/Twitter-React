import './../style/AuthInput.scss'
import clsx from 'clsx'

const AuthInput = ({ type, label, value, placeholder, onChange, wordCount }) => {
  return(
    <div className="authInputContainer">
      <label>{label}</label>
      <input 
        className={clsx('inputName', { wrong: (value.trim().length > wordCount)})}
        type={ type || "text"} 
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)} 
      />
      <div
        className='inputFooter'
      >
        {(value.trim().length > wordCount) &&
        <span
          className='wrongTitle'
        >
          字數超出上限！
        </span>}
        <span
          className='count'
        >
          {value.trim().length}/{wordCount}
        </span>
      </div>
    </div>
  )
}

export default AuthInput