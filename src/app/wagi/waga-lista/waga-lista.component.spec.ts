import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagaListaComponent } from './waga-lista.component';

describe('WagaListaComponent', () => {
  let component: WagaListaComponent;
  let fixture: ComponentFixture<WagaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
