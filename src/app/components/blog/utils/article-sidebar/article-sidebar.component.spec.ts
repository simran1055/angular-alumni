import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSidebarComponent } from './article-sidebar.component';

describe('ArticleSidebarComponent', () => {
  let component: ArticleSidebarComponent;
  let fixture: ComponentFixture<ArticleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
