import { TestBed } from '@angular/core/testing';

import { SecureGuardsGuard } from './secure-guards.guard';

describe('SecureGuardsGuard', () => {
  let guard: SecureGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
