import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges {
  user:any = {};
 
  constructor(private userService:UserService,private router:Router) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.userService.getCurrentUser().subscribe((data:any) => {
      this.user = data.user;
      
    })
 
  }


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data:any) => {
      this.user = data.user;
      
    })
  }
  logout(){
    this.userService.logout().subscribe((loggedout)=>{
      this.user = null;
      this.router.navigate(['/login']);
    });
    
    }


}
