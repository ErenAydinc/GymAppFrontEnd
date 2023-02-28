import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { API_URL } from './global';
import { Movement, PersonalTrainer, Student } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private http:HttpClient) { }


  getListPersonalTrainer(page:number,pageSize:number):Observable<ListResponseModel<PersonalTrainer>>{
    return this.http.get<ListResponseModel<PersonalTrainer>>(API_URL+"Commons/GetListPersonalTrainer?"+"Page="+page+"&"+"PageSize="+pageSize)
  }

  getListStudent(page:number,pageSize:number):Observable<ListResponseModel<Student>>{
    return this.http.get<ListResponseModel<Student>>(API_URL+"Commons/GetListStudent?"+"Page="+page+"&"+"PageSize="+pageSize)
  }

  getListMovement():Observable<ListResponseModel<Student>>{
    return this.http.get<ListResponseModel<Movement>>(API_URL+"Commons/GetListMovement?"+"Page="+1+"&"+"PageSize="+1000)
  }
  
}
