import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-passive-student-list',
  templateUrl: './passive-student-list.component.html',
  styleUrls: ['./passive-student-list.component.scss'],
})
export class PassiveStudentListComponent implements OnInit {


  passiveStudentMemberEndDateForm:FormGroup;

  constructor(private userService: UserService,private fb:FormBuilder,private toast:ToastrService,private ngbDateParserFormatter: NgbDateParserFormatter) {}
  ngOnInit(): void {
    this.getPassiveStudentList(),
    this.passiveStudentMemberEndDateForm=this.fb.group({
      memberEndDate:[""]
    })
  }
  users: User[] = [];
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 20, 50, 100];

  getPassiveStudentsForm = new FormGroup({
    searchFirstName: new FormControl(null),
    searchLastName: new FormControl(null),
  });
  getPassiveStudentList() {
    this.userService
      .getStudents(
        this.page,
        this.pageSize,
        this.getPassiveStudentsForm.value.searchFirstName
          ? this.getPassiveStudentsForm.value.searchFirstName
          : null,
        this.getPassiveStudentsForm.value.searchLastName
          ? this.getPassiveStudentsForm.value.searchLastName
          : null,
          false
      )
      .subscribe((res) => {
        this.users=res.items
        this.count = res.count;
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPassiveStudentList();
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    console.log(this.pageSize);
    this.page = 1;
    this.getPassiveStudentList();
  }

  user:User
  isLoaded=false
  getPassiveStudent(userId: number) {
    this.userService.getUserById(userId).subscribe((res) => {
      this.user = res;
      this.isLoaded = true;
    });
  }

  get passiveStudentMemberEndDateFormControl(){
    return this.passiveStudentMemberEndDateForm.controls
  }

  updateStudentMemberEndDate(){
    let endDate = this.passiveStudentMemberEndDateFormControl.memberEndDate.value;
    let newEndDate = this.ngbDateParserFormatter.format(endDate);
    this.userService.updateUser(this.user.id,this.user.email,this.user.firstName,this.user.lastName,true,this.user.type,this.user.memberStartDate,newEndDate).subscribe(res=>{
      this.toast.success("Öğrenci üyelik bitiş süresi uzatıldı")
      this.getPassiveStudentList()
    })
  }

}
