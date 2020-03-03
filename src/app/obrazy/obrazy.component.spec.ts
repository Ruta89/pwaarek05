import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrazyComponent } from './obrazy.component';

describe('ObrazyComponent', () => {
  let component: ObrazyComponent;
  let fixture: ComponentFixture<ObrazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrazyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
