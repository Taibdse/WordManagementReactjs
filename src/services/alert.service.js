import swal from 'sweetalert';

class AlertService{

  static showAlertSuccess(title, text, timer){
    swal({
      title: title,
      text: text,
      icon: "success",
      timer: timer
    });
  }

  static showAlertError(title, text, timer){
    swal({
      title: title,
      text: text,
      icon: "error",
      timer: timer
    });
  }

  static async showAlertConfirm(title, text){
    let sure = await swal({
      title: title,
      text: text,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    return sure;
  }
  
}

export default AlertService;

