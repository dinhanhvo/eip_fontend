import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonghopComponent } from './tonghop.component';

describe('TonghopComponent', () => {
  let component: TonghopComponent;
  let fixture: ComponentFixture<TonghopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonghopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonghopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
