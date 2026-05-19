import { TestBed } from '@angular/core/testing';

import { Groq } from './groq.service';

describe('Groq', () => {
  let service: Groq;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Groq);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
