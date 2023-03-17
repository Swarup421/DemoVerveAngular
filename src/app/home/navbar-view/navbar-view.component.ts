import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.css']
})
export class NavbarViewComponent implements OnInit {

  constructor( private router: Router ) { }
  
  name: ""; 
  Userdata: any = localStorage.getItem('userDetail'); // json format 
  dataConvert = JSON.parse(this.Userdata)// convert it into object format

  getNameFromLocalStorage(){
    //console.log(this.dataConvert);
    this.name = this.dataConvert.fName;
  }

  ngOnInit(): void {
    this.getNameFromLocalStorage();
  }

  logOut() {
    localStorage.removeItem('userDetail');
    this.router.navigate(['/login']);
  }
}