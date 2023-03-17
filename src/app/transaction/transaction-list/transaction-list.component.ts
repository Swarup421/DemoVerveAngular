import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.transaction_list();
  }

  p: any;
  pageSize: number = 6;
  data:string;

  transactionList: any;
  addform: boolean;

  ngOnInit(): void {
    //debugger;
    this.transactionList;
    this.addform = false;
    //this.transaction_list();
    //this.method();
  }

  open_popup() {
    this.addform = true;
  }

  closeClick() {
    this.addform = false;
    this.transaction_list();
  }

  transaction_list() {
    this.userService.getTransactionList().subscribe(data => {
      this.transactionList = data;
      //this.method(this.transactionList);  
      console.log(this.transactionList)
    })
  }

  TransactionAccNo: any;

  
  //method(tr: any) {
    // if (transaction.transactionType == "D") {
    //   transaction.amount
    // }
    //debugger;
    //console.log(tr);
    //for(let i=0; i<tr.length; i++){
      //debugger;
      //this.TransactionAccNo = tr[i].Account.accountNumber;
      //console.log(tr[i].Account.accountNumber);
      // let arr = []
      // for(var j = 0; j < tr[i].Account.accountNumber; j++) arr.push(j+1);
      // console.log(arr);
    //}

    //debugger;
    //console.log(this.TransactionAccNo);
    // for(let i=0; i<this.transactionList.length; i++){
    //   debugger;
    //   //console.log(this.transactionList[i].product_desc); //use i instead of 0
    //   console.log(i);
    // }
  //}
}
