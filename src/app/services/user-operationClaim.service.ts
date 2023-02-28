import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";
import { ListUserOperationClaim, UserOperationClaim } from "../models/user-OperationClaim";
import { API_URL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(private http:HttpClient) { }

  getUserOperationClaims(page:number,pageSize:number=20):Observable<ListResponseModel<UserOperationClaim>>{
    return this.http.get<ListResponseModel<UserOperationClaim>>(API_URL+"UserOperationClaims/GetList?"+"Page="+page+"&"+"PageSize="+pageSize);
  }

  createUserOperationClaim(userId:number,operationClaimIds:number[]){
    return this.http.post<any>(API_URL+"UserOperationClaims/Create",{userId,operationClaimIds})
  }

  updateUserOperationClaim(useroperationclaim:UserOperationClaim){
    return this.http.put<any>(API_URL+"UserOperationClaims/Update",{useroperationclaim})
  }
  deleteUserOperationClaim(id:number){
    return this.http.delete<any>(API_URL+"UserOperationClaims/Delete",{body:id})
  }

  getUserOperationClaimsByUserId(page:number,pageSize:number,userId:number):Observable<ListResponseModel<ListUserOperationClaim>>{
    return this.http.get<ListResponseModel<ListUserOperationClaim>>(API_URL+"UserOperationClaims/GetByUserId?"+"Page="+page+"&"+"PageSize="+pageSize+"&"+"UserId="+userId);
  }

}
