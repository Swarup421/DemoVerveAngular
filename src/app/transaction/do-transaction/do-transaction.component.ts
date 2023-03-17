import { NotificationService } from 'src/app/notification.service';
import { Transaction } from './../../shared/transaction.model';
import { UserService } from 'src/app/shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-do-transaction',
  templateUrl: './do-transaction.component.html',
  styleUrls: ['./do-transaction.component.css']
})
export class DoTransactionComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder, private notifyService: NotificationService) {
    debugger;
    this.getAccountDropDown();
  }

  TransactionForm: FormGroup;

  get f() {
    return this.TransactionForm.controls;
  }

  ngOnInit(): void {
    this.createTransactionForm();
  }

  createTransactionForm() {
    this.TransactionForm = this.formBuilder.group({
      amount: ['', Validators.required],
      c100: ['', Validators.required],
      c200: ['', Validators.required],
      c500: ['', Validators.required],
      c2000: ['', Validators.required],
      accountBind: ['', Validators.required],
      transactionType: ['', Validators.required]
    });
  }

  AccountDropdown: any = [];

  getAccountDropDown() {
    debugger;
    //console.log()
    this.userService.getAccountList().subscribe(data => this.AccountDropdown = data);
    //console.log(this.AccountDropdown)

  }

  onSubmit() {
    console.log(this.TransactionForm);
    if (this.TransactionForm.valid) {
      
      const body: Transaction = {
        amount: this.TransactionForm.value.amount,
        transactionType: this.TransactionForm.value.transactionType,
        C100: this.TransactionForm.value.c100,
        C200: this.TransactionForm.value.c200,
        C500: this.TransactionForm.value.c500,
        C2000: this.TransactionForm.value.c2000,
        accountId:this.TransactionForm.value.accountBind,
        CashTransaction: {
          C100: this.TransactionForm.value.c100,
          C200: this.TransactionForm.value.c200,
          C500: this.TransactionForm.value.c500,
          C2000: this.TransactionForm.value.c2000,
        }
      }
      this.createTransactionForm();

      this.userService.transaction(body)
        .subscribe((data: any) => {
          //debugger;
          //console.log(data.Message);
          // if(data.Status == "TooMuch" || data.Status == "lowBal" || data.Status == "success" || data.Status == "NoMatch" || data.Status == "failed"){
          //   this.notifyService.showSuccess(data.Message, "SUCCESS..")
          //   // alert(data.Message);
          // }
          if(data.Status == "TooMuch"){
            this.notifyService.showWarning(data.Message)
          }
          else if(data.Status == "lowBal")
          {
            this.notifyService.showWarning(data.Message)
          }
          else if (data.Status == "success") {
            this.notifyService.showSuccess(data.Message)
          }
          else if (data.Status == "NoMatch") {
            this.notifyService.showWarning(data.Message)
          }
          else if (data.Status == "failed") {
            this.notifyService.showError(data.Message)
          }  
          else{
            this.notifyService.showError('Something Went Wrong');
          }
        })
    }
  }
}
