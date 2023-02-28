import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, AfterViewInit, Output } from '@angular/core';
import { UsersMovementsService } from 'src/app/services/users-movements.service';
import {
  UsersMovements,
  UsersMovementsDto,
} from 'src/app/models/usersMovements';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { MovementService } from 'src/app/services/movement.service';
import { Movement } from 'src/app/models/common';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-users-movements',
  templateUrl: './users-movements-list.component.html',
  styleUrls: ['./users-movements-list.component.scss'],
})
export class UsersMovementsListComponent implements OnInit {
  @Output() userId: number;
  userName:string
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 20, 50, 100];
  usersMovements: UsersMovementsDto[] = [];
  usersMovement: UsersMovements;
  updateStudentsMovementForm: FormGroup;

  constructor(
    private usersMovementsService: UsersMovementsService,
    private commonsService:CommonsService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private config : NgSelectConfig,
  ) {
    this.config.notFoundText = 'Custom not found';
      // this.config.appendTo = 'body';
      // set the bindValue to global config when you use the same 
      // bindValue in most of the place. 
      // You can also override bindValue for the specified template 
      // by defining `bindValue` as property
      // Eg : <ng-select bindValue="some-new-value"></ng-select>
      this.config.bindValue = 'value';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['studentId']) {
        this.getUsersMovements(params['studentId']);
      }
    }),
      (this.updateStudentsMovementForm = this.formBuilder.group({
        movementId: ['', Validators.required],
        repetitionNumber:[0,Validators.required],
        setNumber:[0,Validators.required]
      }));
  }

  getUsersMovements(userId: number) {
    this.usersMovementsService
      .getUsersMovementsByUserId(this.page, this.pageSize, userId)
      .subscribe((res) => {
        this.usersMovements = res.items;
        this.userId=userId
        console.log(res.items);
        if (res.items.length>0) {
          this.userName = res.items[0].userName;  
        }
      });
  }
  selectedMovement: number;
  getUserMovementByIdIsLoaded = false;
  getUsersMovementById(id: number) {
    this.usersMovementsService.getUsersMovementById(id).subscribe((res) => {
      this.usersMovement = res;
      console.log(res);
      this.selectedMovement=res.movementId
      this.getUserMovementByIdIsLoaded = true;
    });
  }

  get f() {
    return this.updateStudentsMovementForm.controls;
  }

  

  updateStudentsMovement(id: number, userId: number) {
    this.usersMovementsService
      .usersMovementsUpdate(id, userId, this.f.movementId.value,this.f.setNumber.value,this.f.repetitionNumber.value)
      .subscribe((res) => {
        this.toast.info('Güncellendi');
        this.getUsersMovements(userId);
      });
  }
movements:Movement[]=[]
  getMovements(){
    this.commonsService.getListMovement().subscribe((res)=>{
          this.movements=res.items
          console.log(res.items)
    })
  }


  deleteStudentsMovement(id:number){
     this.usersMovementsService.usersMovementsDelete(id).subscribe((res)=>{
      this.getUsersMovements(this.userId);
      this.toast.info("Hareket Silindi")
     })
  }
}
