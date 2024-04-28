import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThekhoComponent } from './thekho.component';

describe('ThekhoComponent', () => {
  let component: ThekhoComponent;
  let fixture: ComponentFixture<ThekhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
