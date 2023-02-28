import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrainerPagesComponent } from './personal-trainer-pages.component';

describe('PersonalTrainerPagesComponent', () => {
  let component: PersonalTrainerPagesComponent;
  let fixture: ComponentFixture<PersonalTrainerPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTrainerPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalTrainerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
