import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResStatusSettingComponent } from './res-status-setting.component';

describe('ResStatusSettingComponent', () => {
  let component: ResStatusSettingComponent;
  let fixture: ComponentFixture<ResStatusSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResStatusSettingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResStatusSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
