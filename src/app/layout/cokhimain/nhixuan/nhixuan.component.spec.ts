import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhixuanComponent } from './nhixuan.component';

describe('NhixuanComponent', () => {
  let component: NhixuanComponent;
  let fixture: ComponentFixture<NhixuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhixuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhixuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
