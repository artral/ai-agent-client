import { TestBed } from '@angular/core/testing';

import { AgentSocket } from './agent-socket';

describe('AgentSocket', () => {
  let service: AgentSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentSocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
