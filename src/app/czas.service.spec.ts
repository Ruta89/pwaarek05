import { TestBed } from '@angular/core/testing';

import { CzasService } from './czas.service';

describe('CzasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CzasService = TestBed.get(CzasService);
    expect(service).toBeTruthy();
  });
});
