import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(
    // private toastr: ToastrService,
     private toast: NgToastService) { }

  // showSuccess(message: any, title: any) {
  //   debugger;
  //   this.toastr.success(message, title)
  // }

  // showError(message: any, title: any) {
  //   this.toastr.error(message, title)
  // }

  // showInfo(message: any, title: any) {
  //   this.toastr.info(message, title)
  // }

  // showWarning(message: any, title: any) {
  //   this.toastr.warning(message, title)
  // }

  showSuccess(summary: any){
    this.toast.success({detail:"SUCCESS",summary,duration:5000});
  }

  showError(summary: any) {
    this.toast.error({detail:"ERROR",summary,duration: 3000});
  }

  showInfo(summary: any) {
    this.toast.info({detail:"INFO",summary, duration: 3000});
  }

  showWarning(summary: any) {
    this.toast.warning({detail:"WARN",summary,duration:5000});
  }
}
