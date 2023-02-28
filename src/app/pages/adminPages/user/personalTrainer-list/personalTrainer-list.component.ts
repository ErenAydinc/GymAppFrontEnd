import { ToastrService } from 'ngx-toastr';
import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimService } from 'src/app/services/operationClaim.service';
import { UserOperationClaimService } from 'src/app/services/user-operationClaim.service';
import {
  ListUserOperationClaim,
  UserOperationClaim,
} from 'src/app/models/user-OperationClaim';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personalTrainer-list',
  templateUrl: './personalTrainer-list.component.html',
  styleUrls: ['./personalTrainer-list.component.scss'],
})
export class PersonalTrainerListComponent implements OnInit {
  @Output() userId: number;
  users: User[] = [];
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  user: User;
  tableSizes: any = [10, 20, 50, 100];
  isLoaded = false;
  isLoadedByGetPersonalTrainer = false;

  updatePersonalTrainerForm: FormGroup;

  constructor(
    private store: Store,
    private userService: UserService,
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  // users$=this.store.pipe(select(selectUsers));
  ngOnInit(): void {
    this.getPersonalTrainers();
    this.updatePersonalTrainerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      type: [2, Validators.required],
    });
  }

  getStudentsForm = new FormGroup({
    searchFirstName: new FormControl(null),
    searchLastName: new FormControl(null),
  });

  getPersonalTrainers() {
    //  this.store.dispatch(invokeUsersAPI())

    this.userService
      .getPersonalTrainers(
        this.page,
        this.pageSize,
        this.getStudentsForm.value.searchFirstName
          ? this.getStudentsForm.value.searchFirstName
          : null,
        this.getStudentsForm.value.searchLastName
          ? this.getStudentsForm.value.searchLastName
          : null
      )
      .subscribe((res) => {
        this.users = res.items;
        this.count = res.count;

        console.log(res.items);
        this.isLoaded = true;
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPersonalTrainers();
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    console.log(this.pageSize);
    this.page = 1;
    this.getPersonalTrainers();
  }

  deletePersonalTrainer(id: number) {
    this.userService.deleteUser(id).subscribe(
      (resp) => {
        this.toast.info('Personal Trainer silindi');
        this.getPersonalTrainers();
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  //#region Personal Trainer Update

  get f() {
    return this.updatePersonalTrainerForm.controls;
  }

  getPersonalTrainer(userId: number) {
    this.userService.getUserById(userId).subscribe((res) => {
      this.user = res;
      this.isLoadedByGetPersonalTrainer = true;
      console.log(this.user)
    });
  }

  update(userId: number) {
    if (this.updatePersonalTrainerForm.invalid) {
      return;
    }

    this.userService
      .updateUser(
        userId,
        this.f.email.value,
        this.f.firstName.value,
        this.f.lastName.value,
        true,
        2,
        this.user.memberStartDate,
        this.user.memberEndDate
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.toast.success('Personal trainer güncellendi');
          this.getPersonalTrainers();
        },
        (error) => {
          this.toast.error('Personal trainer güncellenemedi');
        }
      );
  }
  //#endregion

  //#region Operation Claim
  operationClaims: OperationClaim[] = [];
  getOperationClaims() {
    this.operationClaimService.getOperationClaims(1, 50).subscribe((res) => {
      this.operationClaims = res.items;
      console.log(res.items);
    });
  }

  //#endregion

  //#region UserOperationClaim
  selectedOperationCalim: any = [];
  userOperationClaims: ListUserOperationClaim[] = [];
  isUserOperationClaimsLoaded=false
  getUserOperationClaims(userId: number) {
    this.userOperationClaimService
      .getUserOperationClaimsByUserId(1, 20, userId)
      .subscribe((res) => {
        this.userOperationClaims = res.items;
        console.log(this.userOperationClaims);
        this.isUserOperationClaimsLoaded=true
      });
  }

  setCheckbox(event: any, index: number) {
    if (!this.selectedOperationCalim.includes(event)) {
      this.selectedOperationCalim = [...this.selectedOperationCalim, event];
    } else {
      this.selectedOperationCalim = this.selectedOperationCalim.filter(
        (item: any) => item !== event
      );
    }
    console.log(this.selectedOperationCalim);
  }

  saveOptions() {
    console.log(this.selectedOperationCalim);
  }

  addUserOperationClaim(userId: number) {
    this.userOperationClaimService
      .createUserOperationClaim(userId, this.selectedOperationCalim)
      .subscribe(
        (res) => {
          this.toast.info('Personal Trainer Rolü güncellendi');
        },
        (error) => {
          this.toast.info('Personal Trainer Rolü Güncellendi');
        }
      );
  }

  //#endregion
}
