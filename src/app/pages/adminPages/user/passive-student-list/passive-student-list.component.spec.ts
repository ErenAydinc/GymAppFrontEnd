import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveStudentListComponent } from './passive-student-list.component';

describe('PassiveStudentListComponent', () => {
  let component: PassiveStudentListComponent;
  let fixture: ComponentFixture<PassiveStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassiveStudentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassiveStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
