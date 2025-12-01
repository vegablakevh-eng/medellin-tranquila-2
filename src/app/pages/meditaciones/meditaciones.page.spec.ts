import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeditacionesPage } from './meditaciones.page';

describe('MeditacionesPage', () => {
  let component: MeditacionesPage;
  let fixture: ComponentFixture<MeditacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeditacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
