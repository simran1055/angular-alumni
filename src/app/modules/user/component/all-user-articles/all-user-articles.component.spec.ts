import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserArticlesComponent } from './all-user-articles.component';

describe('AllUserArticlesComponent', () => {
  let component: AllUserArticlesComponent;
  let fixture: ComponentFixture<AllUserArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
