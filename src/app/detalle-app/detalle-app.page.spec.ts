import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAppPage } from './detalle-app.page';

describe('DetalleAppPage', () => {
  let component: DetalleAppPage;
  let fixture: ComponentFixture<DetalleAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAppPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
