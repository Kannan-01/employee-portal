import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../Modules/users/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selected: Date | null = new Date();
  showSidebar: boolean = true;
  admin: string = '';
  empCount: number = 0;
  constructor(private api: UserApiService,private router:Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('admin_name')) {
      this.admin = localStorage.getItem('admin_name') || '';
    }
    this.getTotalEmpCount()
  }
  menuClick() {
    this.showSidebar = !this.showSidebar;
  }
  getTotalEmpCount() {
    this.api.getAllUserAPI().subscribe((res: any) => {
      this.empCount = res.length;
    });
  }
  logout(){
    localStorage.removeItem("admin_name")
    localStorage.removeItem("admin_password")
    this.router.navigateByUrl("")
  }
  getUpdatedAdmin(event:any){
    this.admin=event
  }
}
