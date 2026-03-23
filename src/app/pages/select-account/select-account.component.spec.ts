import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCcountComponent } from './select-account.component';

describe('SelectCcountComponent', () => {
  let component: SelectCcountComponent;
  let fixture: ComponentFixture<SelectCcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCcountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
