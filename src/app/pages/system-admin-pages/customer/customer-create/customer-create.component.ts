import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  constructor(private customerService:CustomerService,private toast:ToastrService,private formBuilder:FormBuilder){}

  createCustomerForm:FormGroup

  ngOnInit(): void {
    this.createCustomerForm=this.formBuilder.group({
      name:["",Validators.required],
      email:["",Validators.required],
      phoneNumber:["",Validators.required],
    })
  }

  get f(){
    return this.createCustomerForm.controls
  }

  create(){
    this.customerService.create(this.f.name.value,this.f.email.value,this.f.phoneNumber.value).subscribe(res=>{
      this.toast.success("Customer Eklendi")
    })
  }


}
