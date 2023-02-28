import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMovementsCreateComponent } from './users-movements-create.component';

describe('UsersMovementsCreateComponent', () => {
  let component: UsersMovementsCreateComponent;
  let fixture: ComponentFixture<UsersMovementsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersMovementsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersMovementsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
