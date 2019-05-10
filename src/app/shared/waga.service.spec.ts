import { TestBed } from '@angular/core/testing';

import { WagaService } from './waga.service';

describe('WagaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WagaService = TestBed.get(WagaService);
    expect(service).toBeTruthy();
  });
});
