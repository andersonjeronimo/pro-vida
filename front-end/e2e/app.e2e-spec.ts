import { SegundoProjetoPage } from './app.po';

describe('segundo-projeto App', () => {
  let page: SegundoProjetoPage;

  beforeEach(() => {
    page = new SegundoProjetoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
