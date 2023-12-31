import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { ToasterService } from '../services/toaster.service';
@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css'],
})
export class UpdateAdminComponent implements OnInit {
  profileImage: string = './assets/images/People.png';
  editAdminStatus: boolean = false;
  adminDetails: any = {};
  @Output() onAdminChange= new EventEmitter()
  constructor(private api: AdminApiService, private toaster: ToasterService) {}
  ngOnInit(): void {
    // get admin details
    this.api.authenticate().subscribe((res: any) => {
      this.adminDetails = res;
      if (res.picture) {
        this.profileImage = res.picture;
      }
    });
  }
  editAdmin() {
    this.editAdminStatus = true;
  }
  getFile(event: any) {
    let file = event.target.files[0];
    console.log(file);
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      this.profileImage = event.target.result;
      this.adminDetails.picture = this.profileImage;
    };
  }

  updateAdmin() {
    this.api.updateAdmin(this.adminDetails).subscribe({
      next: (res: any) => {
        this.toaster.showSuccess('Admin details updated succesfully');
        this.onAdminChange.emit(res.name)
        // save admin details updated to local storage
        localStorage.setItem('admin_name', res.name);
        localStorage.setItem('admin_password', res.password);
        this.editAdminStatus = false;
      },
      error: (err: any) => {
        this.toaster.showError('Updation failed !');
      },
    });
  }
  cancel(){
    this.editAdminStatus=false;
  }
}
