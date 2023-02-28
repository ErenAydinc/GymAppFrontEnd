import { MovementListComponent } from './../movement-list/movement-list.component';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovementService } from 'src/app/services/movement.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movement-create',
  templateUrl: './movement-create.component.html',
  styleUrls: ['./movement-create.component.scss']
})
export class MovementCreateComponent implements OnInit {

createMovementForm:FormGroup
constructor(private movementService:MovementService,private formBuilder:FormBuilder,private toast:ToastrService,private movementListComponent:MovementListComponent){}

ngOnInit(): void {
  this.createMovementForm = this.formBuilder.group({
    name: ['', Validators.required]
  });
}
get f() { return this.createMovementForm.controls; }

create(){
  if(this.createMovementForm.invalid) {
    return;
  }

  this.movementService.createMovement(this.f.name.value)
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

}
