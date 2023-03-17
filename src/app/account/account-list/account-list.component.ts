import { Account } from './../../shared/account.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private notifyService: NotificationService) { }

  p: number;
  pageSize: number = 6;
  data: string;

  accountList: any = [];
  userList: any = [];

  addform: boolean
  branchForm: FormGroup;

  @Input() objAccount: Account;
  ModalTitle: string;
  act: any;

  ngOnInit(): void {
    this.addform = false;
    // this.user_list()
    this.account_list();
  }

  accountId = 0
  open_popup(accountId: number) {
    this.act = accountId;
    this.ModalTitle = "Add Account";
    this.addform = true;
  }

  closeClick() {
    this.addform = false;
    this.account_list();
  }

  open_popup_edit(obj: any) {
    //debugger;
    //console.log(obj)
    this.act = obj;
    this.addform = true;
    this.ModalTitle = "Edit Account";
  }

  account_list() {
    //debugger;
    this.userService.getAccountList().subscribe(data => {
      this.accountList = data;
    })
  }

  cancelClicked: boolean = false

  deleteAccount(account: any) {
    //debugger;
    // console.log(account)
    const body = {
      id: account.id,
      accountNumber: account.accountNumber,
      minBalance: account.minBalance,
      withdrawLimit: account.withdrawLimit,
      balance: account.balance
    }
    this.userService.deleteAccount(body).subscribe((data: any) => {
      if (data.Status == "success") {
        this.account_list();
        this.notifyService.showSuccess(data.Message)
        // alert(data.Message);
      }
    })
    // if (confirm('are you sure ?>')) {

    // }
  }
}
