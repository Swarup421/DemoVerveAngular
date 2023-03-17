import { BranchListComponent } from './../branch-list/branch-list.component';
import { Branch } from './../../shared/branch.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { NotificationService } from 'src/app/notification.service'; 

@Component({
  selector: 'app-add-edit-branch',
  templateUrl: './add-edit-branch.component.html',
  styleUrls: ['./add-edit-branch.component.css']
})
export class AddEditBranchComponent implements OnInit {
  
  @Input() objBranch: Branch;
  id: number = 0;

  constructor(private formBuilder: FormBuilder,
    private UserService: UserService, private notifyService: NotificationService, private branchlistcomp: BranchListComponent ) {
    this.createBranchForm();
  }

  branchForm: FormGroup;

  get f() {
    return this.branchForm.controls;
  }

  @Input() bch: any

  branchid: number;
  branchNum: string;
  branchName: string;

  ngOnInit(): void {
    //console.log(this.objBranch)
    debugger;
    this.viewBranchDetails();
  }

  
  viewBranchDetails() {
    console.log(this.bch)
    this.bch = this.bch;
    this.branchid = this.bch.branchid;
    this.branchNum = this.bch.branchNum;
    this.branchName = this.bch.branchName;
  }

  createBranchForm() {
    this.branchForm = this.formBuilder.group({
      id: [''],
      Bnum: ['', Validators.required],
      Bname: ['', Validators.required]
    });
  }

  onSubmit() {
    debugger;
    if (this.bch == 0) {
      debugger;
      if (this.branchForm.valid) {
        const body: Branch = {
          branchid: this.branchForm.value.id,
          branchNum: this.branchForm.value.Bnum,
          branchName: this.branchForm.value.Bname
        }
        //this.branch = body;
        this.createBranchForm();

        this.UserService.addBranch(body)
          .subscribe((data: any) => {
            debugger
            if (data.Status == "success") {
              this.notifyService.showSuccess(data.Message)
              // alert(data.Message);
            }
            if (data.Status == "empty") {
              this.notifyService.showWarning(data.Message)
              alert(data.Message);
            }
          })
      }
    }
    else {
      if (this.branchForm.valid) {
        const body: Branch = {
          branchid: this.bch.branchid,
          branchNum: this.branchForm.value.Bnum,
          branchName: this.branchForm.value.Bname
        }
        this.UserService.updateBranch(body).subscribe((data: any) => {
          debugger;
          if (data.Status == "success") {
            this.notifyService.showSuccess(data.Message);
            this.branchlistcomp.closeClick();
            // location.reload();
            // alert(data.Message);
          }
        })
      }
    }
  }
}
