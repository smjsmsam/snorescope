import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SleepDataPagePage } from './sleep-data-page.page';

describe('SleepDataPagePage', () => {
  let component: SleepDataPagePage;
  let fixture: ComponentFixture<SleepDataPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepDataPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
