import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCollectionsComponent } from './view-all-collections.component';

describe('ViewAllCollectionsComponent', () => {
  let component: ViewAllCollectionsComponent;
  let fixture: ComponentFixture<ViewAllCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
