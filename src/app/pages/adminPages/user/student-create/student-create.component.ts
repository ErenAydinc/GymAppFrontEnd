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
import { StudentListComponent } from '../student-list/student-list.component';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
})
export class StudentCreateComponent implements OnInit {
  model: NgbDateStruct;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private toast: ToastrService,
    private studentListComponent: StudentListComponent,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {
  }

  ngOnInit(): void {
    
  }


  createStudentForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    type: [3, Validators.required],
    memberStartDate:[Date],
    memberEndDate:[Date]
  });

  get f() {
    return this.createStudentForm.controls;
  }

  onSubmit() {
    // if (this.createStudentForm.invalid) {
    //   return;
    // }
    let startDate = this.f.memberStartDate.value
    let newStartDate =  this.ngbDateParserFormatter.format(startDate);
   
    let endDate = this.f.memberEndDate.value
    let newEndDate =  this.ngbDateParserFormatter.format(endDate);
    // this.loading = true;
    this.userService
      .createUser(
        this.f.email.value,
        this.f.password.value,
        this.f.firstName.value,
        this.f.lastName.value,
        null,
        3,
        true,
        newStartDate,
        newEndDate
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.toast.success('Başarılı');
          console.log(data.userForRegisterDto);
          this.createStudentForm.reset();
          this.studentListComponent.getStudents();
        },
        (error) => {
          this.toast.error('Başarısız');
        }
      );
  }
}
