import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Console } from 'console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router ) { }

  data: any = localStorage.getItem('userDetail');
  //dataConvert = JSON.parse(this.data)

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.data != null) {
      //console.log(this.dataConvert)
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}