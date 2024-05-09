import { TestBed } from '@angular/core/testing';

import { WeighService } from './weigh.service';

describe('WeighService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeighService = TestBed.get(WeighService);
    expect(service).toBeTruthy();
  });
});
