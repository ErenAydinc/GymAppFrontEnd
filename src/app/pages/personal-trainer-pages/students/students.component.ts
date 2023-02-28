import { PersonalTrainerStudent, PersonalTrainerStudentDto } from './../../../models/personalTrainerStudent';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PersonalTrainerStudentService } from 'src/app/services/personalTrainer-students.service';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models/loginModel';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{

  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 20, 50, 100];

  constructor(private userService:UserService,private personalTrainerStudentService:PersonalTrainerStudentService,private authService:AuthService){}

  ngOnInit(): void {
    this.getPersonalTrainerStudentByPersonalTrainerId();
  }

  currentUser:Login
  personalTrainerStudentsDto:PersonalTrainerStudentDto[]=[]
  getPersonalTrainerStudentsForm = new FormGroup({
    searchFirstName: new FormControl(null),
    searchLastName: new FormControl(null),
  });
  getPersonalTrainerStudentByPersonalTrainerId(){
    this.currentUser= this.authService.currentUserValue;
    
    this.personalTrainerStudentService.getPersonalTrainerStudentByPersonalTrainerId(this.page,this.pageSize,this.currentUser.id).subscribe(res=>{
      this.personalTrainerStudentsDto=res.items
      this.count=res.count
    })
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
