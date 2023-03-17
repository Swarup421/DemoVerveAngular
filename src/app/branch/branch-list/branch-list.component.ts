import { NotificationService } from 'src/app/notification.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, Directive } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Branch } from 'src/app/shared/branch.model';
import { Sort } from 'src/app/util/sort';
import { SortDirective } from 'src/app/directive/sort.directive';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {

  constructor(private UserService: UserService, private router: Router, private notifyService: NotificationService) { }

  // @Output clClick: any
  cancelClicked: boolean = false
  popoverTitle: string = "Delete Branch"
  popoverMessage: string = "Are You Sure"

  branchList: any = [];
  addform: boolean
  branchForm: FormGroup;

  //@Input() objBranch: Branch;
  ModalTitle: string;
  bch: any;

  p: any; // for pagination
  pageSize: number = 6;
  data: string; // for searching

  ngOnInit(): void {
    this.addform = false
    this.branch_list();
  }

  closeClick() {
    debugger;
    this.addform = false;
    this.branch_list();
  }

  branchid = 0

  open_popup(branchid: number) {
    //debugger;
    this.bch = branchid;
    this.ModalTitle = "Add Branch";
    this.addform = true;
  }

  deleteBranch(branch: any) {
    const body = {
      branchid: branch.branchid,
      branchNum: branch.branchNum,
      branchName: branch.branchName
    }
    this.UserService.deleteBranch(body).subscribe((data: any) => {
      if (data.Status == "success") {
        this.notifyService.showSuccess(data.Message);
        // this.notifyService.showSuccess(data.Message, "SUCCESS..")
        this.branch_list();
        // alert(data.Message);
      }
    })
  }

  open_popup_edit(obj: any) {
    //debugger;
    //console.log(obj)
    this.bch = obj;
    this.addform = true;
    this.ModalTitle = "Edit Branch";
  }

  branch_list() {
    debugger;
    this.UserService.getBranchList().subscribe(data => {
      this.branchList = data;
      console.log(this.branchList)
    })
  }

  // displayDesc(){
  //   deburger;
  //   //this.branchList.branchid
  //   console.log(Object.keys(this.branchList).length);
  //   for (let i = 30; i > 0 ; i--) {
  //     this.branchList.branchid
  //     console.log ("Block statement execution no." + i);
  //   }
  //}
}