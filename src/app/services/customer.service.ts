import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { Customer } from "../models/customer";
import { ListResponseModel } from "../models/listResponseModel";
import { API_URL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

 getCustomerList(page:number,pageSize:number):Observable<ListResponseModel<Customer>>{
  return this.http.get<ListResponseModel<Customer>>(API_URL+"Customers/GetList?Page="+page+"&"+"PageSize="+pageSize)
 }

 getCustomerById(id:number){
  return this.http.get<Customer>(API_URL+"Customers/GetById/"+id)
 }

 create(name:string,email:string,phoneNumber:string){
  return this.http.post<any>(API_URL+"Customers/Create",{name,email,phoneNumber})
 }

 update(id:number,name:string,email:string,phoneNumber:string){
  return this.http.put<any>(API_URL+"Customers/Update",{id,name,email,phoneNumber})
 }

 delete(id:number){
  return this.http.delete<any>(API_URL+"Customers/Delete",{body:id})
 }


}
