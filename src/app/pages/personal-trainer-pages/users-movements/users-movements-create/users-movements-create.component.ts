import { UsersMovementsListComponent } from './../users-movements-list/users-movements-list.component';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersMovementsService } from 'src/app/services/users-movements.service';
import { ActivatedRoute } from '@angular/router';
import { MovementService } from 'src/app/services/movement.service';
import { Movement } from 'src/app/models/movement';

@Component({
  selector: 'app-users-movements-create',
  templateUrl: './users-movements-create.component.html',
  styleUrls: ['./users-movements-create.component.scss'],
})
export class UsersMovementsCreateComponent implements OnInit {
  createUsersMovementForm: FormGroup;
 @Input() userId:number
  constructor(
    private formBuilder: FormBuilder,
    private usersMovementsService: UsersMovementsService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private movementService:MovementService,
    private usersMovementListComponent:UsersMovementsListComponent
  ) {}

  ngOnInit(): void {
    this.createUsersMovementForm = this.formBuilder.group({
      movementId: [0, Validators.required],
      setNumber: [0, Validators.required],
      repetitionNumber: [0, Validators.required],
      weight:[0,Validators.required],
      isMonday:[Boolean],
      isTuesday:[Boolean],
      isWednesday:[Boolean],
      isThurday:[Boolean],
      isFriday:[Boolean],
      isSaturday:[Boolean],
      isSunday:[Boolean]
    });
  }

  movements:Movement[]=[]
  selectedMovement:number
  getMovements(){
    this.movementService.getMovements(0,1,100).subscribe((res)=>{
      this.movements=res.items
      console.log(this.userId)
    })
  }

  get f() {
    return this.createUsersMovementForm.controls;
  }

  checkedDay:number
  setCheckedDay(checkedDayIndex:number){
      this.checkedDay=checkedDayIndex
      console.log(checkedDayIndex)
  }

  create() {
    if (this.createUsersMovementForm.invalid) {
      return;
    }

    this.usersMovementsService
      .usersMovementsCreate(
        this.userId,
        this.f.movementId.value,
        this.f.setNumber.value,
        this.f.repetitionNumber.value,
        this.f.weight.value,
        this.checkedDay==1?true:false,
        this.checkedDay==2?true:false,
        this.checkedDay==3?true:false,
        this.checkedDay==4?true:false,
        this.checkedDay==5?true:false,
        this.checkedDay==6?true:false,
        this.checkedDay==7?true:false,
      )
      .subscribe(
        (res) => {
          this.usersMovementListComponent.getUsersMovementsBySelectedDay(this.userId);
          this.toast.success('Öğrenciye Hareket Atandı');
        },
        (error) => {
          this.toast.error('Öğrenciye hareket atanamadı');
        }
      );
  }

  
}
