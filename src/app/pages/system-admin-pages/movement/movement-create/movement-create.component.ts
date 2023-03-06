import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovementService } from 'src/app/services/movement.service';
import { first } from 'rxjs/operators';
import { MovementListComponent } from '../movement-list-manage/movement-list.component';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-movement-create',
  templateUrl: './movement-create.component.html',
  styleUrls: ['./movement-create.component.scss']
})
export class MovementCreateComponent implements OnInit {

createMovementForm:FormGroup
constructor(private movementService:MovementService,private formBuilder:FormBuilder,private toast:ToastrService,private movementListComponent:MovementListComponent,private categoryService:CategoryService){}

ngOnInit(): void {
  this.getListCategories();
  this.createMovementForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    categoryId:[0]
  });
}
get f() { return this.createMovementForm.controls; }
selectedCategory:number;
create(){
  if(this.createMovementForm.invalid) {
    return;
  }
  this.selectedCategory
  this.movementService.createMovement(this.f.name.value,this.f.description.value,this.selectedCategory)
    .pipe(first())
    .subscribe(
      data => {
        this.toast.success("Başarılı")
        console.log(data)
        this.createMovementForm.reset()
        this.movementListComponent.getMovements(0)
      },
      error => {
         this.toast.error("Başarısız")
      }
    );
}


categories:Category[]=[]
categoryIsLoaded=false
getListCategories(){
  this.categoryService.getCategories(1,50).subscribe((res)=>{
    this.categories=res.items
    console.log(res.items)
    this.categoryIsLoaded=true
  })
}

}
