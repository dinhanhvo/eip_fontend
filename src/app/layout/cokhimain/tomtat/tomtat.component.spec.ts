import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomtatComponent } from './tomtat.component';

describe('TomtatComponent', () => {
  let component: TomtatComponent;
  let fixture: ComponentFixture<TomtatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomtatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
