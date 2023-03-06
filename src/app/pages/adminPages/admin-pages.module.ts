import { StudentCreateComponent } from './user/student-create/student-create.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from 'src/app/_metronic/partials/content/widgets/widgets.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovementListComponent } from './movement/movement-list/movement-list.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { StudentListComponent } from './user/student-list/student-list.component';
import { StoreModule } from '@ngrx/store';
import { PersonalTrainerListComponent } from './user/personalTrainer-list/personalTrainer-list.component';
import { PersonalTrainerCreateComponent } from './user/personalTrainer-create/personalTrainer-create.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersMovementsListComponent } from './users-movements/users-movements-list/users-movements-list.component';
import { UsersMovementsCreateComponent } from './users-movements/users-movements-create/users-movements-create.component';
import { PassiveStudentListComponent } from './user/passive-student-list/passive-student-list.component';
import { AdminPagesComponent } from './admin-pages.component';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';
@NgModule({
  declarations: [AdminPagesComponent,StudentCreateComponent,StudentListComponent, MovementListComponent,PersonalTrainerListComponent,PersonalTrainerCreateComponent, UsersMovementsListComponent, UsersMovementsCreateComponent, PassiveStudentListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPagesRoutingModule,
    WidgetsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgImageSliderModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    NgbAccordionModule,
    NgSelectModule,

    StoreModule.forRoot({}),
  ],
  providers:[]
})
export class AdminPagesModule { }
