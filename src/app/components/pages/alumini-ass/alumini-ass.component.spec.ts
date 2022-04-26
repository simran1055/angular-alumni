import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluminiAssComponent } from './alumini-ass.component';

describe('AluminiAssComponent', () => {
  let component: AluminiAssComponent;
  let fixture: ComponentFixture<AluminiAssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AluminiAssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AluminiAssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
