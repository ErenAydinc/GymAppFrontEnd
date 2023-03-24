import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';
import { API_URL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserById(id:number){
    return this.http.get<User>(API_URL+"Users/GetById/"+id)
  }

  getStudents(page:number=1,pageSize:number=10,searchFirstName?:string|null,searchLastName?:string|null,status?:boolean):Observable<ListResponseModel<User>>{
    return this.http.get<ListResponseModel<User>>(API_URL+"Users/GetStudentList?"+"Page="+page+"&"+"PageSize="+pageSize+"&"+"searchFirstName="+searchFirstName+"&"+"searchLastName="+searchLastName+"&status="+status);
  }

  createUser(email:string|null =null,password:string|null =null,firstName:string|null =null,lastName:string|null =null,customerId:number|null,type:number,status:boolean,memberStartDate:string|null,memberEndDate:string|null){
    return this.http.post<any>(API_URL+"Users/Create",{email,password,firstName,lastName,customerId,type,status,memberStartDate,memberEndDate})
  }

  deleteUser(userId:number):Observable<any>{
    console.log("servis")
    return this.http.delete<any>(API_URL+"Users/Delete",{body:{id:userId}})
  }

  updateUser(id:number,email:string,firstName:string,lastName:string,status:boolean,type:number,memberStartDate:string,memberEndDate:string){
    console.log(id)
    return this.http.put<any>(API_URL+"Users/Update",{id,email,firstName,lastName,status,type,memberStartDate,memberEndDate})
  }

  getPersonalTrainers(page:number=1,pageSize:number=10,searchFirstName?:string|null,searchLastName?:string|null):Observable<ListResponseModel<User>>{
    return this.http.get<ListResponseModel<User>>(API_URL+"Users/GetPersonalTrainerList?"+"Page="+page+"&"+"PageSize="+pageSize+"&"+"searchFirstName="+searchFirstName+"&"+"searchLastName="+searchLastName);
  }
}
