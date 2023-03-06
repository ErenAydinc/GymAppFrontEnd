import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemAdminPagesRoutingModule } from './system-admin-pages-routing.module';
import { SystemAdminPagesComponent } from './system-admin-pages.component';
import { CustomerComponent } from './customer/customer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovementCreateComponent } from './movement/movement-create/movement-create.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MovementListComponent } from './movement/movement-list-manage/movement-list.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    SystemAdminPagesComponent,
    CustomerComponent,
    MovementListComponent,
    MovementCreateComponent,
    CustomerCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule,
    SystemAdminPagesRoutingModule,
    NgxPaginationModule,
    NgSelectModule
  ]
})
export class SystemAdminPagesModule { }
