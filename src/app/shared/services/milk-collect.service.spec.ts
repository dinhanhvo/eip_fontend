import { TestBed } from '@angular/core/testing';

import { MilkCollectService } from './milk-collect.service';

describe('MilkCollectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MilkCollectService = TestBed.get(MilkCollectService);
    expect(service).toBeTruthy();
  });
});
