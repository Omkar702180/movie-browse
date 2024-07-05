import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingledataComponent } from './singledata.component';

describe('SingledataComponent', () => {
  let component: SingledataComponent;
  let fixture: ComponentFixture<SingledataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingledataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
