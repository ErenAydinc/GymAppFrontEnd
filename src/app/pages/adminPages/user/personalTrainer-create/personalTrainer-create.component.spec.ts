import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalTrainerCreateComponent } from './personalTrainer-create.component';

describe('UserCreateModalComponent', () => {
  let component: PersonalTrainerCreateComponent;
  let fixture: ComponentFixture<PersonalTrainerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTrainerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTrainerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
