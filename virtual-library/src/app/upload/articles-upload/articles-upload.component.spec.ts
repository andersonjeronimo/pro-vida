import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesUploadComponent } from './articles-upload.component';

describe('ArticlesUploadComponent', () => {
  let component: ArticlesUploadComponent;
  let fixture: ComponentFixture<ArticlesUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
