import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizadComponent } from './unauthorizad.component';

describe('UnauthorizadComponent', () => {
  let component: UnauthorizadComponent;
  let fixture: ComponentFixture<UnauthorizadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnauthorizadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
