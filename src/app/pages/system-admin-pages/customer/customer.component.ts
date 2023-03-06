import { UserOperationClaimService } from 'src/app/services/user-operationClaim.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 20, 50, 100];

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private userService:UserService,
    private userOperationClaim:UserOperationClaimService
  ) {}

  updateCustomerForm: FormGroup;

  ngOnInit(): void {
    this.getCustomerList(),
      (this.updateCustomerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
      }));
  }

  customers: Customer[] = [];
  customersIsLoaded = false;
  getCustomerList() {
    this.customerService
      .getCustomerList(this.page, this.pageSize)
      .subscribe((res) => {
        this.customers = res.items;
        this.customersIsLoaded = true;
        console.log(res.items);
      });
  }

  customer: Customer;
  customerIsLoaded=false
  getCustomer(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((res) => {
      this.customer = res;
      this.customerIsLoaded=true
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getCustomerList();
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    console.log(this.pageSize);
    this.page = 1;
    this.getCustomerList();
  }

  //#region  UpdateCustomer

  get f() {
    return this.updateCustomerForm.controls;
  }

  update() {
    this.customerService
      .update(
        this.customer.id,
        this.f.name.value,
        this.f.email.value,
        this.f.phoneNumber.value
      )
      .subscribe((res) => {
        this.toast.info('Müşteri Güncellendi');
        this.getCustomerList();
      });
  }

  //#endregion

//#region Delete

delete(customerId:number){
   this.customerService.delete(customerId).subscribe((res)=>{
    this.toast.success("Müşteri Silindi")
   })
}

createUserForm = this.formBuilder.group({
  email: ['', Validators.required],
  password: ['', Validators.required],
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  type: [3, Validators.required],
  memberStartDate:[Date],
  memberEndDate:[Date]
});

get fu() {
  return this.createUserForm.controls;
}

selectCustomer:number
createUser() {

  // this.loading = true;
  this.userService
    .createUser(
      this.fu.email.value,
      this.fu.password.value,
      this.fu.firstName.value,
      this.fu.lastName.value,
      this.selectCustomer,
      1,
      true,
      null,
      null
    )
    .pipe(first())
    .subscribe(
      (data) => {
        this.toast.success('Başarılı');
        console.log(data.userForRegisterDto);
        this.userOperationClaim.createUserOperationClaim(data.userForRegisterDto.id,[2]).subscribe(),
        this.createUserForm.reset();
      },
      (error) => {
        this.toast.error('Başarısız');
      }
    );
}



//#endregion

}
