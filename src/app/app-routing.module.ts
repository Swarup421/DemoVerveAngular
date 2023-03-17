import { AuthGuard } from './auth/auth.guard';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountComponent } from './account/account.component';
import { BranchComponent } from './branch/branch.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [

  {path: 'details', component: UserDetailsComponent, canActivate:[AuthGuard]},

  {path: 'transaction', component: TransactionComponent, canActivate:[AuthGuard]},

  {path: 'account', component: AccountComponent, canActivate:[AuthGuard]},

  { path:'branch', component: BranchComponent, canActivate:[AuthGuard]},

  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  
  { path: 'register', component: UserComponent,
  children: [{path: '', component: SignUpComponent}]
  },
  { path: 'login', component: UserComponent,
  children: [{path: '', component: SignInComponent}]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
