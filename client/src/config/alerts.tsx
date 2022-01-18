import Swal from 'sweetalert2';

export const Alert = async( message: string) => await Swal.fire({
    title: message,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: `Cancel`,
  });

export const AlertSuccess = () => Swal.fire("Done!", "", "success");

export const AlertCanceled = () => Swal.fire("Canceled", "", "error");