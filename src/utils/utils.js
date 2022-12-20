import Swal from 'sweetalert2'
import './SweetAlert.scss'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    popup: 'toastContainer',
    icon: 'toastIcon',
    title: 'toastTitle'
  }
})