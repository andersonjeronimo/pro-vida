import { BoilerplateFirebaseJwtPage } from './app.po';

describe('boilerplate-firebase-jwt App', () => {
  let page: BoilerplateFirebaseJwtPage;

  beforeEach(() => {
    page = new BoilerplateFirebaseJwtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
