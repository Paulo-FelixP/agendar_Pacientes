import { TestBed } from '@angular/core/testing';

import { Medicon } from './medicon';

describe('Medicon', () => {
  let service: Medicon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Medicon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
