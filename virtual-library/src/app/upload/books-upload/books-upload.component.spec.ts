import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksUploadComponent } from './books-upload.component';

describe('BooksUploadComponent', () => {
  let component: BooksUploadComponent;
  let fixture: ComponentFixture<BooksUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
