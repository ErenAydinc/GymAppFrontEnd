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
import { Movement } from 'src/app/models/common';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-users-movements',
  templateUrl: './users-movements-list.component.html',
  styleUrls: ['./users-movements-list.component.scss'],
})
export class UsersMovementsListComponent implements OnInit {
  @Output() userId: number;
  userName: string;
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 20, 50, 100];
  usersMovements: UsersMovementsDto[] = [];
  usersMovement: UsersMovements;
  updateStudentsMovementForm: FormGroup;
  days=7

  constructor(
    private usersMovementsService: UsersMovementsService,
    private commonsService: CommonsService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.bindValue = 'value';
  }

  ngOnInit(): void {
      (this.updateStudentsMovementForm = this.formBuilder.group({
        movementId: ['', Validators.required],
        repetitionNumber: [0, Validators.required],
        setNumber: [0, Validators.required],
        weight : [0],
      }));
      this.activatedRoute.params.subscribe((params) => {
        this.userId = params['studentId'];
      }),
      console.log(this.days)
  }


  usersMovementsBySelectedDay: UsersMovementsDto[] = [];
  usersMovementsIsLoaded = false;
  getUsersMovementsBySelectedDay(userId: number, selectDay?: number) {
      this.usersMovementsService
        .getUsersMovementsByUserIdAndSelectedDay(
          this.page,
          this.pageSize,
          this.userId,
          selectDay
        )
        .subscribe((res) => {
          this.usersMovementsBySelectedDay = res.items;
          this.userId = userId;
          this.usersMovementsIsLoaded = true;
          if (res.items.length > 0) {
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
      this.selectedMovement = res.movementId;
      this.getUserMovementByIdIsLoaded = true;
    });
  }

  get f() {
    return this.updateStudentsMovementForm.controls;
  }

  updateStudentsMovement(id: number, userId: number) {
    this.usersMovementsService
      .usersMovementsUpdate(
        id,
        userId,
        this.f.movementId.value,
        this.f.setNumber.value,
        this.f.repetitionNumber.value,
        this.f.weight.value
      )
      .subscribe((res) => {
        this.toast.info('Güncellendi');
        this.getUsersMovementsBySelectedDay(userId);
      });
  }
  movements: Movement[] = [];
  getMovements() {
    this.commonsService.getListMovement().subscribe((res) => {
      this.movements = res.items;
      console.log(res.items);
    });
  }

  deleteStudentsMovement(id: number) {
    this.usersMovementsService.usersMovementsDelete(id).subscribe((res) => {
      this.getUsersMovementsBySelectedDay(this.userId!);
      this.toast.info('Hareket Silindi');
    });
  }
}
