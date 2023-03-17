import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { NotificationService } from 'src/app/notification.service';
import { ConfirmedValidator } from 'src/app/confirmed.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  //user: User;

  userForm: FormGroup
  msg: string
  defaultUserimage: string = "assets/blank-profile-picture-g33813bf00_1280.png"
  fileToUpload: any = null;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'

  constructor(private userService: UserService, private formBuilder: FormBuilder, private notifyService: NotificationService) {
    
  }

  ngOnInit(): void {
    debugger;
    this.createUserForm();
    //this.resetForm();
  }

  get f() {
    return this.userForm.controls;
  } 

  handleFileInput(file: FileList) {
    debugger;
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.defaultUserimage = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  } 
  createUserForm() {
    debugger;
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lName: [''],
      mobileNo: ['', [Validators.required, Validators.maxLength(10)]],
      address: [''],
      // email: ['', Validators.required, Validators.pattern(this.emailPattern)],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.passwordPattern)]],
      confirm_password: ['',[Validators.required, Validators.minLength(5)]],
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  onSubmit(userForm: any, Image: any) {
    debugger;
    if (this.userForm.valid) {
      console.log(userForm);
      this.userService.registerUser(userForm, this.fileToUpload)
        .subscribe((data: any) => {
          debugger;
          if (data.Status == "success") {
            this.notifyService.showSuccess(data.Message);
            this.createUserForm();
            Image.value = null;
            this.defaultUserimage = "assets/blank-profile-picture-g33813bf00_1280.png";
          }
          if(data.Status =="fail"){
            this.notifyService.showError(data.Message)
          }
        })
    }
  }
}