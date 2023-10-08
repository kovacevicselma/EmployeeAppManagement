import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl="http://localhost:52871/api";
readonly PhotoUrl="http://localhost:52871/Photos";

  constructor(private http:HttpClient) { }
  //department
  getDepList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Department');
  }
  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/Department',val);
  }
  updatedDepartment(val:any){
    return this.http.put(this.APIUrl+'/Department',val);
  }
  deleteDepartment(departmentId: number): Observable<any> {
    return this.http.delete(`${this.APIUrl}/Department/${departmentId}`);
  }
  //employee
  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee');
  }
  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/Employee',val);
  }
  updateEmployee(val:any){
    return this.http.put(this.APIUrl+'/Employee',val);
  }
  deleteEmployee(employeeId:number): Observable<any>{
    return this.http.delete(`${this.APIUrl}/Employee/${employeeId}`)
  }
  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/Employee/SaveFile',val);
  }
  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Employee/GetAllDepartmentNames');
  }
}
