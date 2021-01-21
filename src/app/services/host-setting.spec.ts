import { Component } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { HostSetting } from './host-setting';

describe('HostSetting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HostSetting]
    });
  });

  it('should get host', inject([HostSetting], (service: HostSetting) => {
    expect(service.getHost()).toEqual('http://data.faang.org/api/');
  }));

  it('should set host', inject([HostSetting], (service: HostSetting) => {
    service.setHost('http://test.faang.org/api/');
    expect(service.host).toEqual('http://test.faang.org/api/');
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
