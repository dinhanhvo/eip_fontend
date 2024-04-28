import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatthuocComponent } from './xuatthuoc.component';

describe('XuatthuocComponent', () => {
  let component: XuatthuocComponent;
  let fixture: ComponentFixture<XuatthuocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatthuocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
