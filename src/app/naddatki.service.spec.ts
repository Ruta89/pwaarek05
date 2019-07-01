import { TestBed } from '@angular/core/testing';

import { NaddatkiService } from './naddatki.service';

describe('NaddatkiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NaddatkiService = TestBed.get(NaddatkiService);
    expect(service).toBeTruthy();
  });
});
