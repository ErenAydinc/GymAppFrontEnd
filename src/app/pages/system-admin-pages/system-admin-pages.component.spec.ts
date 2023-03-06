import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminPagesComponent } from './system-admin-pages.component';

describe('SystemAdminPagesComponent', () => {
  let component: SystemAdminPagesComponent;
  let fixture: ComponentFixture<SystemAdminPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAdminPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAdminPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
