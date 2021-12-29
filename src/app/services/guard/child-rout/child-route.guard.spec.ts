import { TestBed } from '@angular/core/testing';

import { ChildRouteGuard } from './child-route.guard';

describe('ChildRouteGuard', () => {
  let guard: ChildRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChildRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
