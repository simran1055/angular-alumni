import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAlumniComponent } from './request-alumni.component';

describe('RequestAlumniComponent', () => {
  let component: RequestAlumniComponent;
  let fixture: ComponentFixture<RequestAlumniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAlumniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
