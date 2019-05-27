import { TestBed, inject } from '@angular/core/testing';

import { EvolutionTempService } from './evolution-temp.service';

describe('EvolutionTempService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvolutionTempService]
    });
  });

  it('should be created', inject([EvolutionTempService], (service: EvolutionTempService) => {
    expect(service).toBeTruthy();
  }));
});
