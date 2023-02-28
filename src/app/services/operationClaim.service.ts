import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";
import { OperationClaim } from "../models/operationClaim";
import { API_URL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  constructor(private http:HttpClient) { }

  getOperationClaims(page:number,pageSize:number=20):Observable<ListResponseModel<OperationClaim>>{
    return this.http.get<ListResponseModel<OperationClaim>>(API_URL+"OperationClaims/GetList?"+"Page="+page+"&"+"PageSize="+pageSize);
  }

  createOperationClaim(userId:number,operationClaimId:number){
    return this.http.post<any>(API_URL+"OperationClaims/Create",{userId,operationClaimId})
  }

  updateOperationClaim(operationclaim:OperationClaim){
    return this.http.put<any>(API_URL+"OperationClaims/Update",{operationclaim})
  }
  deleteOperationClaim(id:number){
    return this.http.delete<any>(API_URL+"OperationClaims/Delete",{body:id})
  }
}
