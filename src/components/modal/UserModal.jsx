import style from './Modal.module.scss';
import { useState } from 'react';



const Modal = ({ isOpen, closeModal, children }) => {

  const [txt, setTxt] = useState('');

  const handleClickSave = () => {
    alert('已儲存資料:', txt);
    closeModal();
  }

  const handleChange = (value) => {
    setTxt(value);
  }

  const handleClickClose = (e) => {
    if (e.target.id === 'myModal') {
      closeModal();
    }
  }

  return (
    <div
      id="myModal"
      className={style.modal + ' ' + (!!isOpen ? style.show : '')}
      onClick={handleClickClose}
    >
      <div className={style.modalContent}>
        <button className={style.close} onClick={closeModal}></button>
        <div className={style.modalContentInner}>
          {children}
        </div>
      </div>
    </div >
  )
}

export default Modal