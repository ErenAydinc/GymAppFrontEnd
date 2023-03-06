import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalTrainerPagesRoutingModule } from './personal-trainer-pages-routing.module';
import { PersonalTrainerPagesComponent } from './personal-trainer-pages.component';
import { StudentsComponent } from './students/students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { WidgetsModule } from 'src/app/_metronic/partials/content/widgets/widgets.module';
import { UsersMovementsListComponent } from './users-movements/users-movements-list/users-movements-list.component';
import { UsersMovementsCreateComponent } from './users-movements/users-movements-create/users-movements-create.component';
import { MovementListComponent } from './movement/movement-list/movement-list.component';
import { NgbCarouselModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PersonalTrainerPagesComponent,
    StudentsComponent,
    UsersMovementsListComponent,
    UsersMovementsCreateComponent,
    MovementListComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    PersonalTrainerPagesRoutingModule,
    NgSelectModule,
    WidgetsModule,
    NgbAccordionModule,
    NgbCarouselModule,
  ]
})
export class PersonalTrainerPagesModule { }
