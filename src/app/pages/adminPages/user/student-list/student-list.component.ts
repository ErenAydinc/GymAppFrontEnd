import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { BodyInformationDto } from 'src/app/models/bodyInformation';
import { PersonalTrainer } from 'src/app/models/common';
import { PersonalTrainerStudent } from 'src/app/models/personalTrainerStudent';
import { User } from 'src/app/models/user';
import { BodyInformationService } from 'src/app/services/bodyInformation.service';
import { CommonsService } from 'src/app/services/commons.service';
import { PersonalTrainerStudentService } from 'src/app/services/personalTrainer-students.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  userId: number;

  users: User[] = [];
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 20, 50, 100];
  updateStudentForm: FormGroup;
  user: User;
  isLoaded = false;

  createBodyInformationForm: FormGroup;
  updateBodyInformationForm: FormGroup;

  createStudentPersonalTrainerForm: FormGroup;

  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private bodyInformationService: BodyInformationService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private commonsService: CommonsService,
    private personalTrainerStudentService: PersonalTrainerStudentService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.updateStudentForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      type: [3, Validators.required],
      memberEndDate: [null],
    });
    this.createBodyInformationForm = this.formBuilder.group({
      length: [0, Validators.required],
      weight: [0, Validators.required],
      arm: [0, Validators.required],
      shoulder: [0, Validators.required],
      leg: [0, Validators.required],
      chest: [0, Validators.required],
    });
    this.updateBodyInformationForm = this.formBuilder.group({
      length: [0, Validators.required],
      weight: [0, Validators.required],
      arm: [0, Validators.required],
      shoulder: [0, Validators.required],
      leg: [0, Validators.required],
      chest: [0, Validators.required],
    });
    this.createStudentPersonalTrainerForm = this.formBuilder.group({
      personalTrainerId: [0],
    });
  }
  //#region  StudentList
  getStudentsForm = new FormGroup({
    searchFirstName: new FormControl(null),
    searchLastName: new FormControl(null),
  });

  getStudents() {
    this.userService
      .getStudents(
        this.page,
        this.pageSize,
        this.getStudentsForm.value.searchFirstName
          ? this.getStudentsForm.value.searchFirstName
          : null,
        this.getStudentsForm.value.searchLastName
          ? this.getStudentsForm.value.searchLastName
          : null,
          true
      )
      .subscribe((res) => {
        this.users = res.items;
        this.count = res.count;
        console.log(res.items);
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getStudents();
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    console.log(this.pageSize);
    this.page = 1;
    this.getStudents();
  }

  //#endregion

  //#region Student Manage

  get f() {
    return this.updateStudentForm.controls;
  }

  getStudent(userId: number) {
    this.userService.getUserById(userId).subscribe((res) => {
      this.user = res;
      this.isLoaded = true;
    });
  }

  update(userId: number) {
    let endDate = this.f.memberEndDate.value;
    let newEndDate = this.ngbDateParserFormatter.format(endDate);
    this.userService
      .updateUser(
        userId,
        this.f.email.value,
        this.f.firstName.value,
        this.f.lastName.value,
        true,
        3,
        this.user.memberStartDate,
        endDate == null ? this.user.memberEndDate : newEndDate
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.toast.success('Student güncellendi');
          this.getStudents();
        },
        (error) => {
          this.toast.error('Student güncellenemedi');
        }
      );
  }

  deleteStudent(id: number) {
    this.userService.deleteUser(id).subscribe(
      (resp) => {
        this.toast.info('Student silindi');
        this.getStudents();
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
  //#endregion

  //#region Body Information

  bodyInformationUserId: number;
  bodyInformationDto: BodyInformationDto;
  isBodyInformationLoaded = false;
  getBodyInformationByUserId(userId: number) {
    this.bodyInformationService
      .getBodyInformationByUserId(userId)
      .subscribe((res) => {
        console.log(res);
        this.bodyInformationDto = res;
        this.bodyInformationUserId = userId;
        this.isBodyInformationLoaded = true;
      });
  }

  get fCreateBodyInfo() {
    return this.createBodyInformationForm.controls;
  }

  get fUpdateBodyInfo() {
    return this.updateBodyInformationForm.controls;
  }

  createBodyInformation() {
    if (this.createBodyInformationForm.invalid) {
      return;
    }
    this.bodyInformationService
      .create(
        this.bodyInformationUserId,
        this.fCreateBodyInfo.length.value,
        this.fCreateBodyInfo.weight.value,
        this.fCreateBodyInfo.arm.value,
        this.fCreateBodyInfo.shoulder.value,
        this.fCreateBodyInfo.leg.value,
        this.fCreateBodyInfo.chest.value
      )
      .subscribe((res) => {
        this.toast.info('Vücut Bilgileri Girildi');
      });
  }
  updateBodyInformation() {
    if (this.updateBodyInformationForm.invalid) {
      return;
    }
    this.bodyInformationService
      .update(
        this.bodyInformationDto.id,
        this.bodyInformationUserId,
        this.fUpdateBodyInfo.length.value,
        this.fUpdateBodyInfo.weight.value,
        this.fUpdateBodyInfo.arm.value,
        this.fUpdateBodyInfo.shoulder.value,
        this.fUpdateBodyInfo.leg.value,
        this.fUpdateBodyInfo.chest.value
      )
      .subscribe((res) => {
        this.toast.info('Vücut Bilgileri Güncellendi');
      });
  }

  //#endregion

  //#region PersonalTrainer

  personalTrainers: PersonalTrainer[] = [];
  personalTrainerIsLoaded = false;
  getPersonalTrainers() {
    this.commonsService.getListPersonalTrainer(1, 50).subscribe((res) => {
      this.personalTrainers = res.items;
      this.personalTrainerIsLoaded = true;
    });
  }
  get studentPersonalTrainerForm() {
    return this.createStudentPersonalTrainerForm.controls;
  }
  personalTrainerStudent: PersonalTrainerStudent;
  personalTrainerStudentIsLoaded=false
  getPersonalTrainerStudentByStudentId(studentId: number) {
    this.personalTrainerStudentService
      .getPersonalTrainerStudentByStudentId(studentId)
      .subscribe((res) => {
        this.personalTrainerStudent = res;
        this.personalTrainerStudentIsLoaded=true
      });
  }

  checkedPersonalTrainer:number
  setCheckedPersonalTrainer(personalTrainerId:number){
      this.checkedPersonalTrainer=personalTrainerId
      console.log(personalTrainerId)
  }
  createStudentPersonalTrainer(studentId: number) {
    this.personalTrainerStudentService
      .create(
        studentId,
        this.checkedPersonalTrainer
      )
      .subscribe((res) => {
        this.toast.success('Eklendi');
        this.getPersonalTrainers()
        this.getPersonalTrainerStudentByStudentId(this.personalTrainerStudent.studentId)
      });
  }

  updatePersonalTrainerStudent(id:number,studentId:number){
    this.personalTrainerStudentService.update(id,studentId,this.checkedPersonalTrainer).subscribe(res=>{
      this.toast.success('Güncellendi')
      this.getPersonalTrainers()
      this.getPersonalTrainerStudentByStudentId(this.personalTrainerStudent.studentId)
    })
  }

  //#endregion
}
