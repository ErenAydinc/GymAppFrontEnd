import { Category } from './../../../../models/category';
import { MovementImageService } from './../../../../services/movement-image.service';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { catchError, first, map } from 'rxjs/operators';
import { Movement } from 'src/app/models/movement';
import { MovementService } from 'src/app/services/movement.service';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.scss']
})
export class MovementListComponent implements OnInit {

  
  movements: Movement[] = [];
  categories:Category[]=[];
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 20, 50, 100];
  newUser: any;
  categoryId=0
  imageBasePath="https://localhost:44370"

  movementCategoryRequestForm:FormGroup;
  createMovementForm: UntypedFormGroup;
  createMovementImageForm: UntypedFormGroup;
  constructor(private movementService: MovementService,private movementImageService:MovementImageService,private formBuilder: UntypedFormBuilder,private toast:ToastrService,private categoryService:CategoryService) {}



  ngOnInit(): void {
    this.getMovements();
    this.getCategories();
    this.movementCategoryRequestForm=this.formBuilder.group({
      categoryId : [0]
    })
    this.createMovementForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }


  get f() { return this.createMovementForm.controls; }
  
  get movementCategoryIdRequest() {return this.movementCategoryRequestForm.controls;}

 
  getMovements(categoryId:number=0) {
    console.log(categoryId)
    this.movementService.getMovements(categoryId,this.page, this.pageSize).subscribe((res) => {
      this.movements = res.items;
      this.count = res.count;
      console.log(res.items);
    });
  }

  getCategories(){
    this.categoryService.getCategories(1,30).subscribe((res)=>{
      this.categories=res.items;
      console.log(res.items);
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getMovements(this.categoryId);
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    console.log(this.pageSize);
    this.page = 1;
    this.getMovements(this.categoryId);
  }

/// Movement-Image-Create

myFiles:string [] = [];
  
myForm = new FormGroup({
 file: new FormControl('', [Validators.required])
});
get form(){
  return this.myForm.controls;
}

onFileChange(event:any) {
   
  for (var i = 0; i < event.target.files.length; i++) { 
      this.myFiles.push(event.target.files[i]);
  }
}


submit(movementId:number){
  const formData = new FormData();
  for (var i = 0; i < this.myFiles.length; i++) { 
    formData.append("MovementImage", this.myFiles[i]);
    formData.append("MovementId",movementId.toString())
  }
  this.movementImageService.createMovementImage(formData).subscribe(res=>{
    this.myForm.reset()
  })
  this.getMovements(this.categoryId)
}



}

