import { TestBed } from '@angular/core/testing';

import { FeedimagesService } from './feedimages.service';

describe('FeedimagesService', () => {
  let service: FeedimagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedimagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
