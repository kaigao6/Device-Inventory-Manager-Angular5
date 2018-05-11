import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersListComponent } from './all-users-list.component';

describe('AllUsersListComponent', () => {
  let component: AllUsersListComponent;
  let fixture: ComponentFixture<AllUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
