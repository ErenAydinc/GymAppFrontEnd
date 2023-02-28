import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalTrainerListComponent } from './personalTrainer-list.component';


describe('UserListComponent', () => {
  let component: PersonalTrainerListComponent;
  let fixture: ComponentFixture<PersonalTrainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTrainerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTrainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
