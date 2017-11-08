import { VirtualLibraryPage } from './app.po';

describe('virtual-library App', () => {
  let page: VirtualLibraryPage;

  beforeEach(() => {
    page = new VirtualLibraryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
