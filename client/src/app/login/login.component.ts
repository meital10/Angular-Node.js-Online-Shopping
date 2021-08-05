import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { send } from 'process';


// const LOGINURL = 'http://localhost:4000/auth/login';
// const LOGINURL = '/auth/login';
// const LOGINURL = 'api/auth/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog,private userService:UserService) {
    this.router = router;
  }

  @ViewChild('dialogAlert') dialogAlert: TemplateRef<any>;

  emailValue = '';
  passwordValue = '';
  userError = false;
  hide = true;

  opendialogAlert() {
    this.dialog.open(this.dialogAlert);
  }

  logIn() {
    this.userError = false;

    if (this.emailValue && this.passwordValue) {
      this.userService.getUserLogin(this.emailValue,this.passwordValue).subscribe((itemUser)=>{
        this.router.navigate(['/shopping']);
        this.emailValue = '';
        this.passwordValue = '';
      },(error)=>{
        this.userError = true;
        this.opendialogAlert();
      
      })
        
      
    }
    else {
      this.opendialogAlert();
    }
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

 

  ngOnInit(): void {

  }
}