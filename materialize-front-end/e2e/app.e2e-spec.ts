import { MaterializeFrontEndPage } from './app.po';

describe('materialize-front-end App', () => {
  let page: MaterializeFrontEndPage;

  beforeEach(() => {
    page = new MaterializeFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
