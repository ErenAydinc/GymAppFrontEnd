import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './global';

@Injectable({
  providedIn: 'root'
})
export class MovementImageService {

  constructor(private http:HttpClient) { }


  createMovementImage(formDatas:any){
    return this.http.post<any>(API_URL+"MovementImages/Create",formDatas,{reportProgress:true})
  }
}
