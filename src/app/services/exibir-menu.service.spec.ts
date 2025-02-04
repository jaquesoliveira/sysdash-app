import { TestBed } from '@angular/core/testing';

import { ExibirMenuService } from './exibir-menu.service';

describe('ExibirMenuService', () => {
  let service: ExibirMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExibirMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
