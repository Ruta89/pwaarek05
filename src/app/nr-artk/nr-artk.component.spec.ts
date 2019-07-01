import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrArtkComponent } from './nr-artk.component';

describe('NrArtkComponent', () => {
  let component: NrArtkComponent;
  let fixture: ComponentFixture<NrArtkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrArtkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrArtkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
