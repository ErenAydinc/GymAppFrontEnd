import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListResponseModel } from '../models/listResponseModel';
import { PersonalTrainerStudent, PersonalTrainerStudentDto } from '../models/personalTrainerStudent';
import { User } from '../models/user';
import { API_URL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PersonalTrainerStudentService {

  constructor(private http:HttpClient) { }


  create(studentId:number,personalTrainerId:number){
    return this.http.post<any>(API_URL+"PersonalTrainerStudents/Create",{studentId,personalTrainerId})
  }

  getPersonalTrainerStudentByStudentId(studentId:number){
    return this.http.get<PersonalTrainerStudent>(API_URL+"PersonalTrainerStudents/GetByStudentId/"+studentId)
  }

  update(id:number,studentId:number,personalTrainerId:number){
    return this.http.put<any>(API_URL+"PersonalTrainerStudents/update",{id,studentId,personalTrainerId})
  }

  getPersonalTrainerStudentByPersonalTrainerId(page:number,pageSize:number,personalTrainerId:number):Observable<ListResponseModel<PersonalTrainerStudentDto>>{
    return this.http.get<ListResponseModel<PersonalTrainerStudentDto>>(API_URL+"PersonalTrainerStudents/GetListByPersonalTrainerId?Page="+page+"&"+"PageSize="+pageSize+"&"+"personalTrainerId="+personalTrainerId)
  }
}
