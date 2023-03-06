import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";
import { Movement } from "../models/movement";
import { API_URL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http:HttpClient) { }

  getMovements(categoryId:number,page:number,pageSize:number):Observable<ListResponseModel<Movement>>{
    return this.http.get<ListResponseModel<Movement>>(API_URL+"Movements/GetList?"+"Page="+page+"&"+"PageSize="+pageSize+"&"+"CategoryId="+categoryId);
  }

  createMovement(name:string,description:string,categoryId:number){
    return this.http.post<any>(API_URL+"Movements/Create",{name,description,categoryId})
  }

  updateMovement(movement:Movement){
    return this.http.put<any>(API_URL+"Movements/Update",{movement})
  }
  deleteMovement(id:number){
    return this.http.delete<any>(API_URL+"Movements/Delete",{body:id})
  }
}
