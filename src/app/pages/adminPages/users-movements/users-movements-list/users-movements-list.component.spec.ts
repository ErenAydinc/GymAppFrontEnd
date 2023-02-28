import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMovementsListComponent } from './users-movements-list.component';


describe('UsersMovementsComponent', () => {
  let component: UsersMovementsListComponent;
  let fixture: ComponentFixture<UsersMovementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersMovementsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
