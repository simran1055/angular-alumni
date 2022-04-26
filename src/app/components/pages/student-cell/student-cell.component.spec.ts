import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCellComponent } from './student-cell.component';

describe('StudentCellComponent', () => {
  let component: StudentCellComponent;
  let fixture: ComponentFixture<StudentCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
