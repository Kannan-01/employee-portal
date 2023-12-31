import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  ServerURL = 'https://employee-server-ugrs.onrender.com';
  constructor(private http: HttpClient) {}
  authenticate() {
    // api call
   return this.http.get(`${this.ServerURL}/users/1`)
  }
  updateAdmin(admin:any){
    return this.http.put(`${this.ServerURL}/users/1`,admin)

  }
}
