import { ToastrService } from 'ngx-toastr';
import {
  PersonalTrainerStudent,
  PersonalTrainerStudentDto,
} from './../../../models/personalTrainerStudent';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PersonalTrainerStudentService } from 'src/app/services/personalTrainer-students.service';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models/loginModel';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BodyInformationService } from 'src/app/services/bodyInformation.service';
import { BodyInformationDto } from 'src/app/models/bodyInformation';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 20, 50, 100];

  createBodyInformationForm: FormGroup;
  updateBodyInformationForm: FormGroup;

  constructor(
    private userService: UserService,
    private personalTrainerStudentService: PersonalTrainerStudentService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private bodyInformationService: BodyInformationService,
    private toast : ToastrService
  ) {}

  ngOnInit(): void {
    this.getPersonalTrainerStudentByPersonalTrainerId();
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
  }

  currentUser: Login;
  personalTrainerStudentsDto: PersonalTrainerStudentDto[] = [];
  getPersonalTrainerStudentsForm = new FormGroup({
    searchFirstName: new FormControl(null),
    searchLastName: new FormControl(null),
  });
  getPersonalTrainerStudentByPersonalTrainerId() {
    this.currentUser = this.authService.currentUserValue;

    this.personalTrainerStudentService
      .getPersonalTrainerStudentByPersonalTrainerId(
        this.page,
        this.pageSize,
        this.currentUser.id
      )
      .subscribe((res) => {
        this.personalTrainerStudentsDto = res.items;
        this.count = res.count;
      });
  }

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

  onTableDataChange(event: any) {
    this.page = event;
    this.getPersonalTrainerStudentByPersonalTrainerId();
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    console.log(this.pageSize);
    this.page = 1;
    this.getPersonalTrainerStudentByPersonalTrainerId();
  }
}
