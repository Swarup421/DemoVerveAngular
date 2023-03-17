import { Router, RouterStateSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/user.service';
import { NotificationService } from '../notification.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private router: Router, public userService: UserService, private notifyService: NotificationService) { }

  //imgpath: string = "D:\Swarup\PdfFileUpload\PdfFileUpload\documents\1.png"

  ngOnInit(): void {
    //debugger
    // this.image_update = "assets/blank-profile-picture-g33813bf00_1280.png";
    this.details();
    this.getUserData(this.id);
  }

  getUserDetails: any;
  email: "";
  name: "";
  address: "";
  mobile: "";
  id: "";

  // base64: 
  // base64: string = 'data:image/png;base64,';
  image: any = environment.rootUrl + '/';
  image_update: string = "";
  // displayImg: string = this.base64 + this.image;
  // '' + this.inspectionDetails.reportImage;
  //clicked=false;

  // public get safeUrlPic(): SafeUrl {
  //    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPic); 
  // }
  fileToUpload: any = null;
  file2upload: any = null;

  imgChangeEvt: any = '';
  cropImgPreview: any = '';

  details() {
    let getUserDetails = this.getData();
    //console.log(getUserDetails);
    //debugger;
    // this.email = getUserDetails.email;
    // this.address = getUserDetails.address;
    // this.mobile = getUserDetails.mobileNo;
    // this.name = getUserDetails.fName;
    // this.image = this.image + getUserDetails.image;
    this.id = getUserDetails.id;
    //this.clicked = !this.clic ked;
    //console.log(x)
    //console.log(this.image);
  }

  getData() {
    var localUserdata = localStorage.getItem('userDetail');
    var userdetails = null;
    if (localUserdata)
      var userdetails = JSON.parse(localUserdata);
    return userdetails
  }

  displayDetails() {
    debugger;
    this.image = this.image + this.UserList.image;
    this.email = this.UserList.email;
    this.name = this.UserList.fName;
    this.address = this.UserList.address;
    this.mobile = this.UserList.mobileNo;
  }

  UserList: any = [];
  getUserData(id: any) {
    this.userService.getUserById(id).subscribe(data => {
      //debugger;
      this.UserList = data;
      this.displayDetails();

      // console.log(this.UserList);
    })
  }

  condition: boolean = false;

  editImage() {
    debugger;
    this.condition = true;
    if (this.condition == true) {
      this.userService.UpdateImage(this.id, this.fileToUpload)
        .subscribe((data: any) => {
          if (data.Status == "success") {
            this.notifyService.showSuccess(data.Message);
            this.condition = false;
            this.fileToUpload = null;
          }
          if (data.Status == "fail") {
            this.notifyService.showError("something went wrong..")
          }
        })
    }
  }

  updateImage() {
    debugger;
    if (this.condition == true) {
      this.userService.UpdateImage(this.id, this.file2upload)
        .subscribe((data: any) => {
          if (data.Status == "success") {
            this.notifyService.showSuccess(data.Message);
            //this.condition = false;
            this.closeClick();
          }
          if (data.Status == "fail") {
            this.notifyService.showError("something went wrong..")
          }
        })
    }
  }

  edit() {
    debugger;
    this.condition = true;
    this.image_update = this.image;
  }

  closeClick() {
    debugger;
    this.condition = false;
    this.file2upload = null;
    // this.displayDetails();
    this.image;
  }

  handleFileInput(file: FileList) {
    debugger;
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      // this.defaultUserimage = event.target.result;
      this.image = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  handleInput(file: FileList, event: any) {
    debugger;
    this.file2upload = file.item(0);

    this.imgChangeEvt = event;

    var reader = new FileReader();
    reader.onload = (event: any) => {
      // this.defaultUserimage = event.target.result;
      this.image = event.target.result;
    }
    reader.readAsDataURL(this.file2upload);
    // console.log(this.image);
  }

  cropImg(e: ImageCroppedEvent) {
    this.image = e.base64;
  }

  imgLoad() {
    // display cropper tool
  }
  
  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

}
