import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StompMessageComponent } from './stomp-message.component';

describe('StompMessageComponent', () => {
  let component: StompMessageComponent;
  let fixture: ComponentFixture<StompMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StompMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StompMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
