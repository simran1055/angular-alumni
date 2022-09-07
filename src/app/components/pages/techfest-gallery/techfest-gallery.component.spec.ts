import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechfestGalleryComponent } from './techfest-gallery.component';

describe('TechfestGalleryComponent', () => {
  let component: TechfestGalleryComponent;
  let fixture: ComponentFixture<TechfestGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechfestGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechfestGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
