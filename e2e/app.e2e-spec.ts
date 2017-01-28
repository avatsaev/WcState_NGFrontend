import { WCStateNGPage } from './app.po';

describe('wcstate-ng App', function() {
  let page: WCStateNGPage;

  beforeEach(() => {
    page = new WCStateNGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
