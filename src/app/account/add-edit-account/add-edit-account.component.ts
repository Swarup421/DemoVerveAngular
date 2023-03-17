import { Account } from './../../shared/account.model';
import { UserService } from 'src/app/shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { AccountListComponent } from '../account-list/account-list.component';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.css']
})
export class AddEditAccountComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
     private userService: UserService,
      private notifyService: NotificationService,
      private accountListComp: AccountListComponent ) {
    // debugger;
    this.act;
    this.getUserDropDown();
    this.getBranchDropDown();
    // this.createAccountForm();
  }

  testData: any;

  @Input() act: any
  AccountForm: FormGroup

  get f() {
    return this.AccountForm.controls;
  }

  AccountNum: string;
  MinimumBal: string;
  WithdrawlLim: string;
  Balance: string;

  fNameViewforEdit: any
  bNameViewForEdit: any

  userDropdown: any = [];
  branchDropdown: any = [];

  ngOnInit(): void {
    // debugger;
    // console.log(this.userDropdown);
    this.act;
    this.createAccountForm();//added
    this.DisplayEditDetails();
  }

  DisplayEditDetails() {
    // debugger;
    if(this.act != 0){
      this.AccountNum = this.act.accountNumber;
      this.MinimumBal = this.act.minBalance;
      this.WithdrawlLim = this.act.withdrawLimit;
      this.Balance = this.act.balance;
  
      this.fNameViewforEdit = this.act.User.fName;
      this.bNameViewForEdit = this.act.Branch.branchName;
    }
  }

  createAccountForm() {
    // debugger
    if(this.act == 0){
      this.AccountForm = this.formBuilder.group({
        accountId: [''],
        accNumber: ['', Validators.required],
        minBal: ['', Validators.required],
        withdrawlLim: ['', Validators.required],
        bal: ['', Validators.required],
        branchBind: ['', Validators.required],
        userBind: ['', Validators.required]
      });
    }
    else{
      // debugger;
      this.AccountForm = this.formBuilder.group({
        accountId: [''],
        accNumber: ['', Validators.required],
        minBal: ['', Validators.required],
        withdrawlLim: ['', Validators.required],
        bal: ['', Validators.required],
      });
    }
  }

  getUserDropDown() {
    // debugger;
    this.userService.getUserNameDropDown().subscribe(data => this.userDropdown = data);
    // console.log(this.userDropdown);

  }

  getBranchDropDown() {
    //debugger;
    this.userService.getBranchList().subscribe(data => this.branchDropdown = data);
  }

  onSubmit() {
    //debugger;
    //console.log(this.AccountForm);
    if (this.act == 0) {
      debugger;
      if (this.AccountForm.valid) {
        const body: Account = {
          userId: this.AccountForm.value.userBind,
          branchId: this.AccountForm.value.branchBind,
          accountNumber: this.AccountForm.value.accNumber,
          minBalance: this.AccountForm.value.minBal,
          withdrawLimit: this.AccountForm.value.withdrawlLim,
          balance: this.AccountForm.value.bal,
        }
        this.createAccountForm();

        this.userService.addAccount(body)
          .subscribe((data: any) => {
            //debugger;
            if (data.Status == "success" || data.Status == "fail" || data.Status == "empty") {
              this.notifyService.showSuccess(data.Message)
              // alert(data.Message);
              // location.reload();
            }
          })
      }
    }
    else {
      // debugger
      console.log(this.AccountForm);
      if (this.AccountForm.valid) {
        const data: Account = {
          id: this.act.id,
          userId: this.act.User.id,
          branchId: this.act.Branch.branchid,
          accountNumber: this.AccountForm.value.accNumber,
          minBalance: this.AccountForm.value.minBal,
          withdrawLimit: this.AccountForm.value.withdrawlLim,
          balance: this.AccountForm.value.bal
        }
        this.userService.updateAccount(data).subscribe((data: any) => {
          //debugger;
          // this.testData = data;
          // console.log(this.testData);
          if (data.Status == "success") {
            this.notifyService.showSuccess(data.Message)
            // alert(data.Message);
            this.accountListComp.closeClick();
            // location.reload();
          }
        })
      }
    }
  }
}