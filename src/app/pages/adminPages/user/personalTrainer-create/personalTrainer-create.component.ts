import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { PersonalTrainerListComponent } from '../personalTrainer-list/personalTrainer-list.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-personalTrainer-create',
  templateUrl: './personalTrainer-create.component.html',
  styleUrls: ['./personalTrainer-create.component.scss'],
})
export class PersonalTrainerCreateComponent implements OnInit {
  createPersonalTrainerForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private toast: ToastrService,
    private personaltrainerListComponent: PersonalTrainerListComponent,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.createPersonalTrainerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      type: [2, Validators.required],
      memberStartDate: ['', Validators.required],
      memberEndDate: ['', Validators.required],
    });
  }
  get f() {
    return this.createPersonalTrainerForm.controls;
  }

  onSubmit() {
    if (this.createPersonalTrainerForm.invalid) {
      return;
    }

    let startDate = this.f.memberStartDate.value;
    let newStartDate = this.ngbDateParserFormatter.format(startDate);

    let endDate = this.f.memberEndDate.value;
    let newEndDate = this.ngbDateParserFormatter.format(endDate);

    // this.loading = true;
    this.userService
      .createUser(
        this.f.email.value,
        this.f.password.value,
        this.f.firstName.value,
        this.f.lastName.value,
        null,
        this.f.type.value,
        true,
        newStartDate,
        newEndDate
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.toast.success('Başarılı');
          console.log(data.userForRegisterDto);
          this.createPersonalTrainerForm.reset();
          this.personaltrainerListComponent.getPersonalTrainers();
        },
        (error) => {
          this.toast.error('Başarısız');
        }
      );
  }
}
