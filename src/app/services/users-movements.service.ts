import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { UsersMovements, UsersMovementsDto } from '../models/usersMovements';
import { API_URL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsersMovementsService {

  constructor(private http:HttpClient) { }


  getUsersMovementsByUserId(page:number,pageSize:number,userId:number):Observable<ListResponseModel<UsersMovementsDto>>{
    return this.http.get<ListResponseModel<UsersMovementsDto>>(API_URL+"UsersMovements/GetListByUserId?"+"Page="+page+"&"+"PageSize="+pageSize+"&"+"userId="+userId)
  }
  getUsersMovementById(id:number){
    return this.http.get<UsersMovements>(API_URL+"UsersMovements/GetById/"+id)
  }

  usersMovementsCreate(userId:number,movementId:number,setNumber:number,repetitionNumber:number,weight?:number,isMonday?:boolean,isTuesday?:boolean,isWednesday?:boolean,isThursday?:boolean,isFriday?:boolean,isSaturday?:boolean,isSunday?:boolean){
     return this.http.post<any>(API_URL+"UsersMovements/Create",{userId,movementId,setNumber,repetitionNumber,weight,isMonday,isTuesday,isWednesday,isThursday,isFriday,isSaturday,isSunday})
  }
  usersMovementsDelete(id:number){
    return this.http.delete<any>(API_URL+"UsersMovements/Delete",{body:{id:id}})
  }
  usersMovementsUpdate(id:number,userId:number,movementId:number,setNumber:number,repetitionNumber:number){
    return this.http.put<any>(API_URL+"UsersMovements/Update",{id,userId,movementId,setNumber,repetitionNumber})
  }

  getUsersMovementsByUserIdAndSelectedDay(page:number,pageSize:number,userId?:number,selectedDay?:number):Observable<ListResponseModel<UsersMovementsDto>>{
    return this.http.get<ListResponseModel<UsersMovementsDto>>(API_URL+"UsersMovements/GetListByUserIdAndSelectedDay?"+"Page="+page+"&"+"PageSize="+pageSize+"&"+"userId="+userId+"&"+"selectedDay="+selectedDay)
  }
  
}
