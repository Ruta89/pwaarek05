import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagiComponent } from './wagi.component';

describe('WagiComponent', () => {
  let component: WagiComponent;
  let fixture: ComponentFixture<WagiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
