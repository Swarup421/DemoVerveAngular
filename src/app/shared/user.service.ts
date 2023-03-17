import { Transaction } from './transaction.model';
import { Account } from './account.model';
import { Branch } from './branch.model';
import { NgForm } from '@angular/forms';
import { Login } from './login.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import 'rxjs/internal/operators/map';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //readonly rootUrl = 'https://localhost:44324';

  constructor(private http: HttpClient) { }

  registerUser(userForm:any, fileToUpload: any) {
    debugger;
    // return this.http.post(environment.rootUrl + '/api/BankApi/ImgUpload_register', user);
    const endpoint = environment.rootUrl + '/api/BankApi/ImgUpload_register';
    if(fileToUpload != null){
      const formData: FormData = new FormData();
      debugger;
      formData.append('firstName', userForm.value.firstName);
      formData.append('lastName', userForm.value.lName);
      formData.append('mobile', userForm.value.mobileNo);
      formData.append('address', userForm.value.address);
      formData.append('email', userForm.value.email);
      formData.append('password', userForm.value.password);
      formData.append('Image', fileToUpload, fileToUpload.name);
      return this.http.post(endpoint, formData);
    }
    else{
      const formData: FormData = new FormData();
      debugger;
      formData.append('firstName', userForm.value.firstName);
      formData.append('lastName', userForm.value.lName);
      formData.append('mobile', userForm.value.mobileNo);
      formData.append('address', userForm.value.address);
      formData.append('email', userForm.value.email);
      formData.append('password', userForm.value.password);
      return this.http.post(endpoint, formData);
    }
  }

  UpdateImage(id: any, file2upload: any){
    debugger;
    const endpoint = environment.rootUrl + '/api/BankApi/ImgUpdate';
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('Image', file2upload, file2upload.name)
    return this.http.post(endpoint, formData);
  }
  // registerUser(user: User){
  //   environment.rootUrl + '/api/BankApi/RegisterUser'
  // }
  getUserById(id: any): Observable<any[]> {
    debugger;
    return this.http.get<any>(environment.rootUrl + '/api/BankApi/getUserDataById/'+id);
  }

  UpdateUserPhoto(id: any, image: string){
    debugger;
    return this.http.put(environment.rootUrl + '/api/BankApi/BranchUpdateApi/',+id+image);
  }

  LoginUser(user: Login) {
    return this.http.post(environment.rootUrl + '/api/BankApi/LoginUser', user);
  }

  getBranchList(): Observable<any[]> {
    debugger;
    return this.http.get<any>(environment.rootUrl + '/api/BankApi/BranchListApi');
  }

  addBranch(branch: Branch) {
    return this.http.post(environment.rootUrl + '/api/BankApi/AddBranchApi', branch);
  }

  updateBranch(branch: Branch) {
    return this.http.put(environment.rootUrl + '/api/BankApi/BranchUpdateApi', branch);
  }

  deleteBranch(branch: Branch) {
    //debugger;
    return this.http.post(environment.rootUrl + '/api/BankApi/delBranchApi', branch);
  }

  getAccountList(): Observable<any[]> {
    return this.http.get<any>(environment.rootUrl + '/api/BankApi/AccountListApi');
  }

  getUserNameDropDown(): Observable<any[]> {
    debugger;
    return this.http.get<any>(environment.rootUrl + '/api/BankApi/UserNameDropDownApi');
  }

  addAccount(account: Account) {
    return this.http.post(environment.rootUrl + '/api/BankApi/AddAccountApi', account);
  }

  updateAccount(account: Account) {
    debugger;
    return this.http.put(environment.rootUrl + '/api/BankApi/AccountUpdateApi', account);
  }

  deleteAccount(account: Account) {
    return this.http.post(environment.rootUrl + '/api/BankApi/delAccountApi', account)
  }

  getTransactionList(): Observable<any[]> {
    return this.http.get<any>(environment.rootUrl + '/api/BankApi/TransactionListApi');
  }

  transaction(transaction: Transaction) {
    return this.http.post(environment.rootUrl + '/api/BankApi/TransactionApi', transaction);
  }  
}