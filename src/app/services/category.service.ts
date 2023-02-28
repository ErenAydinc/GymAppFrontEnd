import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { ListResponseModel } from "../models/listResponseModel";
import { API_URL } from "./global";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories(page:number,pageSize:number):Observable<ListResponseModel<Category>>{
    return this.http.get<ListResponseModel<Category>>(API_URL+"Categories/GetList?"+"Page="+page+"&"+"PageSize="+pageSize);
  }

  createCategory(name:string){
    return this.http.post<any>(API_URL+"Categorys/Create",{name})
  }

  updateCategory(category:Category){
    return this.http.put<any>(API_URL+"Categorys/Update",{category})
  }
  deleteCategory(id:number){
    return this.http.delete<any>(API_URL+"Categorys/Delete",{body:id})
  }
}
