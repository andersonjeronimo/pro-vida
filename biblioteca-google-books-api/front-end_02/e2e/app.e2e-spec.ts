import { AppFrontEndPage } from './app.po';

describe('app-front-end App', () => {
  let page: AppFrontEndPage;

  beforeEach(() => {
    page = new AppFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
