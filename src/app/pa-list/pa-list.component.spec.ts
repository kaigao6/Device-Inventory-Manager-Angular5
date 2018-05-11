import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaListComponent } from './pa-list.component';

describe('PaListComponent', () => {
  let component: PaListComponent;
  let fixture: ComponentFixture<PaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
