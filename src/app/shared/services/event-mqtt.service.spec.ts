import { TestBed } from '@angular/core/testing';

import { EventMqttService } from './event-mqtt.service';

describe('EventMqttService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventMqttService = TestBed.get(EventMqttService);
    expect(service).toBeTruthy();
  });
});
