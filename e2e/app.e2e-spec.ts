import { AppPage } from './app.po';

describe('adv3-dashboard App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ADv3 Dashboard');
  });
});
