import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveCommiteeComponent } from './executive-commitee.component';

describe('ExecutiveCommiteeComponent', () => {
  let component: ExecutiveCommiteeComponent;
  let fixture: ComponentFixture<ExecutiveCommiteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutiveCommiteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveCommiteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
