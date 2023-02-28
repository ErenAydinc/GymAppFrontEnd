import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BodyInformation, BodyInformationDto } from "../models/bodyInformation";
import { Category } from "../models/category";
import { ListResponseModel } from "../models/listResponseModel";
import { API_URL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class BodyInformationService {

  constructor(private http:HttpClient) { }

  getBodyInformationByUserId(userId:number){
    return this.http.get<BodyInformationDto>(API_URL+"BodyInformations/GetByUserId/"+userId);
  }

  create(userId:number,length:number,weight:number,arm:number,shoulder:number,leg:number,chest:number){
    return this.http.post<any>(API_URL+"BodyInformations/Create",{userId,length,weight,arm,shoulder,leg,chest})
  }

  update(id:number,userId:number,length:number,weight:number,arm:number,shoulder:number,leg:number,chest:number){
    return this.http.put<any>(API_URL+"BodyInformations/Update",{id,userId,length,weight,arm,shoulder,leg,chest})
  }
}
