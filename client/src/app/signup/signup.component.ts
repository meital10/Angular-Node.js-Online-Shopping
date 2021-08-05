import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { MustMatch } from '../utils/validators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog, private userService:UserService,private formBuilder:FormBuilder) {
 
  }

  passwordHide:boolean = true;
  confirmHide: boolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild('dialogAlert') dialogAlert: TemplateRef<any>;


  opendialogAlert() {
    this.dialog.open(this.dialogAlert);
  }



  signUp() {

    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.userService.signUpUser(this.firstFormGroup.get('userIdValue').value,
      this.firstFormGroup.get('emailValue').value,
      this.firstFormGroup.get('passwordValue').value,
      this.secondFormGroup.get('cityValue').value,
      this.secondFormGroup.get('streetValue').value,
      this.secondFormGroup.get('firstNameValue').value,
      this.secondFormGroup.get('lastNameValue').value).subscribe((itemUser)=>{
        console.log(itemUser);
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
      
        this.router.navigate(['/login']);
       
      },(err)=>{
        console.log(err);
       
       if(err.error.keyPattern.email == 1){
        this.errorMessage = `This email ${err.error.keyValue.email} already exists!`;
       }
       this.opendialogAlert();
      })
    }
  }
  errorMessage:string ='Something happened please try again';

  get form1() { return this.firstFormGroup.controls; }
  get form2() { return this.secondFormGroup.controls; }
  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      userIdValue: ['', [Validators.required,Validators.maxLength(9)]],
      emailValue: ['', [Validators.required, Validators.email]],
      passwordValue: ['', Validators.required],
      confirmPasswordValue: ['', Validators.required]
    },{
      validator: MustMatch('passwordValue', 'confirmPasswordValue')
  }
  );
    this.secondFormGroup = this.formBuilder.group({
      cityValue: ['', Validators.required],
      streetValue: ['', Validators.required],
      firstNameValue: ['', Validators.required],
      lastNameValue: ['', Validators.required]
          
    });

  }
}