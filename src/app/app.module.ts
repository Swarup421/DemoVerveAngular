import { ConfirmationDialougeComponent } from './confirmation-dialouge/confirmation-dialouge.component';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { BranchComponent } from './branch/branch.component';
import { AddEditBranchComponent } from './branch/add-edit-branch/add-edit-branch.component';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { AccountComponent } from './account/account.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AddEditAccountComponent } from './account/add-edit-account/add-edit-account.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { DoTransactionComponent } from './transaction/do-transaction/do-transaction.component';
import { NavbarViewComponent } from './home/navbar-view/navbar-view.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { //MarkAsteriskDirective,
  MarkAsteriskDirectiveModule
} from './directive/mark-asterisk.directive';
// import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SortDirective } from './directive/sort.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CarouselComponent } from './carousel/carousel.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { BrowserModule } from '@angular/platform-browser';
// import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
// import {} from '@ng-bootstrap/ng-bootstrap'
import { MatSortModule } from '@angular/material/sort';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    BranchComponent,
    AddEditBranchComponent,
    BranchListComponent,
    AccountComponent,
    AccountListComponent,
    TransactionComponent,
    TransactionListComponent,
    DoTransactionComponent,
    NavbarViewComponent,
    UserDetailsComponent,
    AddEditAccountComponent,
    ConfirmationDialougeComponent,
    SortDirective,
    CarouselComponent,
    SidebarComponent,
    // conf

    //MarkAsteriskDirective,npm i ng-angular-popup

  ],
  imports: [
    MatSortModule,
    NgxPaginationModule,
    NgxPhotoEditorModule,
    NgToastModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    // FormsModule
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' //set defaults here
    }),
    ImageCropperModule,
  ],
  
  // imports: [
  //   // NgbModule,
  //   FormsModule,
  //   Ng2SearchPipeModule,
  //   // NgbModule,
  //   NgxPaginationModule,
  //   NgxUiLoaderModule,
  //   NgxUiLoaderHttpModule.forRoot({
  //     showForeground: true
  //   }),
  //   ToastrModule.forRoot(),
  //   BrowserModule,
  //   BrowserAnimationsModule,
  //   FormsModule,
  //   //AppRoutingModule,
  //   HttpClientModule,
  //   ReactiveFormsModule,
  //   RouterModule.forRoot(routes),
  //   MarkAsteriskDirectiveModule,
  //   ConfirmationPopoverModule.forRoot({
  //     confirmButtonType: 'danger' //set defaults here
  //   }),
  //   // NgToastModule
  // ],
  
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }