import { TestBed } from '@angular/core/testing';

import { HttpheaderInterceptor } from './httpheader.interceptor';

describe('HttpheaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpheaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpheaderInterceptor = TestBed.inject(HttpheaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
