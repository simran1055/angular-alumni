import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingArticlesComponent } from './pending-articles.component';

describe('PendingArticlesComponent', () => {
  let component: PendingArticlesComponent;
  let fixture: ComponentFixture<PendingArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
